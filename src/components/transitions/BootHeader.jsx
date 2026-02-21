'use client'

import s from './BootHeader.module.css'

export default function BootHeader() {
  return (
    <header className={s.header}>
      {/* Lado Izquierdo: Versión y Módulo */}
      <div className={s.section}>
        <span className="font-bold">SYS_BOOT_v8.0.77</span>
        <span className={s.bracketText}>[</span>
        <span className="animate-pulse">RUNNING_DIAG</span>
        <span className={s.bracketText}>]</span>
      </div>

      {/* Centro: Estado de Red y Seguridad */}
      <div className={`${s.section} hidden md:flex`}>
        <div className="flex items-center gap-2">
          <span className={s.warning}>!</span>
          <span>NET: OFFLINE</span>
        </div>
        <span className={s.bracketText}>|</span>
        <div className="opacity-70">
          ENC: <span className="text-white">AES_256_STRICT</span>
        </div>
      </div>

      {/* Lado Derecho: Reloj de Sistema y Actividad */}
      <div className={s.section}>
        <div className="text-right leading-none">
          <p className="text-[8px] opacity-50">NODE_01</p>
          <p className="font-bold">TERMINAL_ACTIVE</p>
        </div>
        
        {/* Un pequeño indicador de actividad de disco ASCII */}
        <div className="w-4 h-4 border border-green-900 flex items-center justify-center">
          <span className="animate-spin text-[8px]">/</span>
        </div>
      </div>
    </header>
  )
}