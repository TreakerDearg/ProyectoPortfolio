'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

const SystemContext = createContext(undefined)

export function SystemProvider({ children }) {
  const [isSystemActive, setIsSystemActive] = useState(true)
  const [isWindowOpen, setIsWindowOpen] = useState(true)

  // Función que llama tu ExitPrompt
  const closeWindow = useCallback(() => {
    console.log("Cerrando sesión del analista...")
    setIsWindowOpen(false)
    setIsSystemActive(false)
    // Aquí podrías añadir lógica para limpiar localstorage o sesiones
  }, [])

  const openWindow = useCallback(() => {
    setIsWindowOpen(true)
    setIsSystemActive(true)
  }, [])

  const value = {
    isSystemActive,
    isWindowOpen,
    closeWindow,
    openWindow,
  }

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useSystemState() {
  const context = useContext(SystemContext)
  if (context === undefined) {
    throw new Error('useSystemState debe usarse dentro de un SystemProvider')
  }
  return context
}