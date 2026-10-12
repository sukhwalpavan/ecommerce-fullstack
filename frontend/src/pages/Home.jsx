import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles, ShieldCheck, RefreshCw, Headphones, Home as HomeIcon, Watch, Truck, CheckCircle2 } from 'lucide-react';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setFeatured(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
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
        background: 'radial-gradient(ellipse at 80% 20%, #312E81 0%, #0F172A 70%)',
        color: 'white',
        padding: 'clamp(3rem, 6vw, 5.5rem) 1.5rem',
        textAlign: 'center',
        borderRadius: 'var(--radius-xl)',
        margin: '0 clamp(1rem, 3vw, 2rem) 3.5rem',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(255,255,255,0.12)', 
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            padding: '0.45rem 1.1rem', 
            borderRadius: 'var(--radius-full)', 
            marginBottom: '1.5rem', 
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            <Sparkles size={16} color="#818CF8" /> New Season Collection 2026
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.1rem, 5.5vw, 3.6rem)', 
            fontWeight: '800', 
            marginBottom: '1.25rem', 
            lineHeight: '1.15',
            color: 'white'
          }}>
            Discover Premium <br/>
            <span style={{ 
              background: 'linear-gradient(135deg, #A5B4FC 0%, #818CF8 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              Lifestyle Essentials
            </span>
          </h1>

          <p style={{ 
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', 
            color: '#CBD5E1', 
            maxWidth: '580px', 
            margin: '0 auto 2.25rem', 
            lineHeight: '1.6' 
          }}>
            Elevate your everyday rituals with curated, high-end electronics, modern home decor, and timeless accessories.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link to="/products" className="btn btn-accent btn-lg" style={{ boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4)' }}>
              Explore Shop <ArrowRight size={18} />
            </Link>
            <Link to="/products?category=Electronics" className="btn btn-outline btn-lg" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
              View Tech
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 'clamp(1.5rem, 4vw, 3rem)', 
            flexWrap: 'wrap',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.85rem',
            color: '#94A3B8'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="#10B981" /> 100% Authentic
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={16} color="#818CF8" /> Free Express Delivery
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="#10B981" /> 30-Day Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="container" style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-accent" style={{ marginBottom: '0.5rem' }}>Categories</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>Browse by Department</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link 
                to={`/products?category=${encodeURIComponent(cat.name)}`} 
                key={cat.name}
                style={{ 
                  background: 'white', 
                  padding: '2rem 1.75rem', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '1.5px solid var(--card-border)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ 
                  background: 'var(--accent-light)', 
                  color: 'var(--accent)',
                  padding: '1.1rem', 
                  borderRadius: 'var(--radius-full)', 
                  marginBottom: '1.25rem' 
                }}>
                  <Icon size={30} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{cat.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>{cat.desc}</p>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Explore Collection →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ marginBottom: '4.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-accent" style={{ marginBottom: '0.5rem' }}>Trending</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>Featured Products</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Handpicked essentials trending this week</p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading featured items...</div>
        ) : (
          <div className="product-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Promotional Perks Section */}
      <section className="container">
        <div style={{ 
          background: 'white', 
          border: '1px solid var(--card-border)',
          padding: 'clamp(2rem, 4vw, 3rem)', 
          borderRadius: 'var(--radius-xl)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '2.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EEF2FF', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <ShieldCheck size={28} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Secure Checkout</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Instant mock payment with verified order confirmations.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <RefreshCw size={28} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Easy 30-Day Returns</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>No questions asked return policy with full refund.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Truck size={28} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Express Shipping</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Free tracked standard express shipping on all orders.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
