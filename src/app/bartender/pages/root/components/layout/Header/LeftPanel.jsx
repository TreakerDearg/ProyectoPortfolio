"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BackToHome from '../../../../../components/salida/BackToHome';
import { ShieldCheck } from "lucide-react";
import styles from '../../../../../styles/root-styles/layout/Header.module.css';

export default function LeftPanel() {
  const [vectorPercent, setVectorPercent] = useState(100);
  const [sessionId, setSessionId] = useState("V.IV_RUSTY");

  useEffect(() => {
    const interval = setInterval(() => {
      setVectorPercent(95 + Math.floor(Math.random() * 11));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setSessionId("V.1V_RU5TY");
        setTimeout(() => setSessionId("V.IV_RUSTY"), 150);
      }
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div 
      className={styles.leftPanel}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <motion.div 
        className={styles.backButtonContainer}
        whileHover={{ scale: 1.02 }}
      >
        <div className={styles.backButton}>
          <BackToHome variant="ac" />
        </div>
        <motion.div 
          className={styles.sessionMeta}
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className={styles.metaLabel}>ID_REF:</span>
          <motion.span 
            key={sessionId}
            className={styles.metaValue}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {sessionId}
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.returnVector}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className={styles.vectorHeader}>
          <div className={styles.vectorLabel}>Return_Vector</div>
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <ShieldCheck size={10} className={styles.vectorIcon} />
          </motion.div>
        </div>
        <div className={styles.vectorBarContainer}>
          <motion.div 
            className={styles.statusNode}
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className={styles.barTrack}>
            <motion.div 
              className={styles.vectorBar}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.div 
            className={styles.vectorData}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className={styles.vectorText}>SYSTEM_READY</span>
            <motion.span 
              key={vectorPercent}
              className={styles.vectorPercent}
              animate={{ color: vectorPercent === 100 ? "#0ff" : vectorPercent > 100 ? "#4ade80" : "#f97316" }}
            >
              {vectorPercent}%
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      <div className={styles.panelEdge}>
        <motion.div 
          className={styles.edgeGlow}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}