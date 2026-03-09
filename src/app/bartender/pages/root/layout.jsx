"use client";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import styles from "../../styles/root-styles/ArmorLayout.module.css";

export default function ArmorLayout({ children }) {
  return (
    <div className={styles.container}>
      {/* CAPA DE POST-PROCESADO: Scanlines y Ruido */}
      <div className={styles.vfxOverlay}>
        <div className={styles.scanlines} />
        <div className={styles.vignette} />
      </div>

      {/* CHASIS MECÁNICO (MARCO) */}
      <div className={styles.chassisFrame}>
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />
        
        {/* Sensores decorativos en los laterales */}
        <div className={styles.sideRailLeft} />
        <div className={styles.sideRailRight} />
      </div>

      {/* INTERFAZ OPERATIVA */}
      <div className={styles.innerInterface}>
        <Header />

        {/* ÁREA DE VISIÓN CENTRAL (VIEWPORT) */}
        <main className={styles.viewportMain}>
          <div className={styles.scrollGuard}>
            {children}
          </div>
        </main>

        <Footer />
      </div>

      {/* BARRA DE ESTADO DE CARGA DEL SISTEMA (DECORATIVA) */}
      <div className={styles.bottomLinkBar} />
    </div>
  );
}