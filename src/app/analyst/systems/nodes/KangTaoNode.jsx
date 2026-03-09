"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Styles-C/nodes/kangtaoNode.module.css";

export default function KangTaoNode({
  node,
  isSelected,
  isHovered,
  isSystemAlert,
  onConnect,
  tooltip
}) {
  const {
    name = "DRONE_AI_LINK",
    metrics = { load: 0, fps: 0, user_count: 0, target_locked: false },
    path = "#",
    status = "ACTIVE",
    color = "#a855f7" // Violeta base
  } = node || {};

  // Determina el estado de carga
  const loadState = useMemo(() => {
    if (isSystemAlert || metrics.load > 85) return "critical";
    if (metrics.load > 60) return "high";
    if (metrics.load > 35) return "medium";
    return "low";
  }, [metrics.load, isSystemAlert]);

  // Color dinámico según estado
  const glowColor = useMemo(() => {
    switch (loadState) {
      case "critical": return "#f43f5e"; // rojo intenso
      case "high": return "#facc15"; // amarillo intenso
      case "medium": return "#c084fc"; // violeta medio
      default: return color; // violeta base
    }
  }, [loadState, color]);

  // Animación de drones
  const droneVariants = {
    idle: { rotate: 360, scale: 1 },
    alert: { rotate: 360, scale: 1.3 }
  };

  // Pulso del núcleo
  const corePulse = useMemo(() => {
    if (isSystemAlert) return 0.3;
    if (metrics.load > 80) return 0.5;
    return 1.2;
  }, [metrics.load, isSystemAlert]);

  return (
    <div
      className={`${styles.node} ${styles[loadState]} ${isSelected ? styles.activeUplink : ""} ${isSystemAlert ? styles.systemBreach : ""}`}
      style={{ "--node-color": color, "--glow-color": glowColor }}
      title={tooltip}
    >
      {/* ================= NÚCLEO CENTRAL ================= */}
      <motion.div
        className={styles.core}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: corePulse, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: `0 0 30px ${glowColor}, inset 0 0 15px #000` }}
      >
        <div className={styles.innerGlow} style={{ backgroundColor: glowColor }} />
      </motion.div>

      {/* ================= HEXAGONO/ANELLO DE DRONES ================= */}
      <motion.div
        className={styles.hexRing}
        animate={{ rotate: isSelected ? 180 : 0 }}
        transition={{ duration: 2 }}
      />

      {/* ================= ENJAMBRE DE DRONES ================= */}
      <div className={styles.droneSwarm}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className={styles.drone}
            animate={isSystemAlert || metrics.target_locked ? "alert" : "idle"}
            variants={droneVariants}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* ================= HUD DE METRICAS ================= */}
      <div className={styles.telemetryOverlay}>
        <div className={styles.metricLine}><span>LOAD:</span><span>{metrics.load}%</span></div>
        <div className={styles.metricLine}><span>FPS:</span><span>{metrics.fps}</span></div>
        <div className={styles.metricLine}><span>USERS:</span><span>{metrics.user_count}</span></div>
        {metrics.target_locked && <div className={styles.metricLine}><span>TARGET:</span><span>LOCKED</span></div>}
      </div>

      {/* ================= ESCANER TÁCTICO ================= */}
      <div className={`${styles.scan} ${isHovered ? styles.scanningActive : ""}`} />

      {/* ================= BOTÓN DE CONEXIÓN ================= */}
      {path && (
        <div className={styles.connectButtonContainer}>
          <button
            className={styles.connectButton}
            style={{ backgroundColor: glowColor }}
            onClick={() => onConnect?.(path)}
          >
            CONECTAR
          </button>
        </div>
      )}

      {/* ================= ALERTA CRÍTICA ================= */}
      {isSystemAlert && (
        <div className={styles.alertOverlay}>
          <span>CRITICAL BREACH DETECTED</span>
        </div>
      )}
    </div>
  );
}