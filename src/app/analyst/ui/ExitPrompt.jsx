'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle } from 'lucide-react'
// IMPORTANTE: Ajusta esta ruta a la ubicación real de tu hook
import { useSystemState } from '../context/useSystemState' 
import styles from '../styles/exitPrompt.module.css'

export default function ExitPrompt({ onCancel }) {
  const router = useRouter()
  const { closeWindow } = useSystemState() // Ahora sí está definido
  const modalRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  // Asegurar que el componente solo se renderice en el cliente (evita errores de hidratación)
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleConfirm = useCallback(() => {
    if (typeof closeWindow === 'function') {
      closeWindow()
    }
    router.push('/')
  }, [closeWindow, router])

  // Manejo de eventos de teclado
  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase()
      if (key === 'escape') onCancel()
      if (key === 'y') handleConfirm()
      if (key === 'n') onCancel()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onCancel, handleConfirm])

  // No renderizar nada si no estamos en el cliente o si no hay document.body
  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <div 
      className={styles.overlay} 
      onMouseDown={(e) => e.target === e.currentTarget && onCancel()}
    >
      <AnimatePresence>
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={styles.asciiWrapper}
        >
          <div className={styles.asciiFrame}>
            {/* Esquinas Decorativas */}
            <div className={styles.asciiCornerTopL}>+</div>
            <div className={styles.asciiCornerTopR}>+</div>
            <div className={styles.asciiCornerBotL}>+</div>
            <div className={styles.asciiCornerBotR}>+</div>
            
            <div className={styles.terminalContent}>
              <div className={styles.header}>
                <AlertTriangle size={18} className="text-red-500 mr-2" />
                <span className="text-red-500 font-bold tracking-[0.3em]">ALERT_SYSTEM_BREACH</span>
              </div>

              <div className={styles.body}>
                <p className={styles.asciiDivider}>{"-".repeat(35)}</p>
                
                <div className="py-6 text-center">
                  <p className="text-[14px] font-bold text-slate-100 mb-2 tracking-tight">
                    ¿PROCEDER CON LA DESCONEXIÓN DEL ANALISTA?
                  </p>
                  <p className="text-[10px] text-red-500/80 animate-pulse font-mono uppercase">
                    Advertencia: Los datos no guardados se perderán en el vacío.
                  </p>
                  
                  {/* Atajos de teclado visuales */}
                  <div className="mt-6 text-[10px] font-mono text-slate-500 border-t border-slate-800 pt-4">
                    <span className="text-sky-400/80">[Y]</span> Confirmar • 
                    <span className="text-sky-400/80"> [N]</span> Cancelar • 
                    <span className="text-sky-400/80"> [ESC]</span> Salir
                  </div>
                </div>

                <div className={styles.buttonGrid}>
                  <button 
                    onClick={handleConfirm} 
                    className={styles.asciiBtnConfirm}
                    aria-label="Confirmar desconexión"
                  >
                    <span className={styles.glitchText}>&gt; Y_EJECUTAR</span>
                  </button>
                  <button 
                    onClick={onCancel} 
                    className={styles.asciiBtnCancel}
                    aria-label="Abortar desconexión"
                  >
                    <span>&gt; N_ABORTAR</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body
  )
}