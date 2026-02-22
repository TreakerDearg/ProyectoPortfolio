'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      {/* Fila Superior: Lecturas de Sensores */}
      <div className={styles.sensorGrid}>
        <SensorReading label="Radiation" value="0.04 mSv/h" color="text-green-500" />
        <SensorReading label="Air_Quality" value="Optimal" color="text-amber-500" />
        <SensorReading label="Station_Temp" value="18°C" color="text-blue-400" />
        <SensorReading label="Bar_Pressure" value="1013 hPa" color="text-stone-400" />
      </div>

      {/* Fila Media: Información de Despliegue */}
      <div className={styles.deployInfo}>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-stone-600 uppercase tracking-tighter">Current_User</span>
            <span className="text-[11px] font-mono text-amber-500/80 tracking-widest uppercase">
              Operator_Artyom
            </span>
          </div>
          <div className="w-[1px] h-6 bg-stone-800" />
          <div className="flex flex-col">
            <span className="text-[8px] text-stone-600 uppercase tracking-tighter">Terminal_ID</span>
            <span className="text-[11px] font-mono text-stone-400 tracking-widest">
              D6-BKR-09
            </span>
          </div>
        </div>

        <div className={styles.statusBadge}>
          <motion.div 
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"
          />
          <span className="text-[10px] font-mono text-amber-500 tracking-[0.2em] uppercase">
            System_Link: Established
          </span>
        </div>
      </div>

      {/* Fila Inferior: Copyright y Versión */}
      <div className={styles.bottomBar}>
        <div className="flex gap-4">
          <span>© 2026 Metro_Mix_Collective</span>
          <span className="hidden md:inline text-stone-800">|</span>
          <span className="hidden md:inline italic text-stone-700">&quot;The world is worth saving&quot;</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 1, repeat: Infinity }}
            className="text-amber-500"
          >
            ●
          </motion.span>
          <span>Build_v4.2.6_Stable</span>
        </div>
      </div>
    </footer>
  );
};

const SensorReading = ({ label, value, color }) => (
  <div className="flex flex-col border-l border-stone-800 pl-3">
    <span className="text-[8px] text-stone-600 uppercase tracking-tighter">{label}</span>
    <span className={`text-xs font-mono font-bold ${color} tracking-tight italic`}>
      {value}
    </span>
  </div>
);