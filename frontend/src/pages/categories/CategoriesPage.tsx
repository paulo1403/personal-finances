import { useState } from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Plus, Edit2, Trash2, Grid } from 'lucide-react'
import { useToast } from '../../hooks/useToast'

interface Category {
  id: string
  name: string
  color: string
  description: string
  transactionCount: number
}

export function CategoriesPage() {
  const { success } = useToast()
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Alimentación',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      description: 'Comida y bebidas',
      transactionCount: 12
    },
    {
      id: '2',
      name: 'Transporte',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      description: 'Gasolina, transporte público',
      transactionCount: 8
    },
    {
      id: '3',
      name: 'Entretenimiento',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      description: 'Películas, juegos, hobbies',
      transactionCount: 15
    },
    {
      id: '4',
      name: 'Servicios',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      description: 'Luz, agua, internet',
      transactionCount: 5
    },
  ])

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id))
    success('Categoría eliminada correctamente')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Categorías</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Organiza tus gastos por categorías</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Categoría
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${category.color} mb-3`}>
                      <Grid className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{category.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{category.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Transacciones</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{category.transactionCount}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Category Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500"
        >
          <CardContent className="pt-6 flex items-center justify-center h-full min-h-[280px]">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                <Plus className="h-6 w-6" />
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">Nueva Categoría</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Haz clic para agregar</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50">
        <CardContent className="pt-6">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold">Consejo:</span> Las categorías te ayudan a organizar y analizar tus gastos. Crea categorías que se adapten a tu estilo de vida.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
