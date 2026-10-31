import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Home, ClipboardList, Trophy, User, Bookmark } from 'lucide-react';
import HomePage from './pages/Home';
import TestsPage from './pages/Tests';
import LeaderboardPage from './pages/Leaderboard';
import ProfilePage from './pages/Profile';
import BookmarksPage from './pages/Bookmarks';
import './styles.css';

function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${isActive('/')}`}>
        <Home className="nav-icon" size={22} />
        <span className="nav-label">Home</span>
      </Link>
      <Link to="/tests" className={`nav-item ${isActive('/tests')}`}>
        <ClipboardList className="nav-icon" size={22} />
        <span className="nav-label">Tests</span>
      </Link>
      <Link to="/leaderboard" className={`nav-item ${isActive('/leaderboard')}`}>
        <Trophy className="nav-icon" size={22} />
        <span className="nav-label">Leaderboard</span>
      </Link>
      <Link to="/profile" className={`nav-item ${isActive('/profile')}`}>
        <User className="nav-icon" size={22} />
        <span className="nav-label">Profile</span>
      </Link>
    </nav>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      {children}
      <BottomNav />
    </div>
  );
}

function HomeLayout() { return <Layout><HomePage /></Layout>; }
function TestsLayout() { return <Layout><TestsPage /></Layout>; }
function LeaderboardLayout() { return <Layout><LeaderboardPage /></Layout>; }
function ProfileLayout() { return <Layout><ProfilePage /></Layout>; }
function BookmarksLayout() { return <Layout><BookmarksPage /></Layout>; }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/tests" element={<TestsLayout />} />
        <Route path="/leaderboard" element={<LeaderboardLayout />} />
        <Route path="/profile" element={<ProfileLayout />} />
        <Route path="/bookmarks" element={<BookmarksLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
