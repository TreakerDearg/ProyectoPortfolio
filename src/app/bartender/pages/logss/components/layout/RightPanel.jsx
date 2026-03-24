"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

import PanelFrame from "../../components/decorations-derecha/PanelFrame";
import EnergyColumn from "../../components/decorations-derecha/EnergyColumn";
import GridOverlay from "../../components/decorations-derecha/GridOverlay";
import PulseOrb from "../../components/decorations-derecha/PulseOrb";

import styles from "../../../../styles/logs-styles/layout/soma-right-panel.module.css";

export default function RightPanel() {
  const corruption = 12;

  /* =========================
     DEVICE DETECT 
  ========================= */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024); 
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  /* =========================
     HELPERS
  ========================= */
  const getIntegrityState = () => {
    if (corruption > 70) return styles.critical;
    if (corruption > 40) return styles.warning;
    return styles.stable;
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <motion.aside
      className={`${styles.panel} ${getIntegrityState()}`}
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* =========================
         FRAME + FX
      ========================= */}
      <PanelFrame />
      <EnergyColumn />
      <GridOverlay />

      {/* =========================
         HEADER
      ========================= */}
      <div className={styles.header}>
        <Cpu size={14} />
        <span>SYSTEM_MONITOR</span>
      </div>

      {/* =========================
         WARNING
      ========================= */}
      <div className={`${styles.block} ${styles.warning}`}>
        <div className={styles.blockHeader}>
          <AlertTriangle size={13} />
          <span>WARNING</span>
        </div>

        <div className={styles.warningBody}>
          SIGNAL INSTABILITY
        </div>

        <PulseOrb color="#ff3b3b" />
      </div>

      {/* =========================
         INTEGRITY
      ========================= */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <ShieldAlert size={13} />
          <span>INTEGRITY</span>
        </div>

        <div className={styles.corruptionBox}>
          <motion.span
            className={styles.corruptionValue}
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            {corruption}%
          </motion.span>

          <span className={styles.corruptionLabel}>
            CORRUPTION
          </span>
        </div>

        <div className={styles.corruptionBar}>
          <motion.div
            className={styles.corruptionFill}
            initial={{ width: "0%" }}
            animate={{ width: `${corruption}%` }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* =========================
         STATUS GRID
      ========================= */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <span>STATUS_MATRIX</span>
        </div>

        <div className={styles.statusGrid}>
          <span>MEM</span><span className={styles.ok}>OK</span>
          <span>NET</span><span className={styles.warn}>UNSTABLE</span>
          <span>CORE</span><span className={styles.warn}>LIMITED</span>
        </div>
      </div>

      {/* =========================
         EXTRA FX (SUTIL PERO PRO)
      ========================= */}
      <div className={styles.scanline} />
      <div className={styles.noise} />
      <div className={styles.glowEdge} />
    </motion.aside>
  );
}