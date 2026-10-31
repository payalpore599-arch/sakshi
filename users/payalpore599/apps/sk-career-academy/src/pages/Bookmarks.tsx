import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, ArrowRight, CheckCircle } from 'lucide-react';

const subjects = ['All', 'भूगोल', 'इतिहास', 'गणित', 'मराठी', 'सामान्य ज्ञान'];

const questions = [
  {
    id: 1,
    subject: 'भूगोल',
    topic: 'ऊर्जा प्रकल्प',
    question: 'जायकवाडी जलविद्युत प्रकल्प कोणत्या जिल्ह्यात आहे?',
    options: [
      { letter: 'A', text: 'औरंगाबाद (छत्रपती संभाजीनगर)', correct: true },
      { letter: 'B', text: 'बीड', correct: false },
      { letter: 'C', text: 'जालना', correct: false },
      { letter: 'D', text: 'परभणी', correct: false },
    ],
  },
  {
    id: 2,
    subject: 'इतिहास',
    topic: 'प्राचीन भारत',
    question: 'गौतम बुद्धांचा जन्म कोठे झाला?',
    options: [
      { letter: 'A', text: 'लुंबिनी', correct: true },
      { letter: 'B', text: 'सारनाथ', correct: false },
      { letter: 'C', text: 'कुशीनगर', correct: false },
      { letter: 'D', text: 'राजगृह', correct: false },
    ],
  },
  {
    id: 3,
    subject: 'गणित',
    topic: 'बेरीज',
    question: 'एक संख्येच्या २५% म्हणजे ५०, तर ती संख्या किती?',
    options: [
      { letter: 'A', text: '150', correct: false },
      { letter: 'B', text: '200', correct: true },
      { letter: 'C', text: '250', correct: false },
      { letter: 'D', text: '175', correct: false },
    ],
  },
  {
    id: 4,
    subject: 'मराठी',
    topic: 'व्याकरण',
    question: '"राम शाळेत जातो" - या वाक्यात कोणता काळ आहे?',
    options: [
      { letter: 'A', text: 'भूतकाळ', correct: false },
      { letter: 'B', text: 'वर्तमानकाळ', correct: true },
      { letter: 'C', text: 'भविष्यकाळ', correct: false },
      { letter: 'D', text: 'संकेतार्थी काळ', correct: false },
    ],
  },
];

export default function BookmarksPage() {
  const [activeSubject, setActiveSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = questions.filter((q) => {
    const matchesSubject = activeSubject === 'All' || q.subject === activeSubject;
    const matchesSearch = searchQuery === '' || q.question.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="bookmark-header-bar">
        <Link to="/" className="back-btn"><ArrowRight size={22} style={{ transform: 'rotate(180deg)' }} /></Link>
        <h2>Bookmarked Questions</h2>
        <span className="bookmark-count">{questions.length}</span>
      </div>

      {/* Search */}
      <div className="bookmark-search">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search bookmarked questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Subject Filters */}
      <div className="subject-filters">
        {subjects.map((s) => (
          <button
            key={s}
            className={`subject-filter ${activeSubject === s ? 'active' : ''}`}
            onClick={() => setActiveSubject(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Questions */}
      {filtered.map((q) => (
        <div key={q.id} className="bookmark-card">
          <div className="bookmark-subject">
            <span className="bs-subject">{q.subject}</span>
            <span className="bs-topic">{q.topic}</span>
          </div>
          <Bookmark className="bookmark-bookmark-icon" size={20} fill="#ef4444" color="#ef4444" />
          <div className="bookmark-question">
            {q.id}. {q.question}
          </div>
          {q.options.map((opt) => (
            <div key={opt.letter} className={`bookmark-option ${opt.correct ? 'correct' : ''}`}>
              <span className="option-letter">{opt.letter}</span>
              <span>{opt.text}</span>
              {opt.correct && (
                <span className="correct-answer-label">
                  <CheckCircle size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  Correct Answer
                </span>
              )}
            </div>
          ))}
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
          <Search size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
          <div>No questions found</div>
        </div>
      )}
    </div>
  );
}
