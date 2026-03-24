"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "../../../../styles/logs-styles/layout/header/header-title.module.css";

export default function HeaderTitle() {

  const fullText = "SOMA_OS";
  const [text, setText] = useState("");

  /* =========================
     TYPEWRITER EFFECT
  ========================= */
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;

      if (i === fullText.length) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>

      {/* =========================
         ICON
      ========================= */}
      <motion.div
        className={styles.icon}
        animate={{
          rotate: [0, 6, -6, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
      >
        <Terminal size={14} />
      </motion.div>

      {/* =========================
         TEXT BLOCK
      ========================= */}
      <div className={styles.textBlock}>

        {/* MAIN TITLE */}
        <div className={styles.mainLine}>
          <span className={styles.mainText}>
            {text}
          </span>

          {/* CURSOR */}
          <motion.span
            className={styles.cursor}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
          >
            _
          </motion.span>
        </div>

        {/* SUBTEXT */}
        <span className={styles.subText}>
          v0.1 • BUILD_ARK
        </span>

      </div>

      {/* =========================
         GLITCH FLASH
      ========================= */}
      <motion.div
        className={styles.glitch}
        animate={{ opacity: [0, 0, 0.25, 0] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          times: [0, 0.9, 0.95, 1],
        }}
      />

      {/* =========================
         GLOW
      ========================= */}
      <div className={styles.glow} />

    </div>
  );
}