"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Target, Activity } from "lucide-react";
import styles from '../../../../../styles/root-styles/layout/Header.module.css';

const FCS_STATES = ["ACTIVE", "SCANNING", "TRACKING", "LOCKED"];

export default function CenterPanel() {
  const [fcsIndex, setFcsIndex] = useState(0);
  const [syncLevel, setSyncLevel] = useState(0.72);

  const fcsState = FCS_STATES[fcsIndex];

  /* ------------------ 🧠 STATE LOGIC ------------------ */
  const stateType = useMemo(() => {
    switch (fcsState) {
      case "LOCKED": return "danger";
      case "TRACKING": return "warning";
      case "SCANNING": return "processing";
      default: return "stable";
    }
  }, [fcsState]);

  /* ------------------ ⚡ FCS LOOP ------------------ */
  useEffect(() => {
    const interval = setInterval(() => {
      setFcsIndex(prev => (prev + 1) % FCS_STATES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* ------------------ 🔄 SYNC ORGÁNICO ------------------ */
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncLevel(prev => {
        const next = prev + (Math.random() * 0.1 - 0.05);
        return Math.min(1, Math.max(0.5, next));
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  /* ------------------ 🎨 DOT COLOR ------------------ */
  const getDotState = (i) => {
    const threshold = (i + 1) / 3;
    return syncLevel > threshold;
  };

  return (
    <motion.div 
      className={`${styles.centerPanel} ${styles[stateType]}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >

      {/* 🔥 SCANLINE */}
      <motion.div 
        className={styles.scanlineOverlay}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* ================= FCS STATUS ================= */}
      <motion.div 
        className={styles.fcsStatus}
        animate={{ scale: fcsState === "LOCKED" ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Target size={10} className={styles.fcsIcon} />

        <motion.span 
          className={styles.fcsText}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          FCS_LINK: {fcsState}
        </motion.span>
      </motion.div>

      {/* ================= LOGO ================= */}
      <div className={styles.logoContainer}>
        <motion.h1 
          className={styles.logo}
          animate={{
            textShadow:
              stateType === "danger"
                ? ["0 0 5px #f00", "0 0 20px #f00", "0 0 5px #f00"]
                : ["0 0 5px #0ff", "0 0 15px #0ff", "0 0 5px #0ff"]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ARMORED CORE <span className={styles.version}>V6.0</span>
        </motion.h1>

        {/* underline inteligente */}
        <div className={styles.logoUnderline}>
          <motion.span animate={{ scaleX: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.span 
            animate={{ 
              opacity: [0.2, 1, 0.2], 
              scale: [0.8, 1.3, 0.8] 
            }} 
            transition={{ repeat: Infinity, duration: 1.5 }} 
            className={styles.coreDot}
          />
          <motion.span animate={{ scaleX: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 0.2, repeat: Infinity }} />
        </div>
      </div>

      {/* ================= NEURAL LINK ================= */}
      <motion.div 
        className={styles.neuralLink}
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Activity size={10} className={styles.neuralIcon} />

        <div className={styles.neuralData}>
          <span>NEURAL_SYNC</span>

          <div className={styles.syncDots}>
            {[0,1,2].map((i) => {
              const active = getDotState(i);

              return (
                <motion.div
                  key={i}
                  className={`${styles.dot} ${active ? styles.activeDot : ''}`}
                  animate={active ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ================= PROGRESS ================= */}
      <motion.div 
        className={`${styles.neuralProgress} ${styles[stateType]}`}
        animate={{ width: `${syncLevel * 100}%` }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}