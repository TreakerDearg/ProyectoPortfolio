"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../../../../styles/root-styles/layout/Footer.module.css";

const SYSTEM_MESSAGES = [
  "ANALYZING_SURROUNDINGS...",
  "NEURAL_LINK_STABLE",
  "FCS_TARGETING_ACTIVE",
  "EN_REGENERATING",
  "CORE_TEMP_NOMINAL"
];

export default function Logs() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SYSTEM_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.logs}>
      <div className={styles.logLine}>
        <div className={styles.pingDot} />
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            className={styles.logText}
          >
            {SYSTEM_MESSAGES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={styles.subLog}>BATTERY_CELLS: OPTIMIZED</span>
    </div>
  );
}