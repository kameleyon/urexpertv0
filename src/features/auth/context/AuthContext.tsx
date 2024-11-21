import { createContext, useContext, useReducer, useEffect } from 'react';
import type { AuthState } from '../types';
import { authReducer } from './authReducer';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<any>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored auth state in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: JSON.parse(storedUser) 
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}