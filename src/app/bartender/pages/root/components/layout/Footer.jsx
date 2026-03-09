"use client";
import Logs from "./footer/Logs";
import Location from "./footer/Location";
import Status from "./footer/Status";
import styles from '../../../../styles/root-styles/layout/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Línea de energía superior decorativa */}
      <div className={styles.powerRail} />

      <div className={styles.footerContent}>
        {/* Lado Izquierdo: Eventos y Logs en tiempo real */}
        <div className={styles.sectionWrapper}>
          <Logs />
        </div>

        {/* Centro: Telemetría Geográfica (Navegación) */}
        <div className={`${styles.sectionWrapper} ${styles.centerSection}`}>
          <Location />
        </div>

        {/* Lado Derecho: Estado de Carga y Reloj de Sistema */}
        <div className={styles.sectionWrapper}>
          <Status />
        </div>
      </div>

      {/* Marca de agua de la unidad (Opcional) */}
      <div className={styles.unitId}>AC_UNIT_01 // RAVEN</div>
    </footer>
  );
}