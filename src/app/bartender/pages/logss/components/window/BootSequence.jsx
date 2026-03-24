"use client";

import { useEffect, useState } from "react";
import styles from "../../../../styles/logs-styles/system/boot-sequence.module.css";

const BOOT_LINES = [
  "INITIALIZING SOMA SYSTEM...",
  "LOADING CORE MODULES...",
  "CHECKING MEMORY BANKS...",
  "ESTABLISHING NEURAL LINK...",
  "CONNECTING TO ARK NODE...",
  "VERIFYING INTEGRITY...",
  "SYSTEM ONLINE",
];

export default function BootSequence({ onFinish }) {
  const [lines, setLines] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= BOOT_LINES.length) {
      setTimeout(() => onFinish?.(), 800);
      return;
    }

    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, BOOT_LINES[current]]);
      setCurrent((c) => c + 1);
    }, 400 + Math.random() * 400);

    return () => clearTimeout(timeout);
  }, [current, onFinish]);

  return (
    <div className={styles.boot}>

      {/* SCANLINE FX */}
      <div className={styles.scanline} />

      {/* CONTENT */}
      <div className={styles.terminal}>
        {lines.map((line, i) => (
          <div key={i} className={styles.line}>
            {line}
          </div>
        ))}

        {/* CURSOR */}
        <div className={styles.cursor}>█</div>
      </div>

    </div>
  );
}