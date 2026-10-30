// Import Cart and Product models for database queries
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc  Get logged-in user's cart   @route GET /api/cart
const getCart = async (req, res) => {
  try {
    // find the cart belonging to the logged-in user
    const cart = await Cart.findOne({ user: req.user._id });
    // no cart yet is NOT an error: return empty items so frontend renders fine
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Add item to cart   @route POST /api/cart
const addToCart = async (req, res) => {
  try {
    // frontend sends { productId, qty } in the JSON body
    const { productId, qty } = req.body;

    // fetch product to copy its name/price snapshot into the cart
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // find user's cart, or start a fresh one in memory (not saved yet)
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    // check if this product is already in the cart
    const existing = cart.items.find((i) => i.product.toString() === productId);
    if (existing) {
      // already there: increase quantity instead of duplicating the row
      existing.qty += qty;
    } else {
      // new item: push a snapshot of the product into items array
      cart.items.push({
        product: productId,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
      });
    }

    // save to MongoDB and return the updated cart
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update item quantity   @route PUT /api/cart/:productId
const updateCartItem = async (req, res) => {
  try {
    // new quantity comes from the body
    const { qty } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // locate the item inside the items array
    const item = cart.items.find((i) => i.product.toString() === req.params.productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    // set the new quantity (schema min:1 guard protects us)
    item.qty = qty;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Remove item from cart   @route DELETE /api/cart/:productId
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // filter = keep every item EXCEPT the one being removed
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all four cart actions for the routes file
module.exports = { getCart, addToCart, updateCartItem, removeFromCart };