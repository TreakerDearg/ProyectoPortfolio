'use client';
import React from 'react';

export const ScannerHeader = ({ name, id, metadata }) => {
  // Lógica de color mejorada con gradientes
  const getStatusTheme = (status) => {
    switch (status) {
      case 'CRITICAL':
        return {
          text: 'text-red-500',
          bg: 'bg-red-500/10',
          border: 'border-red-500/50',
          glow: 'shadow-[0_0_15px_rgba(239,68,68,0.4)]'
        };
      case 'DEGRADING':
        return {
          text: 'text-amber-400',
          bg: 'bg-amber-400/10',
          border: 'border-amber-400/50',
          glow: 'shadow-[0_0_15px_rgba(251,191,36,0.3)]'
        };
      default:
        return {
          text: 'text-cyan-400',
          bg: 'bg-cyan-400/10',
          border: 'border-cyan-400/50',
          glow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]'
        };
    }
  };

  const theme = getStatusTheme(metadata?.stability);

  return (
    <div className="mb-10 relative group select-none">
      {/* 1. TOP BAR: ID & STATUS */}
      <div className="flex justify-between items-end mb-6 border-b border-stone-800/50 pb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-1 h-1 rounded-full animate-pulse ${theme.text} bg-current`} />
            <span className="text-[9px] font-mono text-stone-500 tracking-[0.3em] uppercase">
              Data_Link_Established
            </span>
          </div>
          <span className="text-sm font-black text-stone-400 font-mono tracking-widest italic">
            UID_{id?.toUpperCase()}
          </span>
        </div>
        
        <div className={`px-3 py-1 border ${theme.border} ${theme.bg} ${theme.glow} backdrop-blur-md`}>
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.text}`}>
            {metadata?.stability || 'NOMINAL'}
          </span>
        </div>
      </div>

      {/* 2. MAIN TITLE: Con efecto de glitch sutil en hover */}
      <div className="relative mb-8">
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter italic break-words transition-all duration-300 group-hover:text-amber-500">
          {name}
        </h2>
        
        {/* Línea de escaneo dinámica */}
        <div className="mt-4 h-[2px] w-full bg-stone-900 relative overflow-hidden">
          <div className={`absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-current to-transparent animate-[scan_3s_infinite] ${theme.text}`} />
        </div>
      </div>

      {/* 3. METADATA GRID: Diseño de celdas industriales */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 py-4 border-t border-b border-stone-800/30">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] text-stone-600 uppercase font-black tracking-widest">Origin_Sector</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-stone-800 rotate-45" />
            <span className="text-xs text-stone-300 font-mono font-bold uppercase">{metadata?.sector || 'UNKNOWN'}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[8px] text-stone-600 uppercase font-black tracking-widest">Rad_Exposure</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-stone-800 rotate-45" />
            <span className={`text-xs font-mono font-bold ${metadata?.radiation?.includes('HIGH') ? 'text-red-500' : 'text-stone-300'}`}>
              {metadata?.radiation || '0.00 mSv'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:items-end col-span-2 md:col-span-1 border-t md:border-t-0 pt-4 md:pt-0 border-stone-800/50">
          <span className="text-[8px] text-stone-600 uppercase font-black tracking-widest">Last_Inspection</span>
          <span className="text-xs text-amber-600/70 font-mono font-bold">{metadata?.lastCheck || 'N/A'}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};