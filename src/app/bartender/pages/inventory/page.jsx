'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Cpu as CpuIcon, Thermometer, Radio, X, 
  ShieldAlert, Lock, Zap, Database
} from 'lucide-react';

import styles from '../../styles/inventory-styles/bunker.module.css';

// Componentes modularizados
import { BriefcaseModal } from './components/BriefcaseModal';
import { TerminalPuzzle } from './components/TerminalPuzzle';
import { SearchBar } from './components/SearchBar';
import { FileGrid } from './components/FileGrid';

// Datos e iconos
import { METRO_FOLDERS, METRO_DRINKS, D6_SYSTEM_CONFIG } from './data/dataMetro';

// Opciones para evitar hidratación
const isBrowser = typeof window !== 'undefined';

export default function InventoryPage() {
  // --- ESTADOS DE INTERFAZ ---
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // --- TELEMETRÍA (solo cliente) ---
  const [systemLog, setSystemLog] = useState(() => 
    isBrowser ? ['>> INIT_AMBER_PROTOCOL_V10.0...'] : []
  );
  const [cpuLoad, setCpuLoad] = useState(() => isBrowser ? 12 : 0);
  const [temp, setTemp] = useState(() => isBrowser ? 38.5 : 0);
  const [mounted, setMounted] = useState(false);
  const mainScrollRef = useRef(null);

  // Asegurar montaje en cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  const addLogEntry = useCallback((entry) => {
    if (!mounted) return;
    const timestamp = new Date().toLocaleTimeString('en-GB', { 
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
    setSystemLog(prev => [`[${timestamp}] ${entry}`, ...prev].slice(0, 30));
  }, [mounted]);

  // --- DETECCIÓN DE BREAKPOINTS ---
  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  // --- SIMULACIÓN DE HARDWARE DINÁMICO (solo cliente) ---
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCpuLoad(prev => Math.floor(Math.random() * (prev > 60 ? 30 : 50)) + 10);
      setTemp(prev => prev + (Math.random() > 0.5 ? 0.02 : -0.02));
      
      if (Math.random() > 0.97) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
        addLogEntry("WARNING: VOLTAGE_INSTABILITY_IN_SECTOR_D6");
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [addLogEntry, mounted]);

  // --- SECUENCIA DE ARRANQUE D6 ---
  useEffect(() => {
    if (!mounted) return;
    const steps = [
      "LOADING_HARDWARE_DRIVERS...",
      "AUTHENTICATING_USER: ARTYOM...",
      "MOUNTING_ENCRYPTED_VOLUMES...",
      "CORE_SYSTEM_READY_V10.0"
    ];
    steps.forEach((step, i) => setTimeout(() => addLogEntry(step), 600 * i));
    const timer = setTimeout(() => setBootSequence(false), 2800);
    return () => clearTimeout(timer);
  }, [addLogEntry, mounted]);

  // --- MOTOR DE FILTRADO (sin aleatoriedad) ---
  const filteredFolders = useMemo(() => {
    const term = searchTerm.toUpperCase().trim();
    return METRO_FOLDERS.map(folder => ({
      ...folder,
      // Metadatos deterministas basados en id (evita aleatoriedad en servidor)
      integrity: 90 + (folder.id.charCodeAt(0) % 10),
      sector: D6_SYSTEM_CONFIG.radiation_level > 0.4 ? "HOT_ZONE" : "D6_ARCHIVE"
    })).filter(f => {
      const matchesSearch = !term || 
        f.title.toUpperCase().includes(term) || 
        f.id.toUpperCase().includes(term) ||
        (f.ingredients && f.ingredients.some(i => i.toUpperCase().includes(term)));
      
      const matchesCategory = activeCategory === 'ALL' || f.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  // --- HANDLER PARA RESETEAR BÚSQUEDA ---
  const handleResetSearch = useCallback(() => {
    setSearchTerm('');
    setActiveCategory('ALL');
  }, []);

  // --- HANDLER PARA SELECCIONAR FOLDER ---
  const handleSelectFolder = useCallback((folder) => {
    setSelectedFolder(folder);
    addLogEntry(`ACCESSING_FILE: ${folder.title}`);
  }, [addLogEntry]);

  // --- HANDLER PARA DESBLOQUEO ---
  const handleUnlock = useCallback((val) => {
    setIsUnlocked(val);
    addLogEntry(val ? "CRITICAL: SECURITY_BYPASS_DETECTED" : "SIGNAL_RESTORED");
    if (isMobile && val) setTimeout(() => setSidebarOpen(false), 800);
  }, [addLogEntry, isMobile]);

  // Renderizado condicional para evitar hidratación
  if (!mounted) {
    return null; // O un esqueleto simple
  }

  if (bootSequence) {
    return (
      <div className={styles.bootingScreen}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.bootTerminal}
        >
          <div className={styles.bootBrand}>D6_SYSTEM_LOADER_v10.0</div>
          <div className={styles.bootProgressContainer}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className={styles.bootProgressBar} 
            />
          </div>
          <div className={styles.bootLogs}>
            <AnimatePresence>
              {systemLog.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={styles.bootLogLine}
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`
      ${styles.terminalContainer} 
      ${glitchActive ? styles.terminalGlitch : ''}
      ${isUnlocked ? styles.systemBypassed : ''}
    `}>
      
      {/* CAPAS DE AMBIENTE CRT */}
      <div className={styles.hardwareOverlays}>
        <div className={styles.amberScanline} />
        <div className={styles.crtStatic} />
        <div className={styles.vignette} />
      </div>

      {/* HEADER TÁCTICO */}
      <header className={styles.hudHeader}>
        <div className={styles.headerMainRow}>
          <div className={styles.headerLeft}>
            <div className={styles.brandingGroup}>
              <div className={styles.d6LogoAmber}>D6</div>
              {!isMobile && (
                <div className={styles.sysMeta}>
                  <span className={styles.sysId}>NODE_{D6_SYSTEM_CONFIG.terminal_id}</span>
                  <span className={styles.opStatus}>USER: {D6_SYSTEM_CONFIG.operator}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.headerCenter}>
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              isUnlocked={isUnlocked}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              isMobile={isMobile} 
            />
          </div>

          <div className={styles.headerRight}>
            <div className={styles.telemetryGroup}>
              <div className={styles.telItem}>
                <CpuIcon size={14} /> 
                <span className={cpuLoad > 40 ? styles.textHazard : ''}>{cpuLoad}%</span>
              </div>
              <div className={styles.telItem}>
                <Thermometer size={14} /> 
                <span>{temp.toFixed(1)}°C</span>
              </div>
              <div className={styles.telItem}>
                <Radio size={14} className={styles.radioPulse} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.workspaceWrapper}>
        {/* SIDEBAR PERSISTENTE (puzzle + logs) */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarModule}>
              <div className={styles.modHeader}>
                {isUnlocked ? <Zap size={14} /> : <Lock size={14} />}
                <span>{isUnlocked ? 'ENCRYPTION_BYPASSED' : 'SECURITY_OVERRIDE'}</span>
              </div>
              <div className={styles.modBody}>
                <TerminalPuzzle 
                  isUnlocked={isUnlocked} 
                  onUnlock={handleUnlock} 
                />
              </div>
            </div>

            <div className={`${styles.sidebarModule} ${styles.kernelModule}`}>
              <div className={styles.modHeader}>
                <Activity size={14} /> <span>KERNEL_D6_LOGS</span>
              </div>
              <div className={styles.kernelLog}>
                {systemLog.map((log, i) => (
                  <div key={i} className={styles.logLine}>
                    <span className={styles.logTimestamp}>[{i}]</span> {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* EXPLORADOR DE ARCHIVOS */}
        <main ref={mainScrollRef} className={styles.fileExplorer}>
          <FileGrid 
            items={filteredFolders} 
            isUnlocked={isUnlocked} 
            onSelectItem={handleSelectFolder}
            onResetSearch={handleResetSearch} // Pasamos el reset para vista vacía
          />
        </main>
      </div>

      {/* FLOATING ACTION BUTTON (MÓVIL) */}
      <AnimatePresence>
        {isMobile && (
          <motion.button
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            className={`${styles.floatingSecurityBtn} ${sidebarOpen ? styles.fabActive : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Cerrar panel" : "Abrir panel de seguridad"}
          >
            {sidebarOpen ? <X size={24} /> : (
              <div className={styles.fabIcon}>
                <ShieldAlert className={!isUnlocked ? styles.pulseIcon : ''} />
                {!isUnlocked && <span className={styles.fabNotify}>!</span>}
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* BARRA DE ESTADO INFERIOR */}
      <footer className={styles.systemFooter}>
        <div className={styles.statusBox}>
          <div className={`${styles.statusIndicator} ${isUnlocked ? styles.statusUnlocked : ''}`} />
          <span className={isUnlocked ? styles.glowGreen : ''}>
            OS_STATUS: {isUnlocked ? 'SYSTEM_OVERRIDE' : 'ENCRYPTED_MODE'}
          </span>
        </div>
        
        {!isMobile && (
          <div className={styles.footerCenterInfo}>
            <span className={styles.radBadge}>RAD_LEVEL: {D6_SYSTEM_CONFIG.radiation_level}</span>
            <div className={styles.separator} />
            <span className={styles.locBadge}>SECTOR: G_STATION</span>
          </div>
        )}

        <div className={styles.footerTime}>
          <Database size={12} />
          <span>{new Date().toLocaleDateString('ru-RU')}</span>
        </div>
      </footer>

      {/* MODAL DEL BRIEFCASE */}
      <AnimatePresence>
        {selectedFolder && (
          <BriefcaseModal 
            folder={selectedFolder} 
            isUnlocked={isUnlocked} 
            drinks={METRO_DRINKS[selectedFolder.contentKey] || []}
            onClose={() => setSelectedFolder(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}