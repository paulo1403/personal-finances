import { t } from 'elysia';

export const credentialsSchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 }),
});

export const createCategorySchema = t.Object({
  name: t.String({ minLength: 1 }),
});

export const createTransactionSchema = t.Object({
  amount: t.Number({ minimum: 0 }),
  description: t.Optional(t.String()),
  date: t.Union([t.String(), t.Date()]),
  type: t.Union([t.Literal('INCOME'), t.Literal('EXPENSE')]),
  categoryId: t.String(),
});

export const bulkTransactionsSchema = t.Array(createTransactionSchema);

export const createBudgetSchema = t.Object({
  amount: t.Number({ minimum: 0 }),
  month: t.Number({ minimum: 1, maximum: 12 }),
  year: t.Number({ minimum: 2000 }),
  categoryId: t.String(),
});
