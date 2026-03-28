"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Activity, Terminal, Radio, HardDrive, Wifi } from "lucide-react";
import { useMetro } from "../../context/MetroContext";
import styles from "../../../../styles/inventory-styles/layout/header.module.css";

export default function HardwareHeader() {
  const { system } = useMetro();
  const [radLevel] = useState(system?.radiation_level || "0.45 Sv/h");
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (system?.radiation_level) {
      const radValue = parseFloat(system.radiation_level);
      setIsWarning(radValue > 0.5);
    }
  }, [system]);

  return (
    <header className={styles.header}>
      <div className={styles.scanlines} />
      
      <div className={styles.left}>
        <div className={`${styles.indicator} ${isWarning ? styles.warning : ""}`}>
          <Zap size={14} className={styles.iconPulse} />
          <span>REACTOR_CORE: {system?.status === "CRITICAL_SYSTEM_DEGRADATION" ? "[DEGRADED]" : "[STABLE]"}</span>
        </div>

        <div className={`${styles.indicator} ${isWarning ? styles.warning : ""}`}>
          <Radio size={14} className={isWarning ? styles.warningIcon : styles.iconDim} />
          <span>RAD_SENSOR: {radLevel}</span>
          {isWarning && (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className={styles.warningPulse}
            >
              !
            </motion.span>
          )}
        </div>

        <div className={styles.indicator}>
          <HardDrive size={14} className={styles.iconDim} />
          <span>TERMINAL: {system?.terminal_id || "D6-HB-2033-ULTRA"}</span>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.signalContainer}>
          <div className={styles.signalBars}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.signalBar}
                animate={{
                  height: [4, Math.random() * 12 + 4, 4],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          <Wifi size={12} className={styles.signalIcon} />
          <span className={styles.signalText}>POLIS_DOWNLINK</span>
        </div>
      </div>

      <div className={styles.right}>
        <Terminal size={12} className={styles.iconSoft} />
        <span>NODE_{system?.terminal_id?.split('-')[1] || "D6"} // {system?.os_version || "VOS-DARK-33"}</span>
        <div className={styles.statusDot} />
      </div>
    </header>
  );
}