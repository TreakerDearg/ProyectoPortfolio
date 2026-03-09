'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import styles from '../../../styles/F-styles/coreBattery.module.css';

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

export const CoreBattery = ({ initialLevel = 98.42, step = 0.02, intervalTime = 2000 }) => {
  const [level, setLevel] = useState(initialLevel);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Actualización del nivel con manejo de ciclo
  useEffect(() => {
    if (prefersReducedMotion) return; // No actualizar si el usuario prefiere menos movimiento

    const interval = setInterval(() => {
      setLevel(prev => (prev <= 5 ? 99.99 : prev - step));
    }, intervalTime);
    return () => clearInterval(interval);
  }, [step, intervalTime, prefersReducedMotion]);

  // Determinar estado crítico
  const isLow = level < 25;
  const statusColor = isLow ? 'critical' : 'nominal';

  // Calcular umbrales para las celdas de energía
  const thresholds = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => (100 / 6) * i);
  }, []);

  return (
    <div
      className={styles.batteryRoot}
      role="region"
      aria-label="Core battery status"
    >
      {/* Indicador de nivel numérico */}
      <div className={styles.numericIndicator}>
        <span className={styles.labelTech}>Core_Output</span>
        <span
          className={`${styles.valueTech} ${isLow ? styles.criticalText : styles.nominalText}`}
          aria-live="polite"
          aria-label={`Battery level ${level.toFixed(2)} percent`}
        >
          {level.toFixed(2)}
          <span className={styles.percentSymbol}>%</span>
        </span>
      </div>

      {/* Cuadrícula de celdas de energía */}
      <div className={styles.energyGrid} aria-hidden="true">
        {thresholds.map((threshold, i) => (
          <motion.div
            key={i}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    opacity: level > threshold ? 1 : 0.1,
                    backgroundColor: isLow ? '#f43f5e' : '#10b981',
                    boxShadow:
                      level > threshold
                        ? `0 0 10px ${isLow ? 'rgba(244, 63, 94, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`
                        : 'none',
                  }
            }
            transition={{ duration: 0.2 }}
            className={styles.cell}
          />
        ))}
      </div>

      {/* Barra de nivel tipo batería */}
      <div className={styles.batteryChassis} aria-hidden="true">
        <div className={styles.chassisCap} />
        <div
          className={styles.liquidLevel}
          style={{
            width: `${level}%`,
            backgroundColor: isLow ? '#f43f5e' : '#0ea5e9',
          }}
        />
        <div className={styles.chassisGlass} />
      </div>

      {/* Etiqueta de voltaje (oculta en móvil) */}
      <div className={styles.voltageTag}>
        <span className={styles.voltageLabel}>Reg_Volt</span>
        <span className={styles.voltageValue}>1.21_GW</span>
      </div>
    </div>
  );
};