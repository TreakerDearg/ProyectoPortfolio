// NoiseOverlay.jsx
import React from 'react';
import styles from '../../../styles/logs-styles/soma-page.module.css';

export const NoiseOverlay = () => (
  <div className={styles.fxContainer}>
    {/* Capa 1: El grano de película fino y ruidoso */}
    <div className={styles.grainLayer} />
    
    {/* Capa 2: La rejilla de píxeles CRT (Scanlines) */}
    <div className={styles.scanlineLayer} />
    
    {/* Capa 3: El parpadeo de voltaje inestable (WAU interference) */}
    <div className={styles.voltageFlicker} />
    
    {/* Capa 4: Viñeteado de lente de terminal */}
    <div className={styles.vignette} />
  </div>
);