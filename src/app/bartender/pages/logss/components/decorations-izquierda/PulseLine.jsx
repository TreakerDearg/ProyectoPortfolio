"use client";
import { motion } from "framer-motion";
import styles from "../../../../styles/logs-styles/layout/panel-izquierdo/pulse-line.module.css";

export default function PulseLine() {
  return (
    <motion.div
      className={styles.line}
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  );
}