'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import s from '@/styles/BootLog.module.css'

const LOG_DATA = [
  { type: 'ok', text: 'LOADING_KERNEL_v4.12.9_STABLE' },
  { type: 'ok', text: 'NEURAL_LINK_ESTABLISHED' },
  { type: 'ok', text: 'MOUNTING_VIRTUAL_DRIVE_D6' },
  { type: 'ok', text: 'DECRYPTING_PORTFOLIO_MANIFEST.DAT' },
  { type: 'warn', text: 'UNAUTHORIZED_IDENTITY_DETECTED' },
  { type: 'msg', text: 'INITIATING_RESTRICTED_PROTOCOL_2033...' },
]

export default function BootLog() {
  const [visibleLines, setVisibleLines] = useState([])

  useEffect(() => {
    // Aparecen las líneas una por una
    LOG_DATA.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, LOG_DATA[i]])
      }, i * 400) // 400ms entre cada línea
    })
  }, [])

  return (
    <section className={s.container}>
      <motion.h1
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={s.title}
      >
        {'>'} INITIALIZING_STATION_BOOT...
      </motion.h1>

      <div className={s.logContainer}>
        {visibleLines.map((line, i) => (
          <div key={i} className={`${s.line} ${s.newLine}`}>
            {line.type === 'ok' && (
              <span className={s.ok}>[ OK ]</span>
            )}
            {line.type === 'warn' && (
              <span className={s.warn}>[ !! ]</span>
            )}
            <span className={line.type === 'warn' ? s.warn : s.msg}>
              {line.text}
            </span>
          </div>
        ))}
      </div>

      {/* Decoración ASCII sutil al final de los logs */}
      {visibleLines.length === LOG_DATA.length && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="text-[10px] mt-4 text-green-900"
        >
          {`------------------------------------------`}
          <br />
          {`STATUS: READY_FOR_COMMAND_INPUT`}
        </motion.div>
      )}
    </section>
  )
}