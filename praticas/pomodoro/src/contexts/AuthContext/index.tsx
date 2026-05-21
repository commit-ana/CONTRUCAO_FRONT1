import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { validateMockLogin } from '../../utils/validateMockLogin';

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'chronos-auth';

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem(STORAGE_KEY) === '1'
  );

  const login = useCallback((username: string, password: string) => {
    const isValid = validateMockLogin(username, password);
    if (isValid) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setIsAuthenticated(true);
    }
    return isValid;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext deve ser usado dentro de AuthContextProvider');
  return ctx;
}