"use client";
import React from "react";
import { AlertTriangle, AlertOctagon, AlertCircle, X } from "lucide-react";
import styles from "../styles/Styles-C/intrusionDetection.module.css";

export const IntrusionDetection = ({ 
  hasIntrusion = false, 
  intrusionType = "unauthorized",
  sourceIP = "UNKNOWN",
  timestamp = null
}) => {
  if (!hasIntrusion) return null;

  const getIcon = () => {
    switch (intrusionType.toLowerCase()) {
      case "critical":
      case "breach":
        return <AlertOctagon size={14} className={styles.iconCritical} />;
      case "warning":
      case "suspicious":
        return <AlertTriangle size={14} className={styles.iconWarning} />;
      default:
        return <AlertCircle size={14} className={styles.iconNormal} />;
    }
  };

  const getMessage = () => {
    switch (intrusionType.toLowerCase()) {
      case "critical":
      case "breach":
        return "CRITICAL BREACH DETECTED";
      case "warning":
      case "suspicious":
        return "SUSPICIOUS ACTIVITY";
      default:
        return "UNAUTHORIZED ACCESS ATTEMPT";
    }
  };

  const getSeverityClass = () => {
    switch (intrusionType.toLowerCase()) {
      case "critical":
      case "breach":
        return styles.severityCritical;
      case "warning":
      case "suspicious":
        return styles.severityWarning;
      default:
        return styles.severityNormal;
    }
  };

  const formatTime = () => {
    if (!timestamp) return new Date().toLocaleTimeString();
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className={`${styles.intrusionAlert} ${getSeverityClass()}`}>
      <div className={styles.alertHeader}>
        {getIcon()}
        <span className={styles.alertMessage}>{getMessage()}</span>
      </div>
      <div className={styles.alertDetails}>
        <span className={styles.detailLabel}>SOURCE:</span>
        <span className={styles.detailValue}>{sourceIP}</span>
        <span className={styles.detailLabel}>TIME:</span>
        <span className={styles.detailValue}>{formatTime()}</span>
      </div>
    </div>
  );
};
