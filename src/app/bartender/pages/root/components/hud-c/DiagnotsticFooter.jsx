"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Wifi, Cpu, Database } from 'lucide-react';
import styles from '../../../../styles/root-styles/c-styles-comps/DiagnosticFooter.module.css';

const SYSTEM_EVENTS = [
  "SCANNING_SURROUNDINGS...",
  "CORAL_DENSITY_STABLE",
  "NEURAL_SYNC_OPTIMIZED",
  "THERMAL_LAYERS_CHECK",
  "EN_REGENERATING",
  "FCS_TARGETING_ACTIVE"
];

export default function DiagnosticFooter() {
  const [coords, setCoords] = useState({ x: 104.2, y: 88.9 });
  const [currentEvent, setCurrentEvent] = useState(0);

  useEffect(() => {
    // Intervalo para coordenadas
    const coordInterval = setInterval(() => {
      setCoords({
        x: (Math.random() * 999).toFixed(1),
        y: (Math.random() * 999).toFixed(1),
      });
    }, 2000);

    // Intervalo para logs del sistema
    const eventInterval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % SYSTEM_EVENTS.length);
    }, 4500);

    return () => {
      clearInterval(coordInterval);
      clearInterval(eventInterval);
    };
  }, []);

  return (
    <footer className={styles.footerContainer}>
      {/* SECCIÓN 1: ESTABILIDAD Y EVENTO ACTUAL */}
      <div className={styles.statusGroup}>
        <Activity size={14} className={styles.pulseIcon} />
        <div className={styles.logWrapper}>
          <span className={styles.label}>[ LOG ]</span>
          <AnimatePresence mode="wait">
            <motion.span 
              key={currentEvent}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={styles.eventText}
            >
              {SYSTEM_EVENTS[currentEvent]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* SECCIÓN 2: TELEMETRÍA DE POSICIÓN */}
      <div className={styles.coordGroup}>
        <Database size={12} className={styles.dimIcon} />
        <span className={styles.label}>COORD_SET:</span>
        <span className={styles.coords}>
          {coords.x} <span className={styles.divider}>|</span> {coords.y}
        </span>
      </div>

      {/* SECCIÓN 3: ESTADO DEL ENLACE */}
      <div className={styles.systemLog}>
        <div className={styles.linkStatus}>
          <Cpu size={14} />
          <span>NEURAL_LINK</span>
          <div className={styles.pulseDot} />
        </div>
        
        <div className={styles.signalGroup}>
          <Wifi size={14} className={styles.wifiIcon} />
          <div className={styles.signalBars}>
            {[1, 2, 3].map((b) => (
              <motion.div 
                key={b}
                className={styles.bar}
                animate={{ height: [4, 10, 4] }}
                transition={{ repeat: Infinity, duration: 1, delay: b * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}