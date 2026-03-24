"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import BackToHome from '../../../../../components/salida/BackToHome';
import { ShieldCheck } from "lucide-react";
import styles from '../../../../../styles/root-styles/layout/Header.module.css';

export default function LeftPanel() {
  const [vectorPercent, setVectorPercent] = useState(100);
  const [sessionId, setSessionId] = useState("V.IV_RUSTY");
  const [glitch, setGlitch] = useState(false);

  /* ------------------  DERIVED STATE ------------------ */
  const vectorStatus = useMemo(() => {
    if (vectorPercent >= 100) return "stable";
    if (vectorPercent >= 97) return "warning";
    return "danger";
  }, [vectorPercent]);

  /* ------------------  SIMULATION ------------------ */
  useEffect(() => {
    const interval = setInterval(() => {
      setVectorPercent(95 + Math.floor(Math.random() * 8));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ------------------  GLITCH ------------------ */
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.75) {
        setGlitch(true);
        setSessionId("V.1V_RU5TY");

        setTimeout(() => {
          setSessionId("V.IV_RUSTY");
          setGlitch(false);
        }, 160);
      }
    }, 6000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className={styles.leftPanel}>

      {/* ================= BACK + SESSION ================= */}
      <motion.div 
        className={styles.backButtonContainer}
        whileHover={{ scale: 1.02 }}
      >
        <div className={styles.backButton}>
          <BackToHome variant="ac" />
        </div>

        <div className={styles.sessionMeta}>
          <span className={styles.metaLabel}>ID_REF:</span>
          <motion.span 
            className={`${styles.metaValue} ${glitch ? styles.glitchText : ''}`}
            animate={{ opacity: [1, 0.75, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {sessionId}
          </motion.span>
        </div>
      </motion.div>

      {/* ================= VECTOR ================= */}
      <motion.div 
        className={styles.returnVector}
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className={styles.vectorHeader}>
          <div className={styles.vectorLabel}>Return_Vector</div>

          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <ShieldCheck size={10} className={styles.vectorIcon} />
          </motion.div>
        </div>

        <div className={styles.vectorBarContainer}>
          
          {/* NODE INTELIGENTE */}
          <motion.div 
            className={`${styles.statusNode} ${styles[vectorStatus]}`}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* TRACK */}
          <div className={styles.barTrack}>
            <motion.div 
              className={`${styles.vectorBar} ${styles[vectorStatus]}`}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: vectorStatus === "stable" ? 2 : 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/*  DATA */}
          <div className={styles.vectorData}>
            <span className={styles.vectorText}>SYSTEM_READY</span>

            <motion.span 
              className={`${styles.vectorPercent} ${styles[vectorStatus]}`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {vectorPercent}%
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* ================= EDGE ================= */}
      <div className={styles.panelEdge}>
        <motion.div 
          className={styles.edgeGlow}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}