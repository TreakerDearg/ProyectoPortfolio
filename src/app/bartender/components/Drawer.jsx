'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Zap, ShieldCheck, Activity, ChevronLeft, Terminal } from 'lucide-react';
import styles from '../styles/drawer.module.css';

// Componentes internos
import { ScannerHeader } from './Draw-Comple/ScannerHeader';
import { SignalGraph } from './Draw-Comple/SignalGraph';
import { AtomicStructure } from './Draw-Comple/AtomicStructure';

const panelVariants = {
  hidden: { x: '100%', opacity: 0.8 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 120,
      when: "beforeChildren",
      staggerChildren: 0.08
    }
  },
  exit: { 
    x: '100%', 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

export const Drawer = ({ item, isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  // Evitar errores de SSR (Server Side Rendering)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Gestión de bloqueo de scroll y ancho de barra
  useEffect(() => {
    if (isOpen) {
      const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  if (!mounted || !item) return null;

  const isCritical = item.metadata?.stability === 'CRITICAL' || item.qty < 15;

  const drawerJSX = (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.drawerOverlay} onClick={onClose}>
          
          <motion.div 
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-universe={item.universe}
            className={`${styles.drawerContent} ${isCritical ? styles.criticalOverlay : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. BOTÓN DE CIERRE (TIRADOR MECÁNICO) */}
            <button className={styles.ejectHandle} onClick={onClose}>
              <div className={styles.handleTrack}>
                <ChevronLeft size={16} />
                <span className={styles.handleText}>EJECT_PANEL</span>
                <div className={styles.handleLed} />
              </div>
            </button>

            {/* 2. CAPAS VISUALES: RUIDO Y ESCANEO */}
            <div className={styles.grainOverlay} />

            <div className={styles.technicalBody}>
              {/* SECCIÓN 01: IDENTIFICACIÓN */}
              <ScannerHeader 
                name={item.name} 
                id={item.id} 
                metadata={item.metadata} 
              />

              {/* SECCIÓN 02: MÉTRICAS DE VOLUMEN */}
              <div className="grid grid-cols-2 gap-4">
                <div className={styles.dataField}>
                  <div className={styles.fieldDecoration} />
                  <span className={styles.label}>Inventory_Volume</span>
                  <div className="flex items-baseline">
                    <span className={`${styles.value} ${isCritical ? styles.textCritical : ''}`}>
                      {item.qty}
                    </span>
                    <span className={styles.unit}>%_STOCK</span>
                  </div>
                </div>
                
                <div className={styles.dataField}>
                  <div className={styles.fieldDecoration} />
                  <span className={styles.label}>Registry_UID</span>
                  <span className={styles.value} style={{fontSize: '1.2rem'}}>{item.code}</span>
                </div>
              </div>

              {/* SECCIÓN 03: REGISTRO MOLECULAR */}
              <div className={styles.logContainer}>
                <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-1">
                  <Terminal size={12} className="text-amber-500" />
                  <span className={styles.label} style={{marginBottom: 0}}>Composition_Log</span>
                </div>
                <p className="text-[11px] leading-relaxed font-mono opacity-80 italic">
                  {`> ${item.flavorText}`}
                </p>
              </div>

              {/* SECCIÓN 04: VISUALIZACIÓN ATÓMICA */}
              <AtomicStructure 
                category={item.category} 
                specs={item.atomicSpecs} 
                universe={item.universe}
              />

              {/* SECCIÓN 05: ESTABILIDAD DE SEÑAL */}
              <SignalGraph 
                label="Molecular_Stability_Wave" 
                percentage={item.qty} 
              />

              {/* SECCIÓN 06: TELEMETRÍA SECUNDARIA */}
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Activity size={10} className="animate-pulse" />
                    <span className="text-[8px] font-bold tracking-widest uppercase">Telemetry_Stream</span>
                  </div>
                  <span className="text-[8px] font-mono text-stone-800 italic">REV_2.026.4</span>
                </div>
                
                <div className={`${styles.logContainer} !bg-black/20 !border-none text-stone-500`}>
                  <p className="text-[9px]">{`> [SYSTEM] ORIGIN: ${item.metadata?.sector || 'SEC_UNKNOWN'}`}</p>
                  <p className="text-[9px]">{`> [DATA] RAD_LEVEL: ${item.metadata?.radiation}`}</p>
                </div>
              </div>

              {/* SECCIÓN 07: PROTOCOLO DE SEGURIDAD */}
              <div className={`${styles.securityProtocol} ${isCritical ? styles.protocolAlert : ''} p-4 bg-white/5 border border-white/5 rounded-sm`}>
                <div className="flex items-center gap-3 mb-1">
                  <ShieldCheck size={16} className={isCritical ? 'text-red-500' : 'text-stone-400'} />
                  <span className="font-black text-[9px] tracking-widest uppercase">
                    Protocol_D6 // {isCritical ? 'LOCKDOWN' : 'CLEARANCE_OK'}
                  </span>
                </div>
                <p className="text-[9px] opacity-50 font-mono">
                  {isCritical 
                    ? "CRITICAL: Biohazard detected. Atomic bonds degrading. Automated containment active."
                    : "STABLE: Registry verified. standard molecular batch ready for dispensing."}
                </p>
              </div>
            </div>

            {/* SECCIÓN 08: ACCIÓN PRINCIPAL */}
            <div className={styles.actionFooter}>
              <button className={`${styles.mainActionButton} ${isCritical ? styles.btnCritical : styles.btnAmber}`}>
                <Zap size={18} fill="currentColor" />
                <span>{isCritical ? 'BYPASS_SAFETY_LOCK' : 'DISPENSE_BATCH'}</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Renderizamos el Drawer en el Portal (document.body)
  return createPortal(drawerJSX, document.body);
};