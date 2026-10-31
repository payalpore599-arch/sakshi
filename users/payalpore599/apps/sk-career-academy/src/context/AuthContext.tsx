import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
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

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string, role: UserRole) => { success: boolean; error?: string };
  logout: () => void;
  students: (User & { progress: StudentProgress })[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'sk_academy_users';
const CURRENT_USER_KEY = 'sk_academy_current_user';
const PROGRESS_KEY = 'sk_academy_progress';

function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch { return []; }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getProgress(): Record<string, StudentProgress> {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch { return {}; }
}

function saveProgress(progress: Record<string, StudentProgress>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function generateProgress(user: User): StudentProgress {
  const subjects = ['भूगोल', 'इतिहास', 'गणित', 'मराठी', 'सामान्य ज्ञान', 'बुद्धिमता', 'विज्ञान', 'अर्थशास्त्र', 'राज्यशास्त्र'];
  const subjectScores: Record<string, number> = {};
  subjects.forEach(s => {
    subjectScores[s] = Math.floor(Math.random() * 60) + 20;
  });
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

  useEffect(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { success: false, error: 'Email किंवा Password चुकीचे आहे' };
    setUser(found);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
    return { success: true };
  };

  const signup = (name: string, email: string, password: string, role: UserRole) => {
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

  const students = getUsers()
    .filter(u => u.role === 'student')
    .map(u => {
      const progress = getProgress();
      return { ...u, progress: progress[u.id] || generateProgress(u) };
    })
    .sort((a, b) => b.progress.xp - a.progress.xp);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, students }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
