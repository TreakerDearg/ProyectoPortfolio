"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Radio, Database, Activity, WifiOff } from "lucide-react";
import styles from '../../../../../styles/root-styles/layout/Header.module.css';

export default function BottomBar() {
  const [commsStatus, setCommsStatus] = useState("STABLE");
  const [osVersion] = useState("ALLMIND");
  const [dataRate, setDataRate] = useState(100);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const states = ["STABLE", "INTERFERENCE", "BOOST", "SCANNING"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % states.length;
      setCommsStatus(states[i]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataRate(85 + Math.floor(Math.random() * 30));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      }
    }, 8000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div 
      className={`${styles.bottomBar} ${glitch ? styles.glitch : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className={styles.signalGroup}>
        <div className={styles.dots}>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1],
                backgroundColor: commsStatus === "STABLE" ? "#0ff" : "#f97316"
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              className={styles.dot}
            />
          ))}
        </div>
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          {commsStatus === "OFFLINE" ? <WifiOff size={10} color="#f87171" /> : <Radio size={10} className={styles.commsIcon} />}
        </motion.div>
      </div>

      <div className={styles.statusTicker}>
        <span className={styles.tag}>OS:</span>
        <span className={styles.value}>{osVersion}</span>
        <span className={styles.separator}>//</span>
        <span className={styles.tag}>COMMS:</span>
        <motion.span 
          key={commsStatus}
          className={`${styles.valueStable} ${commsStatus !== "STABLE" ? styles.warning : ''}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {commsStatus}
        </motion.span>
        <span className={styles.separator}>//</span>
        <span className={styles.locationTag}>RUBICON-3_ZONE_4</span>
      </div>

      <div className={styles.rightStatus}>
        <div className={styles.feedContainer}>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <Activity size={10} className={styles.pulseIcon} />
          </motion.div>
          <span className={styles.liveFeed}>DATA:{dataRate} Mbps</span>
        </div>
        <div className={styles.versionBox}>
          <Database size={10} />
          <span className={styles.versionText}>VER_24.00.413</span>
        </div>
      </div>

      <motion.div 
        className={styles.bottomScanline}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}