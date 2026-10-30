import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
  
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized. Please log in again.' });
    }

    const { cartItems, shippingAddress } = req.body;
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    // Filter out any broken items
    const validItems = cartItems.filter(item => item && item._id);

    if (validItems.length === 0) {
      return res.status(400).json({ message: 'No valid items in cart. Please refresh and add products again.' });
    }

    const line_items = validItems.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: [item.image || ''],
          metadata: { productId: item._id },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      metadata: {
        userId: req.user._id.toString(),
        shippingAddress: JSON.stringify(shippingAddress),
      },
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe Session Error:', error.message);
    res.status(500).json({ message: 'Failed to create checkout session' });
  }
};

// @desc    Verify Stripe payment & save order
export const verifyAndCreateOrder = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed' });
    }
    
    if (session.metadata.userId !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized for this session' });
    }

    const orderItems = session.line_items.data.map((li) => ({
      product: li.price?.product?.metadata?.productId,
      name: li.description || li.price?.product?.name || 'Product',
      qty: li.quantity,
      price: (li.price?.unit_amount || 0) / 100,
      image: li.price?.product?.images?.[0] || '',
    }));

    const itemsPrice = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const shippingAddress = JSON.parse(session.metadata.shippingAddress || '{}');

    const order = await Order.create({
      user: session.metadata.userId,
      orderItems,
      shippingAddress,
      paymentMethod: 'Stripe (Card)',
      itemsPrice,
      shippingPrice,
      totalPrice: session.amount_total / 100,
      isPaid: true,
      paidAt: new Date(),
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Verify Error:', error.message);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
};

// @desc    Simulated wallet payment
export const simulatePayment = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    const { cartItems, shippingAddress, paymentMethod } = req.body;
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    const orderItems = [];
    let itemsPrice = 0;
    
    for (const item of cartItems) {
      if (!item || !item._id) continue;
      
      const product = await Product.findById(item._id);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.name}` });
      
      orderItems.push({
        product: product._id,
        name: product.name,
        qty: item.quantity || 1,
        price: product.price,
        image: product.image,
      });
      itemsPrice += product.price * (item.quantity || 1);
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ message: 'No valid items to process' });
    }

    const shippingPrice = itemsPrice > 500 ? 0 : 50;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice: itemsPrice + shippingPrice,
      isPaid: true,
      paidAt: new Date(),
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(' Simulate Error:', error.message);
    res.status(500).json({ message: 'Failed to process payment' });
  }
};