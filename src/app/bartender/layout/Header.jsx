'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Radio, Shield, Wifi } from 'lucide-react';
import ExitButton from '../components/salida/ExitButton'; 
import styles from '../styles/header.module.css';

export const Header = ({ isDrawerOpen }) => {
  // Definimos la estructura de navegación con sus rutas específicas
  const navModules = [
    { name: 'Root', path: '/bartender/pages/root' },
    { name: 'Logs', path: '/bartender/pages/logss' }, // Ajustado a logss
    { name: 'Inventory', path: '/bartender/pages/inventory' }
  ];

  return (
    <header className={`${styles.headerContainer} ${isDrawerOpen ? styles.headerDimmed : ''}`}>
      {/* 1. FILA DE TELEMETRÍA */}
      <div className={styles.telemetryBar}>
        <div className="flex gap-4 md:gap-8 items-center">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ 
                scale: isDrawerOpen ? 1 : [1, 1.2, 1], 
                backgroundColor: isDrawerOpen ? '#444' : '#22c55e' 
              }}
              className="w-1.5 h-1.5 rounded-full"
            />
            <span className={styles.activeSensor}>
              {isDrawerOpen ? 'DATA_TRANSFER_ACTIVE' : 'SYS_STABLE'}
            </span>
          </div>
          <span className="hidden sm:block text-[9px] font-mono text-stone-600">
            CPU_LOAD: <span className="text-stone-400">12.4%</span>
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-stone-500">
            <Wifi size={10} className={isDrawerOpen ? 'text-stone-700' : 'text-amber-600/50'} />
            <span className="text-[9px] font-mono hidden xs:block uppercase tracking-tighter">Signal_Secure</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-stone-900/40 border border-white/5 rounded-sm">
            <Shield size={10} className={isDrawerOpen ? 'text-stone-700' : 'text-green-600'} />
            <span className="text-[9px] font-mono text-stone-500 font-bold uppercase tracking-widest">Bunker_Link</span>
          </div>
        </div>
      </div>

      {/* 2. FILA PRINCIPAL */}
      <div className={styles.mainNavRow}>
        <div className={styles.logoArea}>
          <div className="flex items-center gap-2 mb-1 group cursor-default">
            <Terminal size={14} className="text-amber-500/50 group-hover:text-amber-500 transition-colors" />
            <span className="text-[9px] font-mono text-stone-600 tracking-[0.4em] uppercase">
              Bunker_Terminal_09
            </span>
          </div>
          <h1 className={styles.logoMain}>
            METRO<span className={styles.logoMix}>MIX</span>
          </h1>
        </div>

        <nav className="flex items-center gap-4 lg:gap-6">
          <div className={styles.navModuleContainer}>
            {navModules.map((item, idx) => (
              <a key={item.name} href={item.path} className={styles.navLink}>
                <span className={styles.navNumber}>0{idx + 1}</span>
                <span className="relative z-10">{item.name}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-white/5">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#ffb300' }}
              whileTap={{ scale: 0.95 }}
              className={styles.radioBtn} 
              title="Comm Link"
            >
              <Radio size={18} strokeWidth={2.5} className="text-black" />
              <div className={styles.radioPing} />
            </motion.button>

            {/* BOTÓN DE SALIDA METRO STYLE */}
            <ExitButton />
          </div>
        </nav>
      </div>

      {/* Línea de acento */}
      <div className="w-full h-[1px] bg-stone-900/50 relative overflow-hidden mt-4">
        <motion.div 
          animate={{ x: ['-100%', '600%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-32 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
        />
      </div>
    </header>
  ); 
};