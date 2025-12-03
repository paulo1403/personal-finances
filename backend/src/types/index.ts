import type { PrismaClient } from '../generated/prisma/client';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  amount: number;
  description?: string;
  date: Date;
  type: 'INCOME' | 'EXPENSE';
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  amount: number;
  month: number;
  year: number;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface UserPayload {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  currency?: string;
  iat?: number;
  exp?: number;
}

export type AppContext = {
  prisma: PrismaClient;
};
