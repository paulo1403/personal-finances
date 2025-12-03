// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  token: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Transaction Types
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  amount: number;
  description?: string;
  date: string;
  type: TransactionType;
  userId: string;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

// Budget Types
export interface Budget {
  id: string;
  amount: number;
  month: number;
  year: number;
  userId: string;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Types
export interface DashboardData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  expensesByCategory: Array<{
    category: string;
    total: number;
    percentage: number;
  }>;
  budgetTracking: Array<{
    category: string;
    budget: number;
    spent: number;
    remaining: number;
    percentageUsed: number;
  }>;
}
