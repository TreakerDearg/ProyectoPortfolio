'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle } from 'lucide-react' // Nuevo icono
import useSystemState from '../../../hooks/useSystemState'
import styles from '../styles/exitPrompt.module.css'

export default function ExitPrompt({ onCancel }) {
  const router = useRouter()
  const { closeWindow } = useSystemState()
  const modalRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel()
      if (e.key.toLowerCase() === 'y') handleConfirm()
      if (e.key.toLowerCase() === 'n') onCancel()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onCancel])

  const handleConfirm = () => {
    closeWindow()
    router.push('/')
  }

  if (!mounted) return null

  return createPortal(
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={styles.asciiWrapper}
      >
        <div className={styles.asciiFrame}>
          <div className={styles.asciiCornerTopL}>+</div>
          <div className={styles.asciiCornerTopR}>+</div>
          <div className={styles.asciiCornerBotL}>+</div>
          <div className={styles.asciiCornerBotR}>+</div>
          
          <div className={styles.terminalContent}>
            <div className={styles.header}>
              <AlertTriangle size={18} className="text-red-500 mr-2" /> {/* Icono añadido */}
              <span className="text-red-500 font-bold tracking-[0.3em]">ALERT</span>
            </div>

            <div className={styles.body}>
              <p className={styles.asciiDivider}>{"-".repeat(30)}</p>
              <div className="py-4 text-center">
                <p className="text-[14px] font-bold text-slate-100 mb-1">
                  ¿PROCEDER CON LA DESCONEXIÓN?
                </p>
                <p className="text-[10px] text-red-500/70 animate-pulse">
                  ESTA ACCIÓN ES IRREVERSIBLE
                </p>
                {/* Pequeño indicador de entrada */}
                <div className="mt-4 text-[10px] font-mono text-slate-600">
                  <span className="text-sky-400">[Y]</span> Confirmar • <span className="text-sky-400">[N]</span> Cancelar • <span className="text-sky-400">[ESC]</span> Salir
                </div>
              </div>

              <div className={styles.buttonGrid}>
                <button onClick={handleConfirm} className={styles.asciiBtnConfirm}>
                  <span className={styles.glitchText}>&gt; Y_CONFIRMAR</span> {/* Cambiamos a un estilo más dinámico */}
                </button>
                <button onClick={onCancel} className={styles.asciiBtnCancel}>
                  <span>&gt; N_ABORTAR</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}