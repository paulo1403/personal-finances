import apiClient from './client';
import type { ApiResponse, Category } from '../../types';

export const categoriesService = {
  list: () => apiClient.get<ApiResponse<Category[]>>('/api/categories'),

  create: (name: string) => apiClient.post<ApiResponse<Category>>('/api/categories', { name }),

  update: (id: string, name: string) =>
    apiClient.put<ApiResponse<Category>>(`/api/categories/${id}`, { name }),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/categories/${id}`),
};
