import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AttendancePage() {
  const { user, attendance } = useAuth();
  const myAtt = user ? (attendance[user.email] || {}) : {};
  const presentDays = Object.values(myAtt).filter(x => x === 'present').length;
  const absentDays = Object.values(myAtt).filter(x => x === 'absent').length;
  const totalDays = Object.keys(myAtt).length;
  const pct = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  // Get sorted dates
  const dates = Object.keys(myAtt).sort().reverse();

  return (
    <div>
      <div className="app-header">
        <div className="header-left">
          <Link to="/" className="back-btn"><ArrowRight size={22} style={{ transform: 'rotate(180deg)' }} /></Link>
          <div>
            <h1>My Attendance</h1>
            <div className="header-subtitle">Attendance Record</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          <div className="stat-box">
            <div className="stat-number" style={{ color: '#16a34a' }}>{presentDays}</div>
            <div className="stat-label">Present</div>
          </div>
          <div className="stat-box">
            <div className="stat-number" style={{ color: '#ef4444' }}>{absentDays}</div>
            <div className="stat-label">Absent</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{pct}%</div>
            <div className="stat-label">Attendance %</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: '#888' }}>Overall Attendance</span>
            <span style={{ fontWeight: 700, color: '#1a1a3e' }}>{pct}%</span>
          </div>
          <div className="progress-bar" style={{ height: 20 }}>
            <div className="progress-bar-fill" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #11998e, #38ef7d)' }}>
              <span style={{ fontSize: 11, color: 'white', fontWeight: 700 }}>{pct}%</span>
            </div>
          </div>
        </div>

        {/* History */}
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 12 }}>
          <Calendar size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
          Attendance History
        </h3>

        {dates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
            <Calendar size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div>अजून attendance record नाही</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Teacher लवकरच attendance mark करतील</div>
          </div>
        ) : (
          dates.map(date => {
            const status = myAtt[date];
            const d = new Date(date);
            const dayName = d.toLocaleDateString('mr-IN', { weekday: 'long' });
            const dateStr = d.toLocaleDateString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' });
            return (
              <div key={date} className={`attendance-record ${status}`}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>{dayName}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{dateStr}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {status === 'present' ? (
                    <><CheckCircle size={18} color="#16a34a" /><span style={{ color: '#16a34a', fontWeight: 600, fontSize: 13 }}>Present</span></>
                  ) : (
                    <><XCircle size={18} color="#ef4444" /><span style={{ color: '#ef4444', fontWeight: 600, fontSize: 13 }}>Absent</span></>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
