import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="page container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <ShoppingBag size={64} style={{ margin: '0 auto 2rem auto', color: 'var(--text-muted)' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>Your Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cart.map((item) => (
            <div key={item.product.id} style={{ 
              display: 'flex', gap: '1.5rem', background: 'white', padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)'
            }}>
              <img 
                src={item.product.imageUrl || 'https://via.placeholder.com/150'} 
                alt={item.product.name} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.product.name}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>${item.product.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ color: 'red', padding: '0.5rem' }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Qty:</span>
                  <select 
                    className="input-field" 
                    style={{ width: '70px', padding: '0.5rem' }}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                  >
                    {[...Array(Math.min(10, item.product.stockQuantity)).keys()].map(n => (
                      <option key={n+1} value={n+1}>{n+1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ 
          background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', 
          boxShadow: 'var(--shadow-md)', position: 'sticky', top: '100px'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <span>Subtotal</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: '700', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          
          <button 
            className="btn btn-accent" 
            style={{ width: '100%', padding: '1rem' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
