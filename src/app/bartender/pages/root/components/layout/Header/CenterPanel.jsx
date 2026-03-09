"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Target, Activity } from "lucide-react";
import styles from '../../../../../styles/root-styles/layout/Header.module.css';

export default function CenterPanel() {
  const [fcsState, setFcsState] = useState("ACTIVE");
  const [syncLevel, setSyncLevel] = useState(0.7);

  useEffect(() => {
    const states = ["ACTIVE", "SCANNING", "TRACKING", "LOCKED"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % states.length;
      setFcsState(states[i]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncLevel(0.5 + Math.random() * 0.5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getDotColor = (index) => {
    const threshold = index / 3;
    return syncLevel > threshold ? "#0ff" : "#3b82f6";
  };

  return (
    <motion.div 
      className={styles.centerPanel}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.div 
        className={styles.scanlineOverlay}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div 
        className={styles.fcsStatus}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Target size={10} className={styles.fcsIcon} />
        <motion.span 
          key={fcsState}
          className={styles.fcsText}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          FCS_LINK: {fcsState}
        </motion.span>
      </motion.div>

      <div className={styles.logoContainer}>
        <motion.h1 
          className={styles.logo}
          animate={{ textShadow: ["0 0 5px #0ff", "0 0 15px #0ff", "0 0 5px #0ff"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ARMORED_CORE <span className={styles.version}>V6.0</span>
        </motion.h1>
        <div className={styles.logoUnderline}>
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease: "circOut" }} />
          <motion.span animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} style={{ backgroundColor: "#0ff", boxShadow: "0 0 10px #0ff" }} />
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.2, ease: "circOut" }} />
        </div>
      </div>

      <motion.div 
        className={styles.neuralLink}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Activity size={10} className={styles.neuralIcon} />
        <div className={styles.neuralData}>
          <span>NEURAL_SYNC</span>
          <div className={styles.syncDots}>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.3, 1],
                  backgroundColor: getDotColor(i)
                }}
                transition={{ opacity: { repeat: Infinity, duration: 1.5, delay: i * 0.3 }, scale: { repeat: Infinity, duration: 1.5, delay: i * 0.3 } }}
                className={styles.dot}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        className={styles.neuralProgress}
        animate={{ width: `${syncLevel * 100}%` }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: "#0ff", height: 2, marginTop: 4 }}
      />
    </motion.div>
  );
}