# 💰 Personal Finances - Fullstack Application

A modern, type-safe fullstack application for personal financial management built with Bun, ElysiaJS, React, and TypeScript.

## 📋 Project Structure

```
personal-finances/
├── backend/          # ElysiaJS backend with Prisma ORM
├── frontend/         # React 19 + Vite frontend
└── package.json      # Workspace configuration
```

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh) installed on your system

### Installation

```bash
# Install all dependencies for both backend and frontend
bun install
```

### Development

Run both backend and frontend concurrently:

```bash
bun run dev
```

Or run them individually:

```bash
bun run dev:backend  # Backend on localhost:3000
bun run dev:frontend # Frontend on localhost:5173
```

### Building

Build both applications:

```bash
bun run build
```

Or build individually:

```bash
bun run build:backend
bun run build:frontend
```

## 📦 Available Commands

### Workspace Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Run both backend and frontend |
| `bun run build` | Build both applications |
| `bun run lint` | Lint both applications with BiomeJS |
| `bun run format` | Format both applications with BiomeJS |

### Backend Commands

| Command | Description |
|---------|-------------|
| `bun run dev:backend` | Start backend dev server |
| `bun run build:backend` | Build backend |
| `bun run lint:backend` | Lint backend code |
| `bun run format:backend` | Format backend code |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:studio` | Open Prisma Studio |
| `bun run db:migrate` | Create database migration |
| `bun run db:generate` | Generate Prisma client |

### Frontend Commands

| Command | Description |
|---------|-------------|
| `bun run dev:frontend` | Start frontend dev server |
| `bun run build:frontend` | Build frontend |
| `bun run lint:frontend` | Lint frontend code |
| `bun run format:frontend` | Format frontend code |

## 🏗️ Tech Stack

### Backend
- **Runtime**: Bun
- **Framework**: ElysiaJS v1.4.17
- **Database**: SQLite with Prisma ORM v7
- **Authentication**: JWT with ElysiaJS JWT plugin
- **Validation**: Zod
- **Code Quality**: BiomeJS v2.3.8

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **State Management**: Zustand v5.0.9
- **API Client**: Axios v1.13.2 with JWT interceptors
- **Form Handling**: React Hook Form v7.67.0
- **Validation**: Zod v4.1.13
- **Styling**: Tailwind CSS v4.1.17
- **Components**: shadcn/ui (Button, Input, Card, Label)
- **Icons**: Lucide React v0.555.0
- **Data Fetching**: TanStack Query v5.90.11
- **Code Quality**: BiomeJS v2.3.8

## ✨ Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes in frontend
- Persistent session with localStorage

### Core Features
- Dashboard with financial overview
- Category management (CRUD)
- Transaction tracking and filtering
- Budget creation and management
- Financial statistics and reports

## 🔐 Environment Configuration

### Backend (.env)
```env
DATABASE_URL=file:./dev.db
JWT_SECRET=your-secret-key
PORT=3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 📝 API Endpoints

All endpoints are protected with JWT authentication:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /categories` - List categories
- `POST /categories` - Create category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category
- `GET /transactions` - List transactions
- `POST /transactions` - Create transaction
- `PUT /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction
- `POST /transactions/import` - Bulk import transactions
- `GET /budgets` - List budgets
- `POST /budgets` - Create budget
- `DELETE /budgets/:id` - Delete budget
- `GET /dashboard` - Get dashboard data

## 🧪 Testing

Both applications include BiomeJS for linting and code formatting:

```bash
# Run linting
bun run lint

# Format code
bun run format
```

## 📄 License

MIT

## 👤 Author

Paulo Llanos
