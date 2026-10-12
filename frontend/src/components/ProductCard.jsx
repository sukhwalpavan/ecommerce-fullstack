import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      {/* Product Image & Badges */}
      <Link to={`/products/${product.id}`} className="product-card-image-box" aria-label={product.name}>
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'} 
          alt={product.name} 
          className="product-card-image"
          loading="lazy"
        />
        <span className="product-card-badge">
          {product.category || 'Featured'}
        </span>
      </Link>

      {/* Card Details */}
      <div className="product-card-body">
        {/* Rating & Stock */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontWeight: '600' }}>
            <Star size={14} fill="#F59E0B" stroke="#F59E0B" />
            <span>4.9</span>
          </div>
          <span style={{ color: product.stockQuantity > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: '600', fontSize: '0.75rem' }}>
            {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="product-card-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {/* Description snippet */}
        {product.description && (
          <p className="product-card-desc">
            {product.description}
          </p>
        )}

        {/* Card Footer: Aligned Price & Add To Cart Button */}
        <div className="product-card-footer">
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', lineHeight: 1 }}>Price</span>
            <span className="product-card-price">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button 
            onClick={handleAddToCart}
            className="product-card-btn" 
            aria-label={`Add ${product.name} to cart`}
            disabled={product.stockQuantity <= 0}
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
