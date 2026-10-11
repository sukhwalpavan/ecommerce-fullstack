import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/products';
      if (category) {
        url = `/products/category/${encodeURIComponent(category)}`;
      }
      
      const { data } = await api.get(url);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Electronics', 'Home', 'Accessories'];

  // Client-side filtering & sorting
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                            product.description?.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="page container">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>All Products</h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore our curated premium collection.</p>
      </div>

      {/* Filters & Search Toolbar */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1.25rem', 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-sm)', 
        marginBottom: '2rem' 
      }}>
        {/* Top Row: Search and Category Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search products by name or description..." 
              className="input-field" 
              style={{ paddingLeft: '3rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              className={`btn ${category === '' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCategory('')}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Row: Price Range Slider & Sorting Dropdown */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: '1rem', 
          borderTop: '1px solid var(--border-color)',
          gap: '1rem'
        }}>
          {/* Price Range Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <SlidersHorizontal size={18} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Max Price:</span>
            <input 
              type="range" 
              min="10" 
              max="500" 
              step="10"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: '700', fontSize: '0.95rem', minWidth: '55px' }}>${maxPrice}</span>
          </div>

          {/* Sort Criteria */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ArrowUpDown size={18} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Sort by:</span>
            <select 
              className="input-field" 
              style={{ padding: '0.4rem 0.8rem', width: 'auto' }}
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Featured / Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Showing count */}
      <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Showing {displayedProducts.length} of {filteredProducts.length} products
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading products...</div>
      ) : displayedProducts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem', 
          background: 'white', 
          borderRadius: 'var(--radius-lg)', 
          color: 'var(--text-muted)' 
        }}>
          <h3>No products found</h3>
          <p style={{ marginTop: '0.5rem' }}>Try adjusting your search query, category, or price range filter.</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More / Pagination feature */}
          {visibleCount < filteredProducts.length && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button 
                onClick={() => setVisibleCount(prev => prev + 6)} 
                className="btn btn-outline"
                style={{ padding: '0.75rem 2rem' }}
              >
                Load More Products
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
