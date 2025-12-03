import { config } from 'dotenv';
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import authRouter from './routes/auth';
import transactionsRouter from './routes/transactions';
import categoriesRouter from './routes/categories';
import budgetsRouter from './routes/budgets';
import dashboardRouter from './routes/dashboard';

config();

const app = new Elysia()
  .use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization'],
  }))
  .use(authRouter)
  .use(transactionsRouter)
  .use(categoriesRouter)
  .use(budgetsRouter)
  .use(dashboardRouter)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
