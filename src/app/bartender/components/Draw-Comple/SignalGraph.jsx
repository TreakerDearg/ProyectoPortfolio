'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const SignalGraph = ({ label = "STABILITY", percentage = 70 }) => {
  // Generamos las barras con una semilla de altura inicial aleatoria
  const bars = useMemo(() => Array.from({ length: 16 }, () => Math.random()), []);

  return (
    <div className="bg-black/40 border border-stone-800/50 p-4 rounded-sm relative overflow-hidden group hover:border-amber-500/30 transition-colors">
      {/* 1. HEADER DEL GRÁFICO */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-3 bg-amber-600 animate-pulse" />
          <span className="text-[9px] font-mono text-stone-500 tracking-[0.3em] uppercase">
            {label} // Analysis_Signal
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-black text-amber-500 font-mono tracking-tighter">
            {percentage}
          </span>
          <span className="text-[8px] text-amber-900 font-mono">%</span>
        </div>
      </div>

      {/* 2. CONTENEDOR DE BARRAS (ECUALIZADOR) */}
      <div className="flex items-end gap-[2px] h-16 relative">
        {/* Guías de fondo horizontales */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
          <div className="w-full h-[1px] bg-stone-500" />
          <div className="w-full h-[1px] bg-stone-500" />
          <div className="w-full h-[1px] bg-stone-500" />
        </div>

        {bars.map((seed, i) => (
          <motion.div
            key={i}
            initial={{ height: "20%" }}
            animate={{ 
              height: [
                `${20 + seed * 60}%`, 
                `${40 + Math.random() * 50}%`, 
                `${10 + Math.random() * 80}%`, 
                `${20 + seed * 60}%`
              ] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5 + seed, 
              delay: i * 0.05,
              ease: "easeInOut"
            }}
            className="flex-grow relative"
          >
            {/* Cuerpo de la barra */}
            <div 
              className="w-full h-full bg-gradient-to-t from-amber-600/10 via-amber-500/40 to-amber-400/80 border-t border-amber-300/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
              style={{ opacity: 0.3 + (i / 16) * 0.7 }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* 3. FOOTER DEL GRÁFICO */}
      <div className="mt-3 flex justify-between border-t border-stone-900 pt-2">
        <div className="flex gap-3">
          <span className="text-[7px] text-stone-700 font-mono uppercase tracking-widest">Scale_Auto</span>
          <span className="text-[7px] text-stone-700 font-mono uppercase tracking-widest">D6_Band</span>
        </div>
        <div className="flex gap-2 text-[7px] text-stone-500 font-mono italic">
          <span>2.4GHz</span>
          <span className="text-amber-900/50">|</span>
          <span>5.8GHz</span>
        </div>
      </div>

      {/* Efecto de barrido láser horizontal interno */}
      <motion.div 
        animate={{ y: [-20, 100] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-[1px] bg-amber-500/5 pointer-events-none"
      />
    </div>
  );
};