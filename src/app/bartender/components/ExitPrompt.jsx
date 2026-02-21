'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import useSystemState from '@/hooks/useSystemState'

export default function ExitPrompt({ onCancel }) {
  const router = useRouter()
  const { closeWindow } = useSystemState()
  const modalRef = useRef(null)

  const handleConfirm = () => {
    closeWindow()
    router.push('/')
  }

  // Cerrar con ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel()
      if (e.key.toLowerCase() === 'y') handleConfirm()
      if (e.key.toLowerCase() === 'n') onCancel()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Click fuera
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={handleOutsideClick}
      >
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => e.stopPropagation()}
          className="
            mt-20 mr-6 w-80
            bg-black/95
            border border-red-500/30
            text-terminal-green
            font-mono text-xs
            shadow-[0_0_32px_#ff003340]
            rounded-sm
            overflow-hidden
          "
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-red-500/20 text-red-400 tracking-wider">
            SYSTEM WARNING
          </div>

          {/* Body */}
          <div className="px-4 py-4 space-y-4">
            <p className="opacity-80 leading-relaxed">
              &gt; Exit current module?
            </p>

            <div className="flex justify-between pt-2">
              <button
                onClick={handleConfirm}
                className="
                  text-red-400 hover:text-red-300
                  hover:drop-shadow-[0_0_6px_#ff0033]
                  transition
                "
              >
                [ Y ] CONFIRM
              </button>

              <button
                onClick={onCancel}
                className="
                  text-purple-400 hover:text-purple-300
                  hover:drop-shadow-[0_0_6px_#9333ea]
                  transition
                "
              >
                [ N ] CANCEL
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
