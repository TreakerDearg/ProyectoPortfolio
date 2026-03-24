"use client";
import { motion } from "framer-motion";
import styles from "../../../../styles/logs-styles/layout/panel-derecho/pulse-orb.module.css";

export default function PulseOrb({ color = "#00ffcc" }) {
  return (
    <motion.div
      className={styles.orb}
      style={{ background: color }}
      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  );
}