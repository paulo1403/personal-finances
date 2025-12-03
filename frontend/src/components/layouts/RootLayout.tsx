import { useAuth } from '../../hooks/useAuth'
import { Navbar } from '../common/Navbar'
import { Sidebar } from '../common/Sidebar'

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
