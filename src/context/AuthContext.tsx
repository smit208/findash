import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// two roles for now, might add 'accountant' later
export type UserRole = 'admin' | 'viewer';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, Omit<User, 'role'> & { password: string }> = {
  'admin@zorvyn.io': {
    name: 'Alex Rivera',
    email: 'admin@zorvyn.io',
    avatar: 'AR',
    password: 'admin123',
  },
  'viewer@zorvyn.io': {
    name: 'Sam Chen',
    email: 'viewer@zorvyn.io',
    avatar: 'SC',
    password: 'viewer123',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole) => {
    const found = MOCK_USERS[email];
    if (found) {
      setUser({ ...found, role });
    } else {
      // fallback for demo - just set whatever was typed
      setUser({
        name: role === 'admin' ? 'Alex Rivera' : 'Sam Chen',
        email,
        avatar: email.slice(0, 2).toUpperCase(),
        role,
      });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
