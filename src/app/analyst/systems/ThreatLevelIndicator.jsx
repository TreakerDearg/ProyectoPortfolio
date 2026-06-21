"use client";
import React, { useState, useEffect } from "react";
import { ShieldAlert, ShieldCheck, AlertTriangle, XCircle } from "lucide-react";
import styles from "../styles/Styles-C/threatLevelIndicator.module.css";

export const ThreatLevelIndicator = ({ nodes, systemStatus }) => {
  const [threatLevel, setThreatLevel] = useState({
    level: "low",
    score: 0,
    factors: []
  });

  useEffect(() => {
    const calculateThreatLevel = () => {
      let score = 0;
      const factors = [];

      // Check for compromised nodes
      const compromisedNodes = nodes.filter(n => n.securityLevel === "compromised");
      if (compromisedNodes.length > 0) {
        score += 40;
        factors.push(`${compromisedNodes.length} compromised nodes`);
      }

      // Check for intrusion alerts
      const intrusionNodes = nodes.filter(n => n.hasIntrusion);
      if (intrusionNodes.length > 0) {
        score += 30;
        factors.push(`${intrusionNodes.length} intrusion alerts`);
      }

      // Check system status
      if (systemStatus !== "NOMINAL") {
        score += 20;
        factors.push("System alert active");
      }

      // Check encryption status
      const unencryptedNodes = nodes.filter(n => n.encryption !== "active");
      if (unencryptedNodes.length > 0) {
        score += 10;
        factors.push(`${unencryptedNodes.length} unencrypted nodes`);
      }

      let level = "low";
      if (score >= 70) level = "critical";
      else if (score >= 50) level = "high";
      else if (score >= 30) level = "medium";

      return { level, score, factors };
    };

    setThreatLevel(calculateThreatLevel());
  }, [nodes, systemStatus]);

  const getThreatConfig = (level) => {
    switch (level) {
      case "critical":
        return {
          icon: XCircle,
          color: "#ef4444",
          bgColor: "rgba(239, 68, 68, 0.1)",
          borderColor: "rgba(239, 68, 68, 0.5)",
          label: "CRITICAL"
        };
      case "high":
        return {
          icon: AlertTriangle,
          color: "#f59e0b",
          bgColor: "rgba(245, 158, 11, 0.1)",
          borderColor: "rgba(245, 158, 11, 0.5)",
          label: "HIGH"
        };
      case "medium":
        return {
          icon: ShieldAlert,
          color: "#f97316",
          bgColor: "rgba(249, 115, 22, 0.1)",
          borderColor: "rgba(249, 115, 22, 0.5)",
          label: "MEDIUM"
        };
      default:
        return {
          icon: ShieldCheck,
          color: "#22c55e",
          bgColor: "rgba(34, 197, 94, 0.1)",
          borderColor: "rgba(34, 197, 94, 0.5)",
          label: "LOW"
        };
    }
  };

  const config = getThreatConfig(threatLevel.level);
  const Icon = config.icon;

  return (
    <div className={styles.threatContainer}>
      <div className={styles.threatHeader}>
        <span className={styles.threatTitle}>THREAT_LEVEL</span>
      </div>

      <div 
        className={styles.threatIndicator}
        style={{
          background: config.bgColor,
          borderColor: config.borderColor
        }}
      >
        <div className={styles.threatIcon} style={{ color: config.color }}>
          <Icon size={24} />
        </div>
        <div className={styles.threatInfo}>
          <span className={styles.threatLabel} style={{ color: config.color }}>
            {config.label}
          </span>
          <span className={styles.threatScore}>
            SCORE: {threatLevel.score}/100
          </span>
        </div>
      </div>

      {threatLevel.factors.length > 0 && (
        <div className={styles.threatFactors}>
          <span className={styles.factorsTitle}>THREAT FACTORS:</span>
          <ul className={styles.factorsList}>
            {threatLevel.factors.map((factor, index) => (
              <li key={index} className={styles.factorItem}>
                <span className={styles.factorBullet}>•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.threatMeter}>
        <div className={styles.meterLabel}>THREAT METER</div>
        <div className={styles.meterTrack}>
          <div 
            className={styles.meterFill}
            style={{
              width: `${threatLevel.score}%`,
              background: config.color,
              boxShadow: `0 0 10px ${config.color}`
            }}
          />
        </div>
        <div className={styles.meterTicks}>
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};
