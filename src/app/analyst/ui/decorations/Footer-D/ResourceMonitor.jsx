'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/analyst/styles/F-styles/resourceMonitor.module.css';

export const ResourceMonitor = () => {
  const [load, setLoad] = useState(42.08);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => {
        const change = (Math.random() - 0.5) * 6;
        const newValue = prev + change;
        return newValue > 98 ? 92 : newValue < 10 ? 15 : Number(newValue.toFixed(2));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.monitorRoot}>
      <div className={styles.container}>
        {/* Cabecera del Monitor */}
        <div className={styles.header}>
          <span className={styles.tag}>CPU_LOAD</span>
          <span className={`${styles.percentage} ${load > 85 ? styles.criticalText : load > 65 ? styles.warningText : ''}`}>
            {load.toFixed(2)}<span className="text-[6px] opacity-40 ml-0.5">%</span>
          </span>
        </div>

        {/* Rejilla de bloques de carga */}
        <div className={styles.blockGrid}>
          {[...Array(12)].map((_, i) => {
            const threshold = (100 / 12) * i;
            const isActive = load > threshold;
            
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ 
                  opacity: isActive ? 1 : 0.15,
                  scaleY: isActive ? 1 : 0.8,
                  backgroundColor: isActive 
                    ? (load > 85 ? '#f43f5e' : load > 65 ? '#fbbf24' : '#0ea5e9') 
                    : '#1e293b'
                }}
                transition={{ duration: 0.3 }}
                className={styles.block}
              >
                {/* Reflejo interno del bloque */}
                {isActive && <div className={styles.blockGlow} />}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mini Detalle de subprocesos */}
      <div className={styles.processDetail}>
        <div className={styles.lineGroup}>
           <motion.div 
             animate={{ width: ["20%", "80%", "40%"] }} 
             transition={{ repeat: Infinity, duration: 2 }}
             className={styles.miniBar} 
           />
           <motion.div 
             animate={{ width: ["60%", "30%", "90%"] }} 
             transition={{ repeat: Infinity, duration: 2.5 }}
             className={`${styles.miniBar} opacity-50`} 
           />
        </div>
        <span className={styles.smallId}>THRDS: 12</span>
      </div>
    </div>
  );
};