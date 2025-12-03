import { Elysia } from 'elysia'
import { core, authMiddleware } from '../plugins'
import type { UserPayload } from '../types'

export const dashboardRouter = new Elysia()
  .use(core)
  .use(authMiddleware)
  .group('/api/dashboard', (app) =>
    app.get('/summary', async ({ prisma, user }) => {
      const userId = (user as unknown as UserPayload).id

      // Get total income and expenses
      const transactions = await prisma.transaction.groupBy({
        by: ['type'],
        where: { userId },
        _sum: { amount: true },
      })

      let totalIncome = 0
      let totalExpenses = 0

      transactions.forEach((t) => {
        if (t.type === 'INCOME') {
          totalIncome = t._sum.amount || 0
        } else if (t.type === 'EXPENSE') {
          totalExpenses = t._sum.amount || 0
        }
      })

      // Get expenses by category (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const expensesByCategory = await prisma.transaction.groupBy({
        by: ['categoryId'],
        where: {
          userId,
          type: 'EXPENSE',
          date: { gte: thirtyDaysAgo },
        },
        _sum: { amount: true },
      })

      const totalExpensesByCategory = expensesByCategory.reduce((sum, exp) => sum + (exp._sum.amount || 0), 0)

      const categoriesWithExpenses = await Promise.all(
        expensesByCategory.map(async (exp) => {
          const category = await prisma.category.findUnique({
            where: { id: exp.categoryId },
          })
          const amount = exp._sum.amount || 0
          return {
            category: category?.name || 'Unknown',
            total: amount,
            percentage: totalExpensesByCategory > 0 ? Math.round((amount / totalExpensesByCategory) * 100) : 0,
          }
        }),
      )

      // Get recent transactions
      const recentTransactions = await prisma.transaction.findMany({
        where: { userId },
        include: { category: true },
        orderBy: { date: 'desc' },
        take: 10,
      })

      // Calculate budget status
      const currentDate = new Date()
      const budgets = await prisma.budget.findMany({
        where: {
          userId,
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        },
        include: { category: true },
      })

      const budgetTracking = await Promise.all(
        budgets.map(async (budget) => {
          const spent = await prisma.transaction.aggregate({
            where: {
              userId,
              categoryId: budget.categoryId,
              type: 'EXPENSE',
              date: {
                gte: new Date(budget.year, budget.month - 1, 1),
                lte: new Date(budget.year, budget.month, 0),
              },
            },
            _sum: { amount: true },
          })

          const spentAmount = spent._sum.amount || 0
          const remaining = budget.amount - spentAmount

          return {
            category: budget.category.name,
            budget: budget.amount,
            spent: spentAmount,
            remaining: remaining,
            percentage: Math.round((spentAmount / budget.amount) * 100),
          }
        }),
      )

      return {
        success: true,
        data: {
          balance: totalIncome - totalExpenses,
          totalIncome,
          totalExpenses,
          expensesByCategory: categoriesWithExpenses,
          recentTransactions,
          budgetTracking,
        },
      }
    }),
  )

export default dashboardRouter
