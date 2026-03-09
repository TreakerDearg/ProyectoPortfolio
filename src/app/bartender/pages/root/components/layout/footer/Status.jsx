"use client";
import { useState, useEffect } from "react";
import { Package, Clock, Wifi } from "lucide-react";
import styles from "../../../../../styles/root-styles/layout/Footer.module.css";

export default function Status() {
  const [time, setTime] = useState(new Date());
  const loadout = 64300; // Valor estático o desde props

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.status}>
      <div className={styles.loadout}>
        <span className={styles.label}>AC_LOADOUT</span>
        <div className={styles.valueGroup}>
          <Package size={10} />
          <span className={styles.value}>{loadout.toLocaleString()} KG</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.timeSection}>
        <span className={styles.date}>
          {time.toLocaleTimeString('en-US', { hour12: false })}
        </span>
      </div>

      <div className={styles.systemLink}>
        <Wifi size={12} color="#0ff" />
        <div className={styles.pingDot} style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
}