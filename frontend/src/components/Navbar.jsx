import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X, Package, Sparkles } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <div className="nav-logo-icon">
            <ShoppingBag size={20} />
          </div>
          <span>AuraStore</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Shop
          </NavLink>
          {user && (
            <NavLink 
              to="/orders" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              My Orders
            </NavLink>
          )}
        </nav>

        {/* Action Buttons (Cart, Auth, Mobile Toggle) */}
        <div className="nav-actions">
          <Link to="/cart" className="cart-icon-wrapper" aria-label="Cart" onClick={closeMenu}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <div className="nav-user-desktop">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    background: '#F1F5F9',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.88rem',
                    fontWeight: '600'
                  }}
                >
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name?.split(' ')[0] || 'Account'}
                  </span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="btn-icon" 
                  title="Log Out"
                  aria-label="Log Out"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm" onClick={closeMenu}>
                <User size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <Link 
            to="/" 
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <Sparkles size={18} /> Home
          </Link>
          <Link 
            to="/products" 
            className={`mobile-nav-link ${location.pathname === '/products' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <ShoppingBag size={18} /> Shop Products
          </Link>
          {user && (
            <Link 
              to="/orders" 
              className={`mobile-nav-link ${location.pathname === '/orders' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <Package size={18} /> My Orders
            </Link>
          )}
          
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {user ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Signed in as <strong>{user.name}</strong></span>
                <button onClick={handleLogout} className="btn btn-danger btn-sm">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <Link to="/login" className="btn btn-primary" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline" onClick={closeMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
