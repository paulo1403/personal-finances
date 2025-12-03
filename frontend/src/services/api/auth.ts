import apiClient from './client'
import type { ApiResponse, AuthResponse } from '../../types'

export const authService = {
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    currency?: string,
  ) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/register', {
      email,
      password,
      firstName,
      lastName,
      currency,
    }),

  login: (email: string, password: string) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', {
      email,
      password,
    }),
};
