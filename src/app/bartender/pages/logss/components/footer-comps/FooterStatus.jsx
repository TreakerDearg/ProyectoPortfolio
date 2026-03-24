"use client";

import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import styles from "../../../../styles/logs-styles/layout/footer/footer-status.module.css";

export default function FooterStatus({
  status = "CONNECTED",
}) {
  const isCritical = status === "CRITICAL";

  return (
    <div className={styles.status} data-state={status}>

      {/* ICON + PULSE */}
      <div className={styles.iconWrapper}>
        <motion.div
          className={styles.pulse}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
        />

        <Activity size={12} className={styles.icon} />
      </div>

      {/* TEXT */}
      <div className={styles.textBlock}>
        <span className={styles.label}>STATUS</span>
        <span className={styles.value}>
          {status}
        </span>
      </div>

      {/* SIGNAL BARS */}
      <div className={styles.bars}>
        <span />
        <span />
        <span />
      </div>

      {/* CRITICAL ALERT */}
      {isCritical && (
        <div className={styles.alert}>
          ALERT
        </div>
      )}

    </div>
  );
}