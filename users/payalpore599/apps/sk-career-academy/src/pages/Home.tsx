import { Link } from 'react-router-dom';
import { Calendar, Bookmark, FileText, Target, TrendingUp, Star, Trophy, Clock, CheckCircle, Menu, Bell, Settings, Sparkles, Globe, Map, ArrowRight, Award, Zap, PenTool, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user, quizResults, attendance } = useAuth();
  const myResults = quizResults.filter(r => r.email === user?.email);
  const myAtt = user ? (attendance[user.email] || {}) : {};
  const presentDays = Object.values(myAtt).filter(x => x === 'present').length;
  const totalTests = myResults.length;
  const avgScore = totalTests > 0 ? Math.round(myResults.reduce((s, r) => s + r.score, 0) / totalTests) : 0;

  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <div className="header-left">
          <Menu className="hamburger" size={24} />
          <div>
            <h1>Welcome, {user?.name?.split(' ')[0] || 'Student'} 👋</h1>
            <div className="header-subtitle">One step closer to your goal!</div>
          </div>
        </div>
        <div className="header-icons">
          <Bell size={22} />
          <Settings size={22} />
        </div>
      </div>

      {/* Progress Card */}
      <div className="progress-card">
        <Trophy className="trophy-icon" size={60} style={{ opacity: 0.3 }} />
        <h2>आपला अभ्यास, आपले यश!</h2>
        <div className="subtitle">दररोज थोडी प्रगती, मोठे यश निश्चित!</div>
        <div className="progress-bar-container">
          <div className="progress-bar-label">
            <span>आजची प्रगती</span>
            <span>{avgScore}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${avgScore}%` }}></div>
          </div>
        </div>
        <div className="progress-stats">
          <div className="progress-stat">
            <Calendar className="stat-icon" size={20} />
            <div>
              <div className="stat-value">{totalTests}</div>
              <div className="stat-label">Tests Given</div>
            </div>
          </div>
          <div className="progress-stat">
            <Target className="stat-icon" size={20} />
            <div>
              <div className="stat-value">{avgScore}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
          </div>
          <div className="progress-stat">
            <Star className="stat-icon" size={20} />
            <div>
              <div className="stat-value">{presentDays}</div>
              <div className="stat-label">Attendance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="quick-access">
        <Link to="/tests" className="quick-card today-test">
          <Calendar className="qc-icon" size={28} color="#667eea" />
          <div className="qc-title">Today's Test</div>
          <div className="qc-subtitle">View & Attempt</div>
        </Link>
        <Link to="/bookmarks" className="quick-card bookmarks">
          <Bookmark className="qc-icon" size={28} color="#11998e" />
          <div className="qc-title">Bookmarks</div>
          <div className="qc-subtitle">Saved for later</div>
        </Link>
        <Link to="/attendance" className="quick-card study-plan">
          <FileText className="qc-icon" size={28} color="#f59e0b" />
          <div className="qc-title">Attendance</div>
          <div className="qc-subtitle">View Record</div>
        </Link>
      </div>

      {/* Subject Quiz Cards */}
      <div className="section">
        <div className="section-header">
          <Sparkles className="sparkle" size={18} color="#667eea" />
          <h3>📝 Test/Quiz - Subject निवडा</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          <Link to="/quiz/marathi?count=25&time=20" className="subject-quiz-card" style={{ textDecoration: 'none' }}>
            <BookOpen size={24} color="#667eea" />
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>📖 मराठी व्याकरण</div>
            <div style={{ fontSize: 11, color: '#888' }}>संधी, समास, अलंकार...</div>
          </Link>
          <Link to="/quiz/gk?count=25&time=20" className="subject-quiz-card" style={{ textDecoration: 'none' }}>
            <Globe size={24} color="#16a34a" />
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>🌍 GK/GS</div>
            <div style={{ fontSize: 11, color: '#888' }}>इतिहास, भूगोल, विज्ञान...</div>
          </Link>
          <Link to="/quiz/ganit?count=25&time=20" className="subject-quiz-card" style={{ textDecoration: 'none' }}>
            <Target size={24} color="#f59e0b" />
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>🔢 गणित</div>
            <div style={{ fontSize: 11, color: '#888' }}>टक्केवारी, सरासरी, नफा...</div>
          </Link>
          <Link to="/quiz/buddhi?count=25&time=20" className="subject-quiz-card" style={{ textDecoration: 'none' }}>
            <Zap size={24} color="#ef4444" />
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>🧠 बुद्धिमत्ता</div>
            <div style={{ fontSize: 11, color: '#888' }}>श्रेणी, दिशा, तर्क...</div>
          </Link>
        </div>
      </div>

      {/* Written Practice */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <Link to="/practice" style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: 'linear-gradient(135deg, #11998e, #38ef7d)',
          color: 'white', padding: '16px 18px', borderRadius: 16, textDecoration: 'none',
        }}>
          <PenTool size={28} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>✍️ Written Practice</div>
            <div style={{ fontSize: 11, opacity: 0.85 }}>आजचा अभ्यास log करा!</div>
          </div>
          <ArrowRight size={20} color="white" />
        </Link>
      </div>

      {/* AI Generator Banner */}
      <Link to="/generate" className="quick-card" style={{
        margin: '0 16px 20px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 18px',
        textDecoration: 'none',
        border: 'none',
      }}>
        <Sparkles size={32} color="#fbbf24" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>AI Question Generator</div>
          <div style={{ fontSize: 11, opacity: 0.85 }}>Gemini AI ने instant questions तयार करा!</div>
        </div>
        <ArrowRight size={20} color="white" />
      </Link>

      {/* Why Take Mock Tests */}
      <div className="why-section">
        <h3>Why Take Mock Tests?</h3>
        <div className="why-grid">
          <div className="why-card">
            <Target className="wc-icon" size={22} color="#667eea" />
            <div>
              <div className="wc-title">Preparation Assessment</div>
              <div className="wc-desc">Accurately evaluate your exam preparation.</div>
            </div>
          </div>
          <div className="why-card">
            <Clock className="wc-icon" size={22} color="#f59e0b" />
            <div>
              <div className="wc-title">Time Management</div>
              <div className="wc-desc">Learn effective time management strategies.</div>
            </div>
          </div>
          <div className="why-card">
            <TrendingUp className="wc-icon" size={22} color="#16a34a" />
            <div>
              <div className="wc-title">Performance Improvement</div>
              <div className="wc-desc">Identify weak areas and boost your score.</div>
            </div>
          </div>
          <div className="why-card">
            <Award className="wc-icon" size={22} color="#f59e0b" />
            <div>
              <div className="wc-title">Competitive Edge</div>
              <div className="wc-desc">Best preparation for competitive exams.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
