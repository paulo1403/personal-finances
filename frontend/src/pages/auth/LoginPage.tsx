import { useState } from 'react'
import { AuthForm } from '../../components/forms/AuthForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl text-center">💰 Personal Finances</CardTitle>
            <CardDescription className="text-center">
              {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea una nueva cuenta'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AuthForm isLogin={isLogin} />

            <div className="mt-6 space-y-2 text-center">
              {isLogin ? (
                <>
                  <p className="text-sm text-slate-600">¿No tienes cuenta?</p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsLogin(false)}
                  >
                    Regístrate aquí
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-600">¿Ya tienes cuenta?</p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsLogin(true)}
                  >
                    Inicia sesión
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
