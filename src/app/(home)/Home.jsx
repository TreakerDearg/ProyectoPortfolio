'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import useSystemState from '@/hooks/useSystemState'

import SystemBoot from '@/components/core/SystemBoot'
import Terminal from '@/components/terminal/Terminal'
import RoleSelector from '@/components/core/RoleSelector'
import ModuleCard from '@/components/Modules/ModuleCard'
import FullstackBootTransition from '@/components/transitions/FullstackBootTransition'

import { roles } from '@/lib/roles'
import { modules } from '@/lib/modules'
import s from '@/styles/HomePage.module.css'

const MODULE_ROUTES = {
  fullstack: '/fullstack',
  bartender: '/bartender',
  analyst: '/analyst',
}

const DECOR_LINE = "»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»";

export default function HomePage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const system = useSystemState()

  useEffect(() => {
    setIsMounted(true)

    // 🛡️ LIMPIEZA UNIVERSAL DE PURGA
    // Al entrar al Home desde cualquier módulo, eliminamos el bloqueo
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('EXIT_PURGE') === 'true') {
        console.log("SYSTEM_RECOVERY: Purge flag cleared.");
        sessionStorage.removeItem('EXIT_PURGE');
      }
    }
  }, [])

  if (!isMounted) {
    return <div className="min-h-screen bg-[#020502]" />
  }

  const { booted, role, setRole, activeModule, openWindow } = system

  return (
    <div className={s.mainWrapper}>
      <div className={s.screenFrame} />

      {/* 1. CAPA DE BOOT INICIAL DEL SISTEMA */}
      <AnimatePresence mode="wait">
        {!booted && (
          <SystemBoot key="bios-overlay" />
        )}
      </AnimatePresence>

      {/* 2. CONTENIDO PRINCIPAL */}
      <AnimatePresence>
        {booted && (
          <motion.main 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="min-h-screen relative z-10 p-10 md:p-16"
          >
            {/* 🚀 TRANSICIÓN DE MÓDULOS 
                Si hay un módulo activo y tenemos ruta para él, mostramos la transición.
                El componente FullstackBootTransition ahora detecta internamente 
                si debe mostrarse o no gracias al sessionStorage.
            */}
            {activeModule && MODULE_ROUTES[activeModule] ? (
              <FullstackBootTransition
                key={`transition-${activeModule}`}
                onComplete={() => {
                  // Pequeño delay de seguridad antes de la navegación SPA
                  router.push(MODULE_ROUTES[activeModule]);
                }}
              />
            ) : (
              /* INTERFAZ DEL TERMINAL (HOME) */
              <div className="max-w-7xl mx-auto">
                
                <header className="mb-12">
                  <pre className={s.asciiDecoration}>{DECOR_LINE}</pre>
                  <div className="flex justify-between items-end">
                    <div>
                      <h1 className="text-2xl font-bold text-terminal-green tracking-tighter font-aldrich">
                        METRO_STATION_TERMINAL v2.4
                      </h1>
                      <p className="text-xs text-terminal-green opacity-50 font-mono">
                        LOCATION: SECTOR_D6 | STATUS: <span className="animate-pulse text-green-400">ONLINE</span>
                      </p>
                    </div>
                    {role && (
                      <div className="text-right font-aldrich">
                        <span className={s.roleTag}>
                          ID_RECOGNIZED: {role.title}
                        </span>
                      </div>
                    )}
                  </div>
                </header>

                {/* SELECTOR DE ROL */}
                {!role && (
                  <section className="mb-12">
                    <div className={s.sectionHeader}>
                      <h2 className="text-terminal-green text-sm tracking-widest uppercase font-aldrich">
                       {/* // Load_Identity_Profile*/}
                      </h2>
                    </div>
                    <RoleSelector roles={roles} onSelect={setRole} />
                  </section>
                )}

                {/* TERMINAL DE COMANDOS */}
                <section className="mb-12">
                  <div className={s.sectionHeader}>
                    <h2 className="text-terminal-green text-sm tracking-widest uppercase font-aldrich">
                     {/* // Local_Command_Center*/}
                    </h2>
                  </div>
                  <Terminal />
                </section>

                {/* SUBSISTEMAS (MÓDULOS) */}
                {role && (
                  <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pb-20"
                  >
                    <div className={s.sectionHeader}>
                      <h2 className="text-purple-400 text-sm tracking-widest uppercase font-aldrich">
                        {/* Authorized_Subsystems */}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {modules.map((module, index) => (
                        <ModuleCard
                          key={module.id}
                          {...module}
                          delay={index * 0.1}
                          onClick={() => openWindow(module.id)}
                        />
                      ))}
                    </div>
                  </motion.section>
                )}

                <footer className="mt-auto pt-10 opacity-30 text-[10px] text-terminal-green flex justify-between font-mono">
                  <pre suppressHydrationWarning>{`[ CORE_TEMP: ${(Math.random() * 40 + 20).toFixed(1)}°C ]`}</pre>
                  <pre>{`// NO_INTRUSION_DETECTED`}</pre>
                </footer>
              </div>
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}