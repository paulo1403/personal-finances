import { Elysia } from 'elysia'
import { hashPassword, verifyPassword } from '../utils/auth'
import { credentialsSchema, registerSchema } from '../schemas'
import { basePlugin } from '../plugins'

export const authRouter = new Elysia()
  .use(basePlugin)
  .group('/auth', (app) =>
    app
      .post(
        '/register',
        async ({ body, prisma, jwt, set }) => {
          const { email, password, firstName, lastName, currency } = body

          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email },
          })

          if (existingUser) {
            set.status = 409
            throw new Error('User already exists')
          }

          const passwordHash = await hashPassword(password)
          const fullName = [firstName, lastName].filter(Boolean).join(' ') || undefined

          const user = await prisma.user.create({
            data: {
              email,
              passwordHash,
              firstName,
              lastName,
              fullName,
              currency: currency || 'USD',
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
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              token,
            },
          }
        },
        { body: registerSchema },
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
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              token,
            },
          }
        },
        { body: credentialsSchema },
      ),
  )

export default authRouter
