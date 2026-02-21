'use client'

import TerminalLine from './TerminalLine'
import s from '@/styles/CommandList.module.css'

export default function CommandList({ commands = [] }) {
  // Generamos un timestamp simple para el look retro
  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  }

  if (commands.length === 0) {
    return (
      <div className={s.emptyState}>
        <span className="animate-pulse">◈</span>
        <span>AWAITING_INPUT_SIGNAL...</span>
        <span className="flex-1 border-b border-dashed border-[#1a331a] ml-2" />
      </div>
    )
  }

  return (
    <div className={s.listContainer}>
      {commands.map((cmd, i) => (
        <div key={i} className={s.commandEntry}>
          {/* Marca de tiempo estilo log de servidor */}
          <span className={s.timestamp}>[{getTimestamp()}]</span>
          
          <TerminalLine
            text={cmd}
            prefix="USR >"
            className={s.historyText}
          />
        </div>
      ))}

      {/* Línea de espera activa (solo si no se está escribiendo) */}
      <div className={s.activeLine}>
        <TerminalLine
          text=""
          prefix="SYS >"
          typing={false}
          showCursor
        />
      </div>
    </div>
  )
}