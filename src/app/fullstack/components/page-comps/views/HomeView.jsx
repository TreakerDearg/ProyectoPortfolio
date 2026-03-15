"use client";
import React from "react";
import { SystemInfo } from "../SystemInfo";
import { ActivityGraph } from "../ActivityGraph";
import { FeaturedProject } from "../FeaturedProject";
import { VaultMap } from "../VaultMap";
import { AtomicClock } from "../AtomicClock";
import { VaultLog } from "../VaultLog";
import styles from "../../../styles/view-styles/HomeView.module.css";

export const HomeView = ({ cpuLoad, memUsage, systemStatus }) => {
  const networkData = [2, 5, 3, 7, 4, 6, 3, 8];
  const featuredProjects = [
    { name: "PROJECT ATHENA", location: "SECTOR 7", progress: 78, status: "online" },
    { name: "WATER PURIFIER", location: "SECTOR 3", progress: 92, status: "online" },
    { name: "GECK CORE", location: "SECTOR 5", progress: 34, status: "warning" },
  ];

  return (
    <div className={styles.viewContainer}>
      <div className={styles.contentHeader}>
        <h1 className={styles.mainTitle}>MAIN_CONSOLE</h1>
        <div className={styles.titleUnderline} />
      </div>

      <div className={styles.dashboardGrid}>
        {/* Columna izquierda */}
        <div className={styles.leftColumn}>
          <SystemInfo cpuLoad={cpuLoad} memUsage={memUsage} systemStatus={systemStatus} />
          <div className={styles.featuredSection}>
            <span className={styles.sectionTitle}>PROYECTOS DESTACADOS</span>
            {featuredProjects.map((p, i) => (
              <FeaturedProject key={i} {...p} />
            ))}
          </div>
          {/* ActivityGraph ahora está aquí */}
          <ActivityGraph data={networkData} />
        </div>

        {/* Columna derecha */}
        <div className={styles.rightColumn}>
          <div className={styles.topWidgets}>
            <AtomicClock />
            <VaultLog />
          </div>
          <VaultMap />
        </div>
      </div>

      <div className={styles.additionalSection} />
    </div>
  );
};