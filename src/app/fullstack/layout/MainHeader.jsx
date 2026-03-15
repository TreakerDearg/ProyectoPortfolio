"use client";

import React from "react";
import { Activity, Radio } from "lucide-react";

import { StatusLed } from "../components/deco-layout/StatusLed";
import { HeaderExhaust } from "../components/deco-layout/HeaderExhaust";
import { useSystem } from '../context/SystemContext';

import styles from "../styles/layout/MainHeader.module.css";

export const MainHeader = () => {
  // Consumimos los valores del contexto
  const { 
    radiationLevel, 
    geigerActive, 
    radDanger, 
    exhaustIntensity, 
    temp 
  } = useSystem();

  return (
    <header className={styles.headerChassis}>
      <div className={styles.headerContent}>
        {/* ===== LEFT SECTION ===== */}
        <div className={styles.leftSection}>
          <div className={styles.terminalModule}>
            <div className={styles.scanSweep} />
            <div className={styles.signalIconWrapper}>
              <Radio
                size={24}
                className={`${styles.phosphorAmber} ${styles.flicker}`}
              />
              <div className={styles.iconGlow} />
            </div>
            <div className={styles.terminalInfo}>
              <h1 className={styles.robcoTitle}>
                ROBCO
                <span className={styles.versionTag}>v6.2.1</span>
              </h1>
              <div className={styles.subIdentifier}>
                VAULT-TEC_PROTO: 44-X9
              </div>
            </div>
          </div>

          <div className={styles.diagnosticRack}>
            {/* GEIGER_SENS: activo, sin parpadeo, con tooltip */}
            <StatusLed
              status={geigerActive ? "online" : "idle"}
              label="GEIGER_SENS"
              tooltip="Geiger counter active"
              size="sm"
            />
            {/* RAD_DANGER: parpadea si la radiación es crítica */}
            <StatusLed
              status={radDanger ? "error" : "idle"}
              label="RAD_DANGER"
              blink={radiationLevel > 80}
              pattern="fast"
              intensity={1.5}
              tooltip={`Radiation level: ${Math.round(radiationLevel)} rad`}
              size="sm"
            />
          </div>
        </div>

        {/* ===== CENTER SECTION ===== */}
        <div className={styles.centerSection}>
          <div className={styles.batchPlate}>
            <span className={styles.stampedText}>
              PROPERTY OF VAULT-TEC INDUSTRIES
            </span>
          </div>
          <div className={styles.mountStem} />
          <div className={styles.centerRivet} />
        </div>

        {/* ===== RIGHT SECTION ===== */}
        <div className={styles.rightSection}>
          <div className={styles.environmentData}>
            <div className={styles.regionLabel}>Appalachia_Sect</div>
            <div className={styles.tempLine}>
              <span className={styles.tempValue}>
                External_Temp: {Math.round(temp)}°F
              </span>
              <Activity size={10} className={styles.tempIcon} />
            </div>
          </div>

          {/* EXHAUST MODULE con props dinámicas */}
          <div className={styles.exhaustContainer}>
            <HeaderExhaust
              intensity={exhaustIntensity}
              status="active"
              temperature={temp}
              radiationLevel={radiationLevel}
            />
            <div className={styles.meshOverlay} />
            <div className={styles.exhaustScrewTL}>+</div>
            <div className={styles.exhaustScrewTR}>+</div>
          </div>
        </div>
      </div>
    </header>
  );
};