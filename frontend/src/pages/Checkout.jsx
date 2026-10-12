import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'sonner';
import { CheckCircle2, ShoppingBag, MapPin, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login?redirect=checkout');
    }
  }, [user, navigate]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }

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
      
      const { data } = await api.post('/orders', orderRequest);
      setPlacedOrderId(data?.id || Math.floor(1000 + Math.random() * 9000));
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
      <div className="page container" style={{ maxWidth: '600px', textAlign: 'center', paddingTop: '3rem' }}>
        <div style={{ background: 'white', padding: 'clamp(2rem, 5vw, 3.5rem)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={42} />
          </div>
          <span className="badge badge-success" style={{ marginBottom: '0.75rem' }}>Order Confirmed</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', marginBottom: '0.5rem' }}>Thank You for Your Order!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Your order <strong>#{placedOrderId}</strong> has been received and is being prepared for express delivery.
          </p>
          
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', textAlign: 'left', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              <MapPin size={16} /> Deliver to:
            </div>
            <div style={{ fontWeight: '600', color: 'var(--text-main)', paddingLeft: '1.5rem' }}>
              {address}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/orders')} className="btn btn-primary btn-lg">
              View Order History
            </button>
            <button onClick={() => navigate('/products')} className="btn btn-outline btn-lg">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="page container" style={{ maxWidth: '680px' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '0.25rem' }}>Checkout</h1>
        <p style={{ color: 'var(--text-muted)' }}>Complete your shipping details to place your order.</p>
      </div>
      
      <div style={{ 
        background: 'white', 
        padding: 'clamp(1.5rem, 4vw, 2.5rem)', 
        borderRadius: 'var(--radius-xl)', 
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-md)' 
      }}>
        {/* Order Summary Snapshot */}
        <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem' }}>Order Items ({cart.length})</h2>
            <Link to="/cart" style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '600' }}>Edit Bag</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '180px', overflowY: 'auto' }}>
            {cart.map(item => (
              <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src={item.product.imageUrl} alt="" style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} />
                  <span style={{ fontWeight: '500' }}>{item.quantity}× {item.product.name}</span>
                </div>
                <span style={{ fontWeight: '600' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed var(--card-border)', fontWeight: '800', fontSize: '1.25rem' }}>
            <span>Order Total:</span>
            <span style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Form */}
        <form onSubmit={handleCheckout}>
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}>
              <MapPin size={18} color="var(--accent)" />
              Shipping Address
            </label>
            <textarea 
              className="input-field" 
              rows="3" 
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Apartment, Street address, City, State, Postal Code"
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Payment Simulation Note */}
          <div style={{ 
            background: 'var(--accent-light)', 
            border: '1px solid #C7D2FE',
            padding: '1rem', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.88rem',
            color: '#312E81'
          }}>
            <CreditCard size={20} color="var(--accent)" />
            <div>
              <strong>Payment Method:</strong> Simulated One-Click Order (No credit card required for test mode).
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-accent btn-lg" 
            style={{ width: '100%' }}
            disabled={loading || cart.length === 0}
          >
            {loading ? 'Processing Order...' : `Confirm & Place Order ($${total.toFixed(2)})`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
