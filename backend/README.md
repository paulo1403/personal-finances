# Personal Finances Backend

Backend de la aplicación de finanzas personales construido con **ElysiaJS**, **Prisma 7** y **BiomeJS**.

## 🚀 Inicio Rápido

### Instalación Automática (Recomendado)

```bash
chmod +x setup.sh
./setup.sh
```

### Instalación Manual

#### 1. Instalar Dependencias
```bash
bun install
```

#### 2. Configurar Variables de Entorno
```bash
cp .env.example .env
```

Edita `.env` y asegúrate de que `JWT_SECRET` tenga un valor seguro:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here-change-in-production"
```

#### 3. Generar Prisma Client
```bash
bun run db:generate
```

#### 4. Crear la Base de Datos
```bash
bun run db:migrate
```

#### 5. Iniciar el Servidor
```bash
bun run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── index.ts              # Punto de entrada principal
│   ├── lib/
│   │   └── prisma.ts         # Instancia singleton de Prisma
│   ├── types/
│   │   └── index.ts          # Tipos TypeScript
│   ├── utils/
│   │   ├── auth.ts           # Funciones de autenticación
│   │   └── validation.ts     # Esquemas de validación con Zod
│   └── routes/
│       ├── auth.ts           # Endpoints de autenticación
│       ├── categories.ts     # CRUD de categorías
│       ├── transactions.ts   # CRUD de transacciones
│       ├── budgets.ts        # CRUD de presupuestos
│       └── dashboard.ts      # Endpoint de dashboard
├── prisma/
│   ├── schema.prisma         # Schema de la base de datos
│   └── migrations/           # Historial de migraciones
├── generated/
│   └── prisma/               # Prisma Client generado
├── package.json
├── prisma.config.ts          # Configuración de Prisma 7
├── biome.json                # Configuración de BiomeJS
├── tsconfig.json             # Configuración de TypeScript
├── .env.example
├── .gitignore
├── setup.sh                  # Script de setup automático
├── MIGRATION.md              # Guía de migración a Prisma 7
└── README.md
```

## 📚 API Endpoints

### Autenticación

**POST** `/auth/register`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**POST** `/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Categorías

**GET** `/api/categories` (Requiere autenticación)
- Obtiene todas las categorías del usuario

**POST** `/api/categories` (Requiere autenticación)
```json
{
  "name": "Comida"
}
```

**PUT** `/api/categories/:id` (Requiere autenticación)
```json
{
  "name": "Alimentación"
}
```

**DELETE** `/api/categories/:id` (Requiere autenticación)

### Transacciones

**GET** `/api/transactions` (Requiere autenticación)
- Query params: `type`, `categoryId`, `startDate`, `endDate`

**POST** `/api/transactions` (Requiere autenticación)
```json
{
  "amount": 50.00,
  "description": "Almuerzo",
  "date": "2025-12-03",
  "type": "EXPENSE",
  "categoryId": "category-id"
}
```

**PUT** `/api/transactions/:id` (Requiere autenticación)

**DELETE** `/api/transactions/:id` (Requiere autenticación)

**POST** `/api/transactions/bulk` (Requiere autenticación)
```json
[
  {
    "amount": 100,
    "description": "Salario",
    "date": "2025-12-01",
    "type": "INCOME",
    "categoryId": "category-id"
  }
]
```

### Presupuestos

**GET** `/api/budgets` (Requiere autenticación)
- Query params: `month`, `year`

**POST** `/api/budgets` (Requiere autenticación)
```json
{
  "amount": 500.00,
  "month": 12,
  "year": 2025,
  "categoryId": "category-id"
}
```

**DELETE** `/api/budgets/:id` (Requiere autenticación)

### Dashboard

**GET** `/api/dashboard/summary` (Requiere autenticación)
- Obtiene un resumen completo con balance, gastos por categoría, transacciones recientes y estado de presupuestos

## 🛠️ Scripts Útiles

```bash
# Desarrollo
bun run dev

# Build para producción
bun run build

# Iniciar servidor de producción
bun run start

# Gestión de base de datos
bun run db:push        # Sincronizar schema con BD
bun run db:migrate     # Crear nueva migración
bun run db:studio      # Abrir Prisma Studio
bun run db:generate    # Regenerar Prisma Client

# Linting y Formato
bun run lint           # Ejecutar linter
bun run format         # Formatear código
```

## 🔒 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para la autenticación. Después de hacer login o register, se obtiene un token que debe incluirse en las solicitudes posteriores:

```
Authorization: Bearer <token>
```

## 📦 Dependencias Principales

- **elysia** (v1.4.17): Framework web rápido y modular
- **@prisma/client** (v7.1.0): Cliente ORM
- **@prisma/adapter-libsql** (v7.1.0): Adapter SQLite optimizado para Bun
- **@elysiajs/jwt** (v1.4.0): Plugin JWT para Elysia
- **@elysiajs/cors** (v1.4.0): Plugin CORS para Elysia
- **bcryptjs** (v3.0.3): Encriptación de contraseñas
- **zod** (v4.1.13): Validación de esquemas
- **@biomejs/biome** (v2.3.8): Linting y formateo de código
- **dotenv** (v16.4.5): Manejo de variables de entorno

## 🔧 Migración a Prisma 7

Este proyecto fue actualizado a **Prisma 7** siguiendo las mejores prácticas:

- ✅ Usa `@prisma/adapter-libsql` optimizado para Bun
- ✅ Prisma Client generado en carpeta `generated/prisma`
- ✅ Configuración centralizada en `prisma.config.ts`
- ✅ Instancia singleton de PrismaClient en `src/lib/prisma.ts`

Para más detalles, ver [MIGRATION.md](./MIGRATION.md)

## 📝 Notas de Desarrollo

- Asegúrate de cambiar `JWT_SECRET` en `.env` para producción
- La base de datos SQLite se crea automáticamente en `dev.db`
- Todos los endpoints protegidos requieren un token JWT válido en el header `Authorization`
- BiomeJS está configurado para formatear automáticamente en el save

## 🚀 Próximos Pasos

El backend está listo. Los próximos pasos incluyen:
1. Crear el frontend con React + Vite
2. Integrar React Query para manejo de estado
3. Crear componentes UI con shadcn/ui
4. Implementar gráficos con Recharts
5. Agregar funcionalidades de CSV y PDF

---

**Creado con ❤️ usando ElysiaJS y BiomeJS**
