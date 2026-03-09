// components/layout/Header.jsx
"use client";
import { motion } from "framer-motion";
import BackToHome from '../../../../components/salida/BackToHome';

export default function Header() {
  return (
    <header className="relative z-20 flex flex-col gap-0 mb-6 group">
      {/* Sección Superior: Control de Navegación y Identidad */}
      <div className="flex justify-between items-stretch bg-zinc-900/40 border-x border-t border-emerald-500/20">
        
        {/* Lado Izquierdo: El Módulo de Eyección (Botón) */}
        <div className="flex items-center">
          <div className="bg-emerald-500/10 self-stretch flex items-center px-4 border-r border-emerald-500/30">
            <BackToHome variant="ac" /> 
          </div>
          
          {/* Status del Vector de Salida */}
          <div className="px-4 py-2 hidden lg:block">
            <div className="text-[9px] uppercase tracking-tighter opacity-40">Return_Vector</div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-12 bg-zinc-800 overflow-hidden relative">
                <motion.div 
                  className="absolute inset-0 bg-emerald-500"
                  animate={{ left: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <span className="text-[10px] font-bold text-emerald-400">READY</span>
            </div>
          </div>
        </div>

        {/* Centro: Logo/Sistema Dinámico */}
        <div className="flex flex-col justify-center items-center px-8 border-x border-emerald-500/10">
          <h1 className="text-xl font-black italic tracking-widest text-emerald-500 leading-none">
            ARMORED_CORE <span className="text-[10px] not-italic opacity-50 font-normal">v6.0</span>
          </h1>
          <div className="flex gap-2 mt-1">
            <span className="w-8 h-0.5 bg-emerald-500/50" />
            <span className="w-2 h-0.5 bg-emerald-500" />
            <span className="w-8 h-0.5 bg-emerald-500/50" />
          </div>
        </div>

        {/* Lado Derecho: Estado de Hardware */}
        <div className="flex items-center px-6 gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] opacity-40 uppercase">Neural_Sync</p>
            <p className="text-sm font-bold tracking-tighter">98.42%</p>
          </div>
          <div className="h-8 w-px bg-emerald-500/20" />
          <div className="text-right">
            <p className="text-[9px] opacity-40 uppercase">Armor_Points</p>
            <p className="text-xl font-black italic text-emerald-400 leading-none">09450</p>
          </div>
        </div>
      </div>

      {/* Sección Inferior: Barra de Diagnóstico Horizontal */}
      <div className="relative h-5 w-full bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between px-3 overflow-hidden">
        {/* Decoración de fondo animada */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
        
        <div className="flex items-center gap-4 z-10">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 bg-emerald-500 rotate-45"
              />
            ))}
          </div>
          <span className="text-[9px] font-bold tracking-[0.2em] opacity-70">
            OS: ALLMIND // COMMS: STABLE // RUBICON-3_ZONE_4
          </span>
        </div>

        <div className="flex gap-4 z-10 items-center">
          <span className="text-[8px] bg-emerald-500 text-black px-1 font-bold">LIVE_FEED</span>
          <span className="text-[10px] font-mono opacity-60">24.00.413</span>
        </div>
      </div>

      {/* Adorno visual de cierre de cabina */}
      <div className="flex justify-between px-2">
        <div className="w-1/4 h-1 bg-emerald-500/30 skew-x-[-45deg]" />
        <div className="w-1/4 h-1 bg-emerald-500/30 skew-x-[45deg]" />
      </div>
    </header>
  );
}