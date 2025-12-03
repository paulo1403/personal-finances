import apiClient from './client';
import type { ApiResponse, Transaction } from '../../types';

export const transactionsService = {
  list: (params?: {
    type?: 'INCOME' | 'EXPENSE';
    categoryId?: string;
    startDate?: string;
    endDate?: string;
  }) => apiClient.get<ApiResponse<Transaction[]>>('/api/transactions', { params }),

  create: (data: {
    amount: number;
    description?: string;
    date: string;
    type: 'INCOME' | 'EXPENSE';
    categoryId: string;
  }) => apiClient.post<ApiResponse<Transaction>>('/api/transactions', data),

  update: (
    id: string,
    data: {
      amount: number;
      description?: string;
      date: string;
      type: 'INCOME' | 'EXPENSE';
      categoryId: string;
    }
  ) => apiClient.put<ApiResponse<Transaction>>(`/api/transactions/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/transactions/${id}`),

  bulkImport: (
    transactions: Array<{
      amount: number;
      description?: string;
      date: string;
      type: 'INCOME' | 'EXPENSE';
      categoryId: string;
    }>
  ) =>
    apiClient.post<ApiResponse<{ message: string; count: number }>>(
      '/api/transactions/bulk',
      transactions
    ),
};
