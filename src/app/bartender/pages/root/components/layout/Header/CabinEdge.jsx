"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from '../../../../../styles/root-styles/layout/Header.module.css';

export default function CabinEdge() {
  const [angle, setAngle] = useState(0);

  // Simular cambio de ángulo de la cabina
  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prev => (prev + 5) % 360);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={styles.cabinEdge}
      animate={{ opacity: [1, 0.8, 1] }}
      transition={{ duration: 5, repeat: Infinity }}
    >
      {/* Lado Izquierdo con muescas de escala y animación secuencial */}
      <div className={styles.cabinEdgeLeft}>
        <div className={styles.edgeDetail} />
        <div className={styles.notches}>
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              className={styles.notch}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.3 
              }}
            />
          ))}
        </div>
      </div>

      {/* Lado Derecho con indicador de ángulo animado */}
      <div className={styles.cabinEdgeRight}>
        <div className={styles.notches}>
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              className={styles.notch}
              animate={{ 
                backgroundColor: `hsla(${angle + i * 20}, 100%, 50%, 0.8)`
              }}
            />
          ))}
        </div>
        <motion.div 
          className={styles.edgeGlow} 
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Pequeño indicador digital del ángulo */}
        <motion.div 
          className={styles.angleIndicator}
          animate={{ scale: [1, 1.05, 1] }}
        >
          {angle}°
        </motion.div>
      </div>
    </motion.div>
  );
}