import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="page container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>Create Account</h1>
        
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
            <input 
              type="text" 
              className="input-field" 
              required 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              className="input-field" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              className="input-field" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}>
            Sign Up
          </button>
        </form>
        
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
