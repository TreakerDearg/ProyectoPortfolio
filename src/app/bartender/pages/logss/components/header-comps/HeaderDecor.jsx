"use client";

import { motion } from "framer-motion";
import styles from "../../../../styles/logs-styles/layout/header/header-decor.module.css";

export default function HeaderDecor() {
  return (
    <div className={styles.wrapper}>

      {/* SCANLINES */}
      <div className={styles.scanlines} />

      {/* NOISE */}
      <div className={styles.noise} />

      {/* BASE GLOW */}
      <div className={styles.glowBase} />

      {/* ENERGY SWEEP */}
      <motion.div
        className={styles.energySweep}
        animate={{ x: ["-120%", "120%"] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "linear",
        }}
      />

      {/* GLITCH FLASH (event-like) */}
      <motion.div
        className={styles.glitch}
        animate={{ opacity: [0, 0, 0.2, 0] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          times: [0, 0.9, 0.95, 1],
        }}
      />

      {/* PULSE FIELD */}
      <motion.div
        className={styles.pulse}
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      />

    </div>
  );
}