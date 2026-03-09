'use client'

import { useSystemContext } from './useSystemContext'

export default function useSystemState() {
  const {
    booted,
    role,
    activeModule,
    setBooted,
    setRole,
    openModule,
    closeModule,
  } = useSystemContext()

  return {
    booted,
    role,
    activeModule,

    setRole,

    openWindow: openModule, // 👈 alias correcto
    closeWindow: closeModule,

    bootSystem: () => setBooted(true),
    shutdown: () => {
      setBooted(false)
      setRole(null)
      closeModule()
    },
  }
}
