"use client";
import React from "react";
import { Activity } from "lucide-react";
import { StatusLed } from "../deco-layout/StatusLed";
import styles from "../../styles/RetroPage.module.css";

export const SystemInfo = ({ cpuLoad, memUsage, systemStatus }) => {
  return (
    <div className={styles.systemInfo}>
      <div className={styles.infoHeader}>
        <Activity size={14} />
        <span>SYSTEM STATUS</span>
      </div>
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>CPU</span>
          <div className={styles.infoBar}>
            <div className={styles.infoBarFill} style={{ width: `${cpuLoad}%` }} />
          </div>
          <span className={styles.infoValue}>{Math.round(cpuLoad)}%</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>MEM</span>
          <div className={styles.infoBar}>
            <div className={styles.infoBarFill} style={{ width: `${memUsage}%` }} />
          </div>
          <span className={styles.infoValue}>{Math.round(memUsage)}%</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>STATE</span>
          <StatusLed status={systemStatus === "ONLINE" ? "online" : "error"} size="sm" />
          <span className={styles.infoValue}>{systemStatus}</span>
        </div>
      </div>
    </div>
  );
};