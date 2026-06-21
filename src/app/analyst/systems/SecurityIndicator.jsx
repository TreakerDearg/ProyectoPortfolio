"use client";
import React from "react";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import styles from "../styles/Styles-C/securityIndicator.module.css";

export const SecurityIndicator = ({ level = "normal", size = 12 }) => {
  const getIcon = () => {
    switch (level.toLowerCase()) {
      case "alpha":
      case "class_s":
      case "high":
        return <Shield size={size} className={styles.iconHigh} />;
      case "beta":
      case "class_a":
      case "medium":
        return <ShieldCheck size={size} className={styles.iconMedium} />;
      case "gamma":
      case "class_ss":
      case "critical":
      case "compromised":
        return <ShieldAlert size={size} className={styles.iconCritical} />;
      default:
        return <Shield size={size} className={styles.iconNormal} />;
    }
  };

  const getBadgeText = () => {
    switch (level.toLowerCase()) {
      case "alpha":
        return "SEC:ALPHA";
      case "beta":
        return "SEC:BETA";
      case "gamma":
        return "SEC:GAMMA";
      case "delta":
        return "SEC:DELTA";
      case "class_s":
        return "CLASS:S";
      case "class_a":
        return "CLASS:A";
      case "class_ss":
        return "CLASS:SS";
      default:
        return `SEC:${level.toUpperCase()}`;
    }
  };

  const getBadgeClass = () => {
    switch (level.toLowerCase()) {
      case "alpha":
      case "class_s":
      case "high":
        return styles.badgeHigh;
      case "beta":
      case "class_a":
      case "medium":
        return styles.badgeMedium;
      case "gamma":
      case "class_ss":
      case "critical":
      case "compromised":
        return styles.badgeCritical;
      default:
        return styles.badgeNormal;
    }
  };

  return (
    <div className={`${styles.securityBadge} ${getBadgeClass()}`}>
      {getIcon()}
      <span className={styles.badgeText}>{getBadgeText()}</span>
    </div>
  );
};
