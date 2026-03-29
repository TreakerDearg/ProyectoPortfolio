"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap, Activity, Terminal, Radio, HardDrive, Wifi,
  Shield, AlertTriangle, Gauge, BatteryCharging
} from "lucide-react";
import { useMetro } from "../../context/MetroContext";
import styles from "../../../../styles/inventory-styles/layout/header.module.css";

export default function HardwareHeader() {
  const { system } = useMetro();
  const [radLevel, setRadLevel] = useState(0.45);
  const [isWarning, setIsWarning] = useState(false);
  const [scrollText, setScrollText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  // Mensajes rotativos para el panel central
  const systemMessages = [
    "D6_OS v33.2 ACTIVE",
    "RAD_LEAK SECTOR_G",
    "FILTERS: 63%",
    "CORE_TEMP: 58°C",
    "POLIS_DOWNLINK OK",
    "AUTH: ARTYOM_C"
  ];

  useEffect(() => {
    if (system?.radiation_level) {
      const rad = parseFloat(system.radiation_level);
      if (!isNaN(rad)) {
        setRadLevel(rad);
        setIsWarning(rad > 0.5);
      }
    }
  }, [system]);

  // Rotar mensajes cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % systemMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Para el efecto de "máquina de escribir" en el mensaje actual
  useEffect(() => {
    let charIndex = 0;
    const fullText = systemMessages[messageIndex];
    setScrollText("");
    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setScrollText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);
    return () => clearInterval(typeInterval);
  }, [messageIndex]);

  // Calcular porcentaje de radiación para el medidor
  const radPercent = Math.min(100, (radLevel / 1.2) * 100);
  const isCritical = radLevel > 0.8;

  return (
    <header className={styles.header}>
      <div className={styles.scanlines} />
      <div className={styles.rivets} />

      {/* Izquierda: indicadores de estado crítico */}
      <div className={styles.left}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <Shield size={12} />
            <span>CORE</span>
          </div>
          <div className={styles.indicator}>
            <Zap size={14} className={styles.iconPulse} />
            <span>REACTOR: {system?.status === "CRITICAL_SYSTEM_DEGRADATION" ? "DEGRADED" : "STABLE"}</span>
          </div>
          <div className={`${styles.indicator} ${isWarning ? styles.warning : ""}`}>
            <Radio size={14} className={isWarning ? styles.warningIcon : styles.iconDim} />
            <span>RAD: {radLevel.toFixed(2)} Sv/h</span>
            {isWarning && (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={styles.warningPulse}
              >
                !
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Centro: medidor de radiación + terminal de mensajes */}
      <div className={styles.center}>
        <div className={styles.gaugePanel}>
          <div className={styles.gaugeLabel}>RADIATION</div>
          <div className={styles.gaugeContainer}>
            <motion.div
              className={`${styles.gaugeFill} ${isCritical ? styles.criticalFill : isWarning ? styles.warningFill : ""}`}
              animate={{ width: `${radPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className={styles.gaugeValue}>{radPercent.toFixed(0)}%</div>
        </div>

        <div className={styles.terminalPanel}>
          <div className={styles.terminalHeader}>
            <Terminal size={10} />
            <span>D6_TERM</span>
          </div>
          <div className={styles.terminalContent}>
            <span className={styles.cursor}>&gt;</span>
            <span className={styles.scrollingText}>{scrollText}</span>
            <span className={styles.blink}>_</span>
          </div>
        </div>

        <div className={styles.signalPanel}>
          <div className={styles.signalBars}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.signalBar}
                animate={{
                  height: [4, Math.random() * 12 + 4, 4],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          <Wifi size={12} className={styles.signalIcon} />
          <span className={styles.signalText}>LINK</span>
        </div>
      </div>

      {/* Derecha: info del sistema + led de estado */}
      <div className={styles.right}>
        <div className={styles.systemInfo}>
          <HardDrive size={12} className={styles.iconSoft} />
          <span>{system?.terminal_id?.split('-')[1] || "D6"}</span>
          <span className={styles.osVersion}>{system?.os_version || "VOS-DARK-33"}</span>
        </div>
        <div className={styles.statusDotGroup}>
          <div className={`${styles.statusDot} ${isCritical ? styles.red : isWarning ? styles.amber : styles.green}`} />
          <AlertTriangle size={10} className={styles.alertIcon} />
        </div>
      </div>

      {/* Remaches decorativos adicionales */}
      <div className={styles.bolts}>
        <div className={styles.bolt} />
        <div className={styles.bolt} />
      </div>
    </header>
  );
}