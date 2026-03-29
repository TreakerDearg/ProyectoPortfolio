/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMetro } from "../../context/MetroContext";
import BackToHome from "../../../../components/salida/BackToHome";
import styles from "../../../../styles/inventory-styles/layout/footer.module.css";

export default function HardwareFooter() {
  const { system } = useMetro();
  const [time, setTime] = useState(new Date());
  const [radLevel, setRadLevel] = useState(0.45);

  // Reloj
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Radiación desde el sistema
  useEffect(() => {
    if (system?.radiation_level) {
      const rad = parseFloat(system.radiation_level);
      if (!isNaN(rad)) setRadLevel(rad);
    }
  }, [system]);

  const isCritical = radLevel > 0.6;
  const isWarning = radLevel > 0.4 && radLevel <= 0.6;
  const isSystemOk = system?.status !== "CRITICAL_SYSTEM_DEGRADATION";

  // Barras de radiación
  const barCount = 8;
  const bars = Array.from({ length: barCount }, (_, i) => {
    const intensity = Math.min(1, radLevel / 1.0);
    const factor = (i + 1) / barCount;
    const height = factor * intensity * 80 + 8;
    return height;
  });

  return (
    <footer className={styles.footer}>
      <div className={styles.scanlines} />
      <div className={styles.rivets} />

      {/* Izquierda: botones físicos (se ocultan en móvil) */}
      <div className={styles.left}>
        <div className={styles.physicalButtons}>
          <button className={`${styles.button} ${styles.danger}`} />
          <button className={`${styles.button} ${styles.neutral}`} />
          <button className={`${styles.button} ${styles.reset}`} />
        </div>
      </div>

      {/* Centro: medidores de radiación (simplificado en móvil) */}
      <div className={styles.center}>
        <div className={styles.radMeter}>
          <div className={styles.radBars}>
            {bars.map((height, i) => (
              <motion.div
                key={i}
                className={`${styles.bar} ${isCritical ? styles.criticalBar : isWarning ? styles.warningBar : ""}`}
                animate={{ height }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <div className={styles.radValue}>
            {radLevel.toFixed(2)} Sv/h
          </div>
        </div>
        <div className={styles.systemInfo}>
          <span className={styles.os}>{system?.os_version || "VOS-DARK-33"}</span>
          <span className={styles.time}>{time.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Derecha: botón de salida (prioritario en móvil) */}
      <div className={styles.right}>
        <BackToHome variant="metro" size="md" />
        <div className={styles.statusLeds}>
          <div className={`${styles.led} ${isSystemOk ? styles.green : styles.red}`} />
          <div className={`${styles.led} ${isWarning ? styles.amber : isCritical ? styles.red : styles.green}`} />
        </div>
      </div>
    </footer>
  );
}