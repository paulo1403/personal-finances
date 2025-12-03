import apiClient from './client';
import type { ApiResponse, Budget } from '../../types';

export const budgetsService = {
  list: (params?: { month?: number; year?: number }) =>
    apiClient.get<ApiResponse<Budget[]>>('/api/budgets', { params }),

  create: (data: { amount: number; month: number; year: number; categoryId: string }) =>
    apiClient.post<ApiResponse<Budget>>('/api/budgets', data),

  delete: (id: string) => apiClient.delete<ApiResponse<{ message: string }>>(`/api/budgets/${id}`),
};
