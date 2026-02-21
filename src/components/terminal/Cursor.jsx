'use client'

import s from '@/styles/Cursor.module.css'

export default function Cursor({ isBusy = false }) {
  return (
    <span
      className={`
        ${s.cursorContainer} 
        ${isBusy ? s.busy : s.pulse}
      `}
      aria-hidden="true"
    >
      {/* Capa interna para simular el centro más brillante del fósforo */}
      <span style={{
        position: 'absolute',
        inset: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        pointerEvents: 'none'
      }} />
    </span>
  )
}