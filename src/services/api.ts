
import axios from 'axios';
import { AuthResponse, LoginCredentials, User } from '../store/types/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const authApi = {
  login: (credentials: LoginCredentials) => 
    api.post<AuthResponse>('/auth/login', credentials),
  
  googleLogin: (token: string) => 
    api.post<AuthResponse>('/auth/google', { token }),
  
  facebookLogin: (accessToken: string) => 
    api.post<AuthResponse>('/auth/facebook', { accessToken }),
  
  refreshToken: (refreshToken: string) => 
    api.post<{ token: string; refreshToken: string }>('/auth/refresh-token', { refreshToken }),
  
  getMe: () => 
    api.get<User>('/auth/me'),
};

export default api;