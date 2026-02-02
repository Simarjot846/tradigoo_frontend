'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  role?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
  signOut: () => void;
  refreshUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const API = "http://localhost:8080/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load user from token on refresh
  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<User | null> => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();

    // Save JWT
    localStorage.setItem('token', data.token);

    setUser(data.user);
    return data.user;
  };

  const signUp = async (email: string, password: string, userData?: Partial<User>) => {
    await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, ...userData }),
    });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    await fetch(`${API}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
  };

  const updatePassword = async (password: string) => {
    const token = localStorage.getItem('token');
    await fetch(`${API}/auth/update-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        refreshUser,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
