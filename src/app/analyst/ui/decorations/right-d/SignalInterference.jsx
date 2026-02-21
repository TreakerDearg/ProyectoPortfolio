'use client';
import { motion } from 'framer-motion';

export const SignalInterference = () => (
  <div className="w-full h-8 bg-black/40 rounded border border-white/5 relative overflow-hidden">
    <motion.div
      animate={{ 
        y: [-10, 40],
        opacity: [0, 1, 0] 
      }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      className="absolute inset-x-0 h-[1px] bg-sky-500/50 shadow-[0_0_5px_#0ea5e9]"
    />
    <div className="absolute inset-0 flex items-center justify-center gap-1">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [2, Math.random() * 15, 2] }}
          transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.05 }}
          className="w-[1px] bg-slate-800"
        />
      ))}
    </div>
  </div>
);