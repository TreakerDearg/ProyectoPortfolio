'use client'

import { useMemo } from 'react'
import s from './BootLogs.module.css'

export default function BootLogs({ progress }) {
  const allLogs = useMemo(() => [
    { threshold: 0, text: 'INITIALIZING KERNEL 8.0.0-METRO-D6' },
    { threshold: 10, text: 'CHECKING I/O PORTS [ COM1, COM2 ]' },
    { threshold: 25, text: 'USB_BUS: 0x442 DETECTED HID_DEVICE' },
    { threshold: 40, text: 'NVME_DRIVE_0 MOUNTED AT /ROOT' },
    { threshold: 55, text: 'AUTH_MODULE: ROOT_ACCESS_GRANTED' },
    { threshold: 65, text: 'SCANNING FOR RADIATION LEAKS... CLEAN' },
    { threshold: 75, text: 'STACK_CHECK: ALL_SYSTEMS_STABLE' },
    { threshold: 85, text: 'RENDER_ENGINE: CRT_PHOSPHOR_v2.0' },
    { threshold: 92, text: 'DECRYPTING PORTFOLIO DATA...' },
    { threshold: 98, text: 'FINALIZING SYSTEM HANDOFF...' },
  ], [])

  const visibleLogs = useMemo(() => {
    return allLogs.filter(log => progress >= log.threshold)
  }, [progress, allLogs])

  return (
    <aside className={s.logsWrapper}>
      {visibleLogs.map((log, i) => {
        const isLast = i === visibleLogs.length - 1
        
        // Identificamos mensajes especiales para el color ámbar
        const isWarning = log.text.includes('FINALIZING') || log.text.includes('LEAKS')

        return (
          <div 
            key={`${i}-${log.threshold}`} 
            className={`${s.logLine} ${isLast ? s.activeLine : ''}`}
          >
            <span className={s.index}>
              [{String(i).padStart(2, '0')}]
            </span>
            
            <span className={isWarning ? s.systemMsg : ''}>
              {log.text}
            </span>

            {isLast && progress < 100 && (
              <span className="animate-pulse ml-1">_</span>
            )}
          </div>
        )
      })}
    </aside>
  )
}