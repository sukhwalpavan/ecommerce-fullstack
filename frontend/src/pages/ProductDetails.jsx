import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw, Check, Star } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        
        // Fetch related products in same category
        const { data: allProducts } = await api.get('/products');
        setRelated(
          allProducts.filter(p => p.id !== Number(id) && p.category === data.category).slice(0, 4)
        );
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndRelated();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="page container" style={{ textAlign: 'center', paddingTop: '4rem', color: 'var(--text-muted)' }}>
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Product Not Found</h2>
        <Link to="/products" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="page container">
      {/* Back button */}
      <Link 
        to="/products" 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1.5rem', alignSelf: 'flex-start' }}
      >
        <ArrowLeft size={16} /> Back to Products
      </Link>
      
      {/* Product Detail Card */}
      <div className="product-details-grid">
        {/* Left: Gallery Image */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#F1F5F9', border: '1px solid var(--card-border)' }}>
          <img 
            src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
          />
        </div>
        
        {/* Right: Info & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-accent">
              {product.category || 'Collection'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontSize: '0.85rem', fontWeight: '600' }}>
              <Star size={15} fill="#F59E0B" stroke="#F59E0B" />
              <span>4.9 (42 reviews)</span>
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.2' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>
              ${Number(product.price).toFixed(2)}
            </span>
            <span style={{ fontSize: '1rem', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>
              ${(Number(product.price) * 1.2).toFixed(2)}
            </span>
            <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
              Save 20%
            </span>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
            {product.description || 'Crafted with premium grade materials designed for durability, elevated performance, and modern everyday lifestyle.'}
          </p>
          
          {/* Availability Status */}
          <div style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Availability:</span>
            {product.stockQuantity > 0 ? (
              <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Check size={14} /> In Stock ({product.stockQuantity} units available)
              </span>
            ) : (
              <span className="badge" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
                Out of Stock
              </span>
            )}
          </div>

          {/* Add to Cart Control Bar */}
          {product.stockQuantity > 0 && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>Qty:</span>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="input-field"
                  style={{ width: '80px', padding: '0.75rem', fontWeight: '600' }}
                >
                  {[...Array(Math.min(10, product.stockQuantity)).keys()].map(n => (
                    <option key={n+1} value={n+1}>{n+1}</option>
                  ))}
                </select>
              </div>
              
              <button 
                className="btn btn-accent btn-lg" 
                style={{ flex: 1, minWidth: '200px' }}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          )}

          {/* Trust Value Propositions */}
          <div style={{ 
            borderTop: '1px solid var(--card-border)', 
            paddingTop: '1.5rem', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '1rem', 
            color: 'var(--text-muted)', 
            fontSize: '0.88rem' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Truck size={18} color="var(--accent)" />
              <span>Free Express Delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={18} color="var(--accent)" />
              <span>1-Year Official Warranty</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <RotateCcw size={18} color="var(--accent)" />
              <span>30-Day Hassle-Free Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <div style={{ marginTop: '4rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span className="badge badge-accent" style={{ marginBottom: '0.5rem' }}>You may also like</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)' }}>Related Products</h2>
          </div>
          <div className="product-grid">
            {related.map(relProduct => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
