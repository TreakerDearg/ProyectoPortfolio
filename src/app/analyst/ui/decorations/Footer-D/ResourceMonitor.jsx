'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from '../../../styles/F-styles/resourceMonitor.module.css';

// Hook para detectar preferencia de movimiento reducido
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
};

export const ResourceMonitor = () => {
  const [load, setLoad] = useState(42.08);
  const [temp, setTemp] = useState(52); // Temperatura simulada
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => {
        const change = (Math.random() - 0.5) * 6;
        const newValue = prev + change;
        return newValue > 98 ? 92 : newValue < 10 ? 15 : Number(newValue.toFixed(2));
      });
      // Actualizar temperatura simulada (varía con la carga)
      setTemp(prev => {
        const base = 45 + load * 0.3;
        const variation = (Math.random() - 0.5) * 3;
        return Math.min(85, Math.max(35, base + variation));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [load]);

  // Determinar estado de color
  const getStatusColor = () => {
    if (load > 85) return '#f43f5e'; // crítico
    if (load > 65) return '#fbbf24'; // advertencia
    return '#0ea5e9'; // normal
  };

  const statusColor = getStatusColor();

  return (
    <div
      className={styles.monitorRoot}
      role="region"
      aria-label="System resource monitor"
    >
      <div className={styles.container}>
        {/* Cabecera del Monitor */}
        <div className={styles.header}>
          <span className={styles.tag}>CPU_LOAD</span>
          <div className={styles.valueGroup}>
            <span
              className={`${styles.percentage} ${
                load > 85
                  ? styles.criticalText
                  : load > 65
                  ? styles.warningText
                  : styles.normalText
              }`}
              aria-live="polite"
              aria-label={`CPU load ${load.toFixed(2)} percent`}
            >
              {load.toFixed(2)}
              <span className={styles.percentSymbol}>%</span>
            </span>
            <span className={styles.tempValue} aria-label="Temperature">
              {Math.round(temp)}°C
            </span>
          </div>
        </div>

        {/* Rejilla de bloques de carga */}
        <div className={styles.blockGrid} aria-hidden="true">
          {[...Array(12)].map((_, i) => {
            const threshold = (100 / 12) * i;
            const isActive = load > threshold;

            return (
              <motion.div
                key={i}
                initial={false}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: isActive ? 1 : 0.15,
                        scaleY: isActive ? 1 : 0.8,
                        backgroundColor: isActive ? statusColor : '#1e293b',
                      }
                }
                transition={{ duration: 0.3 }}
                className={styles.block}
              >
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
            animate={
              prefersReducedMotion
                ? {}
                : { width: ['20%', '80%', '40%'] }
            }
            transition={{ repeat: Infinity, duration: 2 }}
            className={styles.miniBar}
            style={{ backgroundColor: statusColor }}
          />
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : { width: ['60%', '30%', '90%'] }
            }
            transition={{ repeat: Infinity, duration: 2.5 }}
            className={`${styles.miniBar} opacity-50`}
            style={{ backgroundColor: statusColor }}
          />
        </div>
        <div className={styles.threadInfo}>
          <span className={styles.smallId}>THRDS: 12</span>
          <span className={styles.coreId}>CORE: 0</span>
        </div>
      </div>
    </div>
  );
};