import type { AuthState } from '../types';

type AuthAction =
  | { type: 'INIT_SUCCESS' }
  | { type: 'INIT_ERROR'; payload: any }
  | { type: 'LOGIN_SUCCESS'; payload: any }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'INIT_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };
    case 'INIT_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}