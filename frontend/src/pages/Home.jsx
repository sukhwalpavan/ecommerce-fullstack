import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles, Shield, RefreshCw, Headphones, Home as HomeIcon, Watch } from 'lucide-react';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
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

  const categoryCards = [
    { name: 'Electronics', icon: Headphones, desc: 'High performance audio & gadgets', count: 'Premium Tech' },
    { name: 'Home', icon: HomeIcon, desc: 'Minimalist decor & everyday living', count: 'Modern Decor' },
    { name: 'Accessories', icon: Watch, desc: 'Timeless watches & leather goods', count: 'Style Essentials' },
  ];

  return (
    <div className="page">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, #1e293b 100%)',
        color: 'white',
        padding: '6rem 1.5rem',
        textAlign: 'center',
        borderRadius: 'var(--radius-lg)',
        margin: '0 1rem 3rem 1rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '9999px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          <Sparkles size={16} color="var(--accent)" /> New Autumn Collection 2026
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          Discover Premium <br/><span style={{ color: 'var(--accent)' }}>Lifestyle Products</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '620px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
          Elevate your everyday with our curated collection of high-quality essentials designed for modern living.
        </p>
        <Link to="/products" className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
          Shop Collection <ArrowRight size={20} />
        </Link>
      </section>

      {/* Categories Showcase */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>
          Browse by Category
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link 
                to="/products" 
                key={cat.name}
                style={{ 
                  background: 'white', 
                  padding: '2rem', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
                className="category-card"
              >
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', color: 'var(--primary)' }}>
                  <Icon size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{cat.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{cat.desc}</p>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '600' }}>Explore {cat.count} →</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Featured Products</h2>
            <p style={{ color: 'var(--text-muted)' }}>Handpicked essentials trending this week</p>
          </div>
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

      {/* Promotional Perks Section */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
          padding: '2.5rem', 
          borderRadius: 'var(--radius-lg)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <Shield size={36} color="var(--primary)" style={{ margin: '0 auto 0.75rem' }} />
            <h4 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Secure Checkout</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Simulated payment with instant order verification</p>
          </div>
          <div>
            <RefreshCw size={36} color="var(--primary)" style={{ margin: '0 auto 0.75rem' }} />
            <h4 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Easy Returns</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Hassle-free 30-day exchange guarantee</p>
          </div>
          <div>
            <Sparkles size={36} color="var(--primary)" style={{ margin: '0 auto 0.75rem' }} />
            <h4 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Curated Quality</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Every product tested for premium performance</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
