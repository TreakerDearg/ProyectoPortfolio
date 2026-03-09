"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sistemas
import { NetworkCanvas } from '../systems/NetworkCanvas';
import { NodeSearch } from '../systems/NodeSearch';
import { DataTraffic } from '../systems/DataTraffic';
import { SecurityLogs } from '../systems/SecurityLogs';
import AnalyticFlow from '../systems/AnalyticFlow';
import SystemRoot from '../systems/SystemRoot';

// Contexto y Estilos
import { useAnalysis } from '../context/AnalysisContext';
import { Maximize2, Activity, ShieldCheck, AlertCircle, Terminal as TerminalIcon, Cpu } from 'lucide-react';
import styles from '../styles/MainSystem.module.css';

export const MainSystem = () => {
  const { activeView, kernelMetrics, systemStatus } = useAnalysis();
  const [isSyncing, setIsSyncing] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // Efecto de transición: Estética de carga de Arasaka
  useEffect(() => {
    setIsSyncing(true);
    setGlitch(true);
    const syncTimer = setTimeout(() => setIsSyncing(false), 800);
    const glitchTimer = setTimeout(() => setGlitch(false), 250);
    return () => {
      clearTimeout(syncTimer);
      clearTimeout(glitchTimer);
    };
  }, [activeView]);

  const isCritical = systemStatus !== 'NOMINAL';

  return (
    <div className={`
      ${styles.container} 
      ${glitch ? styles.glitchActive : ''} 
      ${isCritical ? styles.stateCritical : ''}
    `}>
      
      {/* ===== CAPA 0: ATMÓSFERA HUD (Overlay Global) ===== */}
      <div className={styles.atmosphere}>
        <div className={styles.gridOverlay} />
        <div className={styles.scanline} />
        <div className={styles.vignette} />
      </div>

      {/* ===== CAPA 1: VIEWPORT DINÁMICO ===== */}
      <main className={styles.viewport}>
        <AnimatePresence mode="wait">
          
          {activeView === 'Network_Map' && (
            <motion.div 
              key="network" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className={styles.canvasWrapper}
            >
              {/* El minimapa ahora está dentro de NetworkCanvas */}
              <NetworkCanvas />
            </motion.div>
          )}

          {activeView === 'Security_Logs' && (
            <motion.div 
              key="logs" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.02 }} 
              className={styles.fullOverlay}
            >
              <SecurityLogs />
            </motion.div>
          )}

          {activeView === 'Analytic_Flow' && (
            <motion.div 
              key="flow" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className={styles.dashboardContainer}
            >
              <div className={styles.glassPanel}>
                <PanelHeader title="NEURAL_STREAM" icon={<Activity size={14} />} view={activeView} />
                <div className={styles.panelBody}><AnalyticFlow /></div>
              </div>
            </motion.div>
          )}

          {activeView === 'System_Root' && (
            <motion.div 
              key="root" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className={styles.dashboardContainer}
            >
              <div className={styles.glassPanel}>
                <PanelHeader title="KERNEL_ACCESS" icon={<Cpu size={14} />} view={activeView} />
                <div className={styles.panelBody}><SystemRoot /></div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ===== CAPA 2: INTERFAZ TÁCTICA (HUD EXTERNO) ===== */}
      <div className={styles.hudOverlay}>
        
        {/* HEADER TÁCTICO */}
        <section className={styles.hudTop}>
          <div className={styles.hudTopLeft}>
            <div className={styles.sysBranding}>
              <span className={styles.corpName}></span>
              <span className={styles.verTag}></span>
            </div>
            <NodeSearch />
          </div>
          
          <div className={styles.hudTopRight}>
            <div className={styles.statusGroup}>
              <div className={styles.syncStatus}>
                {isSyncing ? (
                  <div className={styles.syncing}>
                    <div className={styles.loaderCircle} />
                    <span>UPLINKING_DATA...</span>
                  </div>
                ) : (
                  <div className={styles.synced}>
                    <ShieldCheck size={12} className={styles.secureIcon} />
                    <span>ENCRYPTED_SESSION</span>
                  </div>
                )}
              </div>
              <div className={`${styles.alertIndicator} ${isCritical ? styles.active : ''}`}>
                <AlertCircle size={14} />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER TÁCTICO */}
        <section className={styles.hudBottom}>
          <div className={styles.hudBottomLeft}>
            <DataTraffic isCritical={isCritical} />
          </div>

          <div className={styles.hudBottomRight}>
            <div className={styles.metadataCluster}>
              <div className={styles.metaEntry}>
                <span className={styles.metaLabel}>MEM_USE</span>
                <span className={styles.metaValue}>
                  {kernelMetrics?.memory?.used ?? '0.0'}GB
                </span>
              </div>
              <div className={styles.metaEntry}>
                <span className={styles.metaLabel}>SYSTEM_INTEGRITY</span>
                <span className={`${styles.metaValue} ${isCritical ? styles.dangerText : styles.safeText}`}>
                  {isCritical ? 'BREACH_DETECTED' : 'SECURE'}
                </span>
              </div>
            </div>
            
            <div className={styles.activeViewDisplay}>
              <div className={styles.viewIdentity}>
                <span className={styles.subLabel}>INTERFACE_MODULE</span>
                <span className={styles.mainLabel}>{activeView.replace('_', ' ')}</span>
              </div>
              <div className={styles.moduleIcon}>
                <TerminalIcon size={18} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ELEMENTOS DECORATIVOS DE CHASIS */}
      <div className={styles.cornerFrame} />
    </div>
  );
};

const PanelHeader = ({ title, icon, view }) => (
  <header className={styles.panelHeader}>
    <div className={styles.headerTitle}>
      {icon}
      <span>{title} <span className={styles.sep}>//</span> {view}</span>
    </div>
    <div className={styles.headerControls}>
      <span className={styles.clock}>{new Date().toLocaleTimeString('en-GB')}</span>
      <Maximize2 size={12} className={styles.headerBtn} />
    </div>
  </header>
);