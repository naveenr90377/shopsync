import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Product not found or backend error.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen bg-neutral-950 text-amber-500 animate-pulse">Loading details...</div>;
  if (error) return <div className="flex justify-center items-center h-screen bg-neutral-950 text-red-500">{error}</div>;
  if (!product) return <div className="flex justify-center items-center h-screen bg-neutral-950 text-neutral-400">Product not found.</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/products" className="text-amber-500 hover:text-amber-400 mb-8 inline-block font-medium tracking-wide">
          ← Back to Products
        </Link>

        <div className="bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-neutral-800 flex flex-col md:flex-row">
          
          {/* Image Section */}
          <div className="md:w-1/2 h-80 md:h-auto bg-neutral-800 flex items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-neutral-500 text-lg">No Image</span>
            )}
          </div>

          {/* Details Section */}
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">{product.category}</span>
            <h1 className="text-4xl font-serif text-white mb-4">{product.name}</h1>
            <p className="text-neutral-400 mb-8 leading-relaxed">{product.description}</p>
            
            <div className="text-3xl font-bold text-amber-500 mb-8">₹{product.price}</div>
            
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-4 rounded-lg uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;