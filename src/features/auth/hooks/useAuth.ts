import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import type { LoginCredentials, RegisterCredentials } from '../types';

export function useAuthActions() {
  const { dispatch } = useAuth();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === credentials.email);
      
      if (!user || user.password !== credentials.password) {
        throw new Error('Invalid credentials');
      }

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: true,
        createdAt: user.createdAt,
        updatedAt: new Date(),
      };

      if (credentials.remember) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      return { user: userData };
    } catch (error: any) {
      dispatch({ 
        type: 'LOGIN_ERROR', 
        payload: error.message 
      });
      throw error;
    }
  }, [dispatch]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (users.some((user: any) => user.email === credentials.email)) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: credentials.email,
        password: credentials.password, // In a real app, this should be hashed
        name: credentials.name || '',
        organizationId: credentials.organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to localStorage
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      
      return { message: 'Registration successful!' };
    } catch (error: any) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]);

  return { login, register, logout };
}