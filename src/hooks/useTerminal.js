'use client'

import { useSystemContext } from './useSystemContext'

export function useTerminal() {
  const {
    addCommand,
    clearCommands,
    bootSystem,
    shutdown,
    setView,
  } = useSystemContext()

  const execute = (input) => {
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    addCommand(`> ${cmd}`)

    switch (cmd) {
      case 'help':
        addCommand('AVAILABLE COMMANDS:')
        addCommand('- help')
        addCommand('- clear')
        addCommand('- boot')
        addCommand('- shutdown')
        addCommand('- desktop')
        break

      case 'clear':
        clearCommands()
        break

      case 'boot':
        bootSystem()
        addCommand('SYSTEM BOOT SEQUENCE STARTED...')
        break

      case 'shutdown':
        shutdown()
        addCommand('SYSTEM SHUTDOWN COMPLETE.')
        break

      case 'desktop':
        setView('desktop')
        addCommand('SWITCHING TO DESKTOP UI...')
        break

      default:
        addCommand(`COMMAND NOT FOUND: ${cmd}`)
    }
  }

  return { execute }
}
