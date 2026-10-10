import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Fetch some products to act as featured (limit to 4 in a real app)
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setFeatured(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="page">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, #1e293b 100%)',
        color: 'white',
        padding: '6rem 1rem',
        textAlign: 'center',
        borderRadius: 'var(--radius-lg)',
        margin: '0 1rem 3rem 1rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          Discover Premium <br/><span style={{ color: 'var(--accent)' }}>Lifestyle Products</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Elevate your everyday with our curated collection of high-quality essentials designed for modern living.
        </p>
        <Link to="/products" className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          Shop Collection <ArrowRight size={20} />
        </Link>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Featured Products</h2>
          <Link to="/products" style={{ color: 'var(--accent)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
