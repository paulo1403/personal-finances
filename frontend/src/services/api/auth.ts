import apiClient from './client'
import type { ApiResponse, AuthResponse } from '../../types'

export const authService = {
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    currency?: string,
  ) => {
    // Construir el objeto sin campos undefined
    const payload: Record<string, any> = {
      email,
      password,
    }

    if (firstName) payload.firstName = firstName
    if (lastName) payload.lastName = lastName
    if (currency) payload.currency = currency

    return apiClient.post<ApiResponse<AuthResponse>>('/auth/register', payload)
  },

  login: (email: string, password: string) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', {
      email,
      password,
    }),
};
