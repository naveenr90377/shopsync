import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('verifying'); // verifying | done | error

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.post('/payments/verify-session', { sessionId });
        setOrder(res.data);
        clearCart();
        setStatus('done');
      } catch (err) {
        setStatus('error');
      }
    };
    if (sessionId) verify();
  }, [sessionId]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-amber-500 text-lg animate-pulse">Verifying your payment with Stripe...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-serif text-red-500 mb-4">Payment Failed</h1>
        <p className="text-neutral-400 mb-8">We could not verify your payment. Please try again.</p>
        <Link to="/checkout" className="bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 px-8 rounded-lg uppercase tracking-wider transition">
          Back to Checkout
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center text-center px-4">
      <div className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mb-8">
        <span className="text-green-500 text-5xl">✓</span>
      </div>
      <h1 className="text-5xl font-serif text-white mb-4">Payment Successful!</h1>
      <p className="text-neutral-400 text-lg mb-2">Thank you for shopping with ShopSync.</p>
      <p className="text-neutral-500 mb-8">
        Order ID: <span className="text-amber-500 font-mono">#{order._id.substring(0, 10)}</span> • Total Paid:{' '}
        <span className="text-amber-500 font-bold">₹{order.totalPrice}</span>
      </p>
      <div className="flex gap-4">
        <Link to="/profile" className="bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 px-8 rounded-lg uppercase tracking-wider transition">
          View My Orders
        </Link>
        <Link to="/products" className="border border-white/30 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-lg uppercase tracking-wider transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;