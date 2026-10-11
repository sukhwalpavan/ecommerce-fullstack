import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login?redirect=checkout');
    }
  }, [user, navigate]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const orderRequest = {
        userId: user.id,
        shippingAddress: address,
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      };
      
      await api.post('/orders', orderRequest);
      setSuccess(true);
      clearCart();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <CheckCircle size={64} style={{ margin: '0 auto 2rem auto', color: 'green' }} />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Order Placed Successfully!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Thank you for shopping with us.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => navigate('/orders')} className="btn btn-primary">View My Orders</button>
          <button onClick={() => navigate('/products')} className="btn btn-outline">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page container" style={{ maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>Checkout</h1>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Order Summary</h2>
          {cart.map(item => (
            <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{item.quantity}x {item.product.name}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontWeight: '700', fontSize: '1.1rem' }}>
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleCheckout}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Shipping Address</label>
            <textarea 
              className="input-field" 
              rows="4" 
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full shipping address"
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-accent" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={loading || cart.length === 0}
          >
            {loading ? 'Processing...' : 'Place Order (Simulated)'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
