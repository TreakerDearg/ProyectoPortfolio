"use client";

import React from "react";
import { useAnalysis } from "../context/AnalysisContext";

import MainSystem from "../systems/MainSystem";
import { SecurityLogs } from "../systems/SecurityLogs";
import AnalyticFlow from "../systems/AnalyticFlow";
import SystemRoot from "../systems/SystemRoot";

import styles from "../styles/analistaPage.module.css";

export default function AnalistaPage() {

  const { activeView } = useAnalysis();

  /* =====================================
     SYSTEM VIEW ROUTER
  ===================================== */

  const renderSystem = () => {

    switch (activeView) {

      case "Network_Map":
        return <MainSystem />;

      case "Security_Logs":
        return <SecurityLogs />;

      case "Analytic_Flow":
        return <AnalyticFlow />;

      case "System_Root":
        return <SystemRoot />;

      default:
        return <MainSystem />;

    }

  };



  return (

    <div className={styles.pageContainer}>

      {/* SYSTEM HEADER */}

      <div className={styles.systemHeader}>

        <h2 className={styles.systemTitle}>
          ARASAKA_ANALYSIS_CORE
        </h2>

      </div>


      {/* SYSTEM VIEW */}

      <div className={styles.systemViewport}>

        {renderSystem()}

      </div>

    </div>

  );

}