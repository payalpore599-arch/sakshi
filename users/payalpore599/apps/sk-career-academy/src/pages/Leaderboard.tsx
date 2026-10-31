import { Link } from 'react-router-dom';
import { Trophy, Crown, Target, TrendingUp, ArrowRight, Bell, Settings, Map, Building2, MapPin, Flame } from 'lucide-react';

const podiumData = [
  { rank: 2, name: 'Aaditya Patil', location: 'पुणे जिल्हा', xp: 6051, streak: 1, color: '#3b82f6', initial: 'A' },
  { rank: 1, name: 'Rahul Deshmukh', location: 'पुणे जिल्हा', xp: 19519, streak: 5, color: '#667eea', initial: 'RD' },
  { rank: 3, name: 'Vikram Jagtap', location: 'पुणे जिल्हा', xp: 3208, streak: 2, color: '#ec4899', initial: 'V' },
];

const tableData = [
  { rank: 4, name: 'Saurabh More', xp: 3198 },
  { rank: 5, name: 'Nikhil Pawar', xp: 2786 },
  { rank: 6, name: 'Mayur Bhosale', xp: 2543 },
];

export default function LeaderboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <div className="header-left">
          <Link to="/" className="back-btn"><ArrowRight size={22} style={{ transform: 'rotate(180deg)' }} /></Link>
          <div>
            <h1>Leaderboard Maharashtra</h1>
          </div>
        </div>
        <div className="header-icons">
          <Bell size={22} />
          <Settings size={22} />
        </div>
      </div>

      {/* Tabs */}
      <div className="leaderboard-tabs">
        <button className="lb-tab active"><Map size={14} /> महाराष्ट्र राज्य</button>
        <button className="lb-tab"><Building2 size={14} /> पुणे जिल्हा</button>
        <button className="lb-tab"><MapPin size={14} /> बारामती ता...</button>
      </div>

      {/* Info Banner */}
      <div className="lb-info-banner">
        <Trophy size={18} color="#4a2d8a" />
        <span>Leaderboard displays Top 50 students only. Earn more XP to climb into Top 50!</span>
      </div>

      {/* Rank Cards */}
      <div className="lb-ranks">
        <div className="lb-rank-item">
          <div className="lr-label">महाराष्ट्र राज्य रँक</div>
          <div className="lr-value">#1</div>
        </div>
        <div className="lb-rank-item">
          <div className="lr-label">पुणे जिल्हा रँक</div>
          <div className="lr-value">#1</div>
        </div>
        <div className="lb-rank-item">
          <div className="lr-label">बारामती तालुका रँक</div>
          <div className="lr-value">#1</div>
        </div>
      </div>

      {/* Podium */}
      <div style={{ padding: '0 16px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 4 }}>
          टॉप 3 खेळाडू <Crown size={18} color="#f59e0b" style={{ verticalAlign: 'middle' }} />
        </h3>
      </div>

      <div className="podium">
        {podiumData.map((p) => (
          <div key={p.rank} className={`podium-card ${p.rank === 1 ? 'first' : ''}`}>
            <div className={`podium-rank ${p.rank === 1 ? 'gold' : p.rank === 2 ? 'silver' : 'bronze'}`}>
              {p.rank}
            </div>
            {p.rank === 1 && <Crown size={24} color="#f59e0b" style={{ marginBottom: 4 }} />}
            <div className="podium-avatar" style={{ background: p.color }}>
              {p.initial}
            </div>
            <div className="podium-name">{p.name}</div>
            <div className="podium-location">{p.location}</div>
            <div className="podium-xp">{p.xp} XP</div>
            <div className="podium-streak"><Flame size={12} color="#ef4444" style={{ verticalAlign: 'middle' }} /> {p.streak} दिवस</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="lb-table">
        <div className="lb-table-header">
          <span style={{ width: 30 }}>Rank</span>
          <span style={{ flex: 1 }}>Student Name</span>
          <span>XP</span>
        </div>
        {tableData.map((row) => (
          <div key={row.rank} className="lb-table-row">
            <span className="lb-rank-num">{row.rank}</span>
            <div className="lb-user-avatar" style={{ background: '#e0e7ff', color: '#667eea', fontWeight: 700, fontSize: 14 }}>
              {row.name.charAt(0)}
            </div>
            <span className="lb-user-name">{row.name}</span>
            <span className="lb-user-xp">{row.xp} XP</span>
          </div>
        ))}
      </div>

      {/* Self */}
      <div className="lb-self">
        <div className="lb-self-rank">#1</div>
        <div className="lb-self-avatar">RD</div>
        <div className="lb-self-info">
          <div className="lb-self-name">Rahul Deshmukh</div>
          <div className="lb-self-loc">पुणे • बारामती</div>
        </div>
        <div>
          <div className="lb-self-xp">19519 XP</div>
          <div className="lb-self-streak"><Flame size={12} color="#ef4444" style={{ verticalAlign: 'middle' }} /> 5 दिवस</div>
        </div>
      </div>
    </div>
  );
}
