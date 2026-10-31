import { Link } from 'react-router-dom';
import { Calendar, Bookmark, FileText, Target, TrendingUp, Star, Trophy, Clock, CheckCircle, XCircle, Timer, Menu, Bell, Settings, Sparkles, Globe, Map, ArrowRight, Award, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <div className="header-left">
          <Menu className="hamburger" size={24} />
          <div>
            <h1>Welcome, Pratik 👋</h1>
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
            <span>31%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: '31%' }}></div>
          </div>
        </div>
        <div className="progress-stats">
          <div className="progress-stat">
            <Calendar className="stat-icon" size={20} />
            <div>
              <div className="stat-value">156</div>
              <div className="stat-label">Tests Given</div>
            </div>
          </div>
          <div className="progress-stat">
            <Target className="stat-icon" size={20} />
            <div>
              <div className="stat-value">31%</div>
              <div className="stat-label">Accuracy</div>
            </div>
          </div>
          <div className="progress-stat">
            <Star className="stat-icon" size={20} />
            <div>
              <div className="stat-value">#1</div>
              <div className="stat-label">Rank</div>
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
        <div className="quick-card study-plan">
          <FileText className="qc-icon" size={28} color="#f59e0b" />
          <div className="qc-title">Study Plan</div>
          <div className="qc-subtitle">Your Daily Plan</div>
        </div>
      </div>

      {/* Recommended */}
      <div className="section">
        <div className="section-header">
          <Sparkles className="sparkle" size={18} color="#f59e0b" />
          <h3>Recommended For You</h3>
        </div>

        <div className="recommended-card">
          <div className="recommended-icon purple">
            <Globe size={22} color="#7c3aed" />
          </div>
          <div className="recommended-info">
            <div className="recommended-tags">
              <span className="tag purple">SUBJECT TEST</span>
              <span className="tag red">Weak Subject (20%)</span>
            </div>
            <div className="recommended-title">भूगोल – भूगोल Subject Test</div>
            <div className="recommended-reason">Reason: "Your recent performance in भूगोल needs improvement (20%)."</div>
          </div>
          <button className="recommended-start">Start →</button>
        </div>

        <div className="recommended-card">
          <div className="recommended-icon green">
            <Map size={22} color="#16a34a" />
          </div>
          <div className="recommended-info">
            <div className="recommended-tags">
              <span className="tag green">CHAPTER TEST</span>
              <span className="tag red">Weak Topic (33%)</span>
            </div>
            <div className="recommended-title">भारताचा भूगोल – महाराष्ट्र</div>
            <div className="recommended-reason">Reason: "Chapter strength is below average."</div>
          </div>
          <button className="recommended-start">Start →</button>
        </div>
      </div>

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
