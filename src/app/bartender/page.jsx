'use client'

import { useRouter } from 'next/navigation'

export default function BartenderHome() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen flex flex-col p-6 z-10 boot-flicker parallax-container">

      {/* SCAN LINE */}
      <div className="scan-line"></div>

      {/* HEADER */}
      <header className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <div className="bg-cerulean text-heavy-steel font-black px-4 py-1 skew-x-[-12deg] font-orbitron text-sm">
              AC_BARTENDER_V6.0
            </div>

            <div className="flex gap-1">
              <div className="w-1 h-4 bg-cerulean"></div>
              <div className="w-1 h-4 bg-cerulean"></div>
              <div className="w-1 h-4 bg-cerulean/30"></div>
            </div>
          </div>

          <div className="text-[10px] text-cerulean/60 font-medium pl-2 tracking-[0.3em]">
            COMMS: ESTABLISHED // SECTOR: NEON_CITY
          </div>
        </div>

        <div className="flex gap-8 items-center font-rajdhani">
          <div className="text-right">
            <div className="text-[10px] text-cerulean/40">MEMORY_ALLOCATION</div>
            <div className="text-sm font-bold">128.4 / 512 GB</div>
          </div>

          <div className="text-right border-l border-cerulean/20 pl-8">
            <div className="text-[10px] text-warning">SYSTEM_LOAD</div>
            <div className="text-sm font-bold text-warning">
              CRITICAL_STABLE
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 grid grid-cols-12 gap-6 items-center">

        {/* LEFT PANEL */}
        <aside className="col-span-3 flex flex-col gap-4 self-start">
          {/* … sin cambios … */}
        </aside>

        {/* CENTER */}
        <section className="col-span-6 h-full flex items-center justify-center relative">

          {/* RETICLE */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] border border-cerulean/10 rounded-full flex items-center justify-center">
              <div className="w-[300px] h-[300px] border-2 border-cerulean/30 rounded-full border-dashed flex items-center justify-center">
                <div className="w-4 h-4 bg-cerulean rotate-45"></div>
              </div>
            </div>
          </div>

          {/* MAIN UNIT */}
          <div className="relative z-20 flex flex-col items-center">
            <h2 className="font-orbitron text-4xl font-black mb-4">
              NEON <span className="text-cerulean">RAZOR</span>
            </h2>

            <button
              onClick={() => router.push('/bartender/Tragos')}
              className="mt-8 bg-warning text-heavy-steel font-orbitron font-black px-12 py-3 skew-x-[-12deg] hover:bg-white hover:text-warning transition"
            >
              ENGAGE_MIX_SEQUENCE
            </button>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside className="col-span-3 flex flex-col gap-4 self-start">
          {/* … sin cambios … */}
        </aside>

      </main>

      {/* FOOTER */}
      <footer className="mt-4 pt-4 border-t border-cerulean/20 flex justify-between items-end font-rajdhani">
        {/* … sin cambios … */}
      </footer>

      {/* FRAME */}
      <div className="fixed inset-0 pointer-events-none opacity-20 border-[20px] border-heavy-steel shadow-[inset_0_0_100px_rgba(0,163,255,0.2)]" />
    </div>
  )
}
