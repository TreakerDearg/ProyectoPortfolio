'use client'

import { motion } from 'framer-motion'
import s from './BootProgress.module.css'

export default function BootProgress({ progress }) {
  return (
    <section className={s.progressContainer}>
      <div className={s.header}>
        <span className="animate-pulse">INITIALIZING_DEV_CORE...</span>
        <span className={s.percentage}>{progress}%</span>
      </div>

      <div className={s.barTrack}>
        {/* La rejilla CSS es la que realmente da el look de bloques */}
        <div className={s.barGrid} />
        
        <motion.div
          className={s.barFill}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: 0.3, // Un poco más lento para que se vea el llenado
            ease: "easeInOut" // Usamos un easing estándar compatible
          }}
        />

        {/* Efecto de haz de luz */}
        <motion.div 
          animate={{ left: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-0 bottom-0 w-8 bg-white/10 blur-xl z-10"
        />
      </div>

      <div className={s.footer}>
        <div className="flex gap-4">
          <span>{`[ PHASE: 0x${Math.floor(progress/25).toString(16)} ]`}</span>
          <span>MEM_ALLOC: OK</span>
        </div>
        <div className="flex gap-4">
          <span>PID: 4812_SYS</span>
          <span className="animate-bounce">▼</span>
        </div>
      </div>
    </section>
  )
}