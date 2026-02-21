// Página de Inicio (Dashboard)
<div className="space-y-6">
  {/* Título de la Sección */}
  <div className="border-l-2 border-purple-500 pl-4 py-1">
    <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
      Terminal_Overview
    </h1>
    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Iniciando secuencia de diagnóstico de proyectos...</p>
  </div>

  {/* Bento Grid Sencillo */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Tarjeta de Perfil */}
    <div className="md:col-span-2 p-6 bg-slate-900/40 border border-purple-500/10 rounded-sm relative group overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-purple-400 text-xs font-bold mb-2">/DATOS_USUARIO</h2>
        <p className="text-sm text-slate-400 max-w-md">Analista de datos con especialización en arquitectura de sistemas distribuidos y optimización de flujos ETL.</p>
      </div>
      <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-black">USER_01</div>
    </div>

    {/* Tarjeta de Métricas */}
    <div className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-sm flex flex-col justify-between">
      <span className="text-[9px] text-purple-500 font-bold uppercase">Eficiencia_Global</span>
      <div className="text-4xl font-black text-white">98.4<span className="text-purple-500 text-lg">%</span></div>
      <div className="w-full bg-slate-800 h-1 mt-2">
        <div className="bg-purple-500 h-full w-[98.4%] shadow-[0_0_10px_#a855f7]" />
      </div>
    </div>
  </div>
</div>