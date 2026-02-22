'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ArrowLeftCircle, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BackToHome({ variant = 'metro' }) {
  const router = useRouter();
  
  // Ruta destino dentro de la carpeta bartender
  const destination = '/bartender'; // Ajusta según tu estructura de rutas

  const configs = {
    metro: {
      style: "border-amber-900/50 text-amber-600 hover:bg-amber-950/30",
      label: "RETURN_TO_STATION",
      icon: <ChevronLeft size={16} />
    },
    soma: {
      style: "border-cyan-900/50 text-cyan-400 hover:bg-cyan-950/30 font-light tracking-[0.2em]",
      label: "RECONNECT_TO_HUB",
      icon: <Terminal size={14} className="animate-pulse" />
    },
    ac: {
      style: "border-red-900/50 text-red-500 hover:bg-red-950/30 italic font-bold skew-x-[-10deg]",
      label: "RTB_SEQUENCE", // Return to Base
      icon: <ArrowLeftCircle size={16} />
    }
  };

  const current = configs[variant] || configs.metro;

  return (
    <motion.button
      whileHover={{ x: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(destination)}
      className={`flex items-center gap-3 px-5 py-2 border mb-10 transition-all backdrop-blur-sm ${current.style}`}
    >
      {current.icon}
      <span className="text-[10px] uppercase font-mono tracking-widest">
        {current.label}
      </span>
      
      {/* Decoración extra para AC */}
      {variant === 'ac' && (
        <div className="absolute -right-1 top-0 h-full w-1 bg-red-600 shadow-[0_0_10px_#ff3c00]" />
      )}
    </motion.button>
  );
}