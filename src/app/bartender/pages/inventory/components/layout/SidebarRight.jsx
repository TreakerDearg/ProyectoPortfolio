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
  Terminal,
  Gauge,
  Battery,
  Shield
} from "lucide-react";
import { useMetro } from "../../context/MetroContext";
import styles from "../../../../styles/inventory-styles/layout/sidebar-right.module.css";

// Formateadores
const formatRadiation = (val) => `${val.toFixed(2)} Sv/h`;
const formatTemp = (val) => `${Math.round(val)}°C`;
const formatPercent = (val) => `${Math.round(val)}%`;

// Mensajes de la terminal (rotativos)
const terminalMessages = [
  "> D6_OS v33.2 ACTIVE",
  "> Auth: Artyom_Chyornyj",
  "> CRITICAL: RAD LEAK SECTOR_G",
  "> Air scrubbers at 63%",
  "> Core temp stable",
  "> [WARN] Filter degradation",
  "> [REC] Change filters soon",
  "> Signal: POLIS_DOWNLINK",
  "> [OK] Encryption active",
  "> System load: 57%",
  "> Radiation levels elevated",
  "> Bunker integrity: 87%",
  "> Standby for orders..."
];

export default function SidebarRight() {
  const { system } = useMetro();
  const [messageIndex, setMessageIndex] = useState(0);
  const [showTerminal, setShowTerminal] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [currentMessage, setCurrentMessage] = useState(terminalMessages[0]);

  // Usar datos reales del sistema (si existen) o simular
  const [radLevel, setRadLevel] = useState(0.45);
  const [coreTemp, setCoreTemp] = useState(58);
  const [systemLoad, setSystemLoad] = useState(54);

  // Leer radiación del contexto
  useEffect(() => {
    if (system?.radiation_level) {
      const rad = parseFloat(system.radiation_level);
      if (!isNaN(rad)) setRadLevel(rad);
    }
  }, [system]);

  // Simular variaciones suaves de temperatura y carga (pueden venir del contexto después)
  useEffect(() => {
    const interval = setInterval(() => {
      setCoreTemp(prev => {
        const delta = (Math.random() - 0.5) * 0.5;
        return Math.min(75, Math.max(45, prev + delta));
      });
      setSystemLoad(prev => {
        const delta = (Math.random() - 0.5) * 3;
        return Math.min(95, Math.max(20, prev + delta));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotar mensajes y efecto máquina de escribir
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % terminalMessages.length);
    }, 4000);
    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    const newMsg = terminalMessages[messageIndex];
    setCurrentMessage(newMsg);
    let i = 0;
    setTypedText("");
    const typingInterval = setInterval(() => {
      if (i <= newMsg.length) {
        setTypedText(newMsg.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [messageIndex]);

  // Indicadores
  const isRadiationHigh = radLevel > 0.6;
  const isRadiationCritical = radLevel > 0.8;
  const isCoreHot = coreTemp > 65;
  const isLoadHigh = systemLoad > 80;

  // Porcentajes para las barras
  const radPercent = Math.min(100, (radLevel / 1.2) * 100);
  const tempPercent = Math.min(100, ((coreTemp - 40) / 35) * 100);
  const loadPercent = systemLoad;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.scanlines} />
      <div className={styles.rivets} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Shield size={14} className={styles.headerIcon} />
          <span>D6 MONITOR</span>
          <HardDrive size={12} className={styles.headerSecondary} />
        </div>

        {/* Sistema de radiación principal */}
        <div className={styles.radPanel}>
          <div className={styles.radLabel}>
            <Radio size={12} className={isRadiationHigh ? styles.warningIcon : ""} />
            <span>RADIATION LEVEL</span>
          </div>
          <div className={styles.radGauge}>
            <motion.div
              className={`${styles.radFill} ${isRadiationCritical ? styles.criticalFill : isRadiationHigh ? styles.warningFill : ""}`}
              animate={{ width: `${radPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className={styles.radValue}>
            {formatRadiation(radLevel)}
            {isRadiationHigh && (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className={styles.alertPulse}
              >
                ⚠️
              </motion.span>
            )}
          </div>
        </div>

        {/* Grid de estadísticas */}
        <div className={styles.statsGrid}>
          {/* Core Temp */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Thermometer size={14} />
              <span>CORE TEMP</span>
            </div>
            <div className={styles.gaugeContainer}>
              <motion.div
                className={`${styles.gaugeFill} ${isCoreHot ? styles.criticalFill : ""}`}
                animate={{ width: `${tempPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className={styles.statValue}>
              {formatTemp(coreTemp)}
              {isCoreHot && <span className={styles.warningIcon}>🔥</span>}
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
                className={`${styles.gaugeFill} ${isLoadHigh ? styles.warningFill : ""}`}
                animate={{ width: `${loadPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className={styles.statValue}>{formatPercent(systemLoad)}</div>
          </div>

          {/* Air Filter (simulado pero podría venir del contexto) */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Wind size={14} />
              <span>AIR FILTER</span>
            </div>
            <div className={styles.gaugeContainer}>
              <motion.div
                className={styles.gaugeFill}
                animate={{ width: "63%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className={styles.statValue}>63%</div>
          </div>

          {/* Battery / Power */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Battery size={14} />
              <span>POWER RES</span>
            </div>
            <div className={styles.gaugeContainer}>
              <motion.div
                className={styles.gaugeFill}
                animate={{ width: "78%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className={styles.statValue}>78%</div>
          </div>
        </div>

        {/* Terminal con efecto de escritura */}
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
                  <span className={styles.terminalPrompt}>&gt;</span>
                  <span className={styles.terminalText}>{typedText}</span>
                  <span className={styles.terminalCursor}>_</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer de advertencia */}
        <div className={styles.footer}>
          <AlertTriangle size={12} className={styles.warningIcon} />
          <span>{isRadiationHigh ? "RADIATION HAZARD" : "SYSTEM STANDBY"}</span>
          <motion.div
            className={`${styles.pulseDot} ${isRadiationHigh ? styles.red : styles.green}`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
    </aside>
  );
}