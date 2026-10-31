import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Key, BookOpen, Hash, Zap, CheckCircle, XCircle, AlertCircle, Loader2, RotateCcw, Bookmark, Globe, ScrollText, Calculator, Languages, Brain, Microscope, Coins, Scale, Lightbulb } from 'lucide-react';
import { generateQuestions, getStoredApiKey, setStoredApiKey, type GeneratedQuestion } from '../services/gemini';

const subjects = [
  { id: 'भूगोल', label: 'भूगोल', Icon: Globe },
  { id: 'इतिहास', label: 'इतिहास', Icon: ScrollText },
  { id: 'गणित', label: 'गणित', Icon: Calculator },
  { id: 'मराठी', label: 'मराठी', Icon: Languages },
  { id: 'सामान्य ज्ञान', label: 'सामान्य ज्ञान', Icon: Brain },
  { id: 'बुद्धिमता', label: 'बुद्धिमता', Icon: Lightbulb },
  { id: 'विज्ञान', label: 'विज्ञान', Icon: Microscope },
  { id: 'अर्थशास्त्र', label: 'अर्थशास्त्र', Icon: Coins },
  { id: 'राज्यशास्त्र', label: 'राज्यशास्त्र', Icon: Scale },
];

const difficulties = [
  { id: 'easy', label: 'सोपे', color: '#16a34a' },
  { id: 'medium', label: 'मध्यम', color: '#f59e0b' },
  { id: 'hard', label: 'कठीण', color: '#ef4444' },
];

const questionCounts = [5, 10, 15, 20];

export default function GenerateQuestionsPage() {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [showKeyInput, setShowKeyInput] = useState(!getStoredApiKey());
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      setStoredApiKey(apiKey.trim());
      setShowKeyInput(false);
      setError('');
    }
  };

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your Gemini API key first');
      setShowKeyInput(true);
      return;
    }
    if (!selectedSubject) {
      setError('Please select a subject');
      return;
    }

    setLoading(true);
    setError('');
    setQuestions([]);
    setShowAnswers({});

    try {
      const result = await generateQuestions({
        apiKey: apiKey.trim(),
        subject: selectedSubject,
        topic: topic || undefined,
        count: questionCount,
        difficulty: selectedDifficulty,
        language: 'marathi',
      });
      setQuestions(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate questions. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (idx: number) => {
    setShowAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <div className="header-left">
          <Link to="/" className="back-btn">
            <ArrowRight size={22} style={{ transform: 'rotate(180deg)' }} />
          </Link>
          <div>
            <h1>AI Question Generator</h1>
            <div className="header-subtitle">Powered by Gemini AI ✨</div>
          </div>
        </div>
      </div>

      {/* API Key Section */}
      <div style={{ padding: '16px' }}>
        {!showKeyInput ? (
          <div
            style={{
              background: '#dcfce7',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={18} color="#16a34a" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#16a34a' }}>API Key Connected</span>
            </div>
            <button
              onClick={() => setShowKeyInput(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#16a34a',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Change
            </button>
          </div>
        ) : (
          <div
            style={{
              background: 'white',
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Key size={18} color="#667eea" />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>Gemini API Key</span>
            </div>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>
              Get your free API key from{' '}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" style={{ color: '#667eea' }}>
                Google AI Studio
              </a>
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="password"
                placeholder="Paste your API key here (AIzaSy...)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: 10,
                  fontSize: 13,
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
              />
              <button
                onClick={handleSaveKey}
                style={{
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Subject Selection */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <BookOpen size={18} color="#667eea" />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>Subject निवडा</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                style={{
                  background: selectedSubject === s.id ? '#667eea' : 'white',
                  color: selectedSubject === s.id ? 'white' : '#1a1a3e',
                  border: selectedSubject === s.id ? '2px solid #667eea' : '2px solid #e0e0e0',
                  borderRadius: 12,
                  padding: '10px 6px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <s.Icon size={20} style={{ marginBottom: 2 }} color={selectedSubject === s.id ? 'white' : '#667eea'} />
                <div style={{ fontSize: 10, fontWeight: 600 }}>{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Topic (optional) */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <BookOpen size={18} color="#667eea" />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>Topic (optional)</span>
          </div>
          <input
            type="text"
            placeholder="e.g., भारतीय संविधान, भूगोल - नद्या..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '2px solid #e0e0e0',
              borderRadius: 12,
              fontSize: 13,
              outline: 'none',
              background: 'white',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
            onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
          />
        </div>

        {/* Difficulty */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Zap size={18} color="#667eea" />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>Difficulty Level</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {difficulties.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDifficulty(d.id as any)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: selectedDifficulty === d.id ? `2px solid ${d.color}` : '2px solid #e0e0e0',
                  background: selectedDifficulty === d.id ? d.color : 'white',
                  color: selectedDifficulty === d.id ? 'white' : '#666',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Count */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Hash size={18} color="#667eea" />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a3e' }}>Questions Count</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {questionCounts.map((c) => (
              <button
                key={c}
                onClick={() => setQuestionCount(c)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: questionCount === c ? '2px solid #667eea' : '2px solid #e0e0e0',
                  background: questionCount === c ? '#667eea' : 'white',
                  color: questionCount === c ? 'white' : '#666',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            width: '100%',
            padding: 16,
            borderRadius: 14,
            border: 'none',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 16,
            transition: 'all 0.2s',
          }}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Generating Questions...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate {questionCount} Questions
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 12,
              padding: '12px 16px',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <AlertCircle size={18} color="#ef4444" />
            <span style={{ fontSize: 13, color: '#dc2626' }}>{error}</span>
          </div>
        )}

        {/* Generated Questions */}
        {questions.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a3e' }}>
                <Sparkles size={18} color="#f59e0b" style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Generated Questions ({questions.length})
              </h3>
              <button
                onClick={handleGenerate}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <RotateCcw size={14} /> Regenerate
              </button>
            </div>

            {questions.map((q, idx) => (
              <div key={idx} className="bookmark-card">
                <div className="bookmark-subject">
                  <span className="bs-subject">{q.subject}</span>
                  <span className="bs-topic">{q.topic}</span>
                </div>
                <Bookmark
                  className="bookmark-bookmark-icon"
                  size={20}
                  color="#ccc"
                  style={{ cursor: 'pointer' }}
                />
                <div className="bookmark-question">
                  {idx + 1}. {q.question}
                </div>
                {q.options.map((opt) => {
                  const isRevealed = showAnswers[idx];
                  return (
                    <div
                      key={opt.letter}
                      className={`bookmark-option ${isRevealed && opt.correct ? 'correct' : ''}`}
                      onClick={() => toggleAnswer(idx)}
                    >
                      <span className="option-letter">{opt.letter}</span>
                      <span>{opt.text}</span>
                      {isRevealed && opt.correct && (
                        <span className="correct-answer-label">
                          <CheckCircle size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                          Correct
                        </span>
                      )}
                    </div>
                  );
                })}
                {showAnswers[idx] && q.explanation && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: '10px 14px',
                      background: '#f0f0ff',
                      borderRadius: 10,
                      fontSize: 12,
                      color: '#4a2d8a',
                      lineHeight: 1.5,
                    }}
                  >
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
                {!showAnswers[idx] && (
                  <button
                    onClick={() => toggleAnswer(idx)}
                    style={{
                      marginTop: 10,
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Show Answer
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
