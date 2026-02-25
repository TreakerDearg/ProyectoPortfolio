import React from 'react';
import styles from '../../../styles/logs-styles/decorations.module.css';

export const SomaWarningLight = ({ className }) => (
  <div className={`${styles.somaWarningLight} ${className}`}>
    <div className={styles.lightRed} />
    <div className={styles.lightYellow} />
  </div>
);