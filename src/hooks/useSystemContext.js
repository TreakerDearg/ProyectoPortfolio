'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const SystemContext = createContext(null)

export function SystemProvider({ children }) {
  const [booted, setBooted] = useState(false)
  const [role, setRole] = useState(null)
  const [activeModule, setActiveModule] = useState(null)

  const openModule = useCallback((id) => {
    setActiveModule(id)
  }, [])

  const closeModule = useCallback(() => {
    setActiveModule(null)
  }, [])

  return (
    <SystemContext.Provider
      value={{
        booted,
        role,
        activeModule,
        setBooted,
        setRole,
        openModule,
        closeModule,
      }}
    >
      {children}
    </SystemContext.Provider>
  )
}

export function useSystemContext() {
  const ctx = useContext(SystemContext)
  if (!ctx) {
    throw new Error('useSystemContext must be used inside SystemProvider')
  }
  return ctx
}
