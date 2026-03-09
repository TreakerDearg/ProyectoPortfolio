"use client";
import React from "react";
import styles from "../../styles/Styles-C/nodes/arasakaNode.module.css";

export default function ArasakaNode({ node, isSelected, isHovered, isSystemAlert }) {
  const {
    id = "NODE_01",
    name = "NEURAL_ENGINE",
    company = "ARASAKA",
    status = "ACTIVE",
    path = "/systems/core",
    metrics = {},
    color = "#ef4444"
  } = node;

  return (
    <div
      className={`${styles.nodeContainer} ${isSelected ? styles.selected : ""} ${isSystemAlert ? styles.alertMode : ""} ${styles[status.toLowerCase()]}`}
    >
      {/* ================= HEADER ================= */}
      <div className={styles.header}>
        <span className={styles.corp}>{company}</span>
        <span className={styles.security}>SEC:ALPHA</span>
      </div>

      {/* ================= CHASSIS ================= */}
      <div className={styles.chassis}>
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />
        <div className={styles.serialNumber}>{id.split("-")[1] || id}</div>
      </div>

      {/* ================= HEX + CIRCUITOS ================= */}
      <div className={styles.hexLayer} />
      <div className={styles.circuitLayer}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.gridLine} />
        ))}
      </div>

      {/* ================= NÚCLEO DE ENERGÍA ================= */}
      <div className={styles.syncRing}>
        <div className={styles.syncPulse} />
      </div>
      <div className={styles.core}>
        <div className={styles.coreGlow} style={{ boxShadow: `0 0 20px ${color}` }} />
        <div className={styles.neuralActivity} />
        <div className={styles.energyPulse} style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
      </div>

      {/* ================= PANEL DE MÉTRICAS ================= */}
      <div className={styles.nodeData}>
        <div className={styles.nodeTitle}>{name}</div>
        <div className={styles.nodeCompany}>{company}</div>

        <div className={styles.metrics}>
          {Object.entries(metrics).map(([key, value]) => {
            const isLoad = key.toLowerCase() === "load";
            return (
              <div key={key} className={styles.metric}>
                <span className={styles.metricLabel}>{key.toUpperCase()}</span>
                {isLoad ? (
                  <div className={styles.bar}>
                    <div className={styles.barFill} style={{ width: `${value}%`, backgroundColor: color }} />
                  </div>
                ) : null}
                <span className={styles.metricValue}>{value}</span>
              </div>
            );
          })}
        </div>

        {path && (
          <button
            className={`${styles.connectButton} ${styles.arasakaButton}`}
            style={{ background: color }}
            onClick={(e) => {
              e.stopPropagation();
              window.alert(`Conectando a: ${path}`);
            }}
          >
            CONECTAR A PATH
          </button>
        )}
      </div>

      {/* ================= INDICADOR DE ESTADO ================= */}
      <div className={styles.statusIndicator}>
        <div className={`${styles.statusLed} ${isSystemAlert ? styles.ledCritical : styles.ledNormal}`} />
        <span className={styles.statusText}>{isSystemAlert ? "CRITICAL" : status}</span>
      </div>

      {/* ================= EFECTOS ================= */}
      {isHovered && <div className={styles.hoverGlow} />}
      {isSystemAlert && <div className={styles.alertPulse} />}
    </div>
  );
}