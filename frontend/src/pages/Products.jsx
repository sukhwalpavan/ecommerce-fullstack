import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(8);

  // Sync category state if searchParams change
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    setCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/products';
      if (category) {
        url = `/products?category=${encodeURIComponent(category)}`;
      }
      const { data } = await api.get(url);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
      // Fallback: fetch all and filter in frontend
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (e) {
        console.error('Fallback fetch failed', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Electronics', 'Home', 'Accessories'];

  const handleCategorySelect = (selectedCat) => {
    setCategory(selectedCat);
    if (selectedCat) {
      setSearchParams({ category: selectedCat });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setMaxPrice(500);
    setSortBy('default');
    setSearchParams({});
  };

  // Filter & sort logic
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                            product.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? product.category?.toLowerCase() === category.toLowerCase() : true;
      const matchesPrice = Number(product.price) <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
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
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '0.5rem' }}>All Products</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Browse and filter through our full catalog of premium goods.</p>
      </div>

      {/* Main Filter & Search Toolbar */}
      <div className="toolbar-card">
        {/* Search Bar & Category Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
            <input 
              type="text" 
              placeholder="Search products by title or keywords..." 
              className="input-field" 
              style={{ paddingLeft: '2.75rem', paddingRight: search ? '2.5rem' : '1rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          {/* Category Filter Pills (Horizontal scrollable on mobile) */}
          <div className="filter-categories-pills">
            <button 
              className={`pill-btn ${category === '' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('')}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`pill-btn ${category.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-toolbar: Price Range Slider & Sorting Dropdown */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: '1rem', 
          borderTop: '1px solid var(--card-border)',
          gap: '1rem'
        }}>
          {/* Price Range Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
              <SlidersHorizontal size={16} />
              <span>Max Price:</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <input 
                type="range" 
                min="10" 
                max="500" 
                step="10"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ accentColor: 'var(--accent)', cursor: 'pointer', width: '130px' }}
              />
              <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--accent)', minWidth: '45px' }}>
                ${maxPrice}
              </span>
            </div>
          </div>

          {/* Sort Criteria */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ArrowUpDown size={16} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>Sort by:</span>
            <select 
              className="input-field" 
              style={{ padding: '0.45rem 0.85rem', width: 'auto', fontSize: '0.9rem' }}
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

      {/* Showing count and reset button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
        </span>
        
        {(search || category || maxPrice < 500 || sortBy !== 'default') && (
          <button 
            onClick={handleResetFilters} 
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--accent)', gap: '0.35rem' }}
          >
            <RotateCcw size={14} /> Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Loading products...
        </div>
      ) : displayedProducts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem', 
          background: 'white', 
          borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--card-border)',
          color: 'var(--text-muted)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>No products found</h3>
          <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>Try adjusting your search query, department, or max price range.</p>
          <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <button 
                onClick={() => setVisibleCount(prev => prev + 6)} 
                className="btn btn-outline btn-lg"
              >
                Load More Products ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
