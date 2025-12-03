import { useNavigate, Link } from 'react-router-dom'
import { LogOut, Wallet, ChevronDown, User as UserIcon } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/button'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="px-6 py-0">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-2">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Finance Hub</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Personal Finances</p>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-6">
              <ThemeToggle />
              
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {user.firstName || 'User'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-400 transition-transform" style={{
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Cuenta</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
                        {user.fullName || user.firstName}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="block w-full px-4 py-2 text-sm text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <UserIcon className="h-4 w-4" />
                      Mi Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
