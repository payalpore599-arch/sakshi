import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
  photo?: string;
  height?: string;
  weight?: string;
  mobile?: string;
}

export interface StudentProgress {
  userId: string;
  testsGiven: number;
  accuracy: number;
  xp: number;
  level: number;
  streak: number;
  rank: number;
  lastActive: string;
  subjectScores: Record<string, number>;
}

export interface QuizResult {
  email: string;
  name: string;
  subject: string;
  score: number;
  correct: number;
  total: number;
  date: string;
}

export interface WrittenEntry {
  email: string;
  name: string;
  notes: string;
  date: string;
}

// attendance[email][date] = 'present' | 'absent'
export type AttendanceMap = Record<string, Record<string, string>>;

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string, role: UserRole, photo?: string, height?: string, weight?: string, mobile?: string) => { success: boolean; error?: string };
  logout: () => void;
  students: (User & { progress: StudentProgress })[];
  allUsers: User[];
  // Quiz results
  quizResults: QuizResult[];
  addQuizResult: (r: QuizResult) => void;
  // Written practice
  writtenPractice: WrittenEntry[];
  addWrittenEntry: (e: WrittenEntry) => void;
  // Attendance
  attendance: AttendanceMap;
  toggleAttendance: (email: string, date: string) => void;
  // Teacher attendance
  teacherAttendance: AttendanceMap;
  toggleTeacherAttendance: (email: string, date: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'sk_academy_users';
const CURRENT_USER_KEY = 'sk_academy_current_user';
const PROGRESS_KEY = 'sk_academy_progress';
const QUIZ_RESULTS_KEY = 'sk_academy_quiz_results';
const WRITTEN_KEY = 'sk_academy_written';
const ATTENDANCE_KEY = 'sk_academy_attendance';
const TEACHER_ATT_KEY = 'sk_academy_teacher_attendance';

function getUsers(): User[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function saveUsers(users: User[]) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

function getProgress(): Record<string, StudentProgress> {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); } catch { return {}; }
}
function saveProgress(progress: Record<string, StudentProgress>) { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); }

function getQuizResults(): QuizResult[] {
  try { return JSON.parse(localStorage.getItem(QUIZ_RESULTS_KEY) || '[]'); } catch { return []; }
}
function saveQuizResults(r: QuizResult[]) { localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(r)); }

function getWritten(): WrittenEntry[] {
  try { return JSON.parse(localStorage.getItem(WRITTEN_KEY) || '[]'); } catch { return []; }
}
function saveWritten(w: WrittenEntry[]) { localStorage.setItem(WRITTEN_KEY, JSON.stringify(w)); }

function getAttendance(): AttendanceMap {
  try { return JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || '{}'); } catch { return {}; }
}
function saveAttendance(a: AttendanceMap) { localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(a)); }

function getTeacherAtt(): AttendanceMap {
  try { return JSON.parse(localStorage.getItem(TEACHER_ATT_KEY) || '{}'); } catch { return {}; }
}
function saveTeacherAtt(a: AttendanceMap) { localStorage.setItem(TEACHER_ATT_KEY, JSON.stringify(a)); }

function generateProgress(user: User): StudentProgress {
  const subjects = ['भूगोल', 'इतिहास', 'गणित', 'मराठी', 'सामान्य ज्ञान', 'बुद्धिमता', 'विज्ञान', 'अर्थशास्त्र', 'राज्यशास्त्र'];
  const subjectScores: Record<string, number> = {};
  subjects.forEach(s => { subjectScores[s] = Math.floor(Math.random() * 60) + 20; });
  return {
    userId: user.id,
    testsGiven: Math.floor(Math.random() * 200) + 10,
    accuracy: Math.floor(Math.random() * 50) + 30,
    xp: Math.floor(Math.random() * 20000) + 1000,
    level: Math.floor(Math.random() * 15) + 1,
    streak: Math.floor(Math.random() * 14) + 1,
    rank: Math.floor(Math.random() * 50) + 1,
    lastActive: new Date().toISOString(),
    subjectScores,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>(getQuizResults());
  const [writtenPractice, setWrittenPractice] = useState<WrittenEntry[]>(getWritten());
  const [attendance, setAttendance] = useState<AttendanceMap>(getAttendance());
  const [teacherAttendance, setTeacherAttendance] = useState<AttendanceMap>(getTeacherAtt());

  useEffect(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const login = (email: string, password: string) => {
    const users = getUsers();
    // Admin login: password = 'email'
    if (password === 'email') {
      const adminUser: User = { id: 'admin', name: 'Admin', email, password, role: 'admin', createdAt: new Date().toISOString() };
      setUser(adminUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
      return { success: true };
    }
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { success: false, error: 'Email किंवा Password चुकीचे आहे' };
    setUser(found);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
    return { success: true };
  };

  const signup = (name: string, email: string, password: string, role: UserRole, photo?: string, height?: string, weight?: string, mobile?: string) => {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'या email वर आधीच account आहे' };
    }
    if (password.length < 4) {
      return { success: false, error: 'Password किमान 4 characters हवा' };
    }
    const newUser: User = {
      id: 'user_' + Date.now(),
      name, email, password, role,
      createdAt: new Date().toISOString(),
      photo, height, weight, mobile,
    };
    users.push(newUser);
    saveUsers(users);

    if (role === 'student') {
      const progress = getProgress();
      progress[newUser.id] = generateProgress(newUser);
      saveProgress(progress);
    }

    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const allUsers = getUsers();

  const students = allUsers
    .filter(u => u.role === 'student')
    .map(u => {
      const progress = getProgress();
      return { ...u, progress: progress[u.id] || generateProgress(u) };
    })
    .sort((a, b) => b.progress.xp - a.progress.xp);

  const addQuizResult = (r: QuizResult) => {
    const updated = [...quizResults, r];
    setQuizResults(updated);
    saveQuizResults(updated);
  };

  const addWrittenEntry = (e: WrittenEntry) => {
    const updated = [...writtenPractice, e];
    setWrittenPractice(updated);
    saveWritten(updated);
  };

  const toggleAttendance = (email: string, date: string) => {
    setAttendance(prev => {
      const next = { ...prev };
      if (!next[email]) next[email] = {};
      const cur = next[email][date];
      if (cur === 'present') next[email][date] = 'absent';
      else if (cur === 'absent') delete next[email][date];
      else next[email][date] = 'present';
      saveAttendance(next);
      return next;
    });
  };

  const toggleTeacherAttendance = (email: string, date: string) => {
    setTeacherAttendance(prev => {
      const next = { ...prev };
      if (!next[email]) next[email] = {};
      const cur = next[email][date];
      if (cur === 'present') next[email][date] = 'absent';
      else if (cur === 'absent') delete next[email][date];
      else next[email][date] = 'present';
      saveTeacherAtt(next);
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{
      user, login, signup, logout, students, allUsers,
      quizResults, addQuizResult,
      writtenPractice, addWrittenEntry,
      attendance, toggleAttendance,
      teacherAttendance, toggleTeacherAttendance,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
