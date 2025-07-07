
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would hit an API
    const domain = email.split('@')[1];
    const collegeName = getCollegeName(domain);
    
    const mockUser: User = {
      id: '1',
      name: 'Demo Student',
      email,
      college: collegeName,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - verify .edu email
    if (!email.endsWith('.edu')) {
      throw new Error('Only .edu email addresses are allowed');
    }
    
    const domain = email.split('@')[1];
    const collegeName = getCollegeName(domain);
    
    const mockUser: User = {
      id: '1',
      name,
      email,
      college: collegeName,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const getCollegeName = (domain: string): string => {
    const colleges: { [key: string]: string } = {
      'nyu.edu': 'New York University',
      'columbia.edu': 'Columbia University',
      'harvard.edu': 'Harvard University',
      'mit.edu': 'MIT',
      'stanford.edu': 'Stanford University',
      'berkeley.edu': 'UC Berkeley',
      'ucla.edu': 'UCLA',
      'yale.edu': 'Yale University'
    };
    
    return colleges[domain] || domain.replace('.edu', '').toUpperCase();
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
