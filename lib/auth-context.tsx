// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// interface User {
//   id: string;
//   email: string;

//   // basic
//   role?: string;
//   name?: string;

//   // 🔥 used across UI
//   business_name?: string;
//   location?: string;
//   phone?: string;
//   profile_image_url?: string;
//   gst_verified?: boolean;
//   trust_score?: number;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<User | null>;
//   signUp: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
//   signOut: () => void;
//   refreshUser: () => Promise<void>;
//   resetPassword: (email: string) => Promise<void>;
//   updatePassword: (password: string) => Promise<void>;
// }

// const API = "http://localhost:8080/api";

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     refreshUser();
//   }, []);

//   const refreshUser = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(`${API}/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setUser(data);
//     } catch {
//       localStorage.removeItem('token');
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signIn = async (email: string, password: string): Promise<User | null> => {
//     const res = await fetch(`${API}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!res.ok) throw new Error('Login failed');

//     const data = await res.json();

//     localStorage.setItem('token', data.token);
//     setUser(data.user);
//     return data.user;
//   };

//   const signUp = async (email: string, password: string, userData?: Partial<User>) => {
//     await fetch(`${API}/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password, ...userData }),
//     });
//   };

//   const signOut = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const resetPassword = async (email: string) => {
//     await fetch(`${API}/auth/reset-password`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email }),
//     });
//   };

//   const updatePassword = async (password: string) => {
//     const token = localStorage.getItem('token');
//     await fetch(`${API}/auth/update-password`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ password }),
//     });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         signIn,
//         signUp,
//         signOut,
//         refreshUser,
//         resetPassword,
//         updatePassword,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// }




// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// interface User {
//   id: string;
//   email: string;
//   role: 'wholesaler' | 'retailer';
//   name?: string;
//   business_name?: string;
//   location?: string;
//   phone?: string;
//   trust_score?: number;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<User | null>;
//   signUp: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
//   signOut: () => void;
  
// }

// const API = 'http://localhost:8080/api';
// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const token = localStorage.getItem('token');
//   const storedUser = localStorage.getItem('user');

//   if (!token || !storedUser) {
//     setLoading(false);
//     return;
//   }

//   try {
//     const parsedUser = JSON.parse(storedUser) as User;
//     setUser(parsedUser);
//   } catch {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setUser(null);
//   } finally {
//     setLoading(false);
//   }
// }, []);

  
//   // 🔹 Login
//   const signIn = async (email: string, password: string) => {
//     const res = await fetch(`${API}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!res.ok) throw new Error('Login failed');

//     const data = await res.json();

//     const normalizedUser: User = {
//       ...data.user,
//       role: data.user.role?.toLowerCase() ?? 'retailer',
//     };

//  localStorage.setItem('token', data.token);
// localStorage.setItem('user', JSON.stringify(normalizedUser));
// setUser(normalizedUser);

//     setLoading(false);

//     return normalizedUser;
//   };

//   // 🔹 Register
//   const signUp = async (
//     email: string,
//     password: string,
//     userData?: Partial<User>
//   ) => {
//     await fetch(`${API}/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password, ...userData }),
//     });
//   };

//   // 🔹 Logout
//   const signOut = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   setUser(null);
//   setLoading(false);
// };


//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         signIn,
//         signUp,
//         signOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
//   return ctx;
// }


// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// interface User {
//   id: string;
//   email: string;
//   role: 'wholesaler' | 'retailer';
//   name?: string;
//   business_name?: string;
//   location?: string;
//   phone?: string;
//   trust_score?: number;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<User>;
//   signUp: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
//   signOut: () => void;
// }

// const API = 'http://localhost:8080/api';
// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Restore user on app load
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');

//     if (!storedUser) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(storedUser) as User;
//       setUser(parsedUser);
//     } catch {
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ✅ Login (SINGLE source of truth)
//   const signIn = async (email: string, password: string): Promise<User> => {
//     setLoading(true);

//     const res = await fetch(`${API}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!res.ok) {
//       setLoading(false);
//       throw new Error('Login failed');
//     }

//     const data = await res.json();

//     const normalizedUser: User = {
//       ...data.user,
//       role: (data.user.role || 'retailer').toLowerCase(),
//     };

//     localStorage.setItem('token', data.token);
//     localStorage.setItem('user', JSON.stringify(normalizedUser));
//     setUser(normalizedUser);
//     setLoading(false);

//     return normalizedUser;
//   };

//   // ✅ Register
//   const signUp = async (
//     email: string,
//     password: string,
//     userData?: Partial<User>
//   ) => {
//     await fetch(`${API}/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password, ...userData }),
//     });
//   };

//   // ✅ Logout
//   const signOut = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setLoading(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         signIn,
//         signUp,
//         signOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error('useAuth must be used inside AuthProvider');
//   }
//   return ctx;
// }


'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Role = 'wholesaler' | 'retailer';

export interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
  trust_score?: number;
   business_name?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ⚠️ CHANGE THIS IF YOUR BACKEND IS DIFFERENT
const API_BASE = 'http://localhost:8080'; // ✅ NO /api unless backend has it

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
    } catch {
      localStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ LOGIN
  const signIn = async (email: string, password: string) => {
    setLoading(true);

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const msg = await res.text();
      setLoading(false);
      throw new Error(msg || 'Login failed');
    }

    const data = await res.json();

    // ✅ SUPPORT BOTH BACKEND RESPONSE TYPES
    const user: User = data.user
      ? {
          ...data.user,
          role: data.user.role.toLowerCase(),
        }
      : {
          id: data.id,
          email: data.email,
          role: data.role.toLowerCase(),
        };

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user);
    setLoading(false);
  };

  // ✅ LOGOUT
  const signOut = () => {
    localStorage.clear();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
