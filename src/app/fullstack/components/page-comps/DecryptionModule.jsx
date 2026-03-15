"use client";
import React from "react";
import { Lock, Unlock, Cpu } from "lucide-react";
import { StatusLed } from "../deco-layout/StatusLed";
import styles from "../../styles/page-comp-styles/DecryptionModule.module.css";

export const DecryptionModule = ({ task, progress, status = "active" }) => {
  // Determinar el icono basado en el progreso o estado
  const getIcon = () => {
    if (progress >= 100) return <Unlock size={16} className={styles.iconUnlocked} />;
    if (progress > 50) return <Cpu size={16} className={styles.iconActive} />;
    return <Lock size={16} className={styles.iconLocked} />;
  };

  return (
    <div className={styles.module}>
      <div className={styles.moduleHeader}>
        <div className={styles.titleSection}>
          {getIcon()}
          <span className={styles.taskName}>{task}</span>
        </div>
        <StatusLed status={progress >= 100 ? "online" : progress > 50 ? "warning" : "idle"} size="xxs" />
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.progressPercent}>{progress}%</span>
      </div>

      <div className={styles.decoration}>
        <div className={styles.scanLine} />
        <div className={styles.cypherText}>0x{Math.floor(Math.random() * 10000).toString(16)}</div>
      </div>
    </div>
  );
};