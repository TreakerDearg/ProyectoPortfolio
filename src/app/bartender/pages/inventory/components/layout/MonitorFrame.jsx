"use client";

import { motion } from "framer-motion";
import styles from "../../../../styles/inventory-styles/layout/monitor.module.css";

export default function MonitorFrame({ children }) {
  return (
    <div className={styles.frame}>
      {/* Curvatura de la pantalla */}
      <div className={styles.screenCurve} />

      <motion.div
        className={styles.screen}
        initial={{
          opacity: 0,
          scaleY: 0.96,
          filter: "brightness(1.6) contrast(1.4)"
        }}
        animate={{
          opacity: 1,
          scaleY: 1,
          filter: "brightness(1) contrast(1)"
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut"
        }}
      >
        {/* Capa de fósforo (glow) */}
        <div className={styles.phosphorGlow} />

        {/* Suciedad / vidrio */}
        <div className={styles.glass} />

        {/* Contenido real */}
        <div className={styles.viewport}>
          {children}
        </div>

        {/* Efectos CRT */}
        <div className={styles.effects}>
          <div className={styles.scanlines} />
          <div className={styles.noise} />
          <div className={styles.vignette} />
          <div className={styles.flicker} />
          <div className={styles.distortion} />
        </div>
      </motion.div>

      {/* Tornillos decorativos */}
      <div className={styles.screws}>
        <div className={styles.screw} />
        <div className={styles.screw} />
        <div className={styles.screw} />
        <div className={styles.screw} />
      </div>
    </div>
  );
}