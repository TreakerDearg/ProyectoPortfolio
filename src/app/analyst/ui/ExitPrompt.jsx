'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom' // Importante
import useSystemState from '@/hooks/useSystemState'
import styles from '@/app/analyst/styles/exitPrompt.module.css'

export default function ExitPrompt({ onCancel }) {
  const router = useRouter()
  const { closeWindow } = useSystemState()
  const modalRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  // Esperar a que el componente se monte en el cliente
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
  }, [])

  const handleConfirm = () => {
    closeWindow()
    router.push('/')
  }

  // Si no está montado (SSR), no renderizamos nada
  if (!mounted) return null

  // Usamos createPortal para teletransportar el modal al final del body
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
              <span className="text-red-500 font-bold tracking-[0.3em]">![ ALERT ]!</span>
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
              </div>

              <div className={styles.buttonGrid}>
                <button onClick={handleConfirm} className={styles.asciiBtnConfirm}>
                   [ Y_CONFIRMAR ]
                </button>
                <button onClick={onCancel} className={styles.asciiBtnCancel}>
                   [ N_ABORTAR ]
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body // Destino del portal
  )
}