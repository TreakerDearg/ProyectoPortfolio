"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import LeftPanel from "./Header/LeftPanel";
import CenterPanel from "./Header/CenterPanel";
import RightPanel from "./Header/RightPanel";
import BottomBar from "./Header/BottomBar";
import CabinEdge from "./Header/CabinEdge";

import styles from '../../../../styles/root-styles/layout/Header.module.css';

export default function Header() {
  const [glitch, setGlitch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* =========================
     DETECTAR MOBILE
  ========================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* =========================
     GLITCH EFFECT
  ========================= */
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      className={`${styles.header} ${glitch ? styles.glitchHeader : ''}`}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Scanline */}
      <motion.div
        className={styles.headerScanline}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className={styles.headerInner}>
        
        <div className={styles.topSection}>

          {/* LEFT siempre visible */}
          <div className={styles.left}>
            <LeftPanel />
          </div>

          {/* CENTER solo desktop */}
          {!isMobile && (
            <div className={styles.center}>
              <CenterPanel />
            </div>
          )}

          {/* RIGHT solo desktop */}
          {!isMobile && (
            <div className={styles.right}>
              <RightPanel />
            </div>
          )}

        </div>

        {/* BottomBar opcional: podés decidir */}
        <BottomBar />
      </div>

      <CabinEdge />
    </motion.header>
  );
}