import { useState } from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Plus, Edit2, Trash2, AlertCircle, CheckCircle, TrendingDown } from 'lucide-react'
import { useToast } from '../../hooks/useToast'

interface Budget {
  id: string
  category: string
  budget: number
  spent: number
  remaining: number
  percentage: number
  status: 'safe' | 'warning' | 'exceeded'
}

export function BudgetsPage() {
  const { success } = useToast()
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      category: 'Alimentación',
      budget: 500,
      spent: 350,
      remaining: 150,
      percentage: 70,
      status: 'safe'
    },
    {
      id: '2',
      category: 'Entretenimiento',
      budget: 200,
      spent: 220,
      remaining: -20,
      percentage: 110,
      status: 'exceeded'
    },
    {
      id: '3',
      category: 'Transporte',
      budget: 150,
      spent: 120,
      remaining: 30,
      percentage: 80,
      status: 'warning'
    },
    {
      id: '4',
      category: 'Servicios',
      budget: 300,
      spent: 280,
      remaining: 20,
      percentage: 93,
      status: 'warning'
    },
  ])

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id))
    success('Presupuesto eliminado correctamente')
  }

  const getStatusColor = (status: Budget['status']) => {
    switch (status) {
      case 'safe':
        return 'from-green-500 to-emerald-500'
      case 'warning':
        return 'from-amber-500 to-orange-500'
      case 'exceeded':
        return 'from-red-500 to-rose-500'
    }
  }

  const getStatusBg = (status: Budget['status']) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 dark:bg-green-900/30'
      case 'warning':
        return 'bg-amber-100 dark:bg-amber-900/30'
      case 'exceeded':
        return 'bg-red-100 dark:bg-red-900/30'
    }
  }

  const getStatusText = (status: Budget['status']) => {
    switch (status) {
      case 'safe':
        return 'text-green-600 dark:text-green-400'
      case 'warning':
        return 'text-amber-600 dark:text-amber-400'
      case 'exceeded':
        return 'text-red-600 dark:text-red-400'
    }
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const totalRemaining = totalBudget - totalSpent

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Presupuestos</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Controla tus gastos con presupuestos</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Presupuesto
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Presupuesto Total</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">${totalBudget.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Gastado</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">${totalSpent.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Disponible</p>
              <p className={`text-3xl font-bold mt-2 ${totalRemaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                ${totalRemaining.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budgets List */}
      <div className="space-y-4">
        {budgets.map((budget) => (
          <Card key={budget.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`rounded-lg p-3 ${getStatusBg(budget.status)}`}>
                        <TrendingDown className={`h-5 w-5 ${getStatusText(budget.status)}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{budget.category}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          ${budget.spent.toFixed(2)} de ${budget.budget.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getStatusText(budget.status)}`}>
                      {budget.percentage}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full bg-linear-to-r ${getStatusColor(budget.status)} rounded-full transition-all`}
                      style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {budget.status === 'exceeded' && (
                      <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium">
                        <AlertCircle className="h-3 w-3" />
                        Excedido
                      </span>
                    )}
                    {budget.status === 'safe' && (
                      <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                        <CheckCircle className="h-3 w-3" />
                        Dentro del presupuesto
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                      onClick={() => handleDeleteBudget(budget.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tip Card */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50">
        <CardContent className="pt-6">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold">Consejo:</span> Establece presupuestos realistas basados en tus ingresos y gastos habituales. Ajústalos según sea necesario.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
