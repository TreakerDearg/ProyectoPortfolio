"use client";

import { motion } from "framer-motion";
import { Wifi, Shield, Cpu, Activity } from "lucide-react";

import styles from "../../../../styles/logs-styles/layout/header/header-user.module.css";

export default function HeaderUser() {

  const latency = 12; 

  return (
    <div className={styles.wrapper}>

      {/* =========================
         STATUS DOT (CORE SIGNAL)
      ========================= */}
      <div className={styles.signal}>
        <motion.div
          className={styles.signalDot}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
          }}
        />
      </div>

      {/* =========================
         USER BLOCK
      ========================= */}
      <div className={styles.info}>

        {/* NAME */}
        <div className={styles.topRow}>
          <span className={styles.name}>
            USER_ROOT
          </span>

          <div className={styles.badge}>
            <Shield size={10} />
            <span>LVL 5</span>
          </div>
        </div>

        {/* STATUS */}
        <div className={styles.bottomRow}>

          <div className={styles.status}>
            <Activity size={10} />
            <span>SYNC_ACTIVE</span>
          </div>

          <div className={styles.meta}>

            <div className={styles.metaItem}>
              <Wifi size={10} />
              <span>{latency}ms</span>
            </div>

            <div className={styles.metaItem}>
              <Cpu size={10} />
              <span>CORE</span>
            </div>

          </div>

        </div>

      </div>

      {/* =========================
         BACKGROUND FX
      ========================= */}
      <div className={styles.glow} />
      <div className={styles.scanline} />

    </div>
  );
}