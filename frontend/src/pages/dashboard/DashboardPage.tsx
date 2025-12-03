import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, Wallet, PieChart, AlertCircle, CheckCircle } from 'lucide-react';
import { dashboardService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
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
        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">Error al cargar el dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600 dark:text-red-400">{serverError || errorMessage}</p>
            {statusCode && <p className="text-sm text-red-600 dark:text-red-400 mt-2">Status: {statusCode}</p>}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-yellow-700 dark:text-yellow-400">Sin datos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">No hay datos disponibles. Comienza agregando transacciones.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Resumen de tus finanzas personales</p>
        </div>      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance */}
        <Card className={`border-2 ${data.balance >= 0 ? 'border-green-200 dark:border-green-900' : 'border-red-200 dark:border-red-900'}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Balance Total</CardTitle>
            <Wallet className={`h-4 w-4 ${data.balance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${data.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(data.balance)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
              {data.balance >= 0 ? (
                <>
                  <CheckCircle className="h-3 w-3" />
                  En positivo
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3" />
                  En negativo
                </>
              )}
            </p>
          </CardContent>
        </Card>

        {/* Ingresos */}
        <Card className="border-2 border-green-200 dark:border-green-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(data.totalIncome)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Total recibido</p>
          </CardContent>
        </Card>

        {/* Gastos */}
        <Card className="border-2 border-red-200 dark:border-red-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Gastos</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {formatCurrency(data.totalExpenses)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Total gastado</p>
          </CardContent>
        </Card>
      </div>

      {/* Gastos por categoría */}
      {data.expensesByCategory && data.expensesByCategory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Gastos por Categoría
            </CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.expensesByCategory.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.category}</span>
                    <span className="text-slate-600 dark:text-slate-400">{formatCurrency(item.total)}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {item.percentage}% del total
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seguimiento de presupuestos */}
      {data.budgetTracking && data.budgetTracking.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Seguimiento de Presupuestos</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.budgetTracking.map((budget) => {
                const isOverBudget = budget.spent > budget.budget;
                const percentageUsed = (budget.spent / budget.budget) * 100;
                
                return (
                  <div key={budget.category} className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{budget.category}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {formatCurrency(budget.spent)} de {formatCurrency(budget.budget)}
                        </p>
                      </div>
                      <span className={`text-sm font-semibold ${isOverBudget ? 'text-red-600' : 'text-slate-600 dark:text-slate-400'}`}>
                        {budget.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          isOverBudget 
                            ? 'bg-gradient-to-r from-red-500 to-red-600' 
                            : 'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                        style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                      ></div>
                    </div>
                    {isOverBudget && (
                      <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Has excedido el presupuesto por {formatCurrency(budget.spent - budget.budget)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transacciones recientes */}
      {data.recentTransactions && data.recentTransactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Transacciones Recientes</CardTitle>
            <CardDescription>Tus últimas 10 transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {data.recentTransactions.slice(0, 10).map((transaction, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b last:border-0 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${transaction.type === 'INCOME' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {transaction.category?.name || 'Sin categoría'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {transaction.description || 'Sin descripción'}
                      </p>
                    </div>
                  </div>
                  <span className={`font-semibold ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}