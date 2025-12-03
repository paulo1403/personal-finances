import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/button'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="border-b border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">💰 Finances</h1>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">{user.email}</span>
              <ThemeToggle />
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
