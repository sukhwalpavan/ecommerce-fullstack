import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <ShoppingBag className="text-accent" />
          <span>AuraStore</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Shop</Link>
          {user && <Link to="/orders" className="nav-link">My Orders</Link>}
        </nav>
        <div className="nav-actions">
          <Link to="/cart" className="cart-icon-wrapper">
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Hi, {user.name}</span>
              <button onClick={handleLogout} className="text-muted hover:text-primary">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <User size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
