"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Styles-C/nodes/militechNode.module.css";

export default function MilitechNode({
  node,
  isSelected,
  isHovered,
  isSystemAlert,
  onConnect
}) {
  const {
    name = "BIO_CORE",
    metrics = { load: 0, latency: "0ms", active_sessions: 0 },
    path = "#",
    color = "#22c55e",
    status = "ACTIVE"
  } = node || {};

  // ================= LOGICA DE ESTADO =================
  const loadState = useMemo(() => {
    if (isSystemAlert || metrics.load > 85) return "critical";
    if (metrics.load > 60) return "high";
    if (metrics.load > 35) return "medium";
    return "low";
  }, [metrics.load, isSystemAlert]);

  const glowColor = useMemo(() => {
    if (loadState === "critical") return "#ef4444";
    if (loadState === "high") return "#f59e0b";
    if (loadState === "medium") return "#84cc16";
    return color;
  }, [loadState, color]);

  const pulseDuration = useMemo(() => {
    if (isSystemAlert) return 0.2;
    if (metrics.load > 80) return 0.35;
    return 1.4;
  }, [metrics.load, isSystemAlert]);

  // ================= JSX =================
  return (
    <div
      className={`
        ${styles.node} 
        ${styles[loadState]} 
        ${isSelected ? styles.activeNode : ""} 
        ${isSystemAlert ? styles.alertNode : ""} 
        ${styles[status.toLowerCase()]}
      `}
      style={{ "--node-color": color, "--glow-color": glowColor }}
    >
      {/* ======= NÚCLEO METALICO BIOMECÁNICO ======= */}
      <motion.div
        className={styles.core}
        animate={{ scale: [1, 1.12, 1], rotate: [0, 4, -4, 0] }}
        transition={{ duration: pulseDuration, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: `0 0 20px ${glowColor}, inset 0 0 10px #000` }}
      >
        <div className={styles.innerGlow} style={{ background: glowColor }} />
        <div className={styles.metalPlate} />
      </motion.div>

      {/* ======= MEMBRANA CYBER ======= */}
      <div className={styles.membrane}>
        <span className={styles.nodeLabel}>{name}</span>
      </div>

      {/* ======= VENAS / CIRCUITOS ======= */}
      <div className={styles.veinSystem}>
        {[0, 1, 2, 3].map((v) => (
          <div key={v} className={`${styles.vein} ${isHovered ? styles.pumping : ""}`} />
        ))}
      </div>

      {/* ======= DNA / HELIX ======= */}
      <div className={styles.dnaContainer}>
        <div className={styles.dna} />
        {metrics.load !== undefined && (
          <div
            className={styles.dnaProgress}
            style={{ height: `${metrics.load}%`, backgroundColor: glowColor }}
          />
        )}
      </div>

      {/* ======= BARRA DE CARGA ======= */}
      {metrics.load !== undefined && (
        <div className={styles.bioLoad}>
          <div
            className={styles.bioLoadFill}
            style={{ width: `${metrics.load}%`, backgroundColor: glowColor }}
          />
        </div>
      )}

      {/* ======= SCAN HUD ======= */}
      <div className={`${styles.bioScan} ${isHovered ? styles.scanning : ""}`} />

      {/* ======= PANEL DE MÉTRICAS ======= */}
      <div className={styles.metricsOverlay}>
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className={styles.metricLine}>
            {key.toUpperCase()}: {value}
          </div>
        ))}
      </div>

      {/* ======= BOTÓN DE CONEXIÓN ======= */}
      {path && (
        <div className={styles.connectButtonContainer}>
          <button
            className={styles.connectButton}
            style={{ backgroundColor: glowColor }}
            onClick={() => onConnect?.(path)}
          >
            CONECTAR A {path}
          </button>
        </div>
      )}

      {/* ======= ALERTA CRÍTICA / BIO HAZARD ======= */}
      {isSystemAlert && (
        <div className={styles.hazardOverlay}>
          <span>CONTAMINACIÓN DETECTADA</span>
        </div>
      )}
    </div>
  );
}