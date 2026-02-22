'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Radio, Activity, Cpu, Shield } from 'lucide-react';
import styles from '../styles/header.module.css';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      {/* 1. Fila de Telemetría */}
      <div className={styles.telemetryBar}>
        <div className="flex gap-6">
          <span className={styles.activeSensor}>
            <Activity size={10} /> SYS_STABLE
          </span>
          <span className="hidden md:block">LOAD: 12.4%</span>
          <span className="hidden md:block text-stone-700">KERNEL_V.4.2</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Cpu size={10} /> BUS_LINK</span>
          <span className="flex items-center gap-1 text-green-900"><Shield size={10} /> SECURED</span>
        </div>
      </div>

      {/* 2. Fila de Logo y Navegación */}
      <div className={styles.mainNavRow}>
        <div className={styles.logoArea}>
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={14} className="text-amber-500" />
            <span className="text-[9px] font-mono text-amber-500/50 tracking-[0.4em] uppercase">
              Bunker_Terminal_09
            </span>
          </div>
          <h1 className={styles.logoMain}>
            METRO<span className={styles.logoMix}>MIX</span>
          </h1>
        </div>

        <nav className="flex items-center gap-4">
          <div className={styles.navModuleContainer}>
            {['Root', 'Logs', 'Inventory'].map((item, idx) => (
              <a key={item} href="#" className={styles.navLink}>
                <span className="opacity-30 text-[8px] font-mono">0{idx + 1}</span>
                {item}
              </a>
            ))}
          </div>

          <button className={styles.radioBtn} title="Emergency Comms">
            <Radio size={18} strokeWidth={2.5} />
          </button>
        </nav>
      </div>

      {/* Línea de acento inferior con escaneo sutil */}
      <div className="w-full h-[1px] bg-stone-900 relative overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
        />
      </div>
    </header>
  );
};