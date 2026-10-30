import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      
      {/* 1. HERO SECTION: FULL-SCREEN IMAGE with text on top */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        
        {/*  FULL-SCREEN IMAGE: covers the entire hero, edge to edge */}
        <img 
          src="/images/hero.png" 
          alt="Premium products showcase" 
          className="absolute inset-0 w-full h-full object-cover object-[70%_50%]"
        />
        
        {/* Dark gradient ONLY on the left side so text stays readable,
            while the right side (products) stays fully bright and visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent md:via-neutral-950/30"></div>

        {/* Hero Text Content (sits on top of the image) */}
        <div className="relative z-10 container mx-auto px-8 md:px-16 py-24 w-full">
          <div className="max-w-2xl">
            <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-sm mb-5 block">
              The New Season Collection
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
              Elevate Your <br />
              <span className="text-amber-500">Lifestyle.</span>
            </h1>
            
            <p className="text-neutral-200 text-lg mb-10 max-w-lg leading-relaxed">
              Discover products that match your style, simplify your everyday life, and bring something extraordinary to every moment. Explore a collection of carefully selected essentials, all in one place.
            </p>
            
            <div className="flex gap-4">
              <Link 
                to="/products" 
                className="bg-amber-600 hover:bg-amber-500 text-black font-bold py-3.5 px-8 rounded-md uppercase tracking-wider text-sm transition-all duration-300 shadow-lg shadow-amber-600/30"
              >
                Explore Now →
              </Link>
              <Link 
                to="/products" 
                className="bg-black/30 backdrop-blur-sm border border-white/40 hover:bg-white/10 hover:border-white text-white font-bold py-3.5 px-8 rounded-md uppercase tracking-wider text-sm transition-all duration-300"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="px-8 md:px-16 py-20 bg-neutral-950">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-white">Explore Your World</h2>
            <p className="text-neutral-400">From everyday essentials to premium upgrades.</p>
          </div>
          <Link to="/products" className="text-amber-500 hover:text-amber-400 text-sm font-bold uppercase tracking-wider">
            Shop All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-neutral-800">
            <img src= 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop' alt="Electronics" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold text-white mb-1">Electronics</h3>
              <p className="text-neutral-300 text-sm">Technology for everyday life</p>
            </div>
          </div>

          <div className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-neutral-800">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop" alt="Fashion" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold text-white mb-1">Fashion</h3>
              <p className="text-neutral-300 text-sm">Define your own style</p>
            </div>
          </div>

          <div className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-neutral-800">
            <img src= 'https://images.unsplash.com/photo-1583665606514-e0f81cc5cded?q=80&w=764&auto=format&fit=crop' alt="Gaming" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold text-white mb-1">Gaming</h3>
              <p className="text-neutral-300 text-sm">Feel good, look great</p>
            </div>
          </div>

          <div className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-neutral-800">
            <img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop" alt="Home" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold text-white mb-1">Home & Living</h3>
              <p className="text-neutral-300 text-sm">Make your space better</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BANNER SECTION */}
      <section className="px-8 md:px-16 py-8 bg-neutral-950">
        <div className="relative h-[450px] rounded-2xl overflow-hidden flex items-center px-8 md:px-12 border border-neutral-800">
          <img 
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&h=600&fit=crop" 
            alt="Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent"></div>
          
          <div className="relative z-10 max-w-lg">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-3 block">New Arrivals</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Upgrade Your Everyday</h2>
            <p className="text-neutral-300 mb-8">Premium gadgets, accessories, and lifestyle essentials. Shop the latest tech and design.</p>
            <Link to="/products" className="inline-block text-amber-500 hover:text-amber-400 font-bold uppercase tracking-wider text-sm border-b-2 border-amber-500 pb-1 transition-colors">
              Explore The Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-neutral-900 border-t border-neutral-800 mt-16 py-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">SHOP<span className="text-amber-500">SYNC</span></h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Premium e-commerce experience for the modern lifestyle. Quality meets design.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Shop</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><Link to="/products" className="hover:text-amber-500 transition">All Products</Link></li>
              <li><Link to="/products" className="hover:text-amber-500 transition">Electronics</Link></li>
              <li><Link to="/products" className="hover:text-amber-500 transition">Fashion</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-amber-500 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-amber-500 transition">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-neutral-400 text-sm mb-4">Subscribe for latest updates.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-neutral-800 text-white px-4 py-2.5 rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500 w-full text-sm border border-neutral-700 border-r-0" />
              <button className="bg-amber-600 hover:bg-amber-500 text-black font-bold px-5 py-2.5 rounded-r-md transition text-sm">Go</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-xs">
          <p>© 2026 ShopSync. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;