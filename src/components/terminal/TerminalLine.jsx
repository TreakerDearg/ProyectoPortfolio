'use client'

import { useMemo } from 'react'
import useTypewriter from '@/hooks/useTypewriter'
import Cursor from './Cursor'
import s from '@/styles/TerminalLine.module.css'

export default function TerminalLine({
  prefix = '>',
  text = '',
  showCursor = false,
  typing = true,
  speed = 25,
  delay = 0,
}) {
  const content = useTypewriter({
    text,
    speed,
    delay,
    enabled: typing,
  })

  // Determinamos si el texto ha terminado de escribirse
  const isFinished = useMemo(() => {
    if (!typing) return true
    return content.length === text.length
  }, [content, text, typing])

  // Clase dinámica basada en el estado
  const textClass = `
    ${s.content} 
    ${!isFinished ? s.isTyping : ''} 
    ${text.includes('ERR') || text.includes('WARN') ? s.systemAlert : ''}
  `

  return (
    <div className={s.lineWrapper}>
      {/* Prefijo con estilo industrial */}
      <span className={s.prefix}>{prefix}</span>

      <span className={textClass}>
        {content}
        
        {/* Mostramos el cursor si se solicita O si el sistema está escribiendo */}
        {(showCursor || (!isFinished && typing)) && (
          <Cursor isBusy={!isFinished} />
        )}
      </span>
    </div>
  )
}