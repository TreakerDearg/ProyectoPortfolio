'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ModuleCard from '@/components/Modules/ModuleCard'
import s from '@/styles/RoleSelector.module.css'

export default function RoleSelector({
  roles = [],
  onSelect,
  disabled = false,
}) {
  const [selectedId, setSelectedId] = useState(null)

  function handleSelect(role) {
    if (disabled || selectedId) return

    setSelectedId(role.id)
    onSelect?.(role)
  }

  return (
    <div className={s.selectorGrid}>
      {/* Cabecera decorativa de la sección */}
      <div className={s.instructionBox}>
        <span>[ DECRYPTING_PROFILES... ]</span>
        <span>SELECT_ONE_IDENTITY_TO_PROCEED</span>
        <span>[ 000-X77 ]</span>
      </div>

      {roles.map((role, i) => {
        const isSelected = selectedId === role.id
        const isDimmed = selectedId && !isSelected

        return (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`
              ${s.roleContainer} 
              ${isSelected ? s.selectedFrame : ''} 
              ${isDimmed ? s.dimmed : ''}
            `}
          >
            {/* Etiqueta ASCII superior por cada rol */}
            <div className="flex justify-between text-[9px] text-zinc-600 mb-1 px-1 font-mono">
              <span>ID: {role.id.toUpperCase()}</span>
              <span>{isSelected ? '[ SYNC_ACTIVE ]' : 'STATUS: PENDING'}</span>
            </div>

            <ModuleCard
              id={role.id}
              icon={role.icon}
              title={role.title}
              lines={role.lines}
              footer={role.footer}
              delay={0} // El delay lo maneja el padre ahora
              selected={isSelected}
              disabled={disabled || !!selectedId}
              onClick={() => handleSelect(role)}
            />

            {/* Decoración inferior de tarjeta */}
            {isSelected && (
              <motion.div 
                layoutId="selector-glow"
                className="absolute -inset-1 border border-green-500/30 blur-sm pointer-events-none"
              />
            )}
            
            <div className="mt-2 text-[8px] text-zinc-700 flex justify-between px-2">
              <span>{">"} STALKER_DB_ENTRY</span>
              <span>CONFIDENCE: 98%</span>
            </div>
          </motion.div>
        )
      })}

      {/* Footer del selector */}
      <div className="grid-column-1/-1 mt-4 text-center">
        <p className="text-[9px] text-zinc-500 animate-pulse">
          {selectedId 
            ? `> IDENTITY_LOCKED: ${selectedId.toUpperCase()}... LOADING_INTERFACE`
            : `> AWAITING_INPUT_FROM_USER_AT_BUNKER_D6`}
        </p>
      </div>
    </div>
  )
}