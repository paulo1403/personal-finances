# 💰 Personal Finances - Frontend

Frontend moderno construido con **React 19**, **Vite**, **TypeScript** y **Tailwind CSS**.

## 🚀 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool (súper rápido)
- **TypeScript** - Type safety
- **React Router v7** - Routing
- **TanStack Query** - Server state management
- **Zustand** - Client state (auth)
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Zod** - Validation
- **Axios** - HTTP client

## 🛠️ Instalación

```bash
cd frontend

# Instalar dependencias
bun install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
bun run dev
```

Accede a `http://localhost:5173`

## 📁 Estructura

```
src/
├── components/         # Componentes reutilizables
│   ├── layouts/       # Layouts principales
│   ├── common/        # Componentes comunes (Navbar, Sidebar, etc.)
│   └── forms/         # Formularios
├── pages/             # Páginas (una por ruta)
├── services/
│   ├── api/           # Servicios de API
│   └── store/         # Estado global (Zustand)
├── hooks/             # Custom hooks
├── types/             # TypeScript types
├── utils/             # Utilidades (formatters, etc.)
└── App.tsx            # Router principal
```

## 📚 Features Implementadas

✅ Autenticación (Login/Register)  
✅ Dashboard con resumen de finanzas  
✅ Gestión de categorías  
✅ CRUD de transacciones  
✅ Presupuestos  
✅ Sidebar con navegación  
✅ Protected routes  
✅ JWT token management  

## 🔧 Scripts

```bash
bun run dev              # Dev server
bun run build            # Build para producción
bun run preview          # Preview de build
bun run lint             # Lint con ESLint
```

## 🔐 Configuración

Crear `.env` con:
```
VITE_API_URL=http://localhost:3000
```

## 📖 Notas

- El token JWT se guarda en localStorage
- Zustand persiste el estado de auth en localStorage
- React Query cachea automáticamente los datos del servidor
- Los interceptores de Axios manejan los 401 (redirigen a login)

## 🚀 Próximas Features

- [ ] Página de categorías completa
- [ ] Página de transacciones con tabla
- [ ] Página de presupuestos
- [ ] Filtros avanzados
- [ ] Gráficas con Chart.js
- [ ] Dark mode
- [ ] Responsive design completo

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
