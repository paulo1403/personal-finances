import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Plus, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react'

interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
  date: string
}

export function TransactionsPage() {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      description: 'Salario Mensual',
      amount: 3000,
      category: 'Ingresos',
      type: 'income',
      date: '2025-12-01'
    },
    {
      id: '2',
      description: 'Compra en Supermercado',
      amount: 150,
      category: 'Alimentación',
      type: 'expense',
      date: '2025-12-02'
    },
    {
      id: '3',
      description: 'Pago de Servicios',
      amount: 80,
      category: 'Servicios',
      type: 'expense',
      date: '2025-12-03'
    },
  ])

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Transacciones</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Historial de todas tus transacciones</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Transacción
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Ingresos</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalIncome.toFixed(2)}</p>
              </div>
              <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Gastos</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalExpenses.toFixed(2)}</p>
              </div>
              <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-3">
                <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Descripción</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Categoría</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Fecha</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Monto</th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 text-slate-900 dark:text-white">{transaction.description}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{transaction.date}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${
                      transaction.type === 'income' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button type="button" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-medium">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
