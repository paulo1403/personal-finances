import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { prisma } from '../lib/prisma'

// 🔴 Custom error classes
export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ConflictError extends Error {
  constructor(message = 'Conflict') {
    super(message)
    this.name = 'ConflictError'
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class InvalidInputError extends Error {
  constructor(message = 'Invalid input') {
    super(message)
    this.name = 'InvalidInputError'
  }
}

export const basePlugin = new Elysia()
  // 1️⃣ Prisma global
  .decorate('prisma', prisma)

  // 2️⃣ JWT plugin (el nombre que el plugin usará en el context)
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET ?? 'change-me-in-prod',
    }),
  )

  // 3️⃣ Logger sencillo
  .onBeforeHandle(({ request }) => {
    console.log(
      `[${new Date().toISOString()}] ${request.method} ${request.url}`,
    )
  })

  // 4️⃣ Manejo de errores personalizados
  .error('UNAUTHORIZED', UnauthorizedError)
  .error('CONFLICT', ConflictError)
  .error('NOT_FOUND', NotFoundError)
  .error('INVALID_INPUT', InvalidInputError)

  // 5️⃣ Handlers para errores personalizados
  .onError(({ code, error, set }) => {
    if (code === 'UNAUTHORIZED') {
      set.status = 401
      return {
        success: false,
        error: '❌ Unauthorized - Invalid or missing token',
      }
    }

    if (code === 'CONFLICT') {
      set.status = 409
      return {
        success: false,
        error: '❌ Conflict - Resource already exists',
      }
    }

    if (code === 'NOT_FOUND') {
      set.status = 404
      return {
        success: false,
        error: '❌ Not Found - Resource does not exist',
      }
    }

    if (code === 'INVALID_INPUT') {
      set.status = 400
      return {
        success: false,
        error: '❌ Invalid input - Check your request',
      }
    }

    // Error genérico
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error'
    console.error(`❌ Error: ${errorMessage}`)
    set.status = 500
    return {
      success: false,
      error: errorMessage,
    }
  })

export const core = basePlugin
  // 6️⃣ Decorador para user (se utiliza en rutas protegidas)
  .derive({ as: 'scoped' }, async ({ headers, jwt: jwtInstance, set }) => {
    const auth = headers.authorization
    if (!auth?.startsWith('Bearer ')) {
      set.status = 401
      throw new UnauthorizedError('Missing Authorization header')
    }

    const token = auth.slice(7)
    try {
      const payload = await jwtInstance.verify(token)
      return { user: payload }
    } catch {
      set.status = 401
      throw new UnauthorizedError('Invalid token')
    }
  })

