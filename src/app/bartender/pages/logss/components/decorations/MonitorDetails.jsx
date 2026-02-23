'use client';
import React from 'react';
import styles from '../../../../styles/logs-styles/industrial.module.css';

// Tornillo Hexagonal: Añadido un stopPropagation opcional por si se usa en botones
export const HexBolt = ({ className }) => {
  const randomRotation = React.useMemo(() => Math.floor(Math.random() * 360), []);
  
  return (
    <div 
      className={`${styles.boltContainer} ${className}`}
      style={{ transform: `rotate(${randomRotation}deg)` }}
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

// Asset Tag: Ajustado para que acepte 'version' y maneje textos largos
export const AssetTag = ({ code = "UNIT_THETA_09", version = "MOD_4.1" }) => (
  <div className={styles.assetTagContainer}>
    <div className={styles.tagContent}>
      <div className={styles.tagHeader}>
        <span className={styles.companyName}>PATHOS_II_LOGISTICS</span>
        <div className={styles.tagSecurityHole} />
      </div>
      
      <div className={styles.barcodeStrip}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={styles.barcodeLine} 
            style={{ 
              width: `${(i % 3 === 0) ? 2 : 1}px`, 
              opacity: 0.2 + (Math.random() * 0.8),
              height: `${70 + (Math.random() * 30)}%`
            }} 
          />
        ))}
      </div>

      <div className={styles.tagFooter}>
        <div className={styles.assetCodeGroup}>
          <span className={styles.footerLabel}>ID:</span>
          <span className={styles.assetCode}>{code}</span>
        </div>
        <span className={styles.versionLabel}>{version}</span>
      </div>
    </div>
    <div className={styles.tagGrime} />
  </div>
);

export const VentGrill = ({ bars = 5, className }) => (
  <div className={`${styles.ventContainer} ${className}`}>
    {[...Array(bars)].map((_, i) => (
      <div key={i} className={styles.ventBar}>
        <div className={styles.ventMetal}>
           <div className={styles.dustLayer} />
        </div>
      </div>
    ))}
  </div>
);

export const WarningLabel = ({ text = "HIGH VOLTAGE / DISCONNECT POWER", type = "danger" }) => (
  <div className={`${styles.warningLabel} ${styles[type]}`}>
    <div className={styles.warningStripes} />
    <div className={styles.warningContent}>
      <div className={styles.warningHeader}>
        <div className={styles.warningIcon}>!</div>
        <span className={styles.warningTitle}>ATTENTION : SYSTEM_INTEGRITY</span>
      </div>
      <p className={styles.warningText}>{text}</p>
    </div>
  </div>
);

export const TechSpec = ({ label, value }) => (
  <div className={styles.techSpecBox}>
    <span className={styles.specLabel}>{label}</span>
    <div className={styles.specDivider} />
    <span className={styles.specValue}>{value}</span>
  </div>
);