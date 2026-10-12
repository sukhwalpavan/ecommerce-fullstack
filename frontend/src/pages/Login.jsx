import { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import { LogIn, Eye, EyeOff, ShoppingBag } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      const redirect = searchParams.get('redirect') || '/';
      navigate(redirect);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ 
        background: 'white', 
        padding: 'clamp(1.75rem, 5vw, 2.75rem)', 
        borderRadius: 'var(--radius-xl)', 
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-lg)', 
        width: '100%', 
        maxWidth: '440px' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '54px', 
            height: '54px', 
            borderRadius: 'var(--radius-lg)', 
            background: 'var(--accent)', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1rem',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}>
            <ShoppingBag size={28} />
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', marginBottom: '0.35rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Sign in to access your bag, orders, and account.</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="name@example.com"
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Password</label>
            </div>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="input-field" 
                placeholder="Enter your password"
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingRight: '2.5rem' }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%', marginBottom: '1.25rem' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent)', fontWeight: '700' }}>Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
