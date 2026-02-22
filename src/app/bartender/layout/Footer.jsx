'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      {/* 1. LÍNEA DE DATOS TÉCNICOS (Sensores) */}
      <div className={styles.sensorGrid}>
        <SensorReading label="Radiation" value="0.04 mSv/h" color="text-green-500" status="SAFE" />
        <SensorReading label="Air_Quality" value="Optimal" color="text-amber-500" status="W_02" />
        <SensorReading label="Station_Temp" value="18°C" color="text-blue-400" status="NOMINAL" />
        <SensorReading label="Bar_Pressure" value="1013 hPa" color="text-stone-400" status="STABLE" />
      </div>

      <div className={styles.divider} />

      {/* 2. ZONA DE OPERADOR Y STATUS */}
      <div className={styles.deployInfo}>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col">
            <span className={styles.miniLabel}>Current_Operator</span>
            <span className="text-[11px] font-mono text-amber-500/80 tracking-widest uppercase font-bold">
              Artyom_D6
            </span>
          </div>
          
          <div className="flex flex-col border-l border-stone-800 pl-6">
            <span className={styles.miniLabel}>Link_Status</span>
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ 
                  backgroundColor: ["#f59e0b", "#78350f", "#f59e0b"],
                  boxShadow: [
                    "0 0 8px rgba(245,158,11,0.5)", 
                    "0 0 2px rgba(245,158,11,0.2)", 
                    "0 0 8px rgba(245,158,11,0.5)"
                  ] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
              />
              <span className="text-[10px] font-mono text-stone-400 tracking-widest uppercase">
                Synchronized
              </span>
            </div>
          </div>
        </div>

        {/* Versión y Texto de Ambientación */}
        <div className="text-right flex flex-col items-end">
           <span className="text-[9px] font-mono text-stone-600 italic hidden md:block">
             "If not us, then who?"
           </span>
           <span className="text-[10px] font-mono text-stone-500 tracking-tighter">
             B_v4.2.6 // D6_TERMINAL
           </span>
        </div>
      </div>

      {/* 3. BARRA DE COPYRIGHT (Sutil) */}
      <div className={styles.bottomBar}>
        <div className="flex justify-between items-center w-full text-[8px] font-mono uppercase tracking-[0.3em] text-stone-700">
          <span>© 2026 Metro_Mix_Collective // All rights reserved</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">Polis_Network_Node</span>
            <div className="w-2 h-[1px] bg-stone-800" />
            <span className="text-stone-500">Encrypted_Line_09</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SensorReading = ({ label, value, color, status }) => (
  <div className="flex flex-col min-w-[100px] border-l border-stone-800/50 pl-4 py-1">
    <div className="flex justify-between items-start mb-0.5">
      <span className="text-[8px] text-stone-600 uppercase font-bold tracking-tighter">{label}</span>
      <span className="text-[7px] text-stone-800 font-mono pr-2">{status}</span>
    </div>
    <span className={`text-xs font-mono font-black ${color} tracking-tight italic`}>
      {value}
    </span>
  </div>
);