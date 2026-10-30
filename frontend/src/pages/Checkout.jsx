import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) return <Navigate to="/login" replace />;
  if (cartItems.length === 0) return <Navigate to="/cart" replace />;

  const handlePayWithStripe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/payments/create-checkout-session', {
        cartItems: cartItems.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        shippingAddress,
      });
      // Redirect user to Stripe's secure hosted payment page
      window.location.href = res.data.url;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start payment.');
      setLoading(false);
    }
  };

  const shippingPrice = cartTotal > 500 ? 0 : 50;

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-white mb-10 text-center">Checkout</h1>

        {error && (
          <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mb-8 border border-red-900/50 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Shipping Form */}
          <form onSubmit={handlePayWithStripe} className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8">
            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

            <label className="block text-sm text-neutral-400 mb-2">Full Address</label>
            <input
              type="text"
              required
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
              placeholder="123 Main Street, Apartment 4B"
              className="w-full p-3 mb-5 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-amber-500 text-white placeholder-neutral-600"
            />

            <label className="block text-sm text-neutral-400 mb-2">City</label>
            <input
              type="text"
              required
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
              placeholder="Bangalore"
              className="w-full p-3 mb-5 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-amber-500 text-white placeholder-neutral-600"
            />

            <label className="block text-sm text-neutral-400 mb-2">Postal Code</label>
            <input
              type="text"
              required
              value={shippingAddress.postalCode}
              onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
              placeholder="560001"
              className="w-full p-3 mb-8 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-amber-500 text-white placeholder-neutral-600"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest transition shadow-lg ${
                loading
                  ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-500 text-black shadow-amber-500/20'
              }`}
            >
              {loading ? 'Redirecting to Stripe...' : 'Pay with Stripe →'}
            </button>
            <p className="text-neutral-500 text-xs text-center mt-4">
              🔒 Payments are processed securely by Stripe. Card details never touch our servers.
            </p>
          </form>

          {/* Order Summary */}
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center py-2 border-b border-neutral-800 last:border-0">
                  <span className="text-neutral-300">
                    {item.name} <span className="text-neutral-500 text-sm">(x{item.quantity})</span>
                  </span>
                  <span className="text-white font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-neutral-400 mb-2">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-neutral-400 mb-4">
              <span>Shipping</span>
              <span>{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t-2 border-neutral-700">
              <span className="text-xl font-bold uppercase tracking-wider">Total</span>
              <span className="text-3xl font-bold text-amber-500">₹{cartTotal + shippingPrice}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;