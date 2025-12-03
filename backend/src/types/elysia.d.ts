import 'elysia'
import type { PrismaClient } from '@prisma/client'
import type {
  UnauthorizedError,
  ConflictError,
  NotFoundError,
  InvalidInputError,
} from '../plugins'

declare module 'elysia' {
  // 1️⃣ Propiedades decoradas que aparecen en los handlers
  interface ElysiaContext {
    prisma: PrismaClient
    user: unknown  // JWT payload (id, email, etc.)
  }

  // 2️⃣ Declarar los nombres de errores personalizados
  interface ErrorMap {
    UNAUTHORIZED: UnauthorizedError
    CONFLICT: ConflictError
    NOT_FOUND: NotFoundError
    INVALID_INPUT: InvalidInputError
  }
}
