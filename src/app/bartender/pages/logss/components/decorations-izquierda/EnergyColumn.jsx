"use client";
import { motion } from "framer-motion";
import styles from "../../../../styles/logs-styles/layout/panel-izquierdo/energy-column.module.css";

export default function EnergyColumn() {
  return (
    <motion.div
      className={styles.energy}
      animate={{ y: ["100%", "-100%"] }}
      transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
    />
  );
}