'use client'

import { useState, useRef, useEffect } from 'react'
import Cursor from './Cursor' // Importamos el cursor mejorado
import s from '@/styles/CommandInput.module.css'

export default function CommandInput({ onCommand, isSystemBusy = false }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  // Mantener el foco automático
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus()
    focusInput()
    // Re-enfocar si el usuario hace clic en cualquier parte de la terminal
    window.addEventListener('click', focusInput)
    return () => window.removeEventListener('click', focusInput)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return

    onCommand?.(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className={s.inputForm}>
      {/* Prompt estilo Metro */}
      <span className={s.prompt}>
        <span className="text-zinc-600">[</span>
        <span className="text-green-500">STALKER</span>
        <span className="text-zinc-600">@</span>
        <span className="text-amber-500">BUNKER_D6</span>
        <span className="text-zinc-600">]</span>
        <span className="ml-1">~$</span>
      </span>

      <div className={s.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={s.nativeInput}
          placeholder="escribe un comando..."
          autoComplete="off"
          spellCheck={false}
          disabled={isSystemBusy}
        />
        
        {/* El cursor se posiciona dinámicamente al final del texto */}
        <Cursor isBusy={isSystemBusy} />
        
        <div className={s.activeLine} />
      </div>

      {/* Indicador de transmisión (opcional) */}
      {value.length > 0 && (
        <span className="text-[9px] text-green-900 animate-pulse hidden md:block">
          TRANSMITTING...
        </span>
      )}
    </form>
  )
}