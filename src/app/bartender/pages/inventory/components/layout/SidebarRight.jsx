"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Thermometer,
  Wind,
  Cpu,
  Radio,
  HardDrive,
  Terminal
} from "lucide-react";
import styles from "../../../../styles/inventory-styles/layout/sidebar-right.module.css";

// Simulated data (could be replaced with real data from context)
const getSimulatedData = () => ({
  radiation: Math.random() * 0.8 + 0.2,        // 0.2 - 1.0 Sv/h
  airFilter: Math.random() * 40 + 50,          // 50% - 90%
  coreTemp: Math.random() * 15 + 55,           // 55°C - 70°C
  systemLoad: Math.random() * 30 + 40,          // 40% - 70%
});

const formatRadiation = (val) => `${val.toFixed(2)} Sv/h`;
const formatTemp = (val) => `${Math.round(val)}°C`;
const formatPercent = (val) => `${Math.round(val)}%`;

// Terminal messages (cycle through)
const terminalMessages = [
  "> D6_OS v33.2",
  "> Auth: Artyom_Chyornyj",
  "> CRITICAL: RAD LEAK SECTOR_G",
  "> Air scrubbers at 63%",
  "> Core temp stable",
  "> [WARN] Filter degradation",
  "> [REC] Change filters soon",
  "> Signal: POLIS_DOWNLINK",
  "> [OK] Encryption active",
  "> Waiting for commands..."
];

export default function SidebarRight() {
  const [systemData, setSystemData] = useState(getSimulatedData());
  const [messageIndex, setMessageIndex] = useState(0);
  const [showTerminal, setShowTerminal] = useState(true);

  // Update system data every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData(getSimulatedData());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate terminal messages every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % terminalMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const { radiation, airFilter, coreTemp, systemLoad } = systemData;

  const isRadiationHigh = radiation > 0.6;
  const isAirFilterLow = airFilter < 60;
  const isCoreHot = coreTemp > 65;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.scanlines} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <HardDrive size={14} />
          <span>D6 MONITOR</span>
        </div>

        {/* System stats grid */}
        <div className={styles.statsGrid}>
          {/* Radiation */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Radio size={14} className={isRadiationHigh ? styles.warningIcon : styles.icon} />
              <span>RADIATION</span>
            </div>
            <div className={styles.gaugeContainer}>
              <motion.div
                className={`${styles.gaugeFill} ${isRadiationHigh ? styles.criticalFill : ""}`}
                animate={{ width: `${radiation * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className={styles.statValue}>
              {formatRadiation(radiation)}
              {isRadiationHigh && (
                <motion.span
                  className={styles.alertPulse}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  !!!
                </motion.span>
              )}
            </div>
          </div>

          {/* Air Filter */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Wind size={14} />
              <span>AIR FILTER</span>
            </div>
            <div className={styles.gaugeContainer}>
              <motion.div
                className={`${styles.gaugeFill} ${isAirFilterLow ? styles.warningFill : ""}`}
                animate={{ width: `${airFilter}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className={styles.statValue}>
              {formatPercent(airFilter)}
              {isAirFilterLow && (
                <motion.span
                  className={styles.alertPulse}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  !
                </motion.span>
              )}
            </div>
          </div>

          {/* Core Temp */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Thermometer size={14} />
              <span>CORE TEMP</span>
            </div>
            <div className={styles.gaugeContainer}>
              <motion.div
                className={`${styles.gaugeFill} ${isCoreHot ? styles.criticalFill : ""}`}
                animate={{ width: `${(coreTemp - 40) / 40 * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className={styles.statValue}>
              {formatTemp(coreTemp)}
              {isCoreHot && (
                <motion.span
                  className={styles.alertPulse}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🔥
                </motion.span>
              )}
            </div>
          </div>

          {/* System Load */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Cpu size={14} />
              <span>SYSTEM LOAD</span>
            </div>
            <div className={styles.gaugeContainer}>
              <motion.div
                className={styles.gaugeFill}
                animate={{ width: `${systemLoad}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className={styles.statValue}>{formatPercent(systemLoad)}</div>
          </div>
        </div>

        {/* Terminal Output */}
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <Terminal size={12} />
            <span>D6_TERM v33</span>
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className={styles.toggleTerminal}
            >
              {showTerminal ? "[-]" : "[+]"}
            </button>
          </div>
          <AnimatePresence>
            {showTerminal && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.terminalContent}
              >
                <div className={styles.terminalLine}>
                  {terminalMessages[messageIndex]}
                </div>
                <div className={styles.terminalCursor}>_</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Warning Footer */}
        <div className={styles.footer}>
          <AlertTriangle size={12} className={styles.warningIcon} />
          <span>RADIATION HAZARD</span>
          <motion.div
            className={styles.pulseDot}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
    </aside>
  );
}