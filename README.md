# 💰 Personal Finances API

API moderna para gestionar finanzas personales con **Bun**, **ElysiaJS**, **Prisma 7** y **SQLite**.

## 🚀 Tech Stack

- **Runtime**: Bun
- **Framework**: ElysiaJS v1.4.17
- **ORM**: Prisma 7
- **Database**: SQLite
- **Auth**: JWT
- **Language**: TypeScript

## ✨ Features

- 🔐 Autenticación JWT (registro y login)
- 📂 Gestión de categorías
- 💳 CRUD de transacciones (INCOME/EXPENSE)
- 📤 Bulk import de transacciones
- 💼 Presupuestos por categoría y mes
- 📊 Dashboard con resumen y análisis
- 🔒 Type-safe validation
- 🛡️ Manejo de errores consistente

## 🛠️ Instalación

```bash
cd backend

# Instalar dependencias
bun install

# Configurar .env
echo "DATABASE_URL=file:./dev.db" > .env
echo "JWT_SECRET=tu-secreto" >> .env

# Setup BD
bun run db:generate
bun run db:migrate

# Iniciar servidor
bun run dev
```

Servidor disponible en **http://localhost:3000**

## 📚 Quick API Reference

### Autenticación
```bash
# Registro
POST /auth/register
{ "email": "user@example.com", "password": "pass" }

# Login
POST /auth/login
{ "email": "user@example.com", "password": "pass" }
```

### Rutas protegidas (requieren `Authorization: Bearer <token>`)
```bash
# Categorías
GET    /api/categories
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id

# Transacciones
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
POST   /api/transactions/bulk

# Presupuestos
GET    /api/budgets
POST   /api/budgets
DELETE /api/budgets/:id

# Dashboard
GET    /api/dashboard/summary
```

## 📁 Estructura

```
backend/
├── src/
│   ├── index.ts           # Entry point
│   ├── types/elysia.d.ts  # Type declarations
│   ├── plugins/index.ts   # Core plugin (Prisma, JWT, Errors)
│   ├── routes/            # API endpoints
│   ├── schemas/index.ts   # Validación
│   └── lib/prisma.ts      # Prisma Client
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Migration history
└── package.json
```

## 🔧 Scripts

```bash
bun run dev              # Dev server con hot reload
bun run db:generate      # Generate Prisma Client
bun run db:migrate       # Create & apply migrations
bun run db:studio        # Prisma Studio UI
```

## 📝 Licencia

MIT
