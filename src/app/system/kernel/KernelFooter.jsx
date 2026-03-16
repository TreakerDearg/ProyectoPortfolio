"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin, Clock } from "lucide-react";
import styles from "../../styles/kernelStyles/kernelFooter.module.css";

export default function KernelFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = {
    github: "https://github.com/tuusuario",
    linkedin: "https://linkedin.com/in/tuusuario"
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.taskbar}>
        <div className={styles.startButton}>
          <span>Inicio</span>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.tasks}>
          <span className={styles.taskItem}>📁 Portfolio</span>
          <span className={styles.taskItem}>🖥️ Terminal</span>
        </div>

        <div className={styles.tray}>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.trayIcon}
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.trayIcon}
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <div className={styles.traySeparator}></div>
          <div className={styles.clock}>
            <Clock size={12} />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}