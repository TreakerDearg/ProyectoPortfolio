'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity } from 'lucide-react';
import '../../styles/arasakaStatus.css';

// Subcomponente interno de Métricas de Ventas
const ArasakaSalesMetric = () => {
  // Simulación de fluctuación de valor
  const [value, setValue] = useState(842.9);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Pequeña fluctuación aleatoria
      const change = (Math.random() - 0.4) * 0.5;
      setValue(prev => Number((prev + change).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-3 pt-2 border-t border-red-900/30 relative">
      {/* Etiqueta de Sección */}
      <div className="flex justify-between items-center mb-1">
         <span className="text-[6px] font-mono text-red-500/80 tracking-widest uppercase">Global_Revenue_Stream</span>
         <span className="text-[6px] font-mono text-white/40">Q3_FY2077</span>
      </div>

      {/* Valor Principal Gigante */}
      <div className="flex items-baseline gap-1 relative z-10">
         <span className="text-[10px] text-red-500 font-bold mr-0.5">¥</span>
         <span className="text-xl font-black text-white font-arasaka tracking-tighter shadow-red-glow">
            {value}<span className="text-red-600 text-sm">T</span>
         </span>
         
         {/* Indicador de tendencia */}
         <div className="ml-auto flex items-center gap-1 bg-red-900/20 px-1.5 py-0.5 rounded border border-red-500/20">
            <TrendingUp size={10} className="text-red-500" />
            <span className="text-[8px] font-mono text-red-400 font-bold">+2.4%</span>
         </div>
      </div>

      {/* Gráfico de Barras (Micro-Trading) */}
      <div className="flex items-end gap-[1px] h-6 mt-1 opacity-70">
         {[...Array(20)].map((_, i) => (
           <motion.div
             key={i}
             animate={{ 
               height: [Math.random() * 60 + 20 + "%", Math.random() * 90 + 10 + "%"],
               backgroundColor: Math.random() > 0.9 ? "#fff" : "#dc2626" 
             }}
             transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
             className="w-full bg-red-600/80 rounded-[1px]"
           />
         ))}
      </div>
      
      {/* Detalle decorativo Kanji (Beneficio/Profit) */}
      <div className="absolute right-0 bottom-8 text-[30px] opacity-[0.07] text-red-500 font-black pointer-events-none select-none z-0">
        利益
      </div>
    </div>
  );
};

export const ArasakaNetStatus = () => {
  return (
    <div className="arasaka-container mt-6 mx-2 p-3 relative overflow-hidden group">
      {/* Fondo de rejilla táctica */}
      <div className="absolute inset-0 bg-arasaka-grid opacity-20 pointer-events-none" />
      
      {/* Cabecera del Módulo */}
      <div className="flex justify-between items-end mb-3 border-b border-red-600/30 pb-1">
        <div className="flex flex-col">
          <span className="text-[6px] font-mono text-red-500/60 tracking-widest uppercase">Subnet_Link</span>
          <span className="text-[10px] font-black text-white tracking-wider font-arasaka">
            ARASAKA<span className="text-red-600">.CORP</span>
          </span>
        </div>
        <div className="w-1.5 h-1.5 bg-red-600 animate-pulse shadow-[0_0_8px_#dc2626]" />
      </div>

      {/* Cuerpo Visual: Hexágono Giratorio */}
      <div className="flex items-center gap-3 mb-2">
        <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, ease: "linear", repeat: Infinity }}
             className="absolute w-full h-full border border-dashed border-red-500/40 rounded-full"
           />
           <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 15, ease: "linear", repeat: Infinity }}
             className="absolute w-3/4 h-3/4 border-2 border-l-transparent border-r-transparent border-red-600 rounded-full"
           />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-[7px] font-mono text-slate-400">
            <span>SEC_LVL</span>
            <span className="text-red-400 font-bold">OMEGA</span>
          </div>
          <div className="w-full h-1 bg-gray-800 rounded-sm overflow-hidden">
             <motion.div 
               animate={{ width: ["10%", "90%", "40%", "100%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="h-full bg-red-600 shadow-[0_0_5px_#dc2626]"
             />
          </div>
        </div>
      </div>

      {/* --- AQUÍ INSERTAMOS LA NUEVA MÉTRICA DE VENTAS --- */}
      <ArasakaSalesMetric />

      {/* Decoración Kanji (Arasaka) */}
      <div className="absolute top-1 right-1 opacity-20 text-[14px] leading-none font-black text-red-500 pointer-events-none select-none">
        荒坂
      </div>
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-scan-red opacity-10 pointer-events-none" />
    </div>
  );
};