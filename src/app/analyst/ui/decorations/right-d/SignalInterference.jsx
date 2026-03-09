'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';
import styles from '../../../styles/D-side/SignalInterference.module.css';

export const SignalInterference = ({ className = '' }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Generamos un patrón de frecuencia "pseudo-aleatorio" pero estable
  const barCount = useMemo(() => Math.floor(width / 4), [width]);

  const bars = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => ({
      // Algunas barras son más altas para simular picos de datos
      baseHeight: i % 7 === 0 ? Math.random() * 15 + 10 : Math.random() * 6 + 2,
      duration: 0.8 + Math.random() * 1.5,
    }));
  }, [barCount]);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {/* CAPA DE METADATOS RF */}
      <div className={styles.labelLayer}>
        <span className={styles.frequencyText}>SIG_INTEL // 2.44GHZ</span>
        <div className="flex gap-3">
          <span className={styles.frequencyText}>BW: 40MHZ</span>
          <span className={`${styles.frequencyText} text-white/20`}>UPLINK_09</span>
        </div>
      </div>

      {/* ESPECTRO DE BARRAS DINÁMICO */}
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          animate={{
            height: [bar.baseHeight, bar.baseHeight * 0.4, bar.baseHeight],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={styles.bar}
        />
      ))}

      {/* BARRIDO LÁSER DE ESCANEO */}
      <motion.div
        animate={{ x: ['-100%', '400%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className={styles.scanLine}
      />

      {/* OVERLAY DE TEXTURA TÉCNICA (Opcional si usas noise) */}
      <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay pointer-events-none" />
    </div>
  );
};