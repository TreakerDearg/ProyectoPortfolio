// src/app/bartender/(Bar)/layout.jsx

export default function FullstackLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-mono relative overflow-hidden">
      {/* Capas Atmosféricas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Header de Estado */}
      <header className="border-b border-purple-500/20 p-4 flex justify-between items-center bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="size-2 bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]" />
          <span className="text-[10px] tracking-[0.3em] font-bold text-purple-400">SYSTEM_OS_V.2.0</span>
        </div>
        <div className="text-[9px] text-slate-500">
          STATUS: <span className="text-green-500">ONLINE</span>
        </div>
      </header>

      {/* Contenedor de Contenido */}
      <main className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Aquí es donde Next.js inyecta el contenido de page.jsx */}
        {children}
      </main>

      {/* Footer HUD */}
      <footer className="fixed bottom-0 w-full border-t border-purple-500/10 p-2 bg-black/60 text-[8px] flex justify-center gap-8 text-slate-600">
        <span>CORE_TEMP: 32°C</span>
        <span>ENCRYPT: AES-256</span>
        <span>LOC: POSADAS_AR</span>
      </footer>
    </div>
  );
}