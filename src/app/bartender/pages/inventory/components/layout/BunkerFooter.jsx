'use client';
import { motion } from 'framer-motion';
import styles from '../../../../styles/inventory-styles/metro-footer.module.css';

export const BunkerFooter = () => {
  // Generamos remaches de forma más controlada
  const rivetCount = 12; 

  return (
    <footer className={styles.metroFooter}>
      {/* CAPA DE TEXTURA ELECTRÓNICA */}
      <div className={styles.footerNoise} />

      <div className={styles.footerMainLayout}>
        {/* 1. MÓDULO DE ENERGÍA (Prioridad Crítica) */}
        <section className={styles.powerModule}>
          <div className={styles.moduleHeader}>
            <span className={styles.moduleLabel}>SYSTEM_VOLTAGE</span>
            <span className={styles.percentage}>84%</span>
          </div>
          <div className={styles.loadBarContainer}>
            <motion.div 
              className={styles.loadBarFill}
              initial={{ width: "0%" }}
              animate={{ width: "84%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            />
            <div className={styles.loadBarGlass} />
            {/* Pequeños indicadores de escala en la barra */}
            <div className={styles.barMarkers}>
              {[...Array(4)].map((_, i) => <div key={i} className={styles.marker} />)}
            </div>
          </div>
        </section>

        {/* 2. PLACA DE ADVERTENCIA (Identidad Visual) */}
        <section className={`${styles.warningPlateContainer} ${styles.hideMobile}`}>
          <div className={styles.warningPlate}>
            <div className={styles.hazardStripes} />
            <div className={styles.warningTextContainer}>
              <span className={styles.warningText}>POLIS_PROPERTY // SEC_D6</span>
            </div>
            <div className={styles.hazardStripes} />
          </div>
        </section>

        {/* 3. TELEMETRÍA DE SESIÓN (Valor en Tiempo Real) */}
        <section className={styles.footerRight}>
          <div className={styles.telemetryGroup}>
            <span className={`${styles.moduleLabel} ${styles.hideMobile}`}>UPTIME_LOG</span>
            <div className={styles.uptimeValue}>432:12:08</div>
          </div>
        </section>
      </div>

      {/* 4. FILA DE REMACHES ESTRUCTURALES (Deco) */}
      <div className={`${styles.rivetRow} ${styles.hideMobile}`}>
        {[...Array(rivetCount)].map((_, i) => (
          <div key={i} className={styles.structuralRivet} />
        ))}
      </div>
    </footer>
  );
};