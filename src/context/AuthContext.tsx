import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Demo credentials
  const validCredentials = {
    'admin': 'sose2024',
    'principal': 'principal123'
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem('sose-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setCurrentUser(authData.username);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (validCredentials[username as keyof typeof validCredentials] === password) {
      setIsAuthenticated(true);
      setCurrentUser(username);
      localStorage.setItem('sose-auth', JSON.stringify({ username }));
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('sose-auth');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentUser,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};