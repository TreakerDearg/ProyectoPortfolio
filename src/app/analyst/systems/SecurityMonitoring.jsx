"use client";
import React, { useState, useEffect } from "react";
import { Shield, AlertTriangle, Lock, Eye, Activity, Wifi } from "lucide-react";
import styles from "../styles/Styles-C/securityMonitoring.module.css";

export const SecurityMonitoring = ({ nodes, systemStatus }) => {
  const [securityMetrics, setSecurityMetrics] = useState({
    totalNodes: 0,
    encryptedNodes: 0,
    activeAlerts: 0,
    networkLoad: 0,
    firewallActive: true,
    intrusionAttempts: 0
  });

  useEffect(() => {
    const encryptedCount = nodes.filter(n => n.encryption === "active").length;
    const alertCount = nodes.filter(n => n.hasIntrusion || n.securityLevel === "compromised").length;
    
    setSecurityMetrics({
      totalNodes: nodes.length,
      encryptedNodes: encryptedCount,
      activeAlerts: alertCount,
      networkLoad: Math.round(Math.random() * 100),
      firewallActive: true,
      intrusionAttempts: Math.floor(Math.random() * 10)
    });
  }, [nodes]);

  const getSecurityStatus = () => {
    if (securityMetrics.activeAlerts > 0) return "critical";
    if (securityMetrics.intrusionAttempts > 5) return "warning";
    return "secure";
  };

  const securityStatus = getSecurityStatus();

  return (
    <div className={styles.securityContainer}>
      <div className={styles.securityHeader}>
        <Shield size={14} />
        <span className={styles.securityTitle}>SECURITY_MONITOR</span>
        <div className={`${styles.statusIndicator} ${styles[securityStatus]}`} />
      </div>

      <div className={styles.securityGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Lock size={16} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>ENCRYPTION</span>
            <span className={styles.metricValue}>
              {securityMetrics.encryptedNodes}/{securityMetrics.totalNodes}
            </span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <AlertTriangle size={16} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>ALERTS</span>
            <span className={`${styles.metricValue} ${securityMetrics.activeAlerts > 0 ? styles.alert : ""}`}>
              {securityMetrics.activeAlerts}
            </span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Activity size={16} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>NETWORK LOAD</span>
            <span className={styles.metricValue}>{securityMetrics.networkLoad}%</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Eye size={16} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>INTRUSIONS</span>
            <span className={styles.metricValue}>{securityMetrics.intrusionAttempts}</span>
          </div>
        </div>
      </div>

      <div className={styles.securityFooter}>
        <div className={styles.firewallStatus}>
          <Wifi size={12} />
          <span>FIREWALL: {securityMetrics.firewallActive ? "ACTIVE" : "INACTIVE"}</span>
        </div>
        <div className={styles.systemStatus}>
          <span>STATUS: </span>
          <span className={securityStatus === "secure" ? styles.secure : securityStatus === "warning" ? styles.warning : styles.critical}>
            {securityStatus.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};
