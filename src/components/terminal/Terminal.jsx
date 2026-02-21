'use client'

import BootLog from '@/components/terminal/BootLog'
import CommandList from '@/components/terminal/CommandList'
import CommandInput from '@/components/terminal/CommandInput'
import { useTerminal } from '@/hooks/useTerminal'
import useSystemState from '@/hooks/useSystemState'

import s from '@/styles/Terminal.module.css'

export default function Terminal() {
  const { commands } = useSystemState()
  const { execute } = useTerminal()

  return (
    <section className={s.terminalContainer}>
      {/* Capas de atmósfera CRT */}
      <div className={s.flicker} />
      <div className={s.crtGrid} />
      
      {/* Decoraciones ASCII en esquinas */}
      <span className={`${s.cornerDecor} ${s.topRight}`}>┐</span>
      <span className={`${s.cornerDecor} ${s.bottomLeft}`}>└</span>

      {/* TERMINAL HEADER: Estilo BIOS/Militar */}
      <div className={s.terminalHeader}>
        <div className="flex gap-4">
          <span className={s.glowText}>[ SESSION_ID: 0x8872 ]</span>
          <span className="opacity-40">COM_PORT: TTY1</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#33ff33]" />
          <span className="hidden sm:inline">REC: CONNECTED</span>
        </div>
      </div>

      {/* TERMINAL BODY */}
      <div className={`${s.terminalBody} font-mono`}>
        {/* Un pequeño aviso de bienvenida estilo ASCII si lo deseas */}
        <div className="text-[10px] opacity-30 mb-2">
          {`// INTEL_CORE_DECODING_ACTIVE...`}
        </div>

        <div className={s.glowText}>
          <BootLog />
        </div>

        <div className="border-l border-green-900/30 pl-4 ml-1">
          <CommandList commands={commands} />
        </div>

        <div className="mt-4 pt-4 border-t border-green-900/20">
          <CommandInput onSubmit={execute} />
        </div>
      </div>

      {/* Footer de la terminal para detalles de hardware */}
      <div className="mt-4 flex justify-between items-center text-[9px] text-green-900 font-mono">
        <span>BUFFER_SIZE: 1024KB</span>
        <div className="flex gap-2">
          <span className="text-green-500/20">|</span>
          <span>BUNKER_OS_STABLE</span>
          <span className="text-green-500/20">|</span>
          <span>ENCRYPTION: ON</span>
        </div>
      </div>
    </section>
  )
}