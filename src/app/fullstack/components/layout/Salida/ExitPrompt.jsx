'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import useSystemState from '@/hooks/useSystemState'

export default function ExitPrompt({ onCancel }) {
  const { closeWindow } = useSystemState()
  const router = useRouter()
  const modalRef = useRef(null)

  const handleConfirm = () => {
    // Solo limpiamos estado
    closeWindow()

    // Fade elegante sin romper SPA
    document.body.style.transition = 'filter 0.4s ease'
    document.body.style.filter = 'brightness(0)'

    setTimeout(() => {
      router.push('/')   // ✅ navegación limpia
      document.body.style.filter = ''
    }, 300)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel()
      if (e.key.toLowerCase() === 'y') handleConfirm()
      if (e.key.toLowerCase() === 'n') onCancel()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onCancel])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001015]/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) =>
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        onCancel()
      }
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        initial={{ opacity: 0, scale: 1.1, rotateX: 15 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        className="relative w-full max-w-[400px] p-[1px] bg-cyan-500/20"
        style={{
          clipPath:
            'polygon(0 15%, 5% 0, 100% 0, 100% 85%, 95% 100%, 0 100%)',
        }}
      >
        <div className="bg-[#050a0c] p-8" style={{ clipPath: 'inherit' }}>
          
          <div className="flex items-center gap-4 mb-6 border-b border-cyan-500/30 pb-4">
            <span className="material-symbols-outlined text-cyan-400 text-3xl animate-pulse">
              emergency_home
            </span>
            <div className="flex flex-col">
              <h2 className="text-cyan-400 font-aldrich text-lg tracking-[0.2em] uppercase">
                Nexus_Recall
              </h2>
              <span className="text-[9px] text-cyan-500/50 font-mono tracking-widest">
                ID: C17_M_TERMINAL_UNSTABLE
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <p className="text-cyan-100/70 font-mono text-[11px] leading-relaxed">
              &gt; <span className="text-cyan-400">WARNING:</span> UNAUTHORIZED DISCONNECTION DETECTED.
              <br />
              &gt; CENTRAL OVERWATCH WILL LOG THIS LOGOUT EVENT.
              <br />
              &gt; <span className="text-red-500/80">PURGE_SEQUENCE: ACTIVE.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 font-aldrich">
            <button
              onClick={handleConfirm}
              className="group relative py-3 bg-cyan-500/10 border border-cyan-500/40 hover:bg-cyan-500 hover:text-black transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-400" />
              <span className="text-[10px] tracking-[0.3em] font-bold">
                ACCEPT
              </span>
            </button>

            <button
              onClick={onCancel}
              className="group relative py-3 border border-red-500/20 text-red-500/60 hover:border-red-500 hover:text-red-500 transition-all duration-300"
            >
              <span className="text-[10px] tracking-[0.3em]">
                ABORT
              </span>
            </button>
          </div>

          <div className="mt-8 flex justify-between opacity-20 font-mono text-[7px] text-cyan-500">
            <span>TRANS_LINK_0x442</span>
            <span className="animate-pulse">STATION_ACTIVE</span>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </motion.div>
  )
}
