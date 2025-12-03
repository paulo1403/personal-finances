import { Elysia } from 'elysia'
import { createTransactionSchema, bulkTransactionsSchema } from '../schemas'
import { core } from '../plugins'

export const transactionsRouter = new Elysia()
  .use(core)
  .group('/api/transactions', (app) =>
    app
      .get('/', async ({ query, prisma, user }) => {
        const userId = (user as any).id
        const { type, categoryId, startDate, endDate } = query as {
          type?: string
          categoryId?: string
          startDate?: string
          endDate?: string
        }

        const where: any = { userId }

        if (type) where.type = type
        if (categoryId) where.categoryId = categoryId
        if (startDate || endDate) {
          where.date = {}
          if (startDate) where.date.gte = new Date(startDate)
          if (endDate) where.date.lte = new Date(endDate)
        }

        const transactions = await prisma.transaction.findMany({
          where,
          include: { category: true },
          orderBy: { date: 'desc' },
        })

        return {
          success: true,
          data: transactions,
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

          const transaction = await prisma.transaction.create({
            data: {
              ...data,
              date: new Date(data.date),
              userId,
            },
            include: { category: true },
          })

          set.status = 201
          return {
            success: true,
            data: transaction,
          }
        },
        { body: createTransactionSchema },
      )
      .put(
        '/:id',
        async ({ params, body, prisma, user, set }) => {
          const data = body as any
          const userId = (user as any).id

          const transaction = await prisma.transaction.findUnique({
            where: { id: params.id },
          })

          if (!transaction || transaction.userId !== userId) {
            set.status = 404
            throw new Error('Transaction not found')
          }

          const updated = await prisma.transaction.update({
            where: { id: params.id },
            data: {
              ...data,
              date: new Date(data.date),
            },
            include: { category: true },
          })

          return {
            success: true,
            data: updated,
          }
        },
        { body: createTransactionSchema },
      )
      .delete('/:id', async ({ params, prisma, user, set }) => {
        const userId = (user as any).id

        const transaction = await prisma.transaction.findUnique({
          where: { id: params.id },
        })

        if (!transaction || transaction.userId !== userId) {
          set.status = 404
          throw new Error('Transaction not found')
        }

        await prisma.transaction.delete({
          where: { id: params.id },
        })

        return {
          success: true,
          data: { message: 'Transaction deleted successfully' },
        }
      })
      .post(
        '/bulk',
        async ({ body, prisma, user, set }) => {
          const transactions = body as Array<any>
          const userId = (user as any).id

          const created = await prisma.transaction.createMany({
            data: transactions.map((t) => ({
              ...t,
              date: new Date(t.date),
              userId,
            })),
          })

          set.status = 201
          return {
            success: true,
            data: {
              message: 'Transactions imported successfully',
              count: created.count,
            },
          }
        },
        {
          body: bulkTransactionsSchema,
        },
      ),
  )

export default transactionsRouter
