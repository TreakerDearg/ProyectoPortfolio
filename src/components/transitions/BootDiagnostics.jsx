'use client'

import s from './BootDiagnostics.module.css'

export default function BootDiagnostics() {
  return (
    <section className="w-full">
      <div className={s.diagnosticsGrid}>
        {/* CPU DIAGNOSTIC */}
        <div className={s.diagCard}>
          <span className={s.label}>[ CPU_CORE ]</span>
          <span className={s.status}>CORE_SYNC: OK</span>
          <span className={s.subText}>16_THREADS_ACTIVE</span>
        </div>

        {/* MEMORY DIAGNOSTIC */}
        <div className={s.diagCard}>
          <span className={s.label}>[ MEM_BUFFER ]</span>
          <span className={s.status}>STABLE</span>
          <span className={s.subText}>LATENCY: 0.002MS</span>
        </div>

        {/* V-RAM DIAGNOSTIC */}
        <div className={s.diagCard}>
          <span className={s.label}>[ V-RAM_IO ]</span>
          <span className={s.status}>LOADED</span>
          <span className={s.subText}>DRIVER: v2.1.4_R</span>
        </div>

        {/* CPU MAPPING (ASCII Art Decorativo) */}
        <div className={s.cpuMap}>
          <p className="mb-1 text-green-900/40">CPU_CORE_MAP_X64:</p>
          <pre className="tracking-tighter">
            {`[■■■■■■■■□□□□□□□□] 50% LOAD\n`}
            {`[■■■■■■■■■■■■□□□□] 75% SYNC\n`}
            {`[■■■■■■■■■■■■■■■■] 100% THR`}
          </pre>
        </div>
      </div>

      {/* Indicador de integridad inferior */}
      <div className="flex justify-between items-center text-[8px] text-green-900 px-2">
        <span>INTEGRITY_CHECK: PASS</span>
        <span>VOLTAGE: 220V_STABLE</span>
        <span>TEMP: 42°C</span>
      </div>
    </section>
  )
}