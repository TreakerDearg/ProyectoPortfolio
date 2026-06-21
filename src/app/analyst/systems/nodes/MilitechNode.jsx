"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { SecurityIndicator } from "../SecurityIndicator";
import { EncryptionDisplay } from "../EncryptionDisplay";
import { FirewallIndicator } from "../FirewallIndicator";
import { IntrusionDetection } from "../IntrusionDetection";
import styles from "../../styles/Styles-C/nodes/militechNode.module.css";

export default function MilitechNode({
  node,
  isSelected,
  isHovered,
  isSystemAlert,
  onConnect,
  securityLevel = "class_a",
  encrypted = true,
  firewallStatus = "active",
  firewallRules = 8,
  hasIntrusion = false,
  intrusionType = "suspicious",
  intrusionSource = "UNKNOWN"
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
      {/* ======= INTRUSION DETECTION ======= */}
      <IntrusionDetection 
        hasIntrusion={hasIntrusion} 
        intrusionType={intrusionType} 
        sourceIP={intrusionSource}
      />

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

      {/* ======= NEURAL PULSE RINGS ======= */}
      <div className={styles.neuralPulseContainer}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.neuralPulseRing}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0.8, 0.4, 0] }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
            style={{ borderColor: glowColor }}
          />
        ))}
      </div>

      {/* ======= MEMBRANA CYBER ======= */}
      <div className={styles.membrane}>
        <span className={styles.nodeLabel}>{name}</span>
      </div>

      {/* ======= BIO-SECURITY INDICATORS ======= */}
      <div className={styles.bioSecurity}>
        <div className={styles.bioMetric}>
          <div className={styles.bioRing} />
          <div className={styles.bioPulse} />
        </div>
        <div className={styles.bioStatus}>
          <span className={styles.bioLabel}>BIO-SEC</span>
          <span className={styles.bioValue}>ACTIVE</span>
        </div>
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
        <SecurityIndicator level={securityLevel} size={10} />
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className={styles.metricLine}>
            {key.toUpperCase()}: {value}
          </div>
        ))}
        <div className={styles.securityInfo}>
          <EncryptionDisplay encrypted={encrypted} algorithm="RSA-4096" keyRotation={true} />
          <FirewallIndicator status={firewallStatus} rules={firewallRules} />
        </div>
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