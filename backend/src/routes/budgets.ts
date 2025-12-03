import { Elysia } from 'elysia'
import { createBudgetSchema } from '../schemas'
import { core } from '../plugins'

export const budgetsRouter = new Elysia()
  .use(core)
  .group('/api/budgets', (app) =>
    app
      .get('/', async ({ query, prisma, user }) => {
        const userId = (user as any).id
        const { month, year } = query as { month?: string; year?: string }

        const where: any = { userId }

        if (month) where.month = parseInt(month)
        if (year) where.year = parseInt(year)

        const budgets = await prisma.budget.findMany({
          where,
          include: { category: true },
          orderBy: { createdAt: 'desc' },
        })

        return {
          success: true,
          data: budgets,
        }
      })
      .post(
        '/',
        async ({ body, prisma, user, set }) => {
          const data = body as any
          const userId = (user as any).id

          // Verify category belongs to user
          const category = await prisma.category.findUnique({
            where: { id: data.categoryId },
          })

          if (!category || category.userId !== userId) {
            set.status = 404
            throw new Error('Category not found')
          }

          // Upsert budget (create or update)
          const budget = await prisma.budget.upsert({
            where: {
              userId_categoryId_month_year: {
                userId,
                categoryId: data.categoryId,
                month: data.month,
                year: data.year,
              },
            },
            update: { amount: data.amount },
            create: {
              ...data,
              userId,
            },
            include: { category: true },
          })

          set.status = 201
          return {
            success: true,
            data: budget,
          }
        },
        { body: createBudgetSchema },
      )
      .delete('/:id', async ({ params, prisma, user, set }) => {
        const userId = (user as any).id

        const budget = await prisma.budget.findUnique({
          where: { id: params.id },
        })

        if (!budget || budget.userId !== userId) {
          set.status = 404
          throw new Error('Budget not found')
        }

        await prisma.budget.delete({
          where: { id: params.id },
        })

        return {
          success: true,
          data: { message: 'Budget deleted successfully' },
        }
      }),
  )

export default budgetsRouter
