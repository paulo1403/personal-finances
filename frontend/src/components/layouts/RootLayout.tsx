import { useAuth } from '../../hooks/useAuth'
import { Navbar } from '../common/Navbar'
import { Sidebar } from '../common/Sidebar'

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
