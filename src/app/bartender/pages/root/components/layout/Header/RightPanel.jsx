"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Shield, Cpu, AlertTriangle } from "lucide-react";
import styles from '../../../../../styles/root-styles/layout/Header.module.css';

export default function RightPanel() {
  const [armorPoints, setArmorPoints] = useState(9450);
  const [syncRate, setSyncRate] = useState(98.42);
  const [glitch, setGlitch] = useState(false);

  /* ------------------ 🧠 DERIVED STATE ------------------ */
  const integrityLevel = useMemo(() => {
    return Math.floor((armorPoints / 10000) * 5);
  }, [armorPoints]);

  const formattedArmor = useMemo(() => {
    return armorPoints.toString().padStart(8, '0');
  }, [armorPoints]);

  const statusLevel = useMemo(() => {
    if (syncRate > 97) return "stable";
    if (syncRate > 93) return "warning";
    return "danger";
  }, [syncRate]);

  /* ------------------ ⚡ DATA SIMULATION ------------------ */
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncRate(prev =>
        Math.min(100, Math.max(90, prev + (Math.random() * 2 - 1)))
      );

      setArmorPoints(prev =>
        Math.min(10000, Math.max(8000, prev + Math.floor(Math.random() * 15 - 7)))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* ------------------ ⚠️ GLITCH CONTROL ------------------ */
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.75) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 180);
      }
    }, 9000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className={styles.rightPanel}>

      {/* ================= CPU / SYNC ================= */}
      <motion.div 
        className={styles.hardwareStats}
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className={styles.statHeader}>
          <Cpu size={10} className={styles.iconDim} />
          <p className={styles.label}>Neural_Sync</p>
        </div>

        <div className={styles.statRow}>
          <motion.p 
            className={`${styles.stat} ${styles[statusLevel]} ${glitch ? styles.glitchText : ''}`}
            animate={{ opacity: [1, 0.75, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {syncRate.toFixed(2)}%
          </motion.p>

          <div className={styles.miniBarContainer}>
            <motion.div 
              className={`${styles.miniBarFill} ${styles[statusLevel]}`}
              animate={{ width: `${syncRate}%` }}
              transition={{ duration: 1.2 }}
            />
          </div>
        </div>
      </motion.div>

      <div className={styles.divider} />

      {/* ================= ARMOR ================= */}
      <motion.div 
        className={styles.hardwareStats}
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className={styles.statHeader}>
          <Shield size={10} className={styles.iconActive} />
          <p className={styles.label}>Armor_Points</p>
        </div>

        <div className={styles.armorDisplay}>
          <motion.p 
            className={`${styles.statLarge} ${glitch ? styles.glitchText : ''}`}
            animate={{ opacity: [1, 0.85, 1] }}
          >
            {formattedArmor}
          </motion.p>
          <div className={styles.unitLabel}>AP</div>
        </div>

        {/* 🔥 SCALE INTELIGENTE */}
        <div className={styles.integrityScale}>
          {[...Array(5)].map((_, i) => {
            const active = i < integrityLevel;

            return (
              <motion.div 
                key={i}
                className={`${styles.scaleNotch} ${active ? styles.active : ''}`}
                animate={active ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
              />
            );
          })}
        </div>

        {/* ⚠️ WARNING DINÁMICO */}
        {integrityLevel <= 2 && (
          <motion.div 
            className={styles.warningBadge}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <AlertTriangle size={12} />
            <span>LOW_ARMOR</span>
          </motion.div>
        )}
      </motion.div>

      {/* ================= EDGE ================= */}
      <div className={styles.panelEdgeRight}>
        <motion.div 
          className={styles.edgeGlowRight}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  );
}