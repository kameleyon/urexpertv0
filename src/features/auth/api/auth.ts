import axios from 'axios';
import type { LoginCredentials, RegisterCredentials } from '../types';

const api = axios.create({
  baseURL: '/api/auth',
});

export const login = async (credentials: LoginCredentials) => {
  const { data } = await api.post('/login', credentials);
  return data;
};

export const register = async (credentials: RegisterCredentials) => {
  const { data } = await api.post('/register', credentials);
  return data;
};

export const verifyEmail = async (token: string) => {
  const { data } = await api.get(`/verify-email?token=${token}`);
  return data;
};

export const forgotPassword = async (email: string) => {
  const { data } = await api.post('/forgot-password', { email });
  return data;
};

export const resetPassword = async (token: string, password: string) => {
  const { data } = await api.post('/reset-password', { token, password });
  return data;
};