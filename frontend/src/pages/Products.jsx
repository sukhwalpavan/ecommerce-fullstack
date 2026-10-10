import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/products';
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
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

  return (
    <div className="page container">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>All Products</h1>
        <p style={{ color: 'var(--text-muted)' }}>Find exactly what you're looking for.</p>
      </div>

      {/* Filters Bar */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '1rem', 
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
        padding: '1rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2rem'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="input-field" 
            style={{ paddingLeft: '3rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn ${category === '' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCategory('')}
          >
            All
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

      {/* Product Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No products found matching your criteria.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
