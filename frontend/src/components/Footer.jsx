import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--accent)', color: 'white', padding: '0.4rem', borderRadius: 'var(--radius-md)' }}>
              <ShoppingBag size={20} />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'white', letterSpacing: '-0.02em' }}>
              AuraStore
            </span>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.6', maxWidth: '320px', marginBottom: '1.25rem' }}>
            Curated premium lifestyle essentials. Engineered for aesthetic elegance, daily endurance, and uncompromised quality.
          </p>
          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Designed & Developed with Passion • 2026
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="footer-title">Departments</h4>
          <ul className="footer-links">
            <li><Link to="/products?category=Electronics" className="footer-link">Audio & Electronics</Link></li>
            <li><Link to="/products?category=Home" className="footer-link">Modern Home & Living</Link></li>
            <li><Link to="/products?category=Accessories" className="footer-link">Watches & Accessories</Link></li>
            <li><Link to="/products" className="footer-link">All New Arrivals</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="footer-title">Customer Care</h4>
          <ul className="footer-links">
            <li><Link to="/orders" className="footer-link">Track Your Orders</Link></li>
            <li><Link to="/cart" className="footer-link">Shopping Bag</Link></li>
            <li><span className="footer-link" style={{ cursor: 'default' }}>Shipping & Returns Policy</span></li>
            <li><span className="footer-link" style={{ cursor: 'default' }}>Warranty Protection</span></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="footer-title">Contact Us</h4>
          <ul className="footer-links">
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.92rem' }}>
              <Mail size={16} color="var(--accent)" /> support@aurastore.com
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.92rem' }}>
              <Phone size={16} color="var(--accent)" /> +1 (800) 456-7890
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.92rem' }}>
              <MapPin size={16} color="var(--accent)" /> San Francisco, CA
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        &copy; {new Date().getFullYear()} AuraStore Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
