import { useState } from 'react'
import { AuthForm } from '../../components/forms/AuthForm'

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
            💰 Personal Finances
          </h1>
          <p className="text-center text-slate-600 mb-8">
            {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea una nueva cuenta'}
          </p>

          <AuthForm isLogin={isLogin} />

          <div className="mt-6 text-center">
            {isLogin ? (
              <>
                <p className="text-slate-600 text-sm">¿No tienes cuenta?</p>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Regístrate aquí
                </button>
              </>
            ) : (
              <>
                <p className="text-slate-600 text-sm">¿Ya tienes cuenta?</p>
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Inicia sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
