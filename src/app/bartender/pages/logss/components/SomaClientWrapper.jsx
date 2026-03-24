"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../styles/logs-styles/soma-layout.module.css";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LeftPanel from "../components/layout/LeftPanel";
import RightPanel from "../components/layout/RightPanel";

export default function SomaClientWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className={styles.system}>

      {/* =========================
          MAIN UI
      ========================= */}
      <div className={styles.wrapper}>
        <Header />

        <div className={styles.main}>

          {!isMobile && (
            <aside className={styles.leftLayer}>
              <LeftPanel />
            </aside>
          )}

          <main className={styles.content}>
            <div className={styles.contentInner}>
              {children}
            </div>

            {/* overlay visual SIN bloquear */}
            <div className={styles.contentOverlay} />
          </main>

          {!isMobile && (
            <aside className={styles.rightLayer}>
              <RightPanel />
            </aside>
          )}

        </div>

        <Footer />
      </div>

      {/* =========================
          GLOBAL FX (NO BLOQUEA)
      ========================= */}
      <div className={styles.globalFx} />

      {/* =========================
           PORTAL (VENTANAS)
      ========================= */}
      <div id="desktop-root" className={styles.portalLayer} />

    </div>
  );
}