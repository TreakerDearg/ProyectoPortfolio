'use client'

import { motion } from 'framer-motion'
import { memo, useCallback } from 'react'
import s from '@/styles/ModuleCard.module.css'

function ModuleCard({
  icon,
  id,
  title,
  lines = [],
  footer,
  delay = 0,
  onClick,
  selected = false,
  locked = false,
}) {
  const handleActivate = useCallback(() => {
    if (locked) return
    onClick?.(id)
  }, [locked, onClick, id])

  const handleKeyDown = useCallback((e) => {
    if (locked) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleActivate()
    }
  }, [handleActivate, locked])

  return (
    <motion.div
      role="button"
      tabIndex={locked ? -1 : 0}
      aria-disabled={locked}
      aria-pressed={selected}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: selected ? 1.05 : 1,
        borderColor: selected ? '#33ff33' : '#1a331a' 
      }}
      whileHover={!locked && !selected ? { y: -5, borderColor: '#33ff33' } : {}}
      transition={{ delay, duration: 0.3 }}
      className={`${s.card} ${selected ? s.selected : ''} ${locked ? s.locked : ''}`}
    >
      <div className={s.noise} />
      
      {/* Indicador de estado ASCII */}
      <div className="text-[8px] mb-2 opacity-30 flex justify-between font-mono">
        <span>{locked ? 'SECURE_NODE' : 'ACCESS_GRANTED'}</span>
        <span>{selected ? '[ ACTIVE ]' : id.toUpperCase()}</span>
      </div>

      <div className={`${s.icon} material-symbols-outlined`}>
        {locked ? 'lock' : icon}
      </div>

      <h3 className={s.title}>{title}</h3>

      <div className={s.lines}>
        {lines.map((line, i) => (
          <p key={`${id}-line-${i}`}>» {line}</p>
        ))}
      </div>

      <div className={s.footer}>
        <span className="font-mono">
          {locked ? '// ACCESO_DENEGADO' : footer?.toUpperCase()}
        </span>
        
        {!locked && (
          <span className="material-symbols-outlined text-sm">
            {selected ? 'target' : 'arrow_right_alt'}
          </span>
        )}
      </div>

      {/* Efecto de brillo inferior si está seleccionado */}
      {selected && (
        <motion.div 
          layoutId="card-glow"
          className="absolute bottom-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_#33ff33]"
        />
      )}
    </motion.div>
  )
}

export default memo(ModuleCard)