import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/api/auth'
import { useAuthStore } from '../../services/store/useAuthStore'
import { useToast } from '../../hooks/useToast'
import { useLoader } from '../../contexts/LoaderContext'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface AuthFormProps {
  isLogin?: boolean
}

export function AuthForm({ isLogin = true }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const { success, error: showError } = useToast()
  const { showLoader, hideLoader } = useLoader()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const message = isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'
    showLoader(message)

    try {
      const response = isLogin
        ? await authService.login(email, password)
        : await authService.register(email, password, firstName, lastName, currency)

      if (response.data.success && response.data.data) {
        const { id, email: userEmail, firstName: fName, lastName: lName, token } = response.data.data
        setAuth(
          { id, email: userEmail, firstName: fName, lastName: lName },
          token,
        )
        localStorage.setItem('token', token)
        
        const successMessage = isLogin ? 'Sesión iniciada correctamente' : 'Cuenta creada exitosamente'
        success(successMessage)
        
        setTimeout(() => {
          hideLoader()
          navigate('/dashboard')
        }, 500)
      }
    } catch (err) {
      hideLoader()
      const error = err as { response?: { data?: { error?: string } } }
      const errorMessage = error.response?.data?.error || (isLogin ? 'Error al iniciar sesión' : 'Error al registrarse')
      showError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      {!isLogin && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Juan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Pérez"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Moneda</Label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="MXN">MXN ($)</option>
              <option value="ARS">ARS ($)</option>
              <option value="COP">COP ($)</option>
              <option value="CLP">CLP ($)</option>
              <option value="BRL">BRL (R$)</option>
              <option value="PEN">PEN (S/)</option>
            </select>
          </div>
        </>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Procesando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </Button>
    </form>
  )
}
