"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import HeaderTitle from "../header-comps/HeaderTitle";
import HeaderUser from "../header-comps/HeaderUser";
import HeaderDecor from "../header-comps/HeaderDecor";

import styles from "../../../../styles/logs-styles/layout/soma-header.module.css";

export default function Header() {

  /* =========================
     LIVE CLOCK
  ========================= */
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >

      {/* =========================
         FX BACKGROUND LAYER
      ========================= */}
      <div className={styles.fxLayer}>
        <HeaderDecor />
        <div className={styles.energyFlow} />
      </div>

      {/* =========================
         MAIN BAR (OS STYLE)
      ========================= */}
      <div className={styles.inner}>

        {/* =========================
           LEFT SIDE
        ========================= */}
        <div className={styles.left}>

          <HeaderTitle />

          <div className={styles.systemInfo}>
            <span className={styles.sysLabel}>SYS</span>

            <motion.span
              className={styles.dot}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
            />

            <span className={styles.sysState}>
              ONLINE
            </span>
          </div>

        </div>

        {/* =========================
           CENTER CORE
        ========================= */}
        <div className={styles.center}>

          <div className={styles.systemCore}>

            <motion.div
              className={styles.corePulse}
              animate={{
                scale: [0.9, 1.2, 0.9],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            />

            <span className={styles.systemLabel}>
              NEURAL_INTERFACE
            </span>

          </div>

        </div>

        {/* =========================
           RIGHT SIDE
        ========================= */}
        <div className={styles.right}>

          <HeaderUser />

          <div className={styles.clockWrapper}>
            <span className={styles.clockLabel}>
              TIME
            </span>

            <span className={styles.clock}>
              {time}
            </span>
          </div>

        </div>

      </div>

    </motion.header>
  );
}