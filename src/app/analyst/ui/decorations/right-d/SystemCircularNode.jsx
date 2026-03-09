'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from '../../../styles/D-side/SystemCircularNode.module.css';

export const SystemCircularNode = ({ baseSize = 4, className = '' }) => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
  }, []);

  return (
    <div
      className={`${styles.nodeWrapper} ${className}`}
      style={{ height: `${baseSize}rem`, width: `${baseSize}rem` }}
    >
      {/* 1. ANILLO DE ROTACIÓN LENTA (SISTEMA OPERATIVO) */}
      <motion.div
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className={styles.outerRing}
      >
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className={styles.bitMarker}
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translate(${baseSize * 8}px, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* 2. FRAME HEXAGONAL (ESTRUCTURA DE DATOS) */}
      <div className={styles.hexFrame} />

      {/* 3. LÍNEA DE ESCANEO (FRECUENCIA) */}
      <motion.div
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className={styles.scanner}
      />

      {/* 4. MIRA DE PRECISIÓN (CROSSHAIR) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-full h-[1px] bg-sky-500/30" />
        <div className="absolute w-[1px] h-full bg-sky-500/30" />
      </div>

      {/* 5. NÚCLEO DE HARDWARE (CUADRADO TÉCNICO) */}
      <div className={styles.core}>
        {/* Efecto de expansión interna */}
        <div className={styles.corePulse} />
        
        {/* El "Chip" central */}
        <div className="w-1.5 h-1.5 bg-sky-400 shadow-[0_0_8px_rgba(0,234,255,0.8)]" />
        
        {/* Etiquetas de coordenadas diminutas */}
        {!reduced && (
          <div className="absolute -bottom-6 flex flex-col items-center">
            <span className="text-[5px] font-mono text-sky-500/40 uppercase tracking-[0.2em]">
              Node_Active
            </span>
            <span className="text-[4px] font-mono text-sky-500/20 uppercase mt-0.5">
              Sector_77_Alpha
            </span>
          </div>
        )}
      </div>

      {/* 6. CORNER BRACKETS (DECORACIÓN FINAL) */}
      <div className="absolute inset-[-10%] opacity-20">
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-sky-400" />
        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-sky-400" />
        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-sky-400" />
        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-sky-400" />
      </div>
    </div>
  );
};