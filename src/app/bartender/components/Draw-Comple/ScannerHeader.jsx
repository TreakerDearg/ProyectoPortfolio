'use client';

export const ScannerHeader = ({ name, id, metadata }) => {
  // Color dinámico según la estabilidad
  const getStatusColor = (status) => {
    if (status === 'CRITICAL') return 'text-red-500 shadow-[0_0_10px_#ff0000]';
    if (status === 'DEGRADING') return 'text-amber-400 shadow-[0_0_10px_#ffb300]';
    return 'text-green-500 shadow-[0_0_10px_#22c55e]';
  };

  return (
    <div className="mb-12 relative group">
      {/* Decoración de ID de escaneo */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-stone-500 tracking-[0.4em] uppercase leading-none">
            Registry_Object_UID
          </span>
          <span className="text-xl font-black text-amber-600/50 font-mono tracking-tighter">
            {id}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono text-stone-600 uppercase block">Terminal_Status</span>
          <span className={`text-[10px] font-black uppercase tracking-widest ${getStatusColor(metadata?.stability)}`}>
            ● {metadata?.stability || 'NOMINAL'}
          </span>
        </div>
      </div>

      {/* Título Masivo */}
      <div className="relative inline-block w-full">
        <h2 className="text-7xl font-black text-white uppercase leading-[0.8] tracking-tighter italic mb-4 break-words">
          {name}
        </h2>
        {/* Línea de subrayado técnica */}
        <div className="h-2 w-full bg-stone-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/20 animate-pulse" />
        </div>
      </div>

      {/* Grid de Metadatos del Scanner */}
      <div className="grid grid-cols-3 gap-4 mt-6 border-l-2 border-stone-800 pl-4 py-2 font-mono">
        <div>
          <span className="text-[8px] text-stone-600 block uppercase">Origin_Sector</span>
          <span className="text-[11px] text-stone-300 font-bold">{metadata?.sector || 'UNKNOWN'}</span>
        </div>
        <div>
          <span className="text-[8px] text-stone-600 block uppercase">Radiation_Lvl</span>
          <span className="text-[11px] text-stone-300 font-bold">{metadata?.radiation || '0.00 mSv'}</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] text-stone-600 block uppercase">Last_Inspection</span>
          <span className="text-[11px] text-stone-300 font-bold">{metadata?.lastCheck || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};