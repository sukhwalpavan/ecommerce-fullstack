import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Package, Calendar, MapPin, ArrowRight } from 'lucide-react';

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
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="page container" style={{ maxWidth: '850px' }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>My Orders</h1>
        <p style={{ color: 'var(--text-muted)' }}>View and track all your previous purchases</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem', 
          background: 'white', 
          borderRadius: 'var(--radius-lg)', 
          boxShadow: 'var(--shadow-sm)' 
        }}>
          <Package size={64} style={{ margin: '0 auto 1.5rem', color: 'var(--text-muted)' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No orders found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't placed any orders yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => (
            <div 
              key={order.id} 
              style={{ 
                background: 'white', 
                borderRadius: 'var(--radius-lg)', 
                padding: '1.5rem', 
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-color)'
              }}
            >
              {/* Order Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: '1px solid var(--border-color)', 
                paddingBottom: '1rem',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Order #{order.id}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    <Calendar size={14} />
                    <span>{new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    display: 'inline-block',
                    background: '#e0f2fe', 
                    color: '#0369a1', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.85rem', 
                    fontWeight: '600' 
                  }}>
                    {order.status || 'CONFIRMED'}
                  </span>
                  <div style={{ fontWeight: '700', fontSize: '1.2rem', marginTop: '0.25rem', color: 'var(--text-main)' }}>
                    ${order.totalAmount?.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {order.shippingAddress && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  <MapPin size={16} />
                  <span><strong>Shipping To:</strong> {order.shippingAddress}</span>
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
                      background: '#f8fafc',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {item.product?.imageUrl && (
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{item.product?.name || 'Product'}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Quantity: {item.quantity}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: '600' }}>
                      ${(item.price * item.quantity).toFixed(2)}
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
