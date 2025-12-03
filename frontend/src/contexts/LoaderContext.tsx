import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface LoaderContextType {
  isLoading: boolean
  message: string
  showLoader: (message?: string) => void
  hideLoader: () => void
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('Cargando...')

  const showLoader = useCallback((msg?: string) => {
    setMessage(msg || 'Cargando...')
    setIsLoading(true)
  }, [])

  const hideLoader = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <LoaderContext.Provider value={{ isLoading, message, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  )
}

export function useLoader() {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error('useLoader debe ser usado dentro de LoaderProvider')
  }
  return context
}
