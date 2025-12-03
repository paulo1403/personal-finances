import { Loader2 } from 'lucide-react'

interface GlobalLoaderProps {
  isVisible: boolean
  message?: string
}

export function GlobalLoader({ isVisible, message }: GlobalLoaderProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-9999 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-8 flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-spin" />
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {message || 'Cargando...'}
          </p>
          <div className="flex gap-1 justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
