'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSystemState from '@/hooks/useSystemState'
import s from '@/styles/SystemBoot.module.css'

const FRAME_TOP = `╔${"═".repeat(60)}╗`;
const FRAME_BOT = `╚${"═".repeat(60)}╝`;

const WELCOME_ASCII = `
   █▀▄ █▀▀ █▀▀ █▀▀ █▀█ █▀█ ██ █▀█ █ █ █ █ 
   █ █ █▀▀ ▀▀█ █▀▀ █ █ █▀▄ ██ █ █ █ █ █ █ 
   ▀▀  ▀▀▀ ▀▀▀ ▀▀▀ ▀ ▀ ▀ ▀ ▀▀ ▀▀▀ ▀▀▀ ▀▀▀
`;

export default function RetroBiosBoot() {
  const { bootSystem } = useSystemState()
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [logs, setLogs] = useState([])

  const systemLogs = [
    "> Cargando manifiesto del portfolio...",
    "> Verificando credenciales de acceso...",
    "> Módulo Fullstack: PREPARADO",
    "> Módulo Análisis: PREPARADO",
    "> Módulo Bartender: PREPARADO",
    "> Sincronizando interfaz neuronal...",
    "> ¡Bienvenido, Reclutador!",
  ]

  useEffect(() => {
    systemLogs.forEach((log, i) => {
      setTimeout(() => setLogs(prev => [...prev, log]), i * 700)
    })

    const interval = setInterval(() => {
      setProgress(p => (p < 100 ? p + 1 : 100))
    }, 40)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence onExitComplete={bootSystem}>
      {!isDone && (
        <motion.div 
          className={s.metroContainer}
          exit={{ opacity: 0, scale: 1.1, filter: 'contrast(2) brightness(0)' }}
        >
          <div className={s.overlay} />

          <motion.div 
            className={s.contentWrapper}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Alerta de Módulo */}
            <div className={s.moduleAlert}>
              [ SISTEMA PREPARADO PARA ENTRAR AL MÓDULO PRINCIPAL ]
            </div>

            <div className={s.textGreen} style={{ textAlign: 'center' }}>
              <pre className={s.asciiDivider}>{FRAME_TOP}</pre>
              <pre style={{ fontSize: '8px', lineHeight: 1 }}>{WELCOME_ASCII}</pre>
              <pre className={s.asciiDivider}>{FRAME_BOT}</pre>
            </div>

            <main>
              <div className={s.terminalLogs} style={{ minHeight: '140px' }}>
                {logs.map((log, i) => (
                  <motion.p 
                    key={i} 
                    initial={{ opacity: 0, x: -5 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className={log.includes('PREPARADO') ? s.textCyan : s.textGreen}
                    style={{ fontSize: '14px', margin: '4px 0' }}
                  >
                    <span style={{ opacity: 0.5 }}>{`[${new Date().toLocaleTimeString()}]`}</span> {log}
                  </motion.p>
                ))}
              </div>

              {/* Barra de progreso con estilo de bloques ASCII */}
              <div style={{ marginTop: '20px' }}>
                <p className={s.textAmber} style={{ fontSize: '12px' }}>DESENCRIPTANDO_DATOS_PORTFOLIO:</p>
                <p className={s.textGreen} style={{ letterSpacing: '2px' }}>
                  {`▐${'█'.repeat(Math.floor(progress / 4))}${'░'.repeat(25 - Math.floor(progress / 4))}▌ ${progress}%`}
                </p>
              </div>

              {progress === 100 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center' }}
                >
                  <button className={s.metroBtn} onClick={() => setIsDone(true)}>
                    INICIALIZAR EXPERIENCIA_OS
                  </button>
                  <p className={s.textCyan} style={{ fontSize: '10px', marginTop: '10px' }}>
                    * El uso de este sistema implica aceptación de términos creativos.
                  </p>
                </motion.div>
              )}
            </main>

            <footer style={{ marginTop: '20px', borderTop: '1px solid #1a331a', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span className={s.textGreen}>USER: GUEST_RECRUITER</span>
              <span className={s.textAmber}>OS: METRO_PORTFOLIO_v2</span>
              <span className={s.textGreen}>LOC: D6_STATION</span>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}