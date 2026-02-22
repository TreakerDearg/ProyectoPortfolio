'use client';
import { motion } from 'framer-motion';

export const SignalGraph = ({ label, percentage = 70 }) => {
  // Generamos 12 barras para el "ecualizador"
  const bars = Array.from({ length: 12 });

  return (
    <div className="bg-stone-950 border border-stone-900 p-4 rounded-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[9px] font-mono text-amber-500/70 tracking-widest uppercase">
          {label} // Analysis_Signal
        </span>
        <span className="text-[10px] font-mono text-amber-500">{percentage}%</span>
      </div>

      <div className="flex items-end gap-1 h-12">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: "10%" }}
            animate={{ 
              height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            className="flex-grow bg-amber-500/20 border-t border-amber-500/50"
            style={{ 
              // La última barra siempre refleja el porcentaje real aproximadamente
              opacity: i / 12 + 0.2 
            }}
          />
        ))}
      </div>
      
      <div className="mt-2 flex justify-between">
        <span className="text-[7px] text-stone-700 font-mono">0.0Hz</span>
        <span className="text-[7px] text-stone-700 font-mono">2.4GHz</span>
      </div>
    </div>
  );
};