import { Elysia } from 'elysia'
import { createCategorySchema } from '../schemas'
import { core } from '../plugins'
import type { UserPayload } from '../types'

export const categoriesRouter = new Elysia()
  .use(core)
  .group('/api/categories', (app) =>
    app
      .get('/', async ({ prisma, user }) => {
        const categories = await prisma.category.findMany({
          where: { userId: (user as unknown as UserPayload).id },
          orderBy: { createdAt: 'desc' },
        })

        return {
          success: true,
          data: categories,
        }
      })
      .post(
        '/',
        async ({ body, prisma, user, set }) => {
          const { name } = body
          const userId = (user as unknown as UserPayload).id

          const category = await prisma.category.create({
            data: {
              name,
              userId,
            },
          })

          set.status = 201
          return {
            success: true,
            data: category,
          }
        },
        { body: createCategorySchema },
      )
      .put(
        '/:id',
        async ({ params, body, prisma, user, set }) => {
          const { name } = body
          const userId = (user as unknown as UserPayload).id

          const category = await prisma.category.findUnique({
            where: { id: params.id },
          })

          if (!category || category.userId !== userId) {
            set.status = 404
            throw new Error('Category not found')
          }

          const updated = await prisma.category.update({
            where: { id: params.id },
            data: { name },
          })

          return {
            success: true,
            data: updated,
          }
        },
        { body: createCategorySchema },
      )
      .delete('/:id', async ({ params, prisma, user, set }) => {
        const userId = (user as unknown as UserPayload).id

        const category = await prisma.category.findUnique({
          where: { id: params.id },
        })

        if (!category || category.userId !== userId) {
          set.status = 404
          throw new Error('Category not found')
        }

        await prisma.category.delete({
          where: { id: params.id },
        })

        return {
          success: true,
          data: { message: 'Category deleted successfully' },
        }
      }),
  )

export default categoriesRouter
