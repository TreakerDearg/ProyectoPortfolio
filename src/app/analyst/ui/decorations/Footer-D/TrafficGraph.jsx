'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from '../../../styles/F-styles/trafficGraph.module.css';

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
};

export const TrafficGraph = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const barCount = 18;

  const bars = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => ({
      heights: [
        `${20 + Math.random() * 30}%`,
        `${60 + Math.random() * 40}%`,
        `${10 + Math.random() * 50}%`
      ],
      colors: ['#0ea5e9', '#f43f5e', '#0ea5e9'],
      delay: i * 0.08,
      duration: 0.8 + Math.random() * 1.2
    }));
  }, []);

  return (
    <div className={styles.graphContainer} role="region" aria-label="Network traffic graph">
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.scanline} aria-hidden="true" />

      <div className="flex items-end gap-[2px] h-full relative z-10 px-1">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    height: bar.heights,
                    opacity: [0.4, 1, 0.7],
                    backgroundColor: bar.colors
                  }
            }
            transition={{
              duration: bar.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bar.delay
            }}
            className={styles.bar}
            style={{ willChange: prefersReducedMotion ? 'auto' : 'height, opacity, background-color' }}
          />
        ))}
      </div>

      <div className={styles.metaOverlay}>
        <span className={styles.tag}>RX/TX_SCAN</span>
        <div className={styles.bitRate} aria-live="polite">
          <motion.span
            animate={prefersReducedMotion ? {} : { opacity: [0, 1] }}
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