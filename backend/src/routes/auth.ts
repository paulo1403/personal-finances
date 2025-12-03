import { Elysia } from 'elysia'
import { hashPassword, verifyPassword } from '../utils/auth'
import { credentialsSchema } from '../schemas'
import { core } from '../plugins'

export const authRouter = new Elysia()
  .use(core)
  .group('/auth', (app) =>
    app
      .post(
        '/register',
        async ({ body, prisma, jwt, set }) => {
          const { email, password } = body

          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email },
          })

          if (existingUser) {
            set.status = 409
            throw new Error('User already exists')
          }

          const passwordHash = await hashPassword(password)
          const user = await prisma.user.create({
            data: {
              email,
              passwordHash,
            },
          })

          const token = await jwt.sign({
            id: user.id,
            email: user.email,
          })

          set.status = 201
          return {
            success: true,
            data: {
              user: {
                id: user.id,
                email: user.email,
              },
              token,
            },
          }
        },
        { body: credentialsSchema },
      )
      .post(
        '/login',
        async ({ body, prisma, jwt, set }) => {
          const { email, password } = body

          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (!user) {
            set.status = 404
            throw new Error('User not found')
          }

          const passwordMatch = await verifyPassword(
            password,
            user.passwordHash,
          )

          if (!passwordMatch) {
            set.status = 401
            throw new Error('Invalid password')
          }

          const token = await jwt.sign({
            id: user.id,
            email: user.email,
          })

          return {
            success: true,
            data: {
              user: {
                id: user.id,
                email: user.email,
              },
              token,
            },
          }
        },
        { body: credentialsSchema },
      ),
  )

export default authRouter
