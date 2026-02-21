"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NetworkCanvas } from '../systems/NetworkCanvas';
import { NodeSearch } from '../systems/NodeSearch';
import { DataTraffic } from '../systems/DataTraffic';
import { SecurityLogs } from '../systems/SecurityLogs'; 
import { NetworkOverview } from '../systems/NetworkOverview'; // <--- Nueva Importación
import { useAnalysis } from '../context/AnalysisContext';
import styles from '@/app/analyst/styles/MainSystem.module.css';

export const MainSystem = ({ children }) => {
  const { activeView } = useAnalysis();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setIsSyncing(true);
    const timer = setTimeout(() => setIsSyncing(false), 1200);
    return () => clearTimeout(timer);
  }, [activeView]);

  return (
    <div className={styles.mainContainer}>
      
      {/* CAPA 0: ATMÓSFERA PROFUNDA */}
      <div className={styles.atmosphere}>
        <div className={styles.radarSweep} />
        <div className={styles.coordinateGrid} />
        <div className={styles.vignette} />
      </div>
      
      {/* CAPA 1: SISTEMAS DE VISUALIZACIÓN */}
      <main className={styles.viewport}>
        <AnimatePresence mode="wait">
          
          {activeView === 'Network_Map' && (
            <motion.div 
              key="network"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <NetworkCanvas />
            </motion.div>
          )}

          {activeView === 'Security_Logs' && (
            <motion.div 
              key="logs"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className={styles.logOverlay}
            >
              <div className={styles.contentWrapper}>
                <SecurityLogs />
              </div>
            </motion.div>
          )}

          {/* VISTA DASHBOARD (CHILDREN) */}
          {activeView !== 'Network_Map' && activeView !== 'Security_Logs' && (
            <motion.div 
              key="fallback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.dashboardView}
            >
              <div className={styles.glassPanel}>
                <div className={styles.panelHeader}>
                   <div className={styles.bracketLabel}>
                     <span className={styles.pulseDot} />
                     DATA_STREAM_OUTPUT
                   </div>
                   <span className={styles.hexCode}>ID_0x{activeView.length}F</span>
                </div>
                
                <div className={styles.innerContent}>
                   {children || (
                     <div className={styles.standby}>
                        <div className={styles.geometry}>⌬</div>
                        <p>STANDBY_MODE_ACTIVE</p>
                     </div>
                   )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* CAPA UI: HUD DE CONTROL Y MINI-MAPA */}
      <div className={styles.hudLayer}>
        {/* Superior: Búsqueda y Mini-Mapa */}
        <div className="flex justify-between items-start pointer-events-none">
          <div className="pointer-events-auto">
            <NodeSearch />
          </div>

          {/* Renderizado condicional del mini-mapa solo en el Mapa de Red */}
          <AnimatePresence>
            {activeView === 'Network_Map' && (
              <div className="pointer-events-auto">
                <NetworkOverview />
              </div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {isSyncing && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className={styles.syncIndicator}
              >
                <div className={styles.loadingBar} />
                <span className="text-purple-400">NEURAL_LINK_SYNCING</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Inferior: Tráfico y Estado */}
        <div className="flex justify-between items-end">
          <DataTraffic />
          
          <motion.div layout className={styles.terminalStatus}>
            <div className={styles.statusInfo}>
                <span className={styles.statusLabel}>TERMINAL_ACTIVE</span>
                <span className={styles.activeViewName}>{activeView.replace('_', ' ')}</span>
            </div>
            <div className={styles.verticalDivider} />
            <div className={styles.connectionBadge}>
                <span className="text-sky-500">CONNECTED</span>
                <span className="opacity-40">STABLE_LINK</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CAPA 60: MARCO DE SEGURIDAD */}
      <div className={styles.frameDecoration} />
    </div>
  );
};