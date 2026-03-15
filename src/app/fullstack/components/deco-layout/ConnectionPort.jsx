"use client";
import React, { useMemo, useState, useEffect } from 'react';
import styles from '../../styles/deco-layout/ConnectionPort.module.css';
import clsx from 'clsx';

export const ConnectionPort = ({ 
  activeBlocks = 3, 
  totalBlocks = 6, 
  variant = "amber",
  frequency = "0.85",
  signalQuality = "unstable" // stable | unstable | interference
}) => {
  
  const colors = {
    amber: { main: "#ffb642", glow: "rgba(255, 182, 66, 0.4)" },
    green: { main: "#a5ff90", glow: "rgba(165, 255, 144, 0.4)" },
    red: { main: "#ff4b4b", glow: "rgba(255, 75, 75, 0.4)" }
  };

  const theme = colors[variant] || colors.amber;

  // Generador de ruido para la señal de radio
  const wavePath = useMemo(() => {
    if (signalQuality === "stable") return "M0 10 Q 25 2, 50 10 T 100 10";
    if (signalQuality === "unstable") return "M0 10 Q 10 2, 20 10 T 30 18 T 40 10 T 60 2 T 80 10 T 100 10";
    return "M0 10 L 10 2 L 20 18 L 30 5 L 40 15 L 50 10 L 60 18 L 100 10";
  }, [signalQuality]);

  return (
    <div className={styles.outerShell}>
      {/* Tornillería de montaje miniatura */}
      <div className={styles.miniFastener} style={{ top: '2px', left: '2px' }} />
      <div className={styles.miniFastener} style={{ top: '2px', right: '2px' }} />

      <div className={styles.displayArea}>
        {/* OSCILOSCOPIO ANALÓGICO */}
        <div className={styles.monitorTube}>
          <div className={styles.scanlineOverlay} />
          <svg viewBox="0 0 100 20" className={styles.svgWave} preserveAspectRatio="none">
            {/* Sombra de persistencia de fósforo */}
            <path 
              d={wavePath} 
              stroke={theme.main} 
              strokeWidth="1.5" 
              fill="none" 
              className={styles.ghostWave} 
            />
            {/* Onda principal */}
            <path 
              d={wavePath} 
              stroke={theme.main} 
              strokeWidth="0.8" 
              fill="none" 
              className={styles.activeWave}
              style={{ animationDuration: `${1.5 - parseFloat(frequency)}s` }}
            />
          </svg>
          
          <div className={styles.dataReadout}>
            <span className={styles.label}>FRQ</span>
            <span className={styles.value}>{frequency}</span>
          </div>
        </div>

        {/* INDICADOR DE BARRAS (Válvulas de Vacío) */}
        <div className={styles.portGrid}>
          {[...Array(totalBlocks)].map((_, i) => {
            const isActive = i < activeBlocks;
            const isCritical = isActive && i === totalBlocks - 1;

            return (
              <div 
                key={i} 
                className={clsx(styles.vial, isActive && styles.vialActive, isCritical && styles.vialCritical)}
                style={{ 
                  '--height': `${(i + 1) * 15 + 10}%`,
                  '--glow': theme.glow,
                  '--color': theme.main
                }}
              >
                <div className={styles.vialLiquid} />
                <div className={styles.vialGlass} />
                {/* Micro-destello aleatorio */}
                {isActive && <div className={styles.vialSpark} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Etiqueta grabada en el metal del chasis */}
      <div className={styles.chassisMark}>SIGNAL_PROCESSOR_v42</div>
    </div>
  );
};