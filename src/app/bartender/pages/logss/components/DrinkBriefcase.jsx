// components/DrinkBriefcase.jsx
'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Database, FlaskConical, X, AlertTriangle, ShieldAlert, Thermometer, Zap, Droplet
} from 'lucide-react';
import styles from '../../../styles/logs-styles/briefcase.module.css';

export const DrinkBriefcase = ({ drink, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !drink) return null;

  const isHighRisk = drink.corruption > 0.6;
  const isExperimental = drink.isArchiveOnly;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <motion.div 
        className={`${styles.briefcaseWindow} ${isExperimental ? styles.experimentalGlow : ''}`}
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* HEADER */}
        <div className={`${styles.titleBar} ${isHighRisk ? styles.titleBarAlert : ''}`}>
          <div className={styles.titleText}>
            <div className={styles.titleIcon}>
              {isExperimental ? <AlertTriangle size={12} /> : <FlaskConical size={12} />}
            </div>
            <span className={styles.truncateText}>
              {isExperimental ? 'RESTRICTED' : 'ANALYZER'} - [{drink.title}]
            </span>
          </div>
          <button className={styles.win95CloseBtn} onClick={onClose}>
            <X size={12} strokeWidth={3} />
          </button>
        </div>

        <div className={styles.innerContent}>
          {/* VIEWPORT IZQUIERDO */}
          <div className={styles.scannerViewport}>
            <div className={styles.gridOverlay} />
            <div className={styles.scanLine} />
            {isHighRisk && <div className={styles.glitchOverlay} />}
            
            <div className={styles.scannerHeader}>
              <span className={styles.scannerStatus}>
                <Activity size={10} /> {isExperimental ? 'DECRYPTING...' : 'LIVE_FEED'}
              </span>
            </div>

            <motion.div 
              className={styles.drinkVisual}
              animate={isHighRisk ? { x: [-1, 1, -1] } : {}}
              transition={{ repeat: Infinity, duration: 0.1 }}
            >
              <drink.icon 
                className={isExperimental ? styles.iconExperimental : styles.iconNormal} 
              />
            </motion.div>
          </div>

          {/* DATOS DERECHA */}
          <div className={styles.dataGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}><Database size={10} /> BASE_MATERIAL</label>
              <div className={styles.fieldValuePrimary}>{drink.recipe.base}</div>
            </div>

            <div className={styles.twoColumnGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}><Zap size={10} /> ADDITIVES</label>
                <div className={styles.listContainer}>
                  {drink.recipe.additives?.slice(0, 3).map((a, i) => (
                    <div key={i} className={styles.listItem}>+ {a}</div>
                  ))}
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}><Droplet size={10} /> MODS</label>
                <div className={styles.listContainer}>
                  {drink.recipe.modifiers?.slice(0, 3).map((m, i) => (
                    <div key={i} className={styles.listItem}>&gt; {m}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.metricsRow}>
              <div className={styles.metricBox}>
                <Thermometer size={14} />
                <div className={styles.metricText}>
                  <span className={styles.metricLabel}>STATUS</span>
                  <span className={styles.metricValue}>{drink.status}</span>
                </div>
              </div>
              <div className={`${styles.metricBox} ${isHighRisk ? styles.riskActive : ''}`}>
                <ShieldAlert size={14} />
                <div className={styles.metricText}>
                  <span className={styles.metricLabel}>INTEGRITY</span>
                  <span className={styles.metricValue}>{Math.floor((1 - drink.corruption) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className={styles.hardwareControls}>
          <div className={styles.systemStatus}>
            <div className={`${styles.led} ${isHighRisk ? styles.ledRed : styles.ledGreen}`} />
            <span className={styles.mobileHidden}>Kernel_{drink.node}</span>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.win95Btn} onClick={onClose}>BACK</button>
            <button className={styles.win95BtnBold}>
              {isHighRisk ? 'DECRYPT' : 'EXECUTE'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};