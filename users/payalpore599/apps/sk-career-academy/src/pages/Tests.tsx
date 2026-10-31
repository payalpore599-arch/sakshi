import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Target, FileText, Zap, BookOpen, Menu, Bell, Settings, Trophy, ListChecks, Sparkles, Globe, Map, Award, TrendingUp } from 'lucide-react';

export default function TestsPage() {
  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <div className="header-left">
          <Link to="/" className="back-btn"><ArrowRight size={22} style={{ transform: 'rotate(180deg)' }} /></Link>
          <div>
            <h1>Tests</h1>
            <div className="header-subtitle">Practice. Prepare. Succeed.</div>
          </div>
        </div>
        <div className="header-icons">
          <Bell size={22} />
          <Settings size={22} />
        </div>
      </div>

      {/* Mock Test Series Card */}
      <div className="mock-series-card">
        <div className="mock-series-icon">
          <ListChecks size={28} color="white" />
        </div>
        <div className="mock-series-info">
          <h3>Marathi Mock Test Series</h3>
          <p>Test your preparation in Marathi and evaluate your progress.</p>
        </div>
        <div className="progress-circle">39%</div>
      </div>

      {/* Mock Stats */}
      <div className="mock-stats">
        <div className="mock-stat">
          <div className="ms-value">70</div>
          <div className="ms-label">Questions Solved</div>
        </div>
        <div className="mock-stat">
          <div className="ms-value">7</div>
          <div className="ms-label">Completed</div>
        </div>
        <div className="mock-stat">
          <div className="ms-value">39%</div>
          <div className="ms-label">Average Score</div>
        </div>
      </div>

      {/* Quick Test */}
      <div className="test-type-card">
        <div className="test-type-header">
          <h4><Zap size={18} color="#667eea" style={{ verticalAlign: 'middle', marginRight: 6 }} />Quick Test</h4>
          <span className="time-badge">10-15 Minutes</span>
        </div>
        <div className="test-type-subtitle">Fast Test</div>
        <div className="test-type-desc">Useful for quick practice in a short time.</div>
        <div className="test-type-meta">
          <span><Target size={14} /> 10 Questions</span>
          <span><Award size={14} /> 10 Marks</span>
          <span><Clock size={14} /> 7 Mins</span>
        </div>
        <button className="start-test-btn">Start Test <ArrowRight size={18} /></button>
      </div>

      {/* Mini Mock */}
      <div className="test-type-card">
        <div className="test-type-header">
          <h4><Zap size={18} color="#7c3aed" style={{ verticalAlign: 'middle', marginRight: 6 }} />Mini Mock</h4>
          <span className="time-badge">20-30 Minutes</span>
        </div>
        <div className="test-type-subtitle">Mini Mock Test</div>
        <div className="test-type-desc">Medium-level practice test.</div>
        <div className="test-type-meta">
          <span><Target size={14} /> 25 Questions</span>
          <span><Award size={14} /> 25 Marks</span>
          <span><Clock size={14} /> 20 Mins</span>
        </div>
        <button className="start-test-btn">Start Test <ArrowRight size={18} /></button>
      </div>

      {/* Full Mock */}
      <div className="test-type-card">
        <div className="test-type-header">
          <h4><FileText size={18} color="#2563eb" style={{ verticalAlign: 'middle', marginRight: 6 }} />Full Mock</h4>
          <span className="time-badge">45-60 Minutes</span>
        </div>
        <div className="test-type-subtitle">Full Mock Test</div>
        <div className="test-type-desc">Full mock test based on exam pattern.</div>
        <div className="test-type-meta">
          <span><Target size={14} /> 50 Questions</span>
          <span><Award size={14} /> 50 Marks</span>
          <span><Clock size={14} /> 40 Mins</span>
        </div>
        <button className="start-test-btn">Start Test <ArrowRight size={18} /></button>
      </div>

      {/* Why Take Mock Tests */}
      <div className="why-section" style={{ marginTop: 8 }}>
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
