import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/api/auth'
import { useAuthStore } from '../../services/store/useAuthStore'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface LoginFormProps {
  isLogin?: boolean;
}

export function AuthForm({ isLogin = true }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = isLogin
        ? await authService.login(email, password)
        : await authService.register(email, password);

      if (response.data.success && response.data.data) {
        const { id, email: userEmail, token } = response.data.data;
        setAuth({ id, email: userEmail, createdAt: '', updatedAt: '' }, token);
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
    } catch (err) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 border border-red-200">
          {error}
        </div>
      )}

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

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Procesando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </Button>
    </form>
  );
}
