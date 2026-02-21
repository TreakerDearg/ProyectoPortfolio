// src/app/bartender/(Bar)/page.jsx

export default function BartenderPage() {
  return (
    <div className="space-y-6">
      {/* Título de la Sección */}
      <div className="border-l-2 border-purple-500 pl-4 py-1">
        <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
          Bartender_Interface
        </h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
          Iniciando secuencia de servicio de datos...
        </p>
      </div>

      {/* Grid de Contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-slate-900/40 border border-purple-500/10 rounded-sm">
          <h2 className="text-purple-400 text-xs font-bold mb-2">/ESTADO_MIXOLOGÍA</h2>
          <p className="text-sm text-slate-400">
            Módulo de coctelería lógica cargado. Esperando órdenes del cliente...
          </p>
        </div>

        <div className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-sm">
          <span className="text-[9px] text-purple-500 font-bold uppercase">Consumo_Actual</span>
          <div className="text-4xl font-black text-white">00<span className="text-purple-500 text-lg">ml</span></div>
        </div>
      </div>
    </div>
  );
}