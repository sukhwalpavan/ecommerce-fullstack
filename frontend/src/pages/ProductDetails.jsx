import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
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
          allProducts.filter(p => p.id !== Number(id) && p.category === data.category).slice(0, 3)
        );
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndRelated();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  if (loading) return <div className="page container" style={{ textAlign: 'center', paddingTop: '3rem' }}>Loading product details...</div>;
  if (!product) return <div className="page container" style={{ textAlign: 'center', paddingTop: '3rem' }}>Product not found.</div>;

  return (
    <div className="page container">
      <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        <ArrowLeft size={16} /> Back to Products
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', marginBottom: '4rem' }}>
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <img 
            src={product.imageUrl || 'https://via.placeholder.com/600x600?text=No+Image'} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: 'var(--accent)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            {product.description}
          </p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Availability: {product.stockQuantity > 0 ? (
                <span style={{ color: 'green', fontWeight: '600' }}>In Stock ({product.stockQuantity} units available)</span>
              ) : (
                <span style={{ color: 'red', fontWeight: '600' }}>Out of Stock</span>
              )}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Truck size={18} /> Free Express Delivery</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={18} /> 1-Year Warranty</span>
          </div>

          {product.stockQuantity > 0 && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input-field"
                style={{ width: '80px', padding: '0.75rem' }}
              >
                {[...Array(Math.min(10, product.stockQuantity)).keys()].map(n => (
                  <option key={n+1} value={n+1}>{n+1}</option>
                ))}
              </select>
              
              <button 
                className="btn btn-accent" 
                style={{ flex: 1, padding: '1rem' }}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Related Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
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
