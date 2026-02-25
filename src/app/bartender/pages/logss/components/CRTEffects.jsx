// components/CRTEffects.jsx
'use client';
import React from 'react';
import styles from '../../../styles/logs-styles/crt-effects.module.css';

export const CRTEffects = () => {
  return (
    <div className={styles.crtContainer}>
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.flicker} aria-hidden="true" />
      {/* Opcional: una capa de luz de fósforo */}
      <div className={styles.phoshorGlow} aria-hidden="true" />
    </div>
  );
};