"use client";
import React from "react";
import styles from "../../styles/F-styles/resourceMonitor.module.css";

export default function ResourceMonitor() {

  const cpu = 32;
  const mem = 54;

  return (
    <div className={styles.monitor}>

      <div className={styles.resource}>
        <span className={styles.label}>CPU</span>

        <div className={styles.bar}>
          <div
            className={styles.fill}
            style={{ width: `${cpu}%` }}
          />
        </div>
      </div>

      <div className={styles.resource}>
        <span className={styles.label}>MEM</span>

        <div className={styles.bar}>
          <div
            className={styles.fill}
            style={{ width: `${mem}%` }}
          />
        </div>
      </div>

    </div>
  );
}