import React from 'react';
import styles from '../../../styles/logs-styles/decorations.module.css';

export const SomaCable = ({ className }) => (
  <div className={`${styles.somaCable} ${className}`}>
    <div className={styles.cableInner} />
    <div className={styles.cableTip} />
  </div>
);