import { useState } from 'react';
import { AuthContext } from './AuthContext';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('chronos_token');
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('chronos_user');
    return stored ? JSON.parse(stored) : null;
  });

  function login(token: string, userData: User) {
    localStorage.setItem('chronos_token', token);
    localStorage.setItem('chronos_user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('chronos_token');
    localStorage.removeItem('chronos_user');
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}