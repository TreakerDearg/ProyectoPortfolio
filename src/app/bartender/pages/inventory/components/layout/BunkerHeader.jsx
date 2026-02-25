'use client';
import { motion } from 'framer-motion';
import styles from '../../../../styles/inventory-styles/metro-header.module.css';
import { AnalogClock } from '../decos/AnalogClock';
import { NixieTube } from '../decos/NixieTube';
import BackToHome from '../../../../components/salida/BackToHome';

export const BunkerHeader = () => {
  return (
    <header className={styles.metroHeader}>
      <div className={styles.headerMainLayout}>
        
        {/* MÓDULO ALFA: IDENTIFICACIÓN (Siempre visible) */}
        <div className={styles.headerLeft}>
          <div className={styles.accessGroup}>
            <div className={styles.exitWrapper}>
              <BackToHome variant="metro" />
            </div>
            <div className={`${styles.idBadge} ${styles.hideMobile}`}>
              <span className={styles.label}>UNIT_ID</span>
              <span className={styles.value}>D6-8841</span>
            </div>
          </div>
          <motion.div 
            className={`${styles.statusPlate} ${styles.hideTablet}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <span className={styles.plateText}>ARCHIVE_ACCESS</span>
          </motion.div>
        </div>
        
        {/* MÓDULO BETA: BAHÍA DE INSTRUMENTACIÓN (Ocultable en móviles) */}
        <div className={`${styles.gaugesContainer} ${styles.hideMobile}`}>
          <div className={styles.consoleWindow}> 
            <div className={styles.bezelUpperDepth} />
            
            <div className={styles.consoleRail}>
              <div className={styles.analogSection}>
                <AnalogClock />
              </div>
              
              <div className={`${styles.railSeparator} ${styles.hideTablet}`} />

              <div className={`${styles.nixieSection} ${styles.hideTablet}`}>
                <NixieTube value="24" label="RAD_uS" />
                <NixieTube value="OK" label="SYSTEM" />
                {/* Ocultamos algunos tubos en tablets para ahorrar espacio */}
                <NixieTube value="98" label="CPU" className={styles.hideTablet} />
              </div>

              <div className={styles.innerBezelShadow} />
              <div className={styles.glassInterference} />
            </div>
          </div>
        </div>

        {/* MÓDULO GAMMA: TELEMETRÍA DE RED (Compacto en móviles) */}
        <div className={styles.headerRight}>
          <div className={styles.systemStatus}>
            <div className={`${styles.statusInfo} ${styles.hideMobile}`}>
              <span className={styles.statusLabel}>SECURE_LINK</span>
              <span className={styles.statusSubText}>ENCRYPTED</span>
            </div>
            <div className={styles.indicatorCore}>
              <motion.div 
                className={styles.blinkDot} 
                animate={{ 
                  boxShadow: ["0 0 5px #22c55e", "0 0 15px #22c55e", "0 0 5px #22c55e"],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </div>
        </div>

      </div>
      
      {/* Detalle estructural superior (Sombra de encastre) */}
      <div className={styles.headerStructuralCap} />
    </header>
  );
};