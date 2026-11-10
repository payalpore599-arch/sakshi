import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, ClipboardList, Calendar, TrendingUp, Award, LogOut, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout, allUsers, students, quizResults, teacherAttendance, toggleTeacherAttendance } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'teachers' | 'students' | 'reports' | 'teacher-att'>('overview');

  const teachers = allUsers.filter(u => u.role === 'teacher');
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="app-header">
        <div className="header-left">
          <div>
            <h1>👑 Admin Dashboard</h1>
            <div className="header-subtitle">Welcome, {user?.name}!</div>
          </div>
        </div>
        <div className="header-icons">
          <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
            <LogOut size={22} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, padding: '12px 16px', overflowX: 'auto' }}>
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'teachers', label: 'Teachers', icon: Users },
          { id: 'students', label: 'Students', icon: Users },
          { id: 'teacher-att', label: 'T. Attendance', icon: Calendar },
          { id: 'reports', label: 'Reports', icon: TrendingUp },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '8px 14px', borderRadius: 20, border: '2px solid',
              borderColor: activeTab === tab.id ? '#667eea' : '#e0e0e0',
              background: activeTab === tab.id ? '#ede9fe' : 'white',
              color: activeTab === tab.id ? '#667eea' : '#666',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
              <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <Users size={24} color="#667eea" style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a3e' }}>{students.length}</div>
                <div style={{ fontSize: 11, color: '#888' }}>Total Students</div>
              </div>
              <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <BookOpen size={24} color="#16a34a" style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a3e' }}>{teachers.length}</div>
                <div style={{ fontSize: 11, color: '#888' }}>Total Teachers</div>
              </div>
              <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <ClipboardList size={24} color="#f59e0b" style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a3e' }}>{quizResults.length}</div>
                <div style={{ fontSize: 11, color: '#888' }}>Total Tests</div>
              </div>
              <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <Calendar size={24} color="#ef4444" style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a3e' }}>{Object.keys(teacherAttendance).length}</div>
                <div style={{ fontSize: 11, color: '#888' }}>Teacher Attendance</div>
              </div>
            </div>

            {/* Top Performer */}
            {students.length > 0 && (
              <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: 16, padding: 18, color: 'white', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Award size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, opacity: 0.85 }}>Top Performer</div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{students[0].name}</div>
                    <div style={{ fontSize: 12, opacity: 0.85 }}>
                      {students[0].progress.xp} XP • Level {students[0].progress.level} • #{students[0].progress.rank} Rank
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* TEACHERS */}
        {activeTab === 'teachers' && (
          <>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 12 }}>
              👥 All Teachers ({teachers.length})
            </h3>
            {teachers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                <Users size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                <div>अजून कोणीही Teacher register केले नाही</div>
              </div>
            ) : teachers.map((t) => {
              const ta = teacherAttendance[t.email] || {};
              const pd = Object.values(ta).filter(x => x === 'present').length;
              const ad = Object.values(ta).filter(x => x === 'absent').length;
              const td = Object.keys(ta).length;
              const pct = td > 0 ? Math.round((pd / td) * 100) : 0;
              return (
                <div key={t.id} style={{ background: 'white', borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#667eea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: '#888' }}>{t.email} {t.mobile ? `| ${t.mobile}` : ''}</div>
                      <div style={{ fontSize: 11, color: '#667eea', fontWeight: 600, marginTop: 4 }}>
                        Attendance: {pd} Present / {ad} Absent ({pct}%)
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* STUDENTS */}
        {activeTab === 'students' && (
          <>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 12 }}>
              👨‍🎓 All Students ({students.length})
            </h3>
            {students.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                <Users size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                <div>अजून कोणीही Student register केले नाही</div>
              </div>
            ) : students.map((s, idx) => {
              const sr = quizResults.filter(r => r.email === s.email);
              const av = sr.length > 0 ? Math.round(sr.reduce((sm, r) => sm + r.score, 0) / sr.length) : 0;
              return (
                <div key={s.id} style={{ background: 'white', borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: idx === 0 ? '#f59e0b' : idx === 1 ? '#9ca3af' : idx === 2 ? '#d97706' : '#667eea',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0,
                  }}>
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>{s.email}</div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: '#667eea', fontWeight: 600 }}>{sr.length} tests</span>
                      <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>{av}% avg</span>
                      <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>Lv.{s.progress.level}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#667eea' }}>{s.progress.xp}</div>
                    <div style={{ fontSize: 10, color: '#888' }}>XP</div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* TEACHER ATTENDANCE */}
        {activeTab === 'teacher-att' && (
          <>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 4 }}>
              📅 Mark Teacher Attendance
            </h3>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>
              {new Date().toLocaleDateString('mr-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p style={{ fontSize: 12, color: '#667eea', marginBottom: 12 }}>Click to toggle: Present ✅ ↔ Absent ❌</p>

            {teachers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                <Users size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                <div>कोणतेही Teacher नाहीत</div>
              </div>
            ) : teachers.map(t => {
              const ta = teacherAttendance[t.email] || {};
              const status = ta[today] || 'none';
              const label = status === 'present' ? '✅ Present' : status === 'absent' ? '❌ Absent' : '⚪ Not Marked';
              return (
                <div
                  key={t.id}
                  className={`attendance-day ${status}`}
                  onClick={() => toggleTeacherAttendance(t.email, today)}
                >
                  <strong>{t.name}</strong> ({t.email})
                  <br /><small>{label}</small>
                </div>
              );
            })}
          </>
        )}

        {/* REPORTS */}
        {activeTab === 'reports' && (
          <>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 12 }}>
              📊 Full Reports
            </h3>
            {quizResults.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                <TrendingUp size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                <div>अजून कोणतेही test results नाहीत</div>
              </div>
            ) : students.map(s => {
              const sr = quizResults.filter(r => r.email === s.email);
              if (sr.length === 0) return null;
              const subjectStats: Record<string, { total: number; count: number }> = {};
              sr.forEach(r => {
                if (!subjectStats[r.subject]) subjectStats[r.subject] = { total: 0, count: 0 };
                subjectStats[r.subject].total += r.score;
                subjectStats[r.subject].count += 1;
              });
              return (
                <div key={s.id} style={{ background: 'white', borderRadius: 14, padding: 14, marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e', marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 10 }}>{s.email}</div>
                  {Object.entries(subjectStats).map(([subj, data]) => {
                    const avg = Math.round(data.total / data.count);
                    return (
                      <div key={subj} style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a3e' }}>{subj}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: avg >= 60 ? '#16a34a' : avg >= 40 ? '#f59e0b' : '#ef4444' }}>{avg}%</span>
                        </div>
                        <div style={{ height: 6, background: '#f0f0f0', borderRadius: 10, overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: 10, width: `${avg}%`, background: avg >= 60 ? '#16a34a' : avg >= 40 ? '#f59e0b' : '#ef4444', transition: 'width 0.5s' }} />
                        </div>
                        <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{data.count} tests</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
