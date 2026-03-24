"use client";
import { motion } from "framer-motion";
import styles from "../../../../styles/logs-styles/layout/panel-derecho/energy-column.module.css";

export default function EnergyColumn() {
  return (
    <motion.div
      className={styles.energy}
      animate={{ y: ["-100%", "100%"] }}
      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
    />
  );
}