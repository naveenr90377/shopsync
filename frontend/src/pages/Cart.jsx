import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-serif text-white mb-4">Your cart is empty</h2>
        <p className="text-neutral-400 mb-8">Discover our premium collection and add something special.</p>
        <Link to="/products" className="bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 px-8 rounded-lg uppercase tracking-wider transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-white mb-10 text-center">Your Cart</h1>
        
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden mb-8">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-6 border-b border-neutral-800 last:border-0">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-24 h-24 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                  {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <span className="text-neutral-600 text-xs">No Img</span>}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{item.name}</h3>
                  <p className="text-amber-500 font-semibold">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center bg-neutral-800 rounded-lg border border-neutral-700">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-4 py-2 text-white hover:text-amber-500 transition">-</button>
                  <span className="px-4 font-semibold text-white">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-4 py-2 text-white hover:text-amber-500 transition">+</button>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-400 text-sm font-semibold uppercase tracking-wider transition">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-neutral-400 text-sm uppercase tracking-wider mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-amber-500">₹{cartTotal}</p>
          </div>
          <Link to="/checkout" className="w-full md:w-auto bg-amber-600 hover:bg-amber-500 text-black font-bold py-4 px-10 rounded-lg uppercase tracking-wider transition text-center">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;