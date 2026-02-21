'use client'

import s from './BootFooter.module.css'

export default function BootFooter() {
  return (
    <footer className={s.footer}>
      {/* Grupo Izquierdo: Identificación de Hardware */}
      <div className={s.dataGroup}>
        <div className={s.item}>
          <span>NODE_ID:</span>
          <span className={s.value}>FB-992-00-X</span>
        </div>
        <span className={s.separator}>|</span>
        <div className={s.item}>
          <span>KERNEL:</span>
          <span className={s.value}>STABLE</span>
        </div>
      </div>

      {/* Grupo Central: Métricas Térmicas */}
      <div className={`${s.dataGroup} hidden sm:flex`}>
        <div className={s.item}>
          <span>TEMP:</span>
          <span className={s.criticalValue}>32°C</span>
        </div>
        <div className={s.item}>
          <span>FAN_V:</span>
          <span className={s.value}>4.2k_RPM</span>
        </div>
      </div>

      {/* Grupo Derecho: Cursor de Sistema */}
      <div className="flex items-center gap-3">
        <span className="opacity-40 uppercase tracking-tighter">Awaiting_Sync</span>
        <div className={s.blink} />
      </div>
    </footer>
  )
}