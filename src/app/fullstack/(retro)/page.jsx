"use client";

import React, { useState } from "react";
import { Home, Folder, Clock, Zap } from "lucide-react";
import { Screw } from "../components/deco-layout/Screw";
import { useSystem } from "../context/SystemContext";
import { ViewSelector } from "../components/page-comps/ViewSelector";
import { HomeView } from "../components/page-comps/views/HomeView";
import { ProjectsView } from "../components/page-comps/views/ProjectsView";
import { WipView } from "../components/page-comps/views/WipView";
import styles from "../styles/RetroPage.module.css";

export default function RetroPage() {
  const { systemStatus, uptime, cpuLoad, memUsage } = useSystem();
  const [activeView, setActiveView] = useState("home");

  const views = [
    { id: "home", label: "HOME", icon: Home, ledStatus: "online" },
    { id: "projects", label: "PROYECTOS", icon: Folder, ledStatus: "idle" },
    { id: "wip", label: "WIP", icon: Clock, ledStatus: "idle" },
  ];

  const renderView = () => {
    switch (activeView) {
      case "projects": return <ProjectsView />;
      case "wip": return <WipView />;
      default: return <HomeView cpuLoad={cpuLoad} memUsage={memUsage} systemStatus={systemStatus} />;
    }
  };

  return (
    <div className={styles.crtContainer}>
      <div className={styles.scanlines} />
      <div className={styles.terminalChassis}>
        <Screw size="xs" type="flat" className={styles.screwTL} rotation={45} />
        <Screw size="xs" type="flat" className={styles.screwTR} rotation={135} />
        <Screw size="xs" type="flat" className={styles.screwBL} rotation={-45} />
        <Screw size="xs" type="flat" className={styles.screwBR} rotation={-135} />
        <div className={styles.techGrid} />

        <div className={styles.mainLayout}>
          <ViewSelector
           views={views}
           activeView={activeView}
           onViewChange={setActiveView}
        />  
          <div className={styles.contentArea}>
            {renderView()}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <Zap size={10} className={styles.footerIcon} />
            <span>POWER: {systemStatus === "ONLINE" ? "ON" : "OFF"}</span>
            <span className={styles.footerSeparator}>|</span>
            <span>UPTIME: {Math.floor(uptime / 3600)}h {Math.floor((uptime % 3600) / 60)}m</span>
          </div>
          <div className={styles.footerRight}>
            <span className={styles.blinkingCursor}>_</span>
          </div>
        </div>
      </div>
    </div>
  );
}