"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/types/api";
import { login as apiLogin, logout as apiLogout, refreshToken } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const resp = await fetch('/api/auth/me');
        if (resp.ok) {
          const data = await resp.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    await apiLogin(email, password);
    // after login, fetch user
    const resp = await fetch('/api/auth/me');
    if (resp.ok) {
      const data = await resp.json();
      setUser(data);
    }
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const refresh = async () => {
    try {
      
      // optionally re-fetch user after refresh
    } catch (e) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
