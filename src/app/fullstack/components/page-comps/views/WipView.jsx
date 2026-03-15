"use client";
import React from "react";
import { DecryptionModule } from "../DecryptionModule";
import styles from "../../../styles/view-styles/WipView.module.css";

export const WipView = () => {
  const wipItems = [
    { task: "CALIBRAR SENSORES", progress: 65 },
    { task: "ACTUALIZAR FIRMWARE", progress: 30 },
    { task: "MANTENIMIENTO PREVENTIVO", progress: 90 },
    { task: "DESBLOQUEAR PROTOCOLO", progress: 12 },
    { task: "ANALIZAR FIRMWARE", progress: 47 },
    { task: "RECONSTRUIR DATOS", progress: 88 },
  ];

  return (
    <div className={styles.viewContainer}>
      <div className={styles.contentHeader}>
        <h1 className={styles.mainTitle}>TRABAJOS EN PROCESO</h1>
        <div className={styles.titleUnderline} />
      </div>
      <div className={styles.modulesGrid}>
        {wipItems.map((item, i) => (
          <DecryptionModule
            key={i}
            task={item.task}
            progress={item.progress}
            status="active"
          />
        ))}
      </div>
    </div>
  );
};