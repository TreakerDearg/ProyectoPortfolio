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

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (system?.radiation_level) {
      const rad = parseFloat(system.radiation_level);
      if (!isNaN(rad)) setRadLevel(rad);
    }
  }, [system]);

  const isCritical = radLevel > 0.6;
  const isWarning = radLevel > 0.4 && radLevel <= 0.6;
  const isSystemOk = system?.status !== "CRITICAL_SYSTEM_DEGRADATION";

  const barCount = 8;
  const bars = Array.from({ length: barCount }, (_, i) => {
    const intensity = Math.min(1, radLevel / 1.0);
    const height = (i + 1) / barCount * intensity * 80 + 8;
    return height;
  });

  return (
    <footer className={styles.footer}>
      <div className={styles.scanlines} />

      {/* LEFT: Physical buttons */}
      <div className={styles.left}>
        <div className={styles.physicalButtons}>
          <button className={`${styles.button} ${styles.danger}`} />
          <button className={`${styles.button} ${styles.neutral}`} />
          <button className={`${styles.button} ${styles.reset}`} />
        </div>
      </div>

      {/* CENTER: Industrial bar graph + system info */}
      <div className={styles.center}>
        <div className={styles.barGroup}>
          {bars.map((height, i) => (
            <motion.div
              key={i}
              className={`${styles.bar} ${isCritical ? styles.criticalBar : isWarning ? styles.warningBar : ""}`}
              animate={{ height }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </div>

        <div className={styles.systemInfo}>
          <span className={styles.label}>
            {system?.os_version || "VOS-DARK-33"} // {system?.terminal_id || "D6-HB-2033"}
          </span>
          <span className={styles.clock}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second:'2-digit' })}
          </span>
        </div>
      </div>

      {/* RIGHT: BackToHome button + Status LEDs */}
      <div className={styles.right}>
        <BackToHome variant="metro" size="sm" />
        <div className={styles.ledGroup}>
          <div className={`${styles.led} ${isSystemOk ? styles.green : styles.red}`}>
            <motion.div
              className={styles.ledPulse}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span>PWR</span>
        </div>
        <div className={styles.ledGroup}>
          <div className={`${styles.led} ${isWarning ? styles.amber : isCritical ? styles.red : styles.green}`}>
            <motion.div
              className={styles.ledPulse}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span>RAD</span>
        </div>
      </div>
    </footer>
  );
}