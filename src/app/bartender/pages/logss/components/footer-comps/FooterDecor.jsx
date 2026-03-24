"use client";

import styles from "../../../../styles/logs-styles/layout/footer/footer-decor.module.css";

export default function FooterDecor() {
  return (
    <div className={styles.decorRoot}>

      {/* SCANLINES */}
      <div className={styles.scanline} />

      {/* NOISE */}
      <div className={styles.noise} />

      {/* GRADIENT GLOW */}
      <div className={styles.glow} />

      {/* TOP LIGHT SWEEP */}
      <div className={styles.lightSweep} />

      {/* GRID (SOMA TECH) */}
      <div className={styles.grid} />

    </div>
  );
}