import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from './providers/ThemeProvider'
import { LoaderProvider, useLoader } from './contexts/LoaderContext'
import { RootLayout } from './components/layouts/RootLayout'
import { GlobalLoader } from './components/common/GlobalLoader'
import { Toaster } from './components/ui/sonner'
import { LoginPage } from './pages/auth/LoginPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { TransactionsPage } from './pages/transactions/TransactionsPage'
import { CategoriesPage } from './pages/categories/CategoriesPage'
import { BudgetsPage } from './pages/budgets/BudgetsPage'
import { ProfilePage } from './pages/account/ProfilePage'
import { useAuth } from './hooks/useAuth'

const queryClient = new QueryClient()

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppContent() {
  const { isLoading, message } = useLoader()

  return (
    <>
      <GlobalLoader isVisible={isLoading} message={message} />
      <BrowserRouter>
        <Toaster />
        <RootLayout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <CategoriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budgets"
              element={
                <ProtectedRoute>
                  <BudgetsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LoaderProvider>
          <AppContent />
        </LoaderProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
