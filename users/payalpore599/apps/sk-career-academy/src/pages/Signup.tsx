import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight, User, GraduationCap, BookOpen } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('सर्व fields भरा'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = signup(name, email, password, role);
      setLoading(false);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Signup failed');
      }
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a3e 0%, #2d1b69 50%, #4a2d8a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 70, height: 70, borderRadius: 18, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 32 }}>
          📚
        </div>
        <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800 }}>Create Account</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Join SK Career Academy today!</p>
      </div>

      {/* Signup Card */}
      <div style={{ background: 'white', borderRadius: 24, padding: 24, width: '100%', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <form onSubmit={handleSignup}>
          {/* Name */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a3e', marginBottom: 6, display: 'block' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#999" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="तुझे नाव टाका"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '11px 14px 11px 42px', border: '2px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a3e', marginBottom: 6, display: 'block' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#999" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '11px 14px 11px 42px', border: '2px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a3e', marginBottom: 6, display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#999" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="किमान 4 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '11px 42px 11px 42px', border: '2px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#1a1a3e', marginBottom: 8, display: 'block' }}>Account Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                onClick={() => setRole('student')}
                style={{
                  padding: '12px 10px', borderRadius: 12, border: role === 'student' ? '2px solid #667eea' : '2px solid #e0e0e0',
                  background: role === 'student' ? '#ede9fe' : 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                }}
              >
                <GraduationCap size={24} color={role === 'student' ? '#667eea' : '#999'} style={{ margin: '0 auto 4px', display: 'block' }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: role === 'student' ? '#667eea' : '#666' }}>Student</div>
                <div style={{ fontSize: 10, color: '#999' }}>विद्यार्थी</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                style={{
                  padding: '12px 10px', borderRadius: 12, border: role === 'teacher' ? '2px solid #667eea' : '2px solid #e0e0e0',
                  background: role === 'teacher' ? '#ede9fe' : 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                }}
              >
                <BookOpen size={24} color={role === 'teacher' ? '#667eea' : '#999'} style={{ margin: '0 auto 4px', display: 'block' }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: role === 'teacher' ? '#667eea' : '#666' }}>Teacher</div>
                <div style={{ fontSize: 10, color: '#999' }}>शिक्षक</div>
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>
              {error}
            </div>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: 14, borderRadius: 12, border: 'none',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white', fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loading ? 'Creating Account...' : <><UserPlus size={20} /> Create Account</>}
          </button>
        </form>

        {/* Login Link */}
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 14, color: '#888' }}>
          आधीच Account आहे?{' '}
          <Link to="/login" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none' }}>
            Login करा <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
          </Link>
        </div>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 20, textAlign: 'center' }}>
        © 2026 SK Career Academy. All rights reserved.
      </p>
    </div>
  );
}
