"use client";
import React from "react";
import styles from "../styles/terminal.module.css";
import { SystemProvider } from "../context/SystemContext";

import { MainHeader } from "../layout/MainHeader";
import { MainFooter } from "../layout/MainFooter";
import { LeftPanel } from "../layout/LeftPanel";
import { RightPanel } from "../layout/RightPanel";
import { Screw } from "../components/deco-layout/Screw";
import { StatusLed } from "../components/deco-layout/StatusLed";

export default function RetroLayout({ children }) {
  return (
    <SystemProvider>
      <div className={styles.container}>
        <div className={styles.frame}>
          <MainHeader />

          <div className={styles.workspace}>
            <LeftPanel />

            <main className={styles.monitor}>
              <div className={styles.monitorInner}>
                {/* Bisel del monitor con desgaste y vidrio */}
                <div className={styles.bezel}>
                  {/* Capas de desgaste (rayones, suciedad) */}
                  <div className={styles.bezelWear} />
                  <div className={styles.bezelScratches} />
                  <div className={styles.bezelDust} />

                  {/* NUEVA CAPA: vidrio sobre el bisel (para efecto de cristal) */}
                  <div className={styles.bezelGlass} />

                  {/* Tornillos decorativos en las esquinas del bisel */}
                  <Screw size="xs" type="flat" className={styles.bezelScrewTL} rotation={0} />
                  <Screw size="xs" type="flat" className={styles.bezelScrewTR} rotation={90} />
                  <Screw size="xs" type="flat" className={styles.bezelScrewBL} rotation={180} />
                  <Screw size="xs" type="flat" className={styles.bezelScrewBR} rotation={270} />

                  {/* Pantalla */}
                  <div className={styles.screenContent}>
                    <div className={styles.crtOverlay} />
                    <div className={styles.screenInner}>
                      {children}
                    </div>
                  </div>

                  {/* Capa de cristal con reflejos (sobre la pantalla) */}
                  <div className={styles.glassOverlay}>
                    <div className={styles.glassLight} />
                    <div className={styles.glassDust} />
                    <div className={styles.glassVignette} />
                  </div>
                </div>

                {/* LEDs de calibración y estado */}
                <div className={styles.monitorStatus}>
                  <div className={styles.calibrationDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <StatusLed status="online" size="xxs" className={styles.powerLed} />
                </div>
              </div>
            </main>

            <RightPanel />
          </div>

          <MainFooter />
        </div>
      </div>
    </SystemProvider>
  );
}