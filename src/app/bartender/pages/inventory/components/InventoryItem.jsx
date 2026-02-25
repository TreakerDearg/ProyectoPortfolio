'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Lock, ShieldAlert, Fingerprint, ChevronRight, 
  Eye, RefreshCcw, ShieldCheck, HardDrive, Download, 
  Trash2, Clock, Wifi, Cpu, Flame, MapPin, Layers, FileText,
  AlertTriangle, Radiation, Biohazard, Skull
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../../styles/inventory-styles/inventory-item.module.css';

const ScrambledText = ({ text, active }) => {
  const [display, setDisplay] = useState(text);
  const chars = "!@#$%&*<>?:{}/[]0123456789";

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    const interval = setInterval(() => {
      const scrambled = text.split('').map(char => 
        (char === '_' || Math.random() > 0.85) ? char : chars[Math.floor(Math.random() * chars.length)]
      ).join('');
      setDisplay(scrambled);
    }, 120);
    return () => clearInterval(interval);
  }, [active, text]);

  return <>{display}</>;
};

export const InventoryItem = ({ folderData, isGlobalUnlocked, onOpen }) => {
  const { 
    id, title, type, category, stickyNote, 
    securityLevel, lastModified, fileSize, isLocked: initialLocked, integrity, sector 
  } = folderData;

  const [internalLocked, setInternalLocked] = useState(initialLocked);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isGlobalUnlocked) setInternalLocked(false);
  }, [isGlobalUnlocked]);

  // --- LÓGICA DE COLOR POR CATEGORÍA ---
  const categoryTheme = useMemo(() => {
    const themes = {
      LOGISTICS: { color: '#ffb300', icon: <Layers size={14}/>, label: 'SUPPLY_DIV' },
      COMMERCE: { color: '#4da6ff', icon: <HardDrive size={14}/>, label: 'HANZA_NET' },
      INTEL: { color: '#a066ff', icon: <Wifi size={14}/>, label: 'ORDER_INTEL' },
      BIOMEDICAL: { color: '#00ff66', icon: <Biohazard size={14}/>, label: 'MED_DEPT' },
      ENGINEERING: { color: '#ff6600', icon: <Cpu size={14}/>, label: 'TECH_CORP' },
      MILITARY: { color: '#ff3c00', icon: <Radiation size={14}/>, label: 'SPARTA_CMD' }
    };
    return themes[category] || themes.LOGISTICS;
  }, [category]);

  // --- RASGOS DE DESGASTE (Basados en el ID del archivo) ---
  const traits = useMemo(() => {
    const s = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      rotation: (s % 6) - 3,
      stainType: (s % 4), // 0: limpia, 1: café, 2: grasa, 3: humedad
      isCharred: s % 7 === 0, // Algunas carpetas están quemadas
      isOld: s % 3 === 0, // Papel amarillento
      paperOffset: (s % 5),
      noteAngle: (s % 20) - 10,
    };
  }, [id]);

  const handleUnlock = useCallback(() => {
    if (isDecrypting || !internalLocked || !passcode) return;
    setIsDecrypting(true);
    setError(false);
    let cur = 0;
    const interval = setInterval(() => {
      cur += Math.random() * 25;
      if (cur >= 100) {
        clearInterval(interval);
        const MASTER_KEY = "D6_RECIPES";
        if (passcode.trim().toUpperCase() === MASTER_KEY || passcode === "D6") {
          setInternalLocked(false);
        } else {
          setError(true);
          setTimeout(() => setError(false), 2000);
        }
        setIsDecrypting(false);
        setProgress(0);
      } else { setProgress(cur); }
    }, 120);
  }, [passcode, isDecrypting, internalLocked]);

  return (
    <motion.div 
      layout
      className={`${styles.itemWrapper} ${traits.isOld ? styles.vintage : ''}`}
      style={{ 
        '--theme-color': categoryTheme.color,
        '--f-rot': `${traits.rotation}deg`
      }}
    >
      {/* 1. MANCHAS Y QUEMADURAS PROCEDURALES */}
      <div className={styles.damageOverlay}>
        {traits.stainType === 1 && <div className={styles.coffeeStain} />}
        {traits.stainType === 2 && <div className={styles.greaseStain} />}
        {traits.isCharred && <div className={styles.burnEdge} />}
      </div>

      {/* 2. EL DOSSIER (ESTRUCTURA FÍSICA) */}
      <div className={styles.dossierContainer}>
        
        {/* Pestaña superior con ID */}
        <div className={styles.folderTab}>
          <div className={styles.tabInfo}>
            <span className={styles.tabId}>#{id}</span>
            <span className={styles.tabLabel}>{categoryTheme.label}</span>
          </div>
          <div className={styles.tabShadow} />
        </div>

        {/* Papeles internos asomando */}
        <div className={styles.internalPapers}>
          <div className={styles.paperSheet} style={{ transform: `rotate(${traits.paperOffset}deg)` }} />
          <div className={styles.paperSheet} style={{ transform: `rotate(-${traits.paperOffset/2}deg)` }} />
        </div>

        {/* Cuerpo principal de la carpeta */}
        <div className={styles.folderBody}>
          
          {/* Marcador de Seguridad Lateral */}
          <div className={styles.securityStripe} />

          <div className={styles.mainContent}>
            
            {/* Encabezado del documento */}
            <div className={styles.docHeader}>
              <div className={styles.origin}>
                <MapPin size={10} />
                <span>{sector || 'STATION_D6'}</span>
              </div>
              <div className={`${styles.clearanceBadge} ${internalLocked ? styles.urgent : styles.cleared}`}>
                {internalLocked ? <Skull size={12} /> : <ShieldCheck size={12} />}
                <span>{securityLevel}</span>
              </div>
            </div>

            {/* Pantalla de datos / Monitor de Hardware */}
            <div className={styles.dataScreen}>
              <div className={styles.crtEffect} />
              <div className={styles.screenGrid} />
              
              <AnimatePresence mode="wait">
                {isDecrypting ? (
                  <motion.div key="dec" className={styles.screenCenter}>
                    <RefreshCcw className={styles.spin} size={24} />
                    <span className={styles.scanningText}>DECRYPTING_{Math.round(progress)}%</span>
                  </motion.div>
                ) : internalLocked ? (
                  <motion.div key="lock" className={styles.screenCenter}>
                    <Lock size={32} className={styles.lockIcon} />
                    <div className={styles.noise} />
                  </motion.div>
                ) : (
                  <motion.div key="open" className={styles.screenCenter}>
                    <Fingerprint size={40} className={styles.biometricIcon} />
                    <div className={styles.pulseGlow} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Información del Nodo */}
            <div className={styles.fileInfo}>
              <h3 className={styles.fileTitle}>
                <ScrambledText text={title} active={internalLocked} />
              </h3>
              <div className={styles.typeTag}>
                {categoryTheme.icon}
                <span>FILE_TYPE: {type}</span>
              </div>
            </div>

            {/* Consola de Entrada o Metadatos */}
            <div className={styles.bottomSection}>
              {internalLocked ? (
                <div className={`${styles.terminalInput} ${error ? styles.denied : ''}`}>
                  <span className={styles.prompt}>&gt;</span>
                  <input 
                    type="text" 
                    placeholder="ENTER_MASTER_KEY"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                  />
                  <button onClick={handleUnlock} className={styles.submitBtn}>
                    <ChevronRight size={18} />
                  </button>
                </div>
              ) : (
                <div className={styles.metadataGrid}>
                  <div className={styles.metaEntry}>
                    <Clock size={10} /> <span>{lastModified}</span>
                  </div>
                  <div className={styles.metaEntry}>
                    <HardDrive size={10} /> <span>{fileSize}</span>
                  </div>
                  <div className={styles.metaEntry}>
                    <AlertTriangle size={10} /> <span>INTEGRITY_{integrity}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botones de acción (Solo si está desbloqueado) */}
          {!internalLocked && (
            <div className={styles.folderActions}>
              <button onClick={() => onOpen(folderData)} className={styles.actionIcon}>
                <Eye size={18} />
              </button>
              <button className={styles.actionIcon}>
                <Download size={18} />
              </button>
              <button className={`${styles.actionIcon} ${styles.del}`}>
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. STICKY NOTE (POST-IT) - Se adapta al tema */}
      <AnimatePresence>
        {stickyNote && (
          <motion.div 
            initial={{ scale: 0, x: 20, rotate: 45 }}
            animate={{ scale: 1, x: 0, rotate: traits.noteAngle }}
            className={styles.postIt}
          >
            <div className={styles.tape} />
            <pre className={styles.postItContent}>{stickyNote}</pre>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sello "CONFIRMADO" cuando se abre */}
      <AnimatePresence>
        {!internalLocked && (
          <motion.div 
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            className={styles.officialStamp}
          >
            D6_CERTIFIED
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};