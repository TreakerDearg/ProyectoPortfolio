'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from '../../styles/exitPrompt.module.css'
import { TriangleAlert } from 'lucide-react'

export default function ExitPrompt({ onCancel }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel()
      if (e.key.toLowerCase() === 'y') handleConfirm()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onCancel])

  const handleConfirm = () => {
    // Aquí puedes añadir un sonido de "estática" o "click" antes de redirigir
    router.push('/')
  }

  if (!mounted) return null

  return createPortal(
    <div className={styles.metroOverlay} onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={styles.terminalContainer}
      >
        {/* Decoración Superior */}
        <div className={styles.terminalHeader}>
          <TriangleAlert size={14} className="text-amber-500" />
          <span>SYSTEM_EXIT_REQUEST</span>
          <div className={styles.headerLine} />
        </div>

        <div className={styles.terminalBody}>
          <div className={styles.warningBox}>
            <p className={styles.warningText}>
              ¿ESTÁ SEGURO DE QUE DESEA SELLAR EL BÚNKER?
            </p>
            <p className={styles.subText}>
              LA CONEXIÓN CON LA ESTACIÓN SE PERDERÁ.
            </p>
          </div>

          <div className={styles.actionGrid}>
            <button onClick={handleConfirm} className={styles.confirmBtn}>
              <span className={styles.btnKey}>[Y]</span> CONFIRMAR_SALIDA
            </button>
            <button onClick={onCancel} className={styles.cancelBtn}>
              <span className={styles.btnKey}>[N]</span> ABORTAR
            </button>
          </div>
        </div>

        {/* Footer de datos técnicos */}
        <div className={styles.terminalFooter}>
          <span>UID: ARTYOM_D6</span>
          <span className="animate-pulse">_</span>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}