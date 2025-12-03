import apiClient from './client';
import type { ApiResponse, DashboardData } from '../../types';

export const dashboardService = {
  getSummary: () => apiClient.get<ApiResponse<DashboardData>>('/api/dashboard/summary'),
};
