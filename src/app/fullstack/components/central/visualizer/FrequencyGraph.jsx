// @/app/fullstack/components/central/visualizer/FrequencyGraph.jsx
'use client';
import { useEffect, useState } from 'react';
import styles from '@/app/fullstack/styles/CentralContainer.module.css';

export const FrequencyGraph = () => {
  const [points, setPoints] = useState("");

  // Generamos una onda senoidal aleatoria que cambia sutilmente
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame += 0.05;
      const newPoints = Array.from({ length: 40 }, (_, i) => {
        const x = (i * 10);
        // Mezclamos dos ondas para un look más complejo/sintético
        const y = 30 + 
                 Math.sin(i * 0.5 + frame) * 15 + 
                 Math.sin(i * 0.2 + frame * 2) * 5;
        return `${x},${y}`;
      }).join(" ");
      
      setPoints(newPoints);
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-24 flex flex-col items-center justify-center group">
      {/* Etiquetas de datos laterales */}
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <div className="flex flex-col gap-4">
          <div className="w-4 h-[1px] bg-[#00f2ff]/30" />
          <div className="w-2 h-[1px] bg-[#00f2ff]/30" />
          <div className="w-4 h-[1px] bg-[#00f2ff]/30" />
        </div>
        <div className="text-[7px] text-[#00f2ff]/40 font-mono text-right">
          <span>FREQ_MOD: 1.044</span><br />
          <span>AMP_GAIN: +12dB</span>
        </div>
      </div>

      {/* El Gráfico de frecuencia */}
      <svg 
        viewBox="0 0 390 60" 
        className="w-full h-full opacity-80 filter drop-shadow-[0_0_5px_rgba(0,242,255,0.4)]"
        preserveAspectRatio="none"
      >
        {/* Línea base de referencia */}
        <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(0, 242, 255, 0.1)" strokeWidth="1" />
        
        {/* La onda principal */}
        <polyline
          fill="none"
          stroke="#00f2ff"
          strokeWidth="1.5"
          points={points}
          strokeLinejoin="round"
        />
        
        {/* Efecto de "eco" o ghosting (opcional) */}
        <polyline
          fill="none"
          stroke="#00f2ff"
          strokeWidth="0.5"
          points={points}
          className="opacity-20 translate-y-1"
        />
      </svg>

      {/* Leyenda inferior */}
      <div className="w-full flex justify-between mt-1 px-4 border-t border-[#00f2ff]/10 pt-1">
        <span className="text-[6px] text-[#00f2ff]/40 tracking-widest uppercase">Signal_Capture_Active</span>
        <div className="flex gap-1">
          <div className="size-1 bg-[#00f2ff] animate-ping" />
          <span className="text-[6px] text-[#00f2ff] font-bold">CORE_SYNC</span>
        </div>
      </div>
    </div>
  );
};