import { useAuth } from '../../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../common/Navbar'
import { Sidebar } from '../common/Sidebar'

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {!isLoginPage && <Navbar />}
      <div className="flex flex-1 overflow-hidden">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 overflow-auto p-6 max-w-full">{children}</main>
      </div>
    </div>
  )
}
