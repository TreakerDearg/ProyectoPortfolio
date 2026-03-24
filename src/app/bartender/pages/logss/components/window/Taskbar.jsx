"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "../../../../styles/logs-styles/desktop/taskbar.module.css";

export default function Taskbar({
  windows,
  onToggleMinimize,
  onFocus,
}) {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  if (isMobile) return null;

  return (
    <motion.div
      className={styles.taskbar}
      initial={{ y: 40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >

      {/* START */}
      <button className={styles.startBtn}>
        <span className={styles.startIcon} />
        Inicio
      </button>

      {/* WINDOWS */}
      <div className={styles.windowList}>
        {windows.map((win) => {
          const isActive = !win.minimized;

          return (
            <button
              key={win.id}
              onClick={() => {
                if (win.minimized) {
                  onToggleMinimize(win.id);
                }
                onFocus(win.id);
              }}
              className={`
                ${styles.taskBtn}
                ${isActive ? styles.active : styles.minimized}
              `}
            >
              <span className={styles.windowTitle}>
                {win.app.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* CLOCK (bonus estilo OS) */}
      <div className={styles.clock}>
        {new Date().toLocaleTimeString()}
      </div>

    </motion.div>
  );
}