import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle, XCircle, Trophy, AlertTriangle } from 'lucide-react';
import { generateQuestions, subjectNames, type SubjectId, type Question } from '../services/questions';
import { useAuth } from '../context/AuthContext';

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

export default function QuizPage() {
  const { subject } = useParams<{ subject: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, addQuizResult } = useAuth();

  const numQ = parseInt(searchParams.get('count') || '25');
  const mins = parseInt(searchParams.get('time') || '20');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [timeLeft, setTimeLeft] = useState(mins * 60);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const subj = (subject || 'gk') as SubjectId;
  const subjName = subjectNames[subj] || subj;

  useEffect(() => {
    const qs = generateQuestions(subj, numQ);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(undefined));
    setTimeLeft(mins * 60);
    setCurrent(0);
    setFinished(false);
  }, [subject, numQ, mins]);

  const finishQuiz = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    let c = 0;
    questions.forEach((q, i) => { if (answers[i] === q.a) c++; });
    const sc = questions.length > 0 ? Math.round((c / questions.length) * 100) : 0;
    setCorrect(c);
    setScore(sc);
    setFinished(true);

    if (user) {
      addQuizResult({
        email: user.email,
        name: user.name,
        subject: subj,
        score: sc,
        correct: c,
        total: questions.length,
        date: new Date().toISOString(),
      });
    }
  }, [questions, answers, user, addQuizResult, subj]);

  useEffect(() => {
    if (finished || questions.length === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [finished, questions.length, finishQuiz]);

  const selectOption = (idx: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (questions.length === 0) return null;

  if (finished) {
    return (
      <div>
        <div className="app-header">
          <div className="header-left">
            <div>
              <h1>Quiz Complete!</h1>
              <div className="header-subtitle">{subjName}</div>
            </div>
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>
              {score >= 70 ? '🎉' : score >= 40 ? '👍' : '💪'}
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a3e', marginBottom: 8 }}>
              {score >= 70 ? 'Excellent!' : score >= 40 ? 'Good Effort!' : 'Keep Practicing!'}
            </h2>
            <p style={{ color: '#888', fontSize: 14 }}>{score}% Score</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
            <div className="stat-box">
              <div className="stat-number" style={{ color: '#16a34a' }}>{correct}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-box">
              <div className="stat-number" style={{ color: '#ef4444' }}>{questions.length - correct}</div>
              <div className="stat-label">Wrong</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{score}%</div>
              <div className="stat-label">Score</div>
            </div>
          </div>

          {/* Review Answers */}
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e', marginBottom: 12 }}>Answer Review</h3>
          {questions.map((q, idx) => (
            <div key={idx} className="bookmark-card" style={{ marginBottom: 12 }}>
              <div className="bookmark-question" style={{ fontSize: 14 }}>
                {idx + 1}. {q.q}
              </div>
              {q.o.map((opt, oi) => (
                <div key={oi} className={`bookmark-option ${oi === q.a ? 'correct' : ''} ${answers[idx] === oi && oi !== q.a ? 'wrong' : ''}`}
                  style={answers[idx] === oi && oi !== q.a ? { borderColor: '#ef4444', background: '#fef2f2' } : undefined}>
                  <span className="option-letter">{String.fromCharCode(65 + oi)}</span>
                  <span>{opt}</span>
                  {oi === q.a && <span className="correct-answer-label"><CheckCircle size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Correct</span>}
                  {answers[idx] === oi && oi !== q.a && <span style={{ marginLeft: 'auto', fontSize: 12, color: '#ef4444', fontWeight: 600 }}><XCircle size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Your answer</span>}
                </div>
              ))}
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button onClick={() => navigate(`/quiz/${subject}?count=${numQ}&time=${mins}`)} className="start-test-btn" style={{ flex: 1 }}>
              Retry
            </button>
            <Link to="/tests" className="start-test-btn" style={{ flex: 1, textDecoration: 'none', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              Back to Tests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length * 100).toFixed(1);
  const isTimeLow = timeLeft < 60;

  return (
    <div>
      <div className="app-header">
        <div className="header-left">
          <Link to="/tests" className="back-btn"><ArrowRight size={22} style={{ transform: 'rotate(180deg)' }} /></Link>
          <div>
            <h1>{subjName}</h1>
            <div className="header-subtitle">Question {current + 1} of {questions.length}</div>
          </div>
        </div>
        <div className={`timer-display ${isTimeLow ? 'timer-danger' : ''}`}>
          <Clock size={16} />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888', marginBottom: 4 }}>
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ padding: 16 }}>
        <div className="test-card">
          <div style={{ fontSize: 11, color: '#667eea', fontWeight: 600, marginBottom: 8 }}>
            Topic: {q.t}
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a3e', marginBottom: 20, lineHeight: 1.4 }}>
            {q.q}
          </h2>

          {q.o.map((opt, idx) => (
            <div
              key={idx}
              className={`quiz-option ${answers[current] === idx ? 'selected' : ''}`}
              onClick={() => selectOption(idx)}
            >
              <span className="quiz-option-letter">{String.fromCharCode(65 + idx)}</span>
              <span>{opt}</span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="start-test-btn"
            style={{ flex: 1, opacity: current === 0 ? 0.5 : 1 }}
          >
            ← Previous
          </button>
          <button onClick={handleNext} className="start-test-btn" style={{ flex: 1 }}>
            {current === questions.length - 1 ? 'Finish ✓' : 'Next →'}
          </button>
        </div>

        {/* Question Grid */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a3e', marginBottom: 8 }}>Question Navigator</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4 }}>
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                style={{
                  width: '100%', aspectRatio: '1', borderRadius: 6, border: 'none',
                  fontSize: 10, fontWeight: 600, cursor: 'pointer',
                  background: idx === current ? '#667eea' : answers[idx] !== undefined ? '#dcfce7' : '#f0f0f0',
                  color: idx === current ? 'white' : answers[idx] !== undefined ? '#16a34a' : '#888',
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
