import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <nav className="flex items-center gap-4 md:gap-6 px-6 md:px-10 py-4 bg-neutral-950 border-b border-neutral-800 text-white sticky top-0 z-50">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wider whitespace-nowrap hover:text-amber-500 transition-colors">
        SHOP<span className="text-amber-500">SYNC</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden lg:flex gap-6 font-medium items-center ml-2">
        <Link to="/" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wide">Home</Link>
        <Link to="/products" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wide">Products</Link>
        <Link to="/cart" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wide relative">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-amber-600 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        {user && (
          <Link to="/profile" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wide">Profile</Link>
        )}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl ml-auto hidden md:block">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products, brands and more..."
          className="w-full p-2.5 pl-5 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
        />
      </form>

      {/* Auth Section */}
      <div className="flex items-center gap-4 whitespace-nowrap">
        {user ? (
          <>
            <span className="text-amber-500 text-sm font-semibold hidden sm:block">Hi, {user.name}</span>
            <button onClick={logout} className="text-neutral-400 hover:text-red-500 transition-colors text-sm uppercase tracking-wide">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wide">Login</Link>
            <Link to="/register" className="bg-amber-600 hover:bg-amber-500 text-black px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;