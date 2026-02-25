'use client';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../../styles/logs-styles/industrial.module.css';

// ------------------------------------------------------------
// HexBolt – Tornillo hexagonal con rotación aleatoria
// ------------------------------------------------------------
export const HexBolt = ({ className, fixedRotation }) => {
  // Genera una rotación aleatoria solo la primera vez (memorizada)
  const randomRotation = React.useMemo(() => Math.floor(Math.random() * 360), []);
  const rotation = fixedRotation !== undefined ? fixedRotation : randomRotation;

  return (
    <div
      className={`${styles.boltContainer} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      role="img"
      aria-label="Tornillo hexagonal"
    >
      <div className={styles.boltHead}>
        <div className={styles.allenKeySlot}>
          <div className={styles.boltRust} />
        </div>
        <div className={styles.metalHighlight} />
      </div>
    </div>
  );
};

HexBolt.propTypes = {
  className: PropTypes.string,
  fixedRotation: PropTypes.number, // opcional, para fijar rotación
};

// ------------------------------------------------------------
// AssetTag – Etiqueta de activo estilo industrial
// ------------------------------------------------------------
export const AssetTag = ({ code = "UNIT_THETA_09", version = "MOD_4.1" }) => {
  // Genera líneas de código de barras con longitudes aleatorias pero estables
  const barcodeLines = React.useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      width: i % 3 === 0 ? 2 : 1,
      height: 70 + Math.random() * 30, // % de la altura del contenedor
      opacity: 0.2 + Math.random() * 0.8,
    }));
  }, []); // Solo se genera una vez

  return (
    <div className={styles.assetTagContainer}>
      <div className={styles.tagContent}>
        <header className={styles.tagHeader}>
          <span className={styles.companyName}>PATHOS_II_LOGISTICS</span>
          <div className={styles.tagSecurityHole} />
        </header>

        <div className={styles.barcodeStrip} aria-hidden="true">
          {barcodeLines.map((line, i) => (
            <div
              key={i}
              className={styles.barcodeLine}
              style={{
                width: `${line.width}px`,
                opacity: line.opacity,
                height: `${line.height}%`,
              }}
            />
          ))}
        </div>

        <footer className={styles.tagFooter}>
          <div className={styles.assetCodeGroup}>
            <span className={styles.footerLabel}>ID:</span>
            <span className={styles.assetCode}>{code}</span>
          </div>
          <time className={styles.versionLabel} dateTime={version}>
            {version}
          </time>
        </footer>
      </div>
      <div className={styles.tagGrime} aria-hidden="true" />
    </div>
  );
};

AssetTag.propTypes = {
  code: PropTypes.string,
  version: PropTypes.string,
};

// ------------------------------------------------------------
// VentGrill – Rejilla de ventilación metálica
// ------------------------------------------------------------
export const VentGrill = ({ bars = 5, className, animate = false }) => {
  return (
    <div
      className={`${styles.ventContainer} ${className} ${animate ? styles.ventAnimated : ''}`}
      role="img"
      aria-label={`Rejilla de ventilación con ${bars} barras`}
    >
      {Array.from({ length: bars }, (_, i) => (
        <div key={i} className={styles.ventBar}>
          <div className={styles.ventMetal}>
            <div className={styles.dustLayer} />
          </div>
        </div>
      ))}
    </div>
  );
};

VentGrill.propTypes = {
  bars: PropTypes.number,
  className: PropTypes.string,
  animate: PropTypes.bool, // vibración sutil al activarse
};

// ------------------------------------------------------------
// WarningLabel – Etiqueta de advertencia industrial
// ------------------------------------------------------------
export const WarningLabel = ({ 
  text = "HIGH VOLTAGE / DISCONNECT POWER", 
  type = "danger" // "danger", "warning", "info"
}) => {
  const typeClass = styles[type] || styles.danger;
  const isAlert = type === 'danger' || type === 'warning';

  return (
    <div
      className={`${styles.warningLabel} ${typeClass}`}
      role={isAlert ? 'alert' : 'region'}
      aria-label={`Advertencia: ${text}`}
    >
      <div className={styles.warningStripes} aria-hidden="true" />
      <div className={styles.warningContent}>
        <header className={styles.warningHeader}>
          <div className={styles.warningIcon} aria-hidden="true">!</div>
          <span className={styles.warningTitle}>ATTENTION : SYSTEM_INTEGRITY</span>
        </header>
        <p className={styles.warningText}>{text}</p>
      </div>
    </div>
  );
};

WarningLabel.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['danger', 'warning', 'info']),
};

// ------------------------------------------------------------
// TechSpec – Especificación técnica (etiqueta + valor)
// ------------------------------------------------------------
export const TechSpec = ({ label, value }) => (
  <div className={styles.techSpecBox}>
    <span className={styles.specLabel}>{label}</span>
    <div className={styles.specDivider} aria-hidden="true" />
    <span className={styles.specValue}>{value}</span>
  </div>
);

TechSpec.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};