'use client';
import React from 'react';
import styles from '../../styles/logs-styles/soma-layout.module.css';
import BackToHome from '../../components/salida/BackToHome';
import { HexBolt, AssetTag, VentGrill, WarningLabel } from './components/decorations/MonitorDetails';
import { motion } from 'framer-motion';

export default function SomaTerminalLayout({ children }) {
  return (
    <div className={styles.terminalWrapper}>
      <div className={styles.ambientShadow} />

      <motion.div 
        className={styles.monitorFrame}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* --- MARCO SUPERIOR --- */}
        <header className={styles.topHardwareFrame}>
          <div className={styles.topHardwareLeft}>
            <HexBolt className={styles.hardwareBolt} />
            <div className={styles.serialNumber}>THETA-UNIT // 09-B</div>
          </div>
          
          <div className={styles.topConsoleCenter}>
            <div className={styles.ventFlipped}>
              <VentGrill bars={5} />
            </div>
            
            <div className={styles.statusLedsContainer}>
              <div className={styles.ledGroup}>
                <div className={styles.ledRed} />
                <span className={styles.ledLabel}>ERR</span>
              </div>
              <div className={styles.ledGroup}>
                <div className={styles.ledGreen} />
                <span className={styles.ledLabel}>PWR</span>
              </div>
            </div>

            <div className={styles.ventNormal}>
              <VentGrill bars={5} />
            </div>
          </div>

          <div className={styles.topHardwareRight}>
            <HexBolt className={styles.hardwareBolt} />
          </div>
        </header>

        {/* --- PANTALLA Y BEZEL --- */}
        <div className={styles.screenBezel}>
          <div className={styles.assetTagWrapper}>
             <AssetTag />
          </div>
          
          <div className={styles.pageContainer}>
            {/* Capas de atmósfera CRT */}
            <div className={styles.glassCurvature} />
            <div className={styles.scanlineOverlay} />
            <div className={styles.staticNoise} />

            <main className={styles.contentView}>
               {children}
            </main>
          </div>

          {/* --- PANEL INFERIOR INTERNO --- */}
          <footer className={styles.bottomNavPanel}>
            <div className={styles.navControls}>
              <div className={styles.backButtonWrapper}>
                <BackToHome variant="soma" />
              </div>
              <div className={styles.separator} />
              <div className={styles.warningWrapper}>
                <WarningLabel />
              </div>
            </div>

            <div className={styles.centralSpeaker}>
              <VentGrill bars={6} />
            </div>

            <div className={styles.hardwareStatus}>
              <div className={styles.statusInfo}>
                <div className={styles.pulseContainer}>
                   <div className={styles.syncPulse} />
                   <span className={styles.statusLabel}>CORE_STABILITY: 98.2%</span>
                </div>
                <span className={styles.statusValue}>ESTABLISHED_THETA_09</span>
              </div>
            </div>
          </footer>
        </div>
        
        {/* --- BASE --- */}
        <div className={styles.baseFrameDetails}>
          <div className={styles.baseCenterGrip}>
            <div className={styles.gripTexture} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}