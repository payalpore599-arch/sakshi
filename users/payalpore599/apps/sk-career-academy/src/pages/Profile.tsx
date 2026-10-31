import { Link } from 'react-router-dom';
import { Trophy, Flame, Zap, Target, CheckCircle, XCircle, Timer, GraduationCap, Shield, Menu, Bell, Settings, ArrowRight, Camera, Ruler, Weight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const streakDays = [
    { day: 'M', label: 'Mon', done: true },
    { day: 'T1', label: 'Tue', done: true },
    { day: 'W', label: 'Wed', done: true },
    { day: 'T2', label: 'Thu', done: true },
    { day: 'F', label: 'Fri', done: false },
    { day: 'S1', label: 'Sat', done: false },
    { day: 'S2', label: 'Sun', done: false },
  ];

  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <div className="header-left">
          <Menu className="hamburger" size={24} />
          <div>
            <h1>My Profile</h1>
          </div>
        </div>
        <div className="header-icons">
          <Bell size={22} />
          <Settings size={22} />
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-header-card">
        {user?.photo ? (
          <img src={user.photo} alt="Profile" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div className="profile-avatar">{user?.name?.charAt(0)?.toUpperCase() || '?'}</div>
        )}
        <div className="profile-info">
          <div className="profile-name">
            {user?.name || 'User'} <CheckCircle size={16} color="#3b82f6" />
          </div>
          <div className="profile-role">{user?.role === 'teacher' ? 'Teacher' : 'Maha Police Aspirant'}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            {user?.height && (
              <span style={{ fontSize: 11, color: '#667eea', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Ruler size={12} /> {user.height} cm
              </span>
            )}
            {user?.weight && (
              <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Weight size={12} /> {user.weight} kg
              </span>
            )}
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="profile-xp-bar">
        <div className="profile-xp-fill" style={{ width: '87%' }}></div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="profile-stat-card">
          <Trophy className="psc-icon" size={24} color="#f59e0b" />
          <div className="psc-value">#1</div>
          <div className="psc-label">Current Rank</div>
        </div>
        <div className="profile-stat-card">
          <Flame className="psc-icon" size={24} color="#ef4444" />
          <div className="psc-value">6 Days</div>
          <div className="psc-label">Day Streak</div>
        </div>
        <div className="profile-stat-card">
          <Zap className="psc-icon" size={24} color="#f59e0b" />
          <div className="psc-value">19519 XP</div>
          <div className="psc-label">Current XP</div>
        </div>
      </div>

      {/* Grid: Level Progress + Today's Goal */}
      <div className="profile-grid">
        <div className="profile-grid-card">
          <h4>Level Progress</h4>
          <div className="level-progress">
            <div className="level-circle">9</div>
            <div className="level-info">
              <div className="li-xp">19519 / 22500 XP</div>
              <div className="li-next">Next Level</div>
              <div className="li-hint">पुढील लेव्हल अनलॉक करण्यासाठी सलग चूकले करा! 🚀</div>
            </div>
          </div>
        </div>
        <div className="profile-grid-card">
          <h4>Today's Goal</h4>
          <div className="today-goal">
            <div className="tg-value">0 / 100</div>
            <div className="tg-label">Questions</div>
            <div style={{ fontSize: 28, textAlign: 'right', marginTop: 8 }}>
              <Target size={28} color="#667eea" />
            </div>
          </div>
          <button className="continue-btn">Continue Practice</button>
        </div>
      </div>

      {/* Today's Study */}
      <div style={{ padding: '0 16px', marginBottom: 12 }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a3e', marginBottom: 10 }}>Today's Study</h4>
        <div className="todays-study">
          <div className="study-stat">
            <GraduationCap className="ss-icon" size={20} color="#667eea" />
            <div className="ss-value">0</div>
            <div className="ss-label">Questions Solved</div>
          </div>
          <div className="study-stat">
            <CheckCircle className="ss-icon" size={20} color="#16a34a" />
            <div className="ss-value">0</div>
            <div className="ss-label">Correct</div>
          </div>
          <div className="study-stat">
            <XCircle className="ss-icon" size={20} color="#ef4444" />
            <div className="ss-value">0</div>
            <div className="ss-label">Wrong</div>
          </div>
          <div className="study-stat">
            <Timer className="ss-icon" size={20} color="#f59e0b" />
            <div className="ss-value">1m</div>
            <div className="ss-label">Study Time</div>
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className="streak-card">
        <div className="streak-header">
          <Flame className="streak-fire" size={28} color="#f59e0b" />
          <div>
            <div className="streak-days">6 Days</div>
            <div className="streak-label">Current Streak</div>
          </div>
        </div>
        <div className="streak-days-row">
          {streakDays.map((d) => (
            <div key={d.day} className="streak-day">
              <div className={`streak-day-icon ${d.done ? 'done' : 'pending'}`}>
                {d.done ? <CheckCircle size={16} /> : <Zap size={16} />}
              </div>
              <span className="streak-day-label">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="streak-footer">
          <div className="streak-footer-item">
            <div className="sfi-label">Streak Saver</div>
            <div className="sfi-value"><Shield size={14} color="#667eea" /> 2 of 3</div>
            <div className="streak-saver-link">GET STREAK SAVER</div>
          </div>
          <div className="streak-footer-item">
            <div className="sfi-label">Longest Streak</div>
            <div className="sfi-value"><Flame size={14} color="#f59e0b" /> 7 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}
