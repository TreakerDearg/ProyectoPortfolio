"use client";
import React from "react";
import { motion } from "framer-motion";
import { SecurityIndicator } from "../SecurityIndicator";
import { EncryptionDisplay } from "../EncryptionDisplay";
import { FirewallIndicator } from "../FirewallIndicator";
import { IntrusionDetection } from "../IntrusionDetection";
import styles from "../../styles/Styles-C/nodes/neutralNode.module.css";

export function NeutralNode({
  node,
  handleDrag = () => {},
  isSelected,
  isHovered,
  securityLevel = "normal",
  encrypted = false,
  firewallStatus = "active",
  firewallRules = 4,
  hasIntrusion = false,
  intrusionType = "unauthorized",
  intrusionSource = "UNKNOWN"
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={(e, info) => handleDrag(node.id, info.delta)}
      style={{
        x: node.x,
        y: node.y,
        position: "absolute",
        zIndex: isSelected ? 100 : 10,
      }}
    >
      <div
        className={`${styles.neutralContainer} ${
          isSelected ? styles.selected : ""
        }`}
      >
        {/* ================= INTRUSION DETECTION ================= */}
        <IntrusionDetection 
          hasIntrusion={hasIntrusion} 
          intrusionType={intrusionType} 
          sourceIP={intrusionSource}
        />

        {/* ================= NEURAL PULSE RINGS ================= */}
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
            />
          ))}
        </div>

        <div className={styles.terminalHeader}>
          <span className={styles.nodeId}>
            USR_{node.id?.split("-")[1] || "RT"}
          </span>
          <SecurityIndicator level={securityLevel} size={10} />
        </div>
        <div className={styles.content}>
          <span className={styles.nodeName}>{node.name}</span>
        </div>

        {/* ================= TERMINAL PATTERN ================= */}
        <div className={styles.terminalPattern}>
          <div className={styles.terminalLine}>
            <span className={styles.terminalPrompt}>$</span>
            <span className={styles.terminalText}>system_check --verbose</span>
          </div>
          <div className={styles.terminalLine}>
            <span className={styles.terminalOutput}>STATUS: OK</span>
          </div>
          <div className={styles.terminalCursor} />
        </div>

        <div className={styles.securityInfo}>
          <EncryptionDisplay encrypted={encrypted} algorithm="TLS-1.3" keyRotation={false} />
          <FirewallIndicator status={firewallStatus} rules={firewallRules} />
        </div>

        {/* Botón de conexión */}
        {node.path && (
          <div className={styles.connectButtonContainer}>
            <button
              className={styles.connectButton}
              onClick={() => window.open(node.path, "_blank")}
            >
              CONECTAR
            </button>
          </div>
        )}

        {/* Tooltip interno */}
        {node.tooltip && (
          <div className={styles.tooltip}>
            <span>{node.tooltip}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}