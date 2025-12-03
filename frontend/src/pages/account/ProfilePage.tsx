import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { User, Mail, Save, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/useToast'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    currency: user?.currency || 'USD',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      // TODO: Implementar API call para actualizar perfil
      success('Perfil actualizado correctamente')
      setIsEditing(false)
    } catch {
      error('Error al actualizar el perfil')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    success('Sesión cerrada correctamente')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mi Cuenta</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Gestiona tu perfil y preferencias</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tu información de cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Nombre
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Apellido
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email Section */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Email
              </label>
              <div className="flex items-center px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
                <Mail className="h-4 w-4 text-slate-600 dark:text-slate-400 mr-2" />
                <span className="text-slate-900 dark:text-white">{user?.email}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">El email no puede ser modificado</p>
            </div>

            {/* Currency Section */}
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Moneda Preferida
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="USD">Dólares (USD)</option>
                <option value="EUR">Euros (EUR)</option>
                <option value="GBP">Libras Esterlinas (GBP)</option>
                <option value="MXN">Pesos Mexicanos (MXN)</option>
                <option value="ARS">Pesos Argentinos (ARS)</option>
                <option value="COP">Pesos Colombianos (COP)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  Editar Perfil
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User Avatar */}
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Status Info */}
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estado</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">Activa</p>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Miembro desde</p>
                <p className="text-sm text-slate-900 dark:text-white font-medium">
                  {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Logout Section */}
      <Card className="border-red-200 dark:border-red-900/30">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Seguridad y Sesión</CardTitle>
          <CardDescription>Opciones de seguridad y sesión</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
