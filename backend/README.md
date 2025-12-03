# Backend API

API REST con ElysiaJS para gestión de finanzas personales.

## Stack

- **Runtime:** Bun
- **Framework:** ElysiaJS 1.4.17
- **Database:** Prisma ORM + SQLite
- **Auth:** JWT (@elysiajs/jwt)
- **Validation:** Elysia TypeBox
- **Linting:** BiomeJS

## Estructura

```
src/
├── index.ts           # Entry point
├── routes/            # Endpoints (auth, categories, transactions, budgets, dashboard)
├── plugins/           # Plugins reutilizables (basePlugin, core)
├── schemas/           # Validación Zod/TypeBox
├── types/             # Tipos TypeScript
├── utils/             # Utilidades (auth, helpers)
└── lib/               # Configuración (prisma, etc)

prisma/
├── schema.prisma      # Modelos de base de datos
└── migrations/        # Historial de cambios
```

## Configuración

```bash
# Variables de entorno (.env)
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

## Desarrollo

```bash
# Instalar dependencias
bun install

# Desarrollo (con hot reload)
bun run dev

# Build
bun run build

# Linting
bun run lint

# Database
bun run db:migrate   # Aplicar migraciones
bun run db:generate  # Generar cliente Prisma
bun run db:studio    # Abrir Prisma Studio
```

## Endpoints

- `POST /auth/register` - Registrarse
- `POST /auth/login` - Iniciar sesión
- `GET/POST/PUT/DELETE /api/categories` - Gestión de categorías
- `GET/POST/PUT/DELETE /api/transactions` - Gestión de transacciones
- `GET/POST/DELETE /api/budgets` - Gestión de presupuestos
- `GET /api/dashboard/summary` - Resumen del dashboard

## Autenticación

Header requerido: `Authorization: Bearer <token>`

Token obtenido en login/register con estructura:
```json
{
  "id": "user-id",
  "email": "user@example.com"
}
```
