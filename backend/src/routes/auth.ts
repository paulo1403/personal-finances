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
          try {
            console.log('🔐 [REGISTER] Received request body:', body)

            const { email, password, firstName, lastName, currency } = body

            console.log('📧 [REGISTER] Processing registration for:', email)

            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
              where: { email },
            })

            if (existingUser) {
              console.log('⚠️  [REGISTER] User already exists:', email)
              set.status = 409
              return {
                success: false,
                error: 'El usuario ya existe',
              }
            }

            console.log('🔒 [REGISTER] Hashing password...')
            const passwordHash = await hashPassword(password)
            const fullName = [firstName, lastName].filter(Boolean).join(' ') || undefined

            console.log('💾 [REGISTER] Creating user in database...')
            const user = await prisma.user.create({
              data: {
                email,
                passwordHash,
                firstName: firstName || null,
                lastName: lastName || null,
                fullName,
                currency: currency || 'USD',
              },
            })

            console.log('✅ [REGISTER] User created successfully:', user.id)

            console.log('🎫 [REGISTER] Generating JWT token...')
            const token = await jwt.sign({
              id: user.id,
              email: user.email,
            })

            set.status = 201
            console.log('🎉 [REGISTER] Registration successful for:', email)
            
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
          } catch (error) {
            console.error('❌ [REGISTER] Error during registration:', error)
            set.status = 500
            const message = error instanceof Error ? error.message : 'Error al registrarse'
            return {
              success: false,
              error: message,
            }
          }
        },
        { body: registerSchema },
      )
      .post(
        '/login',
        async ({ body, prisma, jwt, set }) => {
          try {
            console.log('🔐 [LOGIN] Received request for:', body.email)

            const { email, password } = body

            const user = await prisma.user.findUnique({
              where: { email },
            })

            if (!user) {
              console.log('❌ [LOGIN] User not found:', email)
              set.status = 404
              return {
                success: false,
                error: 'Usuario no encontrado',
              }
            }

            console.log('🔒 [LOGIN] Verifying password for:', email)
            const passwordMatch = await verifyPassword(
              password,
              user.passwordHash,
            )

            if (!passwordMatch) {
              console.log('❌ [LOGIN] Invalid password for:', email)
              set.status = 401
              return {
                success: false,
                error: 'Contraseña inválida',
              }
            }

            console.log('🎫 [LOGIN] Generating JWT token for:', email)
            const token = await jwt.sign({
              id: user.id,
              email: user.email,
            })

            console.log('✅ [LOGIN] Login successful for:', email)
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
          } catch (error) {
            console.error('❌ [LOGIN] Error during login:', error)
            set.status = 500
            const message = error instanceof Error ? error.message : 'Error al iniciar sesión'
            return {
              success: false,
              error: message,
            }
          }
        },
        { body: credentialsSchema },
      ),
  )

export default authRouter
