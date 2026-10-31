import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight, User, GraduationCap, BookOpen, Camera, Ruler, Weight } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [photo, setPhoto] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Photo 2MB पेक्षा लहान असावा');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('सर्व fields भरा'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = signup(name, email, password, role, photo || undefined, height || undefined, weight || undefined);
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
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: 28 }}>
          📚
        </div>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800 }}>Create Account</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Join SK Career Academy today!</p>
      </div>

      {/* Signup Card */}
      <div style={{ background: 'white', borderRadius: 24, padding: 22, width: '100%', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '85vh', overflowY: 'auto' }}>
        <form onSubmit={handleSignup}>
          {/* Photo Upload */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                width: 80, height: 80, borderRadius: '50%', margin: '0 auto 8px',
                background: photo ? 'transparent' : '#f0f0f5',
                border: '3px dashed #667eea', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', position: 'relative',
              }}
            >
              {photo ? (
                <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <Camera size={28} color="#667eea" />
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileRef.current?.click()} style={{ background: 'none', border: 'none', color: '#667eea', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              {photo ? 'Change Photo' : 'Upload Photo'}
            </button>
          </div>

          {/* Name */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#1a1a3e', marginBottom: 5, display: 'block' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="तुझे नाव टाका"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 38px', border: '2px solid #e0e0e0', borderRadius: 10, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#1a1a3e', marginBottom: 5, display: 'block' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 38px', border: '2px solid #e0e0e0', borderRadius: 10, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#1a1a3e', marginBottom: 5, display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="किमान 4 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 38px 10px 38px', border: '2px solid #e0e0e0', borderRadius: 10, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Height & Weight */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#1a1a3e', marginBottom: 5, display: 'block' }}>Height (cm)</label>
              <div style={{ position: 'relative' }}>
                <Ruler size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="number"
                  placeholder="e.g. 170"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 38px', border: '2px solid #e0e0e0', borderRadius: 10, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#667eea'}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#1a1a3e', marginBottom: 5, display: 'block' }}>Weight (kg)</label>
              <div style={{ position: 'relative' }}>
                <Weight size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="number"
                  placeholder="e.g. 65"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 38px', border: '2px solid #e0e0e0', borderRadius: 10, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#667eea'}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#1a1a3e', marginBottom: 8, display: 'block' }}>Account Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                onClick={() => setRole('student')}
                style={{
                  padding: '10px 8px', borderRadius: 10, border: role === 'student' ? '2px solid #667eea' : '2px solid #e0e0e0',
                  background: role === 'student' ? '#ede9fe' : 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                }}
              >
                <GraduationCap size={20} color={role === 'student' ? '#667eea' : '#999'} style={{ margin: '0 auto 3px', display: 'block' }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: role === 'student' ? '#667eea' : '#666' }}>Student</div>
                <div style={{ fontSize: 9, color: '#999' }}>विद्यार्थी</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                style={{
                  padding: '10px 8px', borderRadius: 10, border: role === 'teacher' ? '2px solid #667eea' : '2px solid #e0e0e0',
                  background: role === 'teacher' ? '#ede9fe' : 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                }}
              >
                <BookOpen size={20} color={role === 'teacher' ? '#667eea' : '#999'} style={{ margin: '0 auto 3px', display: 'block' }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: role === 'teacher' ? '#667eea' : '#666' }}>Teacher</div>
                <div style={{ fontSize: 9, color: '#999' }}>शिक्षक</div>
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '8px 12px', marginBottom: 14, fontSize: 12, color: '#dc2626' }}>
              {error}
            </div>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: 12, borderRadius: 10, border: 'none',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loading ? 'Creating Account...' : <><UserPlus size={18} /> Create Account</>}
          </button>
        </form>

        {/* Login Link */}
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: '#888' }}>
          आधीच Account आहे?{' '}
          <Link to="/login" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none' }}>
            Login करा <ArrowRight size={12} style={{ verticalAlign: 'middle' }} />
          </Link>
        </div>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
        © 2026 SK Career Academy. All rights reserved.
      </p>
    </div>
  );
}
