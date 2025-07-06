'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        // Check localStorage for existing session
        const storedUser = localStorage.getItem('resume_analyzer_user');
        const storedAuth = localStorage.getItem('resume_analyzer_auth');
        
        if (storedUser && storedAuth === 'true') {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to restore auth state:', error);
        // Clear invalid data
        localStorage.removeItem('resume_analyzer_user');
        localStorage.removeItem('resume_analyzer_auth');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData: User) => {
    try {
      setUser(userData);
      setIsLoggedIn(true);
      
      // Persist to localStorage
      localStorage.setItem('resume_analyzer_user', JSON.stringify(userData));
      localStorage.setItem('resume_analyzer_auth', 'true');
    } catch (error) {
      console.error('Failed to save auth state:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsLoggedIn(false);
      
      // Clear localStorage
      localStorage.removeItem('resume_analyzer_user');
      localStorage.removeItem('resume_analyzer_auth');
    } catch (error) {
      console.error('Failed to clear auth state:', error);
    }
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
