"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, Cpu, AlertTriangle } from "lucide-react";
import styles from '../../../../../styles/root-styles/layout/Header.module.css';

export default function RightPanel() {
  const [armorPoints, setArmorPoints] = useState(9450);
  const [syncRate, setSyncRate] = useState(98.42);
  const [integrityLevel, setIntegrityLevel] = useState(4);
  const [glitch, setGlitch] = useState(false);

  const formattedArmor = armorPoints.toString().padStart(8, '0');

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncRate(prev => Math.min(100, Math.max(90, prev + (Math.random() * 3 - 1.5))));
      setArmorPoints(prev => Math.min(10000, Math.max(8000, prev + Math.floor(Math.random() * 21 - 10))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIntegrityLevel(Math.floor((armorPoints / 10000) * 5));
  }, [armorPoints]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }
    }, 8000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div 
      className={styles.rightPanel}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <motion.div 
        className={styles.hardwareStats}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className={styles.statHeader}>
          <Cpu size={10} className={styles.iconDim} />
          <p className={styles.label}>Neural_Sync</p>
        </div>
        <div className={styles.statRow}>
          <motion.p 
            key={syncRate.toFixed(2)}
            className={`${styles.stat} ${glitch ? styles.glitchText : ''}`}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {syncRate.toFixed(2)}%
          </motion.p>
          <div className={styles.miniBarContainer}>
            <motion.div 
              className={styles.miniBarFill}
              animate={{ width: `${syncRate}%` }}
              transition={{ duration: 1.5 }}
              style={{ backgroundColor: syncRate > 97 ? "#0ff" : "#f97316" }}
            />
          </div>
        </div>
      </motion.div>

      <div className={styles.divider} />

      <motion.div 
        className={styles.hardwareStats}
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className={styles.statHeader}>
          <Shield size={10} className={styles.iconActive} />
          <p className={styles.label}>Armor_Points</p>
        </div>
        <div className={styles.armorDisplay}>
          <motion.p 
            key={formattedArmor}
            className={`${styles.statLarge} ${glitch ? styles.glitchText : ''}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {formattedArmor}
          </motion.p>
          <div className={styles.unitLabel}>AP</div>
        </div>
        <div className={styles.integrityScale}>
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className={styles.scaleNotch}
              animate={i < integrityLevel ? {
                backgroundColor: ["#0ff", "#fff", "#0ff"],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              data-active={i < integrityLevel}
            />
          ))}
        </div>
        {integrityLevel <= 2 && (
          <motion.div 
            className={styles.warningBadge}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <AlertTriangle size={12} color="#f97316" />
            <span>LOW_ARMOR</span>
          </motion.div>
        )}
      </motion.div>

      <div className={styles.panelEdgeRight}>
        <motion.div 
          className={styles.edgeGlowRight}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}