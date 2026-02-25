'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Database, FlaskConical, X, AlertTriangle, ShieldAlert, 
  Thermometer, Zap, Droplet, Beaker, TestTube, Microscope, Atom
} from 'lucide-react';
import styles from '../../../styles/logs-styles/briefcase.module.css';

export const DrinkBriefcase = ({ drink, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('recipe'); // 'recipe' o 'notes'

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !drink) return null;

  const isHighRisk = drink.corruption > 0.6;
  const isExperimental = drink.isArchiveOnly;

  // Función para determinar el color según el nivel de integridad
  const integrityColor = () => {
    const integrity = (1 - drink.corruption) * 100;
    if (integrity > 75) return '#00cc00';
    if (integrity > 40) return '#ffaa00';
    return '#ff4444';
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <motion.div 
        className={`${styles.briefcaseWindow} ${isExperimental ? styles.experimentalGlow : ''}`}
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* HEADER - Windows 95 style */}
        <div className={`${styles.titleBar} ${isHighRisk ? styles.titleBarAlert : ''}`}>
          <div className={styles.titleText}>
            <div className={styles.titleIcon}>
              {isExperimental ? <AlertTriangle size={12} /> : <FlaskConical size={12} />}
            </div>
            <span className={styles.truncateText}>
              {isExperimental ? 'RESTRICTED' : 'BIO_ANALYZER'} - [{drink.title}]
            </span>
          </div>
          <button className={styles.win95CloseBtn} onClick={onClose} title="Cerrar">
            <X size={12} strokeWidth={3} />
          </button>
        </div>

        {/* BODY */}
        <div className={styles.innerContent}>
          {/* Panel izquierdo - Visualización científica */}
          <div className={styles.scannerViewport}>
            <div className={styles.gridOverlay} />
            <div className={styles.scanLine} />
            {isHighRisk && <div className={styles.glitchOverlay} />}
            
            <div className={styles.scannerHeader}>
              <span className={styles.scannerStatus}>
                <Activity size={10} /> {isExperimental ? 'DECRYPTING...' : 'LIVE_FEED'}
              </span>
              <span className={styles.nodeTag}>{drink.node}</span>
            </div>

            <motion.div 
              className={styles.drinkVisual}
              animate={isHighRisk ? { x: [-2, 2, -2] } : {}}
              transition={{ repeat: Infinity, duration: 0.15, ease: "linear" }}
            >
              <drink.icon 
                className={isExperimental ? styles.iconExperimental : styles.iconNormal} 
                size={48}
              />
            </motion.div>

            <div className={styles.integrityMeter}>
              <div className={styles.meterLabel}>INTEGRITY</div>
              <div className={styles.meterBar}>
                <div 
                  className={styles.meterFill} 
                  style={{ 
                    width: `${(1 - drink.corruption) * 100}%`,
                    backgroundColor: integrityColor()
                  }} 
                />
              </div>
              <div className={styles.meterValue}>
                {Math.floor((1 - drink.corruption) * 100)}%
              </div>
            </div>
          </div>

          {/* Panel derecho - Datos de la receta */}
          <div className={styles.dataGrid}>
            {/* Pestañas de navegación (estilo Win95) */}
            <div className={styles.tabBar}>
              <button 
                className={`${styles.tab} ${activeTab === 'recipe' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('recipe')}
              >
                RECIPE
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'notes' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                NOTES
              </button>
            </div>

            {/* Contenido de la pestaña activa */}
            <div className={styles.tabContent}>
              {activeTab === 'recipe' && (
                <>
                  {/* BASE */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>
                      <Database size={10} /> BASE_COMPOUND
                    </label>
                    <div className={styles.fieldValuePrimary}>{drink.recipe.base}</div>
                  </div>

                  {/* MODIFICADORES Y ADITIVOS en dos columnas */}
                  <div className={styles.twoColumnGrid}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>
                        <Zap size={10} /> MODIFIERS
                      </label>
                      <div className={styles.listContainer}>
                        {drink.recipe.modifiers?.map((m, i) => (
                          <div key={i} className={styles.listItem}>⌲ {m}</div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>
                        <Droplet size={10} /> ADDITIVES
                      </label>
                      <div className={styles.listContainer}>
                        {drink.recipe.additives?.map((a, i) => (
                          <div key={i} className={styles.listItem}>⏺ {a}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* PERFIL DE SABOR */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>
                      <Beaker size={10} /> FLAVOUR_PROFILE
                    </label>
                    <div className={styles.fieldValue}>{drink.recipe.flavour_profile}</div>
                  </div>

                  {/* CRISTALERÍA Y MÉTODO */}
                  <div className={styles.twoColumnGrid}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>
                        <TestTube size={10} /> GLASSWARE
                      </label>
                      <div className={styles.fieldValue}>{drink.recipe.glassware}</div>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>
                        <Microscope size={10} /> METHOD
                      </label>
                      <div className={styles.fieldValue}>{drink.recipe.method}</div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'notes' && (
                <div className={styles.notesSection}>
                  <div className={styles.noteField}>
                    <label className={styles.fieldLabel}>STATUS_LOG</label>
                    <div className={styles.noteContent}>{drink.content}</div>
                  </div>
                  <div className={styles.noteField}>
                    <label className={styles.fieldLabel}>SEC_CLEARANCE</label>
                    <div className={styles.clearanceBadge}>
                      {drink.security_clearance}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Métricas rápidas (siempre visibles) */}
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

        {/* FOOTER - Controles de hardware */}
        <div className={styles.hardwareControls}>
          <div className={styles.systemStatus}>
            <div className={`${styles.led} ${isHighRisk ? styles.ledRed : styles.ledGreen}`} />
            <span className={styles.mobileHidden}>Kernel_{drink.node}</span>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.win95Btn} onClick={onClose}>CLOSE</button>
            <button className={`${styles.win95Btn} ${styles.win95BtnBold}`}>
              {isHighRisk ? 'FORCE_DECRYPT' : 'EXECUTE'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};