import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});

export const createTransactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  description: z.string().optional(),
  date: z.string().or(z.date()),
  type: z.enum(['INCOME', 'EXPENSE']),
  categoryId: z.string(),
});

export const createBudgetSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  month: z.number().min(1).max(12),
  year: z.number(),
  categoryId: z.string(),
});
