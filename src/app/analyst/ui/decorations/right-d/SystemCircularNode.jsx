'use client';
import { motion } from 'framer-motion';

export const SystemCircularNode = () => (
  <div className="relative w-full h-32 flex items-center justify-center pointer-events-none">
    {/* Anillo exterior rotatorio */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute w-24 h-24 border border-dashed border-sky-500/20 rounded-full"
    />
    {/* Anillo medio con pulso */}
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute w-16 h-16 border border-purple-500/30 rounded-full"
    />
    {/* Core decorativo */}
    <div className="w-1 h-1 bg-sky-400 rounded-full shadow-[0_0_10px_#38bdf8]" />
    {/* Mini etiquetas de coordenadas */}
    <div className="absolute top-0 left-0 text-[5px] font-mono text-slate-700">X:24.02</div>
    <div className="absolute bottom-0 right-0 text-[5px] font-mono text-slate-700">Y:99.11</div>
  </div>
);