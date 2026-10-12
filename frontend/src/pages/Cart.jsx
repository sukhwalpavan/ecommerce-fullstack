import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="page container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F1F5F9', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <ShoppingBag size={40} />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Your shopping bag is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '420px', margin: '0 auto 2rem' }}>
          Looks like you haven't added any premium essentials to your bag yet.
        </p>
        <Link to="/products" className="btn btn-primary btn-lg">
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="page container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '0.25rem' }}>Your Shopping Bag</h1>
        <p style={{ color: 'var(--text-muted)' }}>Review your selected items before proceeding to checkout.</p>
      </div>
      
      <div className="cart-layout">
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map((item) => (
            <div key={item.product.id} className="cart-item-card">
              <Link to={`/products/${item.product.id}`} style={{ flexShrink: 0 }}>
                <img 
                  src={item.product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'} 
                  alt={item.product.name} 
                  style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}
                />
              </Link>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div>
                    <span className="badge badge-accent" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                      {item.product.category || 'Product'}
                    </span>
                    <Link to={`/products/${item.product.id}`}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.3' }}>
                        {item.product.name}
                      </h3>
                    </Link>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      ${Number(item.product.price).toFixed(2)} each
                    </span>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="btn-icon btn-danger"
                    title="Remove item"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Quantity and Line Total Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--card-border)', borderRadius: 'var(--radius-md)', background: '#F8FAFC' }}>
                    <button 
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      style={{ padding: '0.4rem 0.6rem', color: 'var(--text-main)' }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ padding: '0 0.75rem', fontWeight: '700', fontSize: '0.95rem' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, Math.min(item.product.stockQuantity || 10, item.quantity + 1))}
                      style={{ padding: '0.4rem 0.6rem', color: 'var(--text-main)' }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div style={{ fontWeight: '800', fontSize: '1.15rem', color: 'var(--primary)' }}>
                    ${(Number(item.product.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5rem' }}>
            <Link to="/products" className="btn btn-ghost btn-sm" style={{ color: 'var(--accent)' }}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary Sidebar */}
        <div style={{ 
          background: 'white', 
          padding: '1.75rem', 
          borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-md)', 
          position: 'sticky', 
          top: '90px'
        }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
            Order Summary
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>${total.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            <span>Estimated Shipping</span>
            <span style={{ color: 'var(--success)', fontWeight: '600' }}>FREE</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            <span>Estimated Tax</span>
            <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>$0.00</span>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '1.75rem', 
            fontSize: '1.3rem', 
            fontWeight: '800', 
            borderTop: '1px solid var(--card-border)', 
            paddingTop: '1rem',
            color: 'var(--primary)'
          }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            className="btn btn-accent btn-lg" 
            style={{ width: '100%', marginBottom: '1rem' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>
            <ShieldCheck size={16} color="var(--success)" />
            <span>Encrypted 256-bit Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
