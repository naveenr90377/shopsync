import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';

function Products() {
  const [searchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');

  const categories = ['All', 'Electronics', 'Fashion', 'Gaming', 'Home'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    if (searchTerm) result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (sortOption === 'lowToHigh') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortOption === 'highToLow') result = [...result].sort((a, b) => b.price - a.price);
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortOption, products]);

  if (loading) return <div className="flex justify-center items-center h-96 bg-neutral-950"><p className="text-amber-500 animate-pulse">Loading Collection...</p></div>;
  if (error) return <div className="flex justify-center items-center h-96 bg-neutral-950"><p className="text-red-500">{error}</p></div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      
   
      <div className="relative overflow-hidden">
        <img 
          src="/images/banner-bg.jpg" 
          alt="Premium collection banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/40 to-neutral-950"></div>

        <div className="relative z-10 text-center pt-24 pb-24 px-6">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4 tracking-tight drop-shadow-lg">
            Explore Our Collection
          </h1>
          <p className="text-neutral-200 text-lg drop-shadow-md">
            Discover premium products crafted for excellence.
          </p>
        </div>
      </div>

   
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 mt-10 pb-8 border-b border-neutral-800">
          
          {/* Minimalist Category Tabs */}
          <div className="flex flex-wrap justify-center gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm uppercase tracking-widest transition-all duration-300 pb-1 border-b-2 ${
                  selectedCategory === cat
                    ? 'text-amber-500 border-amber-500 font-bold'
                    : 'text-neutral-400 border-transparent hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 p-3 bg-neutral-900 border border-neutral-800 text-white rounded-lg focus:outline-none focus:border-amber-500 placeholder-neutral-600 text-sm"
            />
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="p-3 bg-neutral-900 border border-neutral-800 text-white rounded-lg focus:outline-none focus:border-amber-500 text-sm"
            >
              <option value="default">Sort</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Premium Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-500/30 transition-all duration-500 group flex flex-col">
                
                <div className="h-64 bg-neutral-800 overflow-hidden relative">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <span className="text-neutral-600">No Image</span>
                  )}
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-amber-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-neutral-500 text-sm mb-6 line-clamp-2 flex-grow">{product.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-800">
                    <span className="text-xl font-bold text-amber-500">₹{product.price}</span>
                    <Link to={`/products/${product._id}`} className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-neutral-500 text-lg">No products found.</p>
              <button onClick={() => {setSelectedCategory('All'); setSearchTerm('');}} className="mt-4 text-amber-500 hover:underline text-sm uppercase tracking-wider">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;