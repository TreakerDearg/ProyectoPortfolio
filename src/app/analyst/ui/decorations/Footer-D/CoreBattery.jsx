'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/analyst/styles/F-styles/coreBattery.module.css';

export const CoreBattery = () => {
  const [level, setLevel] = useState(98.42);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(prev => (prev <= 5 ? 99.99 : prev - 0.02));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Determinar color de alerta según el nivel
  const isLow = level < 25;
  const statusColor = isLow ? styles.critical : styles.nominal;

  return (
    <div className={styles.batteryRoot}>
      <div className="flex flex-col items-end mr-4">
        <span className={styles.labelTech}>Core_Output</span>
        <span className={`${styles.valueTech} ${isLow ? 'text-red-500' : 'text-emerald-400'}`}>
          {level.toFixed(2)}<span className="text-[7px] opacity-50 ml-0.5">%</span>
        </span>
      </div>

      {/* Contenedor de Celdas de Energía */}
      <div className={styles.energyGrid}>
        {[...Array(6)].map((_, i) => {
          const threshold = (100 / 6) * i;
          return (
            <motion.div 
              key={i}
              initial={false}
              animate={{ 
                opacity: level > threshold ? 1 : 0.1,
                backgroundColor: isLow ? '#f43f5e' : '#10b981',
                boxShadow: level > threshold 
                  ? `0 0 10px ${isLow ? 'rgba(244, 63, 94, 0.4)' : 'rgba(16, 185, 129, 0.4)'}` 
                  : 'none'
              }}
              className={styles.cell}
            />
          );
        })}
      </div>

      {/* Indicador de Chasis Táctico */}
      <div className={styles.batteryChassis}>
        <div className={styles.chassisCap} />
        <div className={styles.liquidLevel} style={{ width: `${level}%`, backgroundColor: isLow ? '#f43f5e' : '#0ea5e9' }} />
        <div className={styles.chassisGlass} />
      </div>
      
      {/* Etiqueta de Voltaje Decotativa */}
      <div className="ml-3 hidden sm:flex flex-col">
        <span className="text-[6px] text-slate-600 font-bold leading-none uppercase">Reg_Volt</span>
        <span className="text-[8px] text-slate-400 font-mono font-bold tracking-tighter">1.21_GW</span>
      </div>
    </div>
  );
};