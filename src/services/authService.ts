import { LoginCredentials, AuthResponse } from '../types/auth';
import api from './api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    await api.post('/auth/logout', { refreshToken });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  },

  async loginWithGoogle(token: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/google', { token });
    return response.data;
  },

  async loginWithFacebook(token: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/facebook', { token });
    return response.data;
  },
};