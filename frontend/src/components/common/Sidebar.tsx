import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Tag, CreditCard, PiggyBank, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { path: '/categories', label: 'Categorías', icon: Tag },
  { path: '/transactions', label: 'Transacciones', icon: CreditCard },
  { path: '/budgets', label: 'Presupuestos', icon: PiggyBank },
  { path: '/profile', label: 'Mi Cuenta', icon: User },
];

export function Sidebar() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white min-h-screen border-r border-slate-800">
      <div className="p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-8">Navegación</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-white"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
