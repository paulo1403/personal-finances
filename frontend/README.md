# Frontend App

Aplicación React para gestión de finanzas personales.

## Stack

- **Framework:** React 19
- **Bundler:** Vite
- **Language:** TypeScript
- **Routing:** React Router 7
- **State:** Zustand (auth) + TanStack Query (server)
- **Styling:** Tailwind CSS 4.1
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Axios

## Estructura

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Rutas principales
├── index.css             # Tailwind
├── components/
│   ├── common/           # Navbar, Sidebar, ThemeToggle
│   ├── forms/            # AuthForm
│   ├── layouts/          # RootLayout
│   └── ui/               # Componentes shadcn/ui
├── pages/
│   ├── auth/             # LoginPage
│   └── dashboard/        # DashboardPage
├── hooks/                # useAuth, useQuery hooks
├── services/
│   └── api/              # authService, etc
├── types/                # Interfaces TypeScript
├── stores/               # Zustand auth store
└── providers/            # ThemeProvider
```

## Configuración

```bash
# Variables de entorno (.env)
VITE_API_URL="http://localhost:3000"
```

## Desarrollo

```bash
# Instalar dependencias
bun install

# Desarrollo (con hot reload)
bun run dev

# Build
bun run build

# Preview build
bun run preview

# Linting
bun run lint
```

## Features

- 🔐 Autenticación JWT con registro completo
- 🌙 Tema oscuro/claro con persistencia
- 📊 Dashboard con análisis de gastos
- 💰 Gestión de categorías, transacciones y presupuestos
- 📱 Responsive design
- ✨ Componentes UI profesionales
- 🎯 Type-safe con TypeScript

## URLs

- **Dev:** http://localhost:5173
- **API:** http://localhost:3000

## Estructura de Rutas

- `/login` - Página de autenticación
- `/dashboard` - Dashboard principal (protegida)
- `/` - Redirecciona a dashboard
