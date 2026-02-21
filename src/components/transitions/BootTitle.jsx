'use client'

import { motion } from 'framer-motion'
import s from './BootTitle.module.css'

export default function BootTitle({ glitch }) {
  return (
    <section className={s.titleContainer}>
      {/* Símbolo de Alerta Ámbar */}
      <div className={s.alertSymbol}>[ ! ]</div>

      {/* Título de Diagnóstico con Glitch */}
      <h1 className={`${s.mainTitle} ${glitch ? s.glitchActive : ''}`}>
        HARDWARE_DIAGNOSTIC_SEQUENCE
      </h1>

      {/* Bloque Invertido (Texto negro sobre fondo verde) */}
      <motion.h2
        className={s.systemRoot}
        animate={glitch ? { 
          x: [-2, 2, -2, 2, 0],
          backgroundColor: ["#33ff33", "#ff9900", "#33ff33"]
        } : {}}
        transition={{ duration: 0.2, repeat: glitch ? Infinity : 0 }}
      >
        SYSTEM ROOT
      </motion.h2>

      {/* Mensaje de Autorización con estética ASCII */}
      <div className={s.accessGranted}>
        {`╔${"═".repeat(30)}╗`}
        <br />
        {`║  DEV_ROOT_ACCESS_AUTHORIZED  ║`}
        <br />
        {`╚${"═".repeat(30)}╝`}
      </div>

      {/* Elemento decorativo de carga lateral (opcional) */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
        <pre className="text-[10px] text-green-500">
          {`|█|\n|█|\n|█|\n|░|\n|░|`}
        </pre>
      </div>
    </section>
  )
}