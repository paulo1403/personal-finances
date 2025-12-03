import { useState } from 'react'
import { Wallet, ArrowRight } from 'lucide-react'
import { AuthForm } from '../../components/forms/AuthForm'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Finance Hub</h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Bienvenido de vuelta' : 'Comienza a gestionar tus finanzas'}
          </p>
        </div>

        {/* Card */}
        <Card className="border border-slate-700 bg-slate-800/50 backdrop-blur-xl shadow-2xl">
          <CardContent className="pt-6">
            <AuthForm isLogin={isLogin} />

            {/* Toggle authentication mode */}
            <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-4">
              <p className="text-xs text-slate-400 text-center font-medium">
                {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              </p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white border-0"
              >
                {isLogin ? 'Crear una nueva cuenta' : 'Volver a iniciar sesión'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="text-center">
          <p className="text-xs text-slate-500">
            Aplicación segura con encriptación de datos
          </p>
        </div>
      </div>
    </div>
  )
}
