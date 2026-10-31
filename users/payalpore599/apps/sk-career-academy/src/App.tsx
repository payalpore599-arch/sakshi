import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { Home, ClipboardList, Trophy, User, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/Home';
import TestsPage from './pages/Tests';
import LeaderboardPage from './pages/Leaderboard';
import ProfilePage from './pages/Profile';
import BookmarksPage from './pages/Bookmarks';
import GenerateQuestionsPage from './pages/GenerateQuestions';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import TeacherDashboard from './pages/TeacherDashboard';
import './styles.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function BottomNav() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  if (!user) return null;

  const studentLinks = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/tests', icon: ClipboardList, label: 'Tests' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const teacherLinks = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/tests', icon: ClipboardList, label: 'Tests' },
    { to: '/leaderboard', icon: Trophy, label: 'Students' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const links = user.role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <nav className="bottom-nav">
      {links.map((link) => (
        <Link key={link.to} to={link.to} className={`nav-item ${isActive(link.to)}`}>
          <link.icon className="nav-icon" size={22} />
          <span className="nav-label">{link.label}</span>
        </Link>
      ))}
      <button onClick={logout} className="nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <LogOut className="nav-icon" size={22} color="#ef4444" />
        <span className="nav-label" style={{ color: '#ef4444' }}>Logout</span>
      </button>
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

function HomeLayout() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <Layout>
        {user?.role === 'teacher' ? <TeacherDashboard /> : <HomePage />}
      </Layout>
    </ProtectedRoute>
  );
}
function TestsLayout() { return <ProtectedRoute><Layout><TestsPage /></Layout></ProtectedRoute>; }
function LeaderboardLayout() { return <ProtectedRoute><Layout><LeaderboardPage /></Layout></ProtectedRoute>; }
function ProfileLayout() { return <ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>; }
function BookmarksLayout() { return <ProtectedRoute><Layout><BookmarksPage /></Layout></ProtectedRoute>; }
function GenerateLayout() { return <ProtectedRoute><Layout><GenerateQuestionsPage /></Layout></ProtectedRoute>; }

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomeLayout />} />
          <Route path="/tests" element={<TestsLayout />} />
          <Route path="/leaderboard" element={<LeaderboardLayout />} />
          <Route path="/profile" element={<ProfileLayout />} />
          <Route path="/bookmarks" element={<BookmarksLayout />} />
          <Route path="/generate" element={<GenerateLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
