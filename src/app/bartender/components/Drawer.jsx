'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Zap, ShieldCheck, Activity, ChevronLeft, Terminal } from 'lucide-react';
import styles from '../styles/drawer.module.css';

import { ScannerHeader } from './Draw-Comple/ScannerHeader';
import { SignalGraph } from './Draw-Comple/SignalGraph';
import { AtomicStructure } from './Draw-Comple/AtomicStructure';

const panelVariants = {
  hidden: { x: '100%', opacity: 0.5, filter: 'brightness(2) blur(10px)' },
  visible: { 
    x: 0, 
    opacity: 1,
    filter: 'brightness(1) blur(0px)',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    x: '100%', 
    opacity: 0,
    transition: { duration: 0.4, ease: "circIn" }
  }
};

export const Drawer = ({ item, isOpen, onClose }) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Calculamos el ancho de la scrollbar para evitar saltos de layout
      const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
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

  if (!item) return null;

  // Lógica de criticidad
  const isCritical = item.metadata?.stability === 'CRITICAL' || item.qty < 15;
  
  // Clase dinámica según el universo (metro, soma, ac)
  const universeClass = styles[item.universe] || '';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.drawerOverlay} onClick={onClose}>
          
          <motion.div 
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            /* Aplicamos data-universe para el CSS dinámico */
            data-universe={item.universe}
            className={`${styles.drawerContent} ${universeClass} ${isCritical ? styles.criticalOverlay : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* BOTÓN DE CIERRE TIPO TIRADOR INDUSTRIAL */}
            <button className={styles.ejectHandle} onClick={onClose} title="TERMINATE_SESSION">
              <div className={styles.handleTrack}>
                <ChevronLeft size={16} className={styles.handleArrow} />
                <span className={styles.handleText}>EJECT_PANEL</span>
                <div className={styles.handleLed} />
              </div>
            </button>

            {/* CAPA DE RUIDO VISUAL */}
            <div className={styles.grainOverlay} />

            <div className={styles.technicalBody}>
              {/* 1. Header con Metadata */}
              <ScannerHeader 
                name={item.name} 
                id={item.id} 
                metadata={item.metadata} 
              />

              {/* 2. Métricas de Stock Primarias */}
              <div className="flex gap-4 mt-2">
                <div className={`${styles.dataField} flex-1`}>
                  <div className={styles.fieldDecoration} />
                  <span className={styles.label}>Inventory_Volume</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`${styles.value} ${isCritical ? styles.textCritical : ''}`}>
                      {item.qty}
                    </span>
                    <span className={styles.unit}>%_STOCK</span>
                  </div>
                </div>
                
                <div className={`${styles.dataField} flex-1`}>
                  <div className={styles.fieldDecoration} />
                  <span className={styles.label}>Registry_UID</span>
                  <span className={styles.value}>{item.code}</span>
                </div>
              </div>

              {/* 3. NARRATIVE LOG: Receta y Componentes Reales */}
              <div className={styles.logContainer}>
                <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-1">
                  <Terminal size={12} className={styles.textAmber} />
                  <span className={styles.label} style={{marginBottom: 0}}>Composition_Log</span>
                </div>
                <p className="text-[11px] leading-relaxed font-mono opacity-80 italic">
                  {`> ${item.flavorText}`}
                </p>
              </div>

              {/* 4. Estructura Atómica Adaptativa */}
              <AtomicStructure 
                category={item.category} 
                specs={item.atomicSpecs} 
                universe={item.universe}
              />

              {/* 5. Gráfico de Señal Dinámico */}
              <div className="mt-2">
                <SignalGraph 
                  label="Molecular_Stability_Wave" 
                  percentage={item.qty} 
                  variant={isCritical ? 'danger' : 'normal'} 
                />
              </div>

              {/* 6. Telemetría de Sistema */}
              <div className={styles.telemetrySection}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 text-stone-500">
                    <Activity size={12} className="animate-pulse" />
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase">Telemetry_Stream</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-900/40">
                    <History size={10} />
                    <span className="text-[8px] font-mono">REv_2.026</span>
                  </div>
                </div>
                
                <div className={`${styles.logContainer} !bg-black/40`}>
                  <p>{`> [SYSTEM] ORIGIN: ${item.metadata?.sector || 'UNKNOWN'}`}</p>
                  <p>{`> [DATA] RAD_LEVEL: ${item.metadata?.radiation}`}</p>
                  <p className={isCritical ? "text-red-500/40" : "text-amber-500/20"}>
                    {`> [STATUS] STABILITY_${item.metadata?.stability}`}
                  </p>
                </div>
              </div>

              {/* 7. Protocolo de Seguridad (Sticky Bottom) */}
              <div className={`${styles.securityProtocol} ${isCritical ? styles.protocolAlert : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck size={18} />
                  <span className="font-black text-[10px] tracking-tighter uppercase">
                    Protocol_D6 // {isCritical ? 'LEVEL_RED_LOCKDOWN' : 'LEVEL_CLEARANCE_OK'}
                  </span>
                </div>
                <p className="text-[10px] opacity-60 leading-relaxed font-mono">
                  {isCritical 
                    ? "CRITICAL: Biohazard detected. Atomic bonds degrading. Automated containment system active."
                    : "STABLE: Registry verified. standard molecular batch ready for dispensing."}
                </p>
              </div>
            </div>

            {/* 8. Footer de Acciones */}
            <div className={styles.actionFooter}>
              <button 
                className={`${styles.mainActionButton} ${isCritical ? styles.btnCritical : styles.btnAmber}`}
              >
                <Zap size={20} fill="currentColor" />
                {isCritical ? 'BYPASS_SAFETY_LOCK' : 'DISPENSE_BATCH'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};