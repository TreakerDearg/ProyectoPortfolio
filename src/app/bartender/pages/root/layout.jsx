"use client";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import styles from "../../styles/root-styles/ArmorLayout.module.css";

export default function ArmorLayout({ children }) {
  return (
    <div className={styles.container}>
      
      {/* VFX Overlay */}
      <div className={styles.vfxOverlay} aria-hidden="true">
        <div className={styles.scanlines} />
        <div className={styles.vignette} />
      </div>

      {/* Chassis Frame */}
      <div className={styles.chassisFrame} aria-hidden="true">
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />

        <div className={styles.sideRailLeft} />
        <div className={styles.sideRailRight} />
      </div>

      {/* Main Interface */}
      <div className={styles.innerInterface}>
        <Header />

        <main className={styles.viewportMain}>
          <div className={styles.viewportContainer}>
            <div className={styles.scrollGuard}>
              {children}
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Bottom System Bar */}
      <div className={styles.bottomLinkBar} />
    </div>
  );
}