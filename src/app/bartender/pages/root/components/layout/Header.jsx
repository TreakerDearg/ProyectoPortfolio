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

  // Glitch global ocasional
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ borderColor: "rgba(0, 255, 255, 0.8)" }}
    >
      {/* Barrido de escaneo global */}
      <motion.div 
        className={styles.headerScanline}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className={styles.topSection}>
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </div>

      <BottomBar />
      <CabinEdge />
    </motion.header>
  );
}