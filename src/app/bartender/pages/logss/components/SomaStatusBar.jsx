import React from 'react';
import styles from '../../../styles/logs-styles/decorations.module.css';

export const SomaStatusBar = ({ className }) => (
  <div className={`${styles.somaStatusBar} ${className}`}>
    <div className={styles.statusBarSegment}>Ω 98.2%</div>
    <div className={styles.statusBarSegment}>Θ 0.3 rad</div>
    <div className={styles.statusBarSegment}>Ψ LEAK</div>
  </div>
);