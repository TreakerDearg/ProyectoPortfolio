'use client'

import ExitButton from '../components/ExitButton'

export default function TragosPage() {

  return (

    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-white selection:bg-primary/30">

      {/* ================= SIDEBAR ================= */}

      <aside className="w-64 shrink-0 border-r border-steel bg-[#0d1618] flex flex-col justify-between p-4">

        {/* TOP */}
        <div className="space-y-8">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">
                liquor
              </span>
            </div>

            <div>
              <h1 className="text-white text-base font-bold tracking-wider">
                BARTENDER ARMORY
              </h1>

              <p className="text-primary text-[10px] font-mono uppercase">
                SECTOR_07_BUNKER
              </p>
            </div>

          </div>

          {/* NAV */}
          <nav className="space-y-2">

            <NavItem active icon="grid_view" label="ARMORY_GRID" />

            <NavItem icon="inventory_2" label="LOADOUT_MGR" />
            <NavItem icon="terminal" label="MISSION_BRIEF" />
            <NavItem icon="settings_accessibility" label="PERSONNEL" />

          </nav>

        </div>


        {/* BOTTOM STATUS */}

        <div className="space-y-4">

          <div className="p-3 border border-steel rounded bg-background-dark/50">

            <p className="text-[10px] text-primary/50 uppercase mb-1">
              System Status
            </p>

            <div className="flex justify-between text-xs font-mono">
              <span>OXYGEN</span>
              <span className="text-primary">98%</span>
            </div>

            <div className="w-full bg-steel h-1 mt-1">
              <div className="bg-primary h-full w-[98%]" />
            </div>

          </div>

          <button className="w-full py-2 bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary hover:text-background-dark transition flex items-center justify-center gap-2">

            <span className="material-symbols-outlined text-sm">
              logout
            </span>

            SYSTEM_LOGOUT

          </button>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="flex-1 flex flex-col overflow-hidden">


        {/* TOP BAR */}

        <header className="relative flex items-center justify-between border-b border-steel px-8 py-4 bg-[#0d1618]/80 backdrop-blur-md">

          {/* LEFT SIDE */}

          <div className="flex items-center gap-6">

            <div className="flex items-center gap-3 border-r border-steel pr-6">

              <span className="material-symbols-outlined text-primary text-3xl">
                precision_manufacturing
              </span>

              <h2 className="text-xl font-black uppercase">
                Total_Arsenal_Load: 128_Units
              </h2>

            </div>

            <div className="flex gap-4">

              <Tag label="REINFORCED" color="caution" />
              <Tag label="PRESSURE: STABLE" color="primary" />

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="flex items-center gap-4">

            {/* EXIT */}
            <ExitButton />

            <input
              placeholder="FIND_WEAPON..."
              className="bg-background-dark border border-steel text-primary text-xs px-4 py-2 uppercase outline-none focus:border-primary transition"
            />

            <IconButton icon="notifications" />

            <button className="px-4 py-2 bg-caution text-background-dark font-black text-xs">
              SYNC_LOADOUT
            </button>

          </div>

        </header>


        {/* CONTENT */}

        <section className="flex-1 overflow-y-auto p-6 space-y-8">

          <div className="flex justify-between items-center">

            <h3 className="text-2xl font-black flex items-center gap-3">

              <span className="w-8 h-1 bg-primary" />

              MISSION_READY_COCKTAILS

            </h3>

            <span className="text-[10px] text-primary/40 font-mono">
              GRID_VIEW_ACTIVE
            </span>

          </div>

          {/* MAP TRAGOS AQUÍ */}

        </section>


        {/* FOOTER */}

        <footer className="bg-background-dark border-t border-primary/20 h-16 flex items-center justify-between px-8">

          <p className="text-primary font-black tracking-[0.2em] animate-pulse">
            GEARING_UP...
          </p>

          <span className="text-xs font-mono text-primary">
            Network_Latency: 0.04ms
          </span>

        </footer>

      </main>

    </div>
  )
}


/* ================= COMPONENTES UI ================= */

function NavItem({ icon, label, active }) {

  return (

    <div className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors
      ${active
        ? 'bg-primary text-background-dark font-bold'
        : 'text-primary/70 hover:bg-primary/10'
      }`}>

      <span className="material-symbols-outlined text-[20px]">
        {icon}
      </span>

      {label}

    </div>

  )
}

function Tag({ label, color }) {

  return (

    <span className={`text-[10px] font-bold border px-2 py-0.5 text-${color} border-${color}`}>
      {label}
    </span>

  )
}

function IconButton({ icon }) {

  return (

    <button className="w-10 h-10 border border-steel flex items-center justify-center hover:bg-primary/10 text-primary">

      <span className="material-symbols-outlined">
        {icon}
      </span>

    </button>

  )
}
