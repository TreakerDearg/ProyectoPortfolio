"use client";

import { motion } from "framer-motion";
import { Cpu, Activity, Database } from "lucide-react";

import PanelFrame from "../../components/decorations-izquierda/PanelFrame";
import EnergyColumn from "../../components/decorations-izquierda/EnergyColumn";
import GridOverlay from "../../components/decorations-izquierda/GridOverlay";
import PulseLine from "../../components/decorations-izquierda/PulseLine";

import { useIsMobile } from "../hooks/useIsMobile";

import styles from "../../../../styles/logs-styles/layout/soma-left-panel.module.css";

export default function LeftPanel() {
  const load = 68;
  const isMobile = useIsMobile();


  if (isMobile) return null;

  return (
    <motion.aside
      className={styles.panel}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      {/* FRAME + FX */}
      <PanelFrame />
      <EnergyColumn />
      <GridOverlay />

      {/* HEADER */}
      <div className={styles.header}>
        <Cpu size={14} />
        <span>SYSTEM_CORE</span>
      </div>

      {/* CORE */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <Cpu size={12} />
          <span>CORE</span>
        </div>

        <div className={styles.coreStats}>
          <div className={styles.statRow}>
            <span>LOAD</span>
            <span>{load}%</span>
          </div>

          <div className={styles.statRow}>
            <span>TEMP</span>
            <span>42°</span>
          </div>
        </div>

        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            initial={{ width: "0%" }}
            animate={{ width: `${load}%` }}
            transition={{ duration: 1.4 }}
          />
        </div>

        <PulseLine />
      </div>

      {/* FLOW */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <Activity size={12} />
          <span>DATA FLOW</span>
        </div>

        <div className={styles.flowBars}>
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.bar}
              animate={{
                height: [4, 20, 8, 18, 6],
                opacity: [0.3, 1, 0.5, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.3,
                delay: i * 0.12,
              }}
            />
          ))}
        </div>
      </div>

      {/* STREAM */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <Database size={12} />
          <span>STREAM</span>
        </div>

        <div className={styles.stream}>
          {[
            "> init sequence...",
            "> syncing nodes...",
            "> calibrating memory...",
            "> signal stable",
          ].map((line, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.4,
              }}
            >
              {line}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}