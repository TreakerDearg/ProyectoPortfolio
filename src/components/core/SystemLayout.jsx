'use client'

import s from '@/styles/SystemLayout.module.css'

export default function SystemLayout({ children }) {
  return (
    <div className={s.layoutWrapper}>
      {/* Elementos decorativos del chasis */}
      <div className={s.chassis}>
        <div className={s.cornerLB}>◩</div>
        <div className={s.cornerRB}>◩</div>
      </div>

      {/* HEADER: Panel de Instrumentos Superior */}
      <header className={s.header}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={s.glowText}>
              <span className="text-amber-500 mr-2">◈</span>
              <span className="font-bold tracking-[0.2em]">METRO_OS_KERNEL</span>
              <span className="ml-3 opacity-30 text-[9px]">REV. 2033.4</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-4 border-l border-zinc-800 pl-6">
              <div className={s.statusIndicator}>
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span>FILTER_LIFE: 84%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-[10px]">
            <div className="text-right hidden sm:block">
              <p className="text-zinc-500">ENCRYPTION</p>
              <p className="text-green-500">AES_256_ACTIVE</p>
            </div>
            <div className={s.nukeBattery}>
              [||||||||░░] 80% NUK_PWR
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* SIDEBAR: Panel de Control Lateral */}
        <aside className={`${s.sidebar} hidden lg:flex`}>
          <div className="space-y-4">
            <p className="text-[10px] text-zinc-500 tracking-widest border-b border-zinc-800 pb-2">
              NAVIGATION_MODULES
            </p>
            <nav className="flex flex-col gap-2">
              <a href="#" className="hover:text-white text-green-500 flex items-center gap-2">
                <span>{'>'}</span> ARCHIVOS_BIN
              </a>
              <a href="#" className="hover:text-white opacity-50 flex items-center gap-2">
                <span>{'>'}</span> COMUNICACIONES
              </a>
              <a href="#" className="hover:text-white opacity-50 flex items-center gap-2">
                <span>{'>'}</span> MAPA_D6
              </a>
            </nav>
          </div>

          <div className="mt-auto pt-6 border-t border-zinc-800">
            <p className="text-[9px] text-amber-500/50 mb-2">HARDWARE_TEMP</p>
            <div className="w-full bg-zinc-900 h-1">
              <div className="bg-amber-500 h-full w-[45%]" />
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL: La Pantalla CRT */}
        <main className={s.mainContent}>
          {/* Overlay de scanlines solo para el área de contenido */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,4px_100%] z-0" />
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>

      {/* FOOTER: Línea de Comandos Inferior */}
      <footer className={s.footer}>
        <div className="flex items-center justify-between text-[10px] tracking-widest">
          <div className="flex items-center gap-4">
            <span className="text-green-500 font-bold">STALKER@BUNKER_D6:~$</span>
            <span className="animate-pulse">_</span>
          </div>
          
          <div className="flex gap-6 opacity-40">
            <span>LAT: 55.7558° N</span>
            <span>LNG: 37.6173° E</span>
            <span>UPTIME: 124:08:44</span>
          </div>
        </div>
      </footer>
    </div>
  )
}