import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Target, FileText, Zap, BookOpen, Bell, Settings, Trophy, ListChecks, Sparkles, Globe, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TestsPage() {
  const { user, quizResults } = useAuth();
  const myResults = quizResults.filter(r => r.email === user?.email);
  const totalSolved = myResults.reduce((s, r) => s + r.total, 0);
  const completed = myResults.length;
  const avgScore = completed > 0 ? Math.round(myResults.reduce((s, r) => s + r.score, 0) / completed) : 0;

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
        <div className="progress-circle">{avgScore}%</div>
      </div>

      {/* Mock Stats */}
      <div className="mock-stats">
        <div className="mock-stat">
          <div className="ms-value">{totalSolved}</div>
          <div className="ms-label">Questions Solved</div>
        </div>
        <div className="mock-stat">
          <div className="ms-value">{completed}</div>
          <div className="ms-label">Completed</div>
        </div>
        <div className="mock-stat">
          <div className="ms-value">{avgScore}%</div>
          <div className="ms-label">Average Score</div>
        </div>
      </div>

      {/* Subject Quiz Options */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 12 }}>
          <Sparkles size={18} color="#667eea" style={{ verticalAlign: 'middle', marginRight: 6 }} />
          Subject Quiz - निवडा
        </h3>

        {/* Marathi */}
        <div className="test-type-card" style={{ marginBottom: 12 }}>
          <div className="test-type-header">
            <h4><BookOpen size={18} color="#667eea" style={{ verticalAlign: 'middle', marginRight: 6 }} />📖 मराठी व्याकरण</h4>
          </div>
          <div className="test-type-subtitle">संधी, समास, अलंकार, व्याकरण</div>
          <div className="test-type-desc">मराठी व्याकरणावर आधारित प्रश्न</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
            <Link to="/quiz/marathi?count=25&time=20" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>25 Q</div>
              <div style={{ fontSize: 10 }}>20 Min</div>
            </Link>
            <Link to="/quiz/marathi?count=50&time=45" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>50 Q</div>
              <div style={{ fontSize: 10 }}>45 Min</div>
            </Link>
            <Link to="/quiz/marathi?count=100&time=90" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>100 Q</div>
              <div style={{ fontSize: 10 }}>90 Min</div>
            </Link>
          </div>
        </div>

        {/* GK */}
        <div className="test-type-card" style={{ marginBottom: 12 }}>
          <div className="test-type-header">
            <h4><Globe size={18} color="#16a34a" style={{ verticalAlign: 'middle', marginRight: 6 }} />🌍 GK/GS</h4>
          </div>
          <div className="test-type-subtitle">इतिहास, भूगोल, विज्ञान, राज्यघटना</div>
          <div className="test-type-desc">सामान्य ज्ञान प्रश्न</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
            <Link to="/quiz/gk?count=25&time=20" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>25 Q</div>
              <div style={{ fontSize: 10 }}>20 Min</div>
            </Link>
            <Link to="/quiz/gk?count=50&time=45" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>50 Q</div>
              <div style={{ fontSize: 10 }}>45 Min</div>
            </Link>
            <Link to="/quiz/gk?count=100&time=90" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>100 Q</div>
              <div style={{ fontSize: 10 }}>90 Min</div>
            </Link>
          </div>
        </div>

        {/* Ganit */}
        <div className="test-type-card" style={{ marginBottom: 12 }}>
          <div className="test-type-header">
            <h4><Target size={18} color="#f59e0b" style={{ verticalAlign: 'middle', marginRight: 6 }} />🔢 गणित</h4>
          </div>
          <div className="test-type-subtitle">टक्केवारी, सरासरी, नफा-तोटा, व्याज</div>
          <div className="test-type-desc">गणितीय प्रश्न (auto-generated)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
            <Link to="/quiz/ganit?count=25&time=20" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>25 Q</div>
              <div style={{ fontSize: 10 }}>20 Min</div>
            </Link>
            <Link to="/quiz/ganit?count=50&time=45" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>50 Q</div>
              <div style={{ fontSize: 10 }}>45 Min</div>
            </Link>
            <Link to="/quiz/ganit?count=100&time=90" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>100 Q</div>
              <div style={{ fontSize: 10 }}>90 Min</div>
            </Link>
          </div>
        </div>

        {/* Buddhimata */}
        <div className="test-type-card" style={{ marginBottom: 12 }}>
          <div className="test-type-header">
            <h4><Zap size={18} color="#ef4444" style={{ verticalAlign: 'middle', marginRight: 6 }} />🧠 बुद्धिमत्ता</h4>
          </div>
          <div className="test-type-subtitle">श्रेणी, दिशा, तर्कशक्ती, शब्दकोड</div>
          <div className="test-type-desc">बुद्धिमत्ता चाचणी प्रश्न</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
            <Link to="/quiz/buddhi?count=25&time=20" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>25 Q</div>
              <div style={{ fontSize: 10 }}>20 Min</div>
            </Link>
            <Link to="/quiz/buddhi?count=50&time=45" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>50 Q</div>
              <div style={{ fontSize: 10 }}>45 Min</div>
            </Link>
            <Link to="/quiz/buddhi?count=100&time=90" className="quiz-size-btn">
              <div style={{ fontSize: 14, fontWeight: 700 }}>100 Q</div>
              <div style={{ fontSize: 10 }}>90 Min</div>
            </Link>
          </div>
        </div>
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
