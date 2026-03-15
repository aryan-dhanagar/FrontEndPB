import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProducts, getSettings } from '../services/api';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, settingsData] = await Promise.all([
          getProducts(),
          getSettings().catch(() => null),
        ]);
        if (productsData && productsData.length > 0) {
          const mapped = productsData.map(p => ({
            ...p,
            id: p._id || p.slug,
            rating: p.rating || (4.5 + Math.random() * 0.5).toFixed(1),
          }));
          setProducts(mapped);
        }
        if (settingsData?.productCategories?.length > 0) {
          setCategories(settingsData.productCategories);
        } else {
          setCategories(['Meals', 'Rice Bowls', 'Budget Bites', 'Protein Picks']);
        }
      } catch (err) {
        console.log('Using fallback products');
        setCategories(['Meals', 'Rice Bowls', 'Budget Bites', 'Protein Picks']);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  return (
    <section id="signature-selection" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] text-navy-900 mb-5 leading-tight">
          Our <em className="italic">Menu</em>
        </h2>

        {/* Category Tabs */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full transition-colors duration-300 whitespace-nowrap ${filter === 'all'
              ? 'bg-[#1a1a1a] text-white'
              : 'border border-gray-300 text-navy-900 hover:border-gray-500'
              }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full transition-colors duration-300 whitespace-nowrap ${filter === cat
                ? 'bg-[#1a1a1a] text-white'
                : 'border border-gray-300 text-navy-900 hover:border-gray-500'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/5] rounded-xl mb-3" />
                <div className="bg-gray-200 h-4 w-3/4 rounded mb-2" />
                <div className="bg-gray-200 h-4 w-1/4 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-gray-400 py-12">No products found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
