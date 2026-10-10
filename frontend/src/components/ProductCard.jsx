import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card" style={{ 
      background: 'var(--card-bg)', 
      borderRadius: 'var(--radius-lg)', 
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden',
      transition: 'var(--transition)'
    }}>
      <Link to={`/products/${product.id}`} style={{ display: 'block' }}>
        <div style={{ height: '250px', overflow: 'hidden' }}>
          <img 
            src={product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '600', textTransform: 'uppercase' }}>
            {product.category}
          </span>
          <h3 style={{ margin: '0.5rem 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
              ${product.price.toFixed(2)}
            </span>
            <button 
              onClick={handleAddToCart}
              className="btn btn-accent" 
              style={{ padding: '0.5rem', borderRadius: '50%' }}
              aria-label="Add to cart"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
