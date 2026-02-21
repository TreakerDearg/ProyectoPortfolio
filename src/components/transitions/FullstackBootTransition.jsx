'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useReducer, useState } from 'react'
import s from './FullstackBootTransition.module.css'

// Importamos los sub-componentes (asumimos que les daremos el mismo estilo)
import BootHeader from './BootHeader'
import BootLogs from './BootLogs'
import BootTitle from './BootTitle'
import BootDiagnostics from './BootDiagnostics'
import BootProgress from './BootProgress'
import BootFooter from './BootFooter.jsx'

function bootReducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...state, phase: 'GLITCH_START', glitch: true }
    case 'GLITCH_OFF':
      return { ...state, glitch: false, phase: 'BOOTING' }
    case 'TICK': {
      const next = Math.min(state.progress + 2, 100)
      // Glitch aleatorio cerca del final por "sobrecarga"
      const extraGlitch = next > 85 && Math.random() > 0.7
      return { 
        ...state, 
        progress: next, 
        glitch: extraGlitch,
        phase: next >= 100 ? 'COMPLETE' : 'BOOTING' 
      }
    }
    case 'FINISH':
      return { ...state, phase: 'EXITING' }
    default:
      return state
  }
}

const initialState = {
  phase: 'IDLE',
  progress: 0,
  glitch: false,
}

export default function FullstackBootTransition({ onComplete, isExit = false }) {
  const [state, dispatch] = useReducer(bootReducer, initialState)
  const [visible, setVisible] = useState(true)

  const { progress, glitch, phase } = state

  useEffect(() => {
    dispatch({ type: 'START' })
    const g = setTimeout(() => dispatch({ type: 'GLITCH_OFF' }), 1000)
    return () => clearTimeout(g)
  }, [])

  useEffect(() => {
    if (phase !== 'BOOTING') return
    const interval = setInterval(() => dispatch({ type: 'TICK' }), 50)
    return () => clearInterval(interval)
  }, [phase])

  useEffect(() => {
    if (phase !== 'COMPLETE') return
    const exitDelay = setTimeout(() => {
      dispatch({ type: 'FINISH' })
      if (!isExit) {
        setTimeout(() => onComplete?.(), 600)
      }
      setTimeout(() => setVisible(false), 800)
    }, 500)
    return () => clearTimeout(exitDelay)
  }, [phase, isExit, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`${s.bootRoot} ${glitch ? s.glitchActive : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.5,
            filter: 'brightness(3) blur(20px)' 
          }}
          transition={{ duration: 0.5 }}
        >
          <div className={s.scanlineMove} />

          <div className={`${s.bootContainer} ${s.crtCurve}`}>
            {/* Header: Metadatos del sistema */}
            <BootHeader />

            {/* Logs dinámicos que reaccionan al progreso */}
            <div className="flex-1 overflow-hidden mt-6">
              <BootLogs progress={progress} />
            </div>

            {/* Título del Módulo (ej: FULLSTACK_CORE) */}
            <div className="my-8">
              <BootTitle glitch={glitch} />
            </div>

            {/* Diagnóstico de hardware ASCII */}
            <BootDiagnostics />

            {/* Barra de progreso de bloques */}
            <div className="mt-auto">
              <BootProgress progress={progress} />
            </div>

            <BootFooter />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}