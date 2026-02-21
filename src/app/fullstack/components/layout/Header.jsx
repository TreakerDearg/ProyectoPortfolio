'use client';

import ExitButton from '@/app/fullstack/components/layout/salida/ExitButton';
import { DataStream } from '@/app/fullstack/components/layout/decoration/DataStream';

export const Header = () => (
  <header className="h-14 bg-[#0a0f12] border-b border-[#1a2a35] flex items-center justify-between px-8 relative overflow-hidden z-50 font-aldrich">
    
    {/* Fondo Decorativo: Filtro de ruido y líneas de escaneo */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[length:30px_30px] bg-[linear-gradient(to_right,#00f2ff_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff_1px,transparent_1px)]" />
    
    {/* SECCIÓN IZQUIERDA: Identidad Combine */}
    <div className="flex items-center gap-6 z-10">
      <div className="text-[#00f2ff] text-2xl drop-shadow-[0_0_8px_#00f2ff] select-none animate-pulse">λ</div>
      <div className="flex flex-col border-l border-[#00f2ff]/20 pl-4">
        <span className="text-white text-[12px] font-black tracking-[0.4em] leading-tight">
          CITY_17_MGMT
        </span>
        <span className="text-[#00f2ff] text-[8px] tracking-[0.15em] uppercase opacity-60">
          Overwatch_Local_Node // Sector_Archive
        </span>
      </div>
    </div>

    {/* SECCIÓN CENTRAL: Decoración de Flujo de Datos (Visual Only) */}
    <div className="hidden lg:flex items-center gap-8 z-10">
      <DataStream />
      <div className="flex flex-col items-center border-x border-[#1a2a35] px-6">
        <span className="text-[7px] text-[#00f2ff]/40 uppercase mb-1">Signal_Strength</span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-1 h-3 ${i < 4 ? 'bg-[#00f2ff]' : 'bg-[#00f2ff]/20'}`} />
          ))}
        </div>
      </div>
      <DataStream />
    </div>

    {/* SECCIÓN DERECHA: Telemetría y Salida */}
    <div className="z-10 flex items-center gap-8">
      {/* Datos de Red Combine */}
      <div className="hidden sm:flex gap-6 text-[9px] font-mono text-white/40 uppercase border-r border-white/10 pr-8">
        <div className="flex flex-col items-end">
          <span className="text-[#00f2ff]/30 text-[7px]">Channel</span>
          <span className="text-white/60 tracking-tighter font-bold">BIO_SYNC_4</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#00f2ff]/30 text-[7px]">Auth</span>
          <span className="text-[#00f2ff] font-bold shadow-[0_0_5px_#00f2ff]">ADMIN_V</span>
        </div>
      </div>

      {/* COMPONENTE DE SALIDA */}
      <div className="flex items-center">
        <ExitButton />
      </div>
    </div>

    {/* Efecto de luz cian en el borde inferior */}
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f2ff]/30 to-transparent" />
  </header>
);