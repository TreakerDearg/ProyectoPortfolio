"use client";
import React, { useState, useEffect } from "react";
import { Lock, Unlock, Key, RefreshCw } from "lucide-react";
import styles from "../styles/Styles-C/encryptionDisplay.module.css";

export const EncryptionDisplay = ({ encrypted = true, algorithm = "AES-256", keyRotation = true }) => {
  const [rotationProgress, setRotationProgress] = useState(0);

  useEffect(() => {
    if (!keyRotation) return;

    const interval = setInterval(() => {
      setRotationProgress(prev => (prev + 10) % 100);
    }, 3000);

    return () => clearInterval(interval);
  }, [keyRotation]);

  return (
    <div className={`${styles.encryptionDisplay} ${encrypted ? styles.encrypted : styles.unencrypted}`}>
      <div className={styles.iconContainer}>
        {encrypted ? (
          <Lock size={14} className={styles.lockIcon} />
        ) : (
          <Unlock size={14} className={styles.unlockIcon} />
        )}
      </div>
      <div className={styles.algorithmInfo}>
        <span className={styles.algorithm}>{algorithm}</span>
        {keyRotation && (
          <div className={styles.keyRotation}>
            <Key size={10} className={styles.keyIcon} />
            <span className={styles.rotationProgress}>{rotationProgress}%</span>
            <RefreshCw size={8} className={styles.rotationIcon} />
          </div>
        )}
      </div>
    </div>
  );
};
