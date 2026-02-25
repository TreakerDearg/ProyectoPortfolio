import React from 'react';
import styles from '../../../styles/logs-styles/decorations.module.css';

export const SomaVent = ({ className }) => (
  <div className={`${styles.somaVent} ${className}`}>
    {[...Array(5)].map((_, i) => (
      <div key={i} className={styles.ventBlade} />
    ))}
  </div>
);