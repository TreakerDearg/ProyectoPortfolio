"use client";
import React from "react";
import { Shield, ShieldAlert, ShieldCheck, X } from "lucide-react";
import styles from "../styles/Styles-C/firewallIndicator.module.css";

export const FirewallIndicator = ({ status = "active", rules = 0 }) => {
  const getIcon = () => {
    switch (status.toLowerCase()) {
      case "active":
        return <ShieldCheck size={12} className={styles.iconActive} />;
      case "bypassed":
        return <ShieldAlert size={12} className={styles.iconBypassed} />;
      case "down":
        return <X size={12} className={styles.iconDown} />;
      default:
        return <Shield size={12} className={styles.iconNormal} />;
    }
  };

  const getStatusText = () => {
    switch (status.toLowerCase()) {
      case "active":
        return "FW:ACTIVE";
      case "bypassed":
        return "FW:BYPASSED";
      case "down":
        return "FW:DOWN";
      default:
        return `FW:${status.toUpperCase()}`;
    }
  };

  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case "active":
        return styles.statusActive;
      case "bypassed":
        return styles.statusBypassed;
      case "down":
        return styles.statusDown;
      default:
        return styles.statusNormal;
    }
  };

  return (
    <div className={`${styles.firewallIndicator} ${getStatusClass()}`}>
      {getIcon()}
      <span className={styles.statusText}>{getStatusText()}</span>
      {rules > 0 && <span className={styles.rulesCount}>{rules} RULES</span>}
    </div>
  );
};
