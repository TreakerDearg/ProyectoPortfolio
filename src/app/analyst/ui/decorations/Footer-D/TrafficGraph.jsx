'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/analyst/styles/F-styles/trafficGraph.module.css';

export const TrafficGraph = () => {
  // Generamos una semilla fija para los delays iniciales
  const barCount = 18;

  return (
    <div className={styles.graphContainer}>
      {/* Capas de fondo técnicas */}
      <div className={styles.gridOverlay} />
      <div className={styles.scanline} />
      
      <div className="flex items-end gap-[2px] h-full relative z-10 px-1">
        {[...Array(barCount)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: [
                `${20 + Math.random() * 30}%`, 
                `${60 + Math.random() * 40}%`, 
                `${10 + Math.random() * 50}%`
              ],
              opacity: [0.4, 1, 0.7],
              backgroundColor: [
                '#0ea5e9', // Sky normal
                '#f43f5e', // Red alert peak
                '#0ea5e9'
              ]
            }}
            transition={{ 
              duration: 0.8 + Math.random() * 1.2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.08
            }}
            className={styles.bar}
          />
        ))}
      </div>

      {/* Metadatos del gráfico */}
      <div className={styles.metaOverlay}>
        <span className={styles.tag}>RX/TX_SCAN</span>
        <div className={styles.bitRate}>
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.1, repeatType: "mirror" }}
          >
            ●
          </motion.span>
          128.4 KB/S
        </div>
      </div>
    </div>
  );
};