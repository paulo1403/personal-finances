import apiClient from './client';
import type { ApiResponse, AuthResponse } from '../../types';

export const authService = {
  register: (email: string, password: string) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/register', {
      email,
      password,
    }),

  login: (email: string, password: string) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', {
      email,
      password,
    }),
};
