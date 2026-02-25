'use client';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/logs-styles/soma-layout.module.css';
import BackToHome from '../../components/salida/BackToHome';
import { HexBolt, AssetTag, VentGrill, WarningLabel } from './components/decorations/MonitorDetails';
import { motion } from 'framer-motion';

export default function SomaTerminalLayout({ 
  children,
  unitId = "THETA-UNIT // 09-B",
  assetCode = "UNIT_THETA_09",
  assetVersion = "MOD_4.1",
  stability = 98.2,
  status = "ESTABLISHED_THETA_09",
  showWarning = true,
  warningText = "HIGH VOLTAGE / DISCONNECT POWER",
  warningType = "danger",
  ledError = false,        // false = apagado, true = encendido/parpadeo
  ledPower = true,
  className = "",
  ...rest
}) {
  return (
    <div className={`${styles.terminalWrapper} ${className}`} {...rest}>
      {/* Sombra ambiental que simula luz del monitor */}
      <div className={styles.ambientShadow} aria-hidden="true" />

      <motion.div 
        className={styles.monitorFrame}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        role="region"
        aria-label="SOMA Terminal Interface"
      >
        {/* ========== MARCO SUPERIOR (HARDWARE) ========== */}
        <header className={styles.topHardwareFrame}>
          <div className={styles.topHardwareLeft}>
            <HexBolt className={styles.hardwareBolt} />
            <div className={styles.serialNumber}>{unitId}</div>
          </div>
          
          <div className={styles.topConsoleCenter}>
            {/* Ventilación izquierda (invertida) */}
            <div className={styles.ventFlipped} aria-hidden="true">
              <VentGrill bars={5} animate={false} />
            </div>
            
            {/* LEDs de estado */}
            <div className={styles.statusLedsContainer}>
              <div className={styles.ledGroup}>
                <motion.div 
                  className={`${styles.ledRed} ${ledError ? styles.ledActive : ''}`}
                  animate={ledError ? { opacity: [1, 0.4, 1] } : { opacity: 0.3 }}
                  transition={ledError ? { duration: 1.5, repeat: Infinity } : {}}
                  role="status"
                  aria-label={ledError ? "Error LED: active" : "Error LED: inactive"}
                />
                <span className={styles.ledLabel}>ERR</span>
              </div>
              <div className={styles.ledGroup}>
                <motion.div 
                  className={`${styles.ledGreen} ${ledPower ? styles.ledActive : ''}`}
                  animate={ledPower ? { opacity: [1, 0.8, 1] } : { opacity: 0.3 }}
                  transition={ledPower ? { duration: 2, repeat: Infinity } : {}}
                  role="status"
                  aria-label={ledPower ? "Power LED: on" : "Power LED: off"}
                />
                <span className={styles.ledLabel}>PWR</span>
              </div>
            </div>

            {/* Ventilación derecha */}
            <div className={styles.ventNormal} aria-hidden="true">
              <VentGrill bars={5} animate={false} />
            </div>
          </div>

          <div className={styles.topHardwareRight}>
            <HexBolt className={styles.hardwareBolt} />
          </div>
        </header>

        {/* ========== PANTALLA Y BEZEL ========== */}
        <div className={styles.screenBezel}>
          {/* Etiqueta de activo fijo (AssetTag) */}
          <div className={styles.assetTagWrapper}>
            <AssetTag code={assetCode} version={assetVersion} />
          </div>
          
          <div className={styles.pageContainer}>
            {/* Capas de atmósfera CRT (puramente decorativas) */}
            <div className={styles.glassCurvature} aria-hidden="true" />
            <div className={styles.scanlineOverlay} aria-hidden="true" />
            <div className={styles.staticNoise} aria-hidden="true" />

            {/* Contenido principal de la página */}
            <main className={styles.contentView}>
              {children}
            </main>
          </div>

          {/* ========== PANEL INFERIOR INTERNO ========== */}
          <footer className={styles.bottomNavPanel}>
            <div className={styles.navControls}>
              <div className={styles.backButtonWrapper}>
                <BackToHome variant="soma" />
              </div>
              <div className={styles.separator} aria-hidden="true" />
              <div className={styles.warningWrapper}>
                {showWarning && (
                  <WarningLabel text={warningText} type={warningType} />
                )}
              </div>
            </div>

            {/* Speaker central (decorativo) */}
            <div className={styles.centralSpeaker} aria-hidden="true">
              <VentGrill bars={6} animate={false} />
            </div>

            {/* Estado del hardware con animación de pulso */}
            <div className={styles.hardwareStatus}>
              <div className={styles.statusInfo}>
                <div className={styles.pulseContainer}>
                  <motion.div 
                    className={styles.syncPulse}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  />
                  <span className={styles.statusLabel}>
                    CORE_STABILITY: {typeof stability === 'number' ? stability.toFixed(1) : stability}%
                  </span>
                </div>
                <span className={styles.statusValue}>{status}</span>
              </div>
            </div>
          </footer>
        </div>
        
        {/* ========== BASE DEL MONITOR ========== */}
        <div className={styles.baseFrameDetails}>
          <div className={styles.baseCenterGrip}>
            <div className={styles.gripTexture} aria-hidden="true" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

SomaTerminalLayout.propTypes = {
  children: PropTypes.node.isRequired,
  unitId: PropTypes.string,
  assetCode: PropTypes.string,
  assetVersion: PropTypes.string,
  stability: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.string,
  showWarning: PropTypes.bool,
  warningText: PropTypes.string,
  warningType: PropTypes.oneOf(['danger', 'warning', 'info']),
  ledError: PropTypes.bool,
  ledPower: PropTypes.bool,
  className: PropTypes.string,
};