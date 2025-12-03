import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/cn';

export function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardService.getSummary(),
    select: (res) => res.data.data,
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al cargar el dashboard';
    const axiosError = error as any;
    const statusCode = axiosError?.response?.status;
    const serverError = axiosError?.response?.data?.error;
    
    console.error('Dashboard error:', {
      message: errorMessage,
      status: statusCode,
      serverError,
      fullError: error,
    });

    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error al cargar el dashboard</p>
          <p className="text-sm mt-2">{serverError || errorMessage}</p>
          {statusCode && <p className="text-sm">Status: {statusCode}</p>}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          No hay datos disponibles
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {data && (
        <>
          {/* Tarjetas principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-slate-600 text-sm font-medium">Ingresos</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {formatCurrency(data.totalIncome)}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-slate-600 text-sm font-medium">Gastos</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {formatCurrency(data.totalExpenses)}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-slate-600 text-sm font-medium">Balance</p>
              <p
                className={`text-3xl font-bold mt-2 ${data.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {formatCurrency(data.balance)}
              </p>
            </div>
          </div>

          {/* Gastos por categoría */}
          {data.expensesByCategory && data.expensesByCategory.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Gastos por categoría</h2>
              <div className="space-y-3">
                {data.expensesByCategory.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm font-medium">{formatCurrency(item.total)}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seguimiento de presupuestos */}
          {data.budgetTracking && data.budgetTracking.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Seguimiento de presupuestos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Categoría</th>
                      <th className="px-4 py-2 text-right">Presupuesto</th>
                      <th className="px-4 py-2 text-right">Gastado</th>
                      <th className="px-4 py-2 text-right">Restante</th>
                      <th className="px-4 py-2 text-right">% Usado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.budgetTracking.map((budget) => (
                      <tr key={budget.category} className="border-t">
                        <td className="px-4 py-2">{budget.category}</td>
                        <td className="px-4 py-2 text-right">{formatCurrency(budget.budget)}</td>
                        <td className="px-4 py-2 text-right text-red-600">
                          {formatCurrency(budget.spent)}
                        </td>
                        <td className="px-4 py-2 text-right">{formatCurrency(budget.remaining)}</td>
                        <td className="px-4 py-2 text-right">
                          <span
                            className={budget.percentage > 90 ? 'text-red-600 font-bold' : ''}
                          >
                            {budget.percentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
