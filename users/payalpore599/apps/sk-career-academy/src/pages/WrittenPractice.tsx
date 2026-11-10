import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PenTool, Save, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function WrittenPracticePage() {
  const { user, writtenPractice, addWrittenEntry } = useAuth();
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const myEntries = writtenPractice.filter(p => p.email === user?.email);

  const handleSave = () => {
    if (!notes.trim() || !user) return;
    addWrittenEntry({
      email: user.email,
      name: user.name,
      notes: notes.trim(),
      date: new Date().toISOString(),
    });
    setNotes('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="app-header">
        <div className="header-left">
          <Link to="/" className="back-btn"><ArrowRight size={22} style={{ transform: 'rotate(180deg)' }} /></Link>
          <div>
            <h1>Written Practice</h1>
            <div className="header-subtitle">Log your daily practice</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
          <div className="stat-box">
            <div className="stat-number">{myEntries.length}</div>
            <div className="stat-label">Total Entries</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{myEntries.filter(e => {
              const d = new Date(e.date);
              const today = new Date();
              return d.toDateString() === today.toDateString();
            }).length}</div>
            <div className="stat-label">Today</div>
          </div>
        </div>

        {/* New Entry */}
        <div className="test-card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <PenTool size={18} color="#667eea" />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>New Practice Entry</span>
          </div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="आज काय अभ्यास केला ते लिहा..."
            rows={5}
            style={{
              width: '100%', padding: 12, border: '2px solid #e0e0e0', borderRadius: 10,
              fontSize: 14, resize: 'vertical', outline: 'none', fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = '#667eea'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
          <button
            onClick={handleSave}
            disabled={!notes.trim()}
            style={{
              width: '100%', padding: 12, borderRadius: 10, border: 'none',
              background: notes.trim() ? 'linear-gradient(135deg, #11998e, #38ef7d)' : '#ccc',
              color: 'white', fontSize: 14, fontWeight: 700, cursor: notes.trim() ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginTop: 10,
            }}
          >
            {saved ? <><Save size={16} /> Saved!</> : <><Save size={16} /> Save Entry</>}
          </button>
        </div>

        {/* Previous Entries */}
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 12 }}>
          <BookOpen size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
          Previous Entries
        </h3>

        {myEntries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
            <PenTool size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div>अजून कोणतीही entry नाही</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>वरच्या box मध्ये अभ्यास लिहा!</div>
          </div>
        ) : (
          [...myEntries].reverse().map((entry, idx) => (
            <div key={idx} className="test-card" style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>
                {new Date(entry.date).toLocaleString('mr-IN', {
                  day: 'numeric', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
              </div>
              <div style={{ fontSize: 14, color: '#1a1a3e', lineHeight: 1.5 }}>
                {entry.notes}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
