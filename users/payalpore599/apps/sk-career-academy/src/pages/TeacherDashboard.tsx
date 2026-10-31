import { Link } from 'react-router-dom';
import { Bell, Settings, LogOut, Users, TrendingUp, Award, Target, Search, ChevronRight, BarChart3, BookOpen, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TeacherDashboard() {
  const { user, logout, students } = useAuth();

  const totalStudents = students.length;
  const avgAccuracy = totalStudents ? Math.round(students.reduce((s, st) => s + st.progress.accuracy, 0) / totalStudents) : 0;
  const totalTests = students.reduce((s, st) => s + st.progress.testsGiven, 0);
  const topPerformer = students[0];

  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <div className="header-left">
          <div>
            <h1>Teacher Dashboard</h1>
            <div className="header-subtitle">Welcome, {user?.name} 👋</div>
          </div>
        </div>
        <div className="header-icons">
          <Bell size={22} />
          <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
            <LogOut size={22} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, padding: 16 }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <Users size={24} color="#667eea" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a3e' }}>{totalStudents}</div>
          <div style={{ fontSize: 11, color: '#888' }}>Total Students</div>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <Target size={24} color="#16a34a" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a3e' }}>{avgAccuracy}%</div>
          <div style={{ fontSize: 11, color: '#888' }}>Avg Accuracy</div>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <BookOpen size={24} color="#f59e0b" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a3e' }}>{totalTests}</div>
          <div style={{ fontSize: 11, color: '#888' }}>Total Tests</div>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <Flame size={24} color="#ef4444" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a3e' }}>{topPerformer ? topPerformer.progress.streak : 0}</div>
          <div style={{ fontSize: 11, color: '#888' }}>Top Streak</div>
        </div>
      </div>

      {/* Top Performer */}
      {topPerformer && (
        <div style={{ margin: '0 16px 16px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: 16, padding: 18, color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Award size={32} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, opacity: 0.85 }}>Top Performer</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{topPerformer.name}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>
                {topPerformer.progress.xp} XP • Level {topPerformer.progress.level} • #{topPerformer.progress.rank} Rank
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Students List */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e' }}>
            <BarChart3 size={18} color="#667eea" style={{ verticalAlign: 'middle', marginRight: 6 }} />
            Student Progress
          </h3>
          <span style={{ fontSize: 12, color: '#888' }}>{students.length} students</span>
        </div>

        {students.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
            <Users size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div>अजून कोणीही Student register केले नाही</div>
          </div>
        )}

        {students.map((student, idx) => (
          <div key={student.id} style={{
            background: 'white', borderRadius: 14, padding: 14, marginBottom: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            {student.photo ? (
              <img src={student.photo} alt={student.name} style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
            ) : (
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: idx === 0 ? '#f59e0b' : idx === 1 ? '#9ca3af' : idx === 2 ? '#d97706' : '#667eea',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0,
              }}>
                {student.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>{student.name}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{student.email}</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 11, color: '#667eea', fontWeight: 600 }}>{student.progress.testsGiven} tests</span>
                <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>{student.progress.accuracy}% accuracy</span>
                <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>Lv.{student.progress.level}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#667eea' }}>{student.progress.xp}</div>
              <div style={{ fontSize: 10, color: '#888' }}>XP</div>
            </div>
          </div>
        ))}
      </div>

      {/* Subject-wise Performance */}
      {students.length > 0 && (
        <div style={{ padding: '0 16px 16px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 12 }}>
            <TrendingUp size={18} color="#667eea" style={{ verticalAlign: 'middle', marginRight: 6 }} />
            Subject-wise Average
          </h3>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            {Object.entries(
              students.reduce((acc, st) => {
                Object.entries(st.progress.subjectScores).forEach(([subject, score]) => {
                  if (!acc[subject]) acc[subject] = { total: 0, count: 0 };
                  acc[subject].total += score;
                  acc[subject].count += 1;
                });
                return acc;
              }, {} as Record<string, { total: number; count: number }>)
            ).map(([subject, data]) => {
              const avg = Math.round(data.total / data.count);
              return (
                <div key={subject} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a3e' }}>{subject}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: avg >= 60 ? '#16a34a' : avg >= 40 ? '#f59e0b' : '#ef4444' }}>{avg}%</span>
                  </div>
                  <div style={{ height: 8, background: '#f0f0f0', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 10,
                      background: avg >= 60 ? '#16a34a' : avg >= 40 ? '#f59e0b' : '#ef4444',
                      width: `${avg}%`, transition: 'width 0.5s',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
