import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AuraStore</h3>
          <p style={{ color: '#94A3B8' }}>Premium products for a premium lifestyle. Experience quality like never before.</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#94A3B8' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#94A3B8' }}>
            <li>support@aurastore.com</li>
            <li>+1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #334155', color: '#64748B' }}>
        &copy; {new Date().getFullYear()} AuraStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
