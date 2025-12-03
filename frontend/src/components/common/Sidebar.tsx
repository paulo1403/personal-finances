import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Sidebar() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-8">Menu</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-slate-800">
            📊 Dashboard
          </Link>
          <Link to="/categories" className="block px-4 py-2 rounded hover:bg-slate-800">
            📂 Categorías
          </Link>
          <Link to="/transactions" className="block px-4 py-2 rounded hover:bg-slate-800">
            💳 Transacciones
          </Link>
          <Link to="/budgets" className="block px-4 py-2 rounded hover:bg-slate-800">
            💼 Presupuestos
          </Link>
        </nav>
      </div>
    </aside>
  );
}
