# Personal Finances

Aplicación fullstack para gestión de finanzas personales. Arquitectura modular con backend ElysiaJS y frontend React.

## Stack

**Backend:** Bun, ElysiaJS, Prisma, SQLite, JWT  
**Frontend:** React 19, Vite, TypeScript, TanStack Query, Zustand, Tailwind CSS, shadcn/ui

## Estructura

```
├── backend/       # API REST con ElysiaJS
├── frontend/      # Aplicación React
└── package.json   # Workspace Bun
```

## Inicio Rápido

```bash
# Instalar dependencias
bun install

# Desarrollo (backend + frontend)
bun run dev

# Build
bun run build

# Linting
bun run lint
```

## Características

- ✅ Autenticación JWT con registro extendido
- ✅ Gestión de categorías, transacciones y presupuestos
- ✅ Dashboard con análisis de gastos
- ✅ Tema oscuro/claro con persistencia
- ✅ Type-safe en TypeScript
- ✅ Validación con Zod
- ✅ Componentes UI con shadcn/ui

## URLs

- **Backend:** http://localhost:3000
- **Frontend:** http://localhost:5173

## Migrations

```bash
# Aplicar cambios de schema
bun run db:migrate

# Generar cliente Prisma
bun run db:generate

# Ver estado
bun run db:status
```
