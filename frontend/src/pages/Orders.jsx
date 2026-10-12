import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Package, Calendar, MapPin, ArrowRight, Clock, CheckCircle } from 'lucide-react';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=orders');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get(`/orders/user/${user.id}`);
      // Sort orders newest first
      setOrders(data.reverse());
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="page container" style={{ maxWidth: '880px' }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '0.35rem' }}>My Order History</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track past purchases, delivery addresses, and receipts.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Loading your orders...
        </div>
      ) : orders.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem', 
          background: 'white', 
          borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F1F5F9', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Package size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No orders found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
            You haven't placed any orders yet. Discover our latest collections today.
          </p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => (
            <div 
              key={order.id} 
              style={{ 
                background: 'white', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'clamp(1.25rem, 3vw, 1.75rem)', 
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--card-border)'
              }}
            >
              {/* Order Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: '1px solid var(--card-border)', 
                paddingBottom: '1rem',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '1.15rem' }}>Order #{order.id}</span>
                    <span className="badge badge-success">
                      {order.status || 'CONFIRMED'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                    <Calendar size={14} />
                    <span>{new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'block' }}>Total Paid</span>
                  <span style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--primary)' }}>
                    ${Number(order.totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              {order.shippingAddress && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  fontSize: '0.88rem', 
                  color: 'var(--text-muted)', 
                  marginBottom: '1.25rem',
                  background: '#F8FAFC',
                  padding: '0.65rem 0.9rem',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <MapPin size={16} color="var(--accent)" />
                  <span><strong>Shipped to:</strong> {order.shippingAddress}</span>
                </div>
              )}

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {order.items?.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: '#F8FAFC',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      {item.product?.imageUrl ? (
                        <img 
                          src={item.product.imageUrl} 
                          alt="" 
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                        />
                      ) : (
                        <div style={{ width: '48px', height: '48px', background: '#E2E8F0', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Package size={20} color="var(--text-subtle)" />
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{item.product?.name || 'Product'}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Quantity: {item.quantity} × ${Number(item.price).toFixed(2)}</div>
                      </div>
                    </div>

                    <div style={{ fontWeight: '800', fontSize: '1rem' }}>
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
