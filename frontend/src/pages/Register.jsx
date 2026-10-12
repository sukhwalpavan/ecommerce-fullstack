import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import { UserPlus, Eye, EyeOff, ShoppingBag } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
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
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', marginBottom: '0.35rem' }}>Create Account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Join AuraStore for premium essentials and fast ordering.</p>
        </div>
        
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Alex Morgan"
              required 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

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
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="input-field" 
                placeholder="At least 6 characters"
                required 
                minLength={6}
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '700' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
