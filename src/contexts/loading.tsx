import { useState, createContext } from 'react'
import type { FC, ReactNode } from 'react'

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

export const loadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setLoading: () => {}
})

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const setLoading = (value: boolean): void => {
    setIsLoading(value)
  }

  return (
    <loadingContext.Provider
      value={{
        isLoading,
        setLoading
      }}
    >
      {children}
    </loadingContext.Provider>
  )
}
