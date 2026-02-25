'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Cpu as CpuIcon, Scan, Database, 
  Thermometer, X, Radio, ShieldAlert, Lock, Zap, 
  Terminal as TerminalIcon, AlertTriangle
} from 'lucide-react';

// Estilos
import styles from '../../styles/inventory-styles/bunker.module.css';

// Datos
import { METRO_FOLDERS, METRO_DRINKS, D6_SYSTEM_CONFIG } from './data/dataMetro';

// Importaciones Dinámicas para evitar errores de SSR (Prerendering)
const TerminalPuzzle = dynamic(
  () => import('./components/TerminalPuzzle').then(mod => mod.TerminalPuzzle),
  { ssr: false, loading: () => <div className={styles.loadingPlaceholder}>INITIALIZING_NEURAL_LINK...</div> }
);

const FileGrid = dynamic(
  () => import('./components/FileGrid').then(mod => mod.FileGrid),
  { ssr: false }
);

const BriefcaseModal = dynamic(
  () => import('./components/BriefcaseModal').then(mod => mod.BriefcaseModal),
  { ssr: false }
);

const SearchBar = dynamic(
  () => import('./components/SearchBar').then(mod => mod.SearchBar),
  { ssr: false }
);

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
  
  // --- TELEMETRÍA ---
  const [systemLog, setSystemLog] = useState(['>> OS_METRO_LINK_STABLE_V10.0...']);
  const [cpuLoad, setCpuLoad] = useState(12);
  const [temp, setTemp] = useState(38.5);
  const [radLevel, setRadLevel] = useState(parseFloat(D6_SYSTEM_CONFIG.radiation_level));
  const mainScrollRef = useRef(null);

  const addLogEntry = useCallback((entry) => {
    const timestamp = new Date().toLocaleTimeString('ru-RU', { 
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
    setSystemLog(prev => [`[${timestamp}] ${entry}`, ...prev].slice(0, 40));
  }, []);

  // --- DETECCIÓN DE ENTORNO ---
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- SIMULACIÓN DE HARDWARE (REALISMO D6) ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuación de carga
      setCpuLoad(prev => {
        const target = isUnlocked ? 65 : 15;
        const jitter = Math.floor(Math.random() * 20) - 10;
        return Math.max(5, Math.min(99, target + jitter));
      });

      // Temperatura relacionada con carga
      setTemp(prev => prev + (cpuLoad > 50 ? 0.05 : -0.03));

      // Fluctuación de Radiación (Peligro ambiental)
      setRadLevel(prev => {
        const change = (Math.random() - 0.5) * 0.01;
        return parseFloat((prev + change).toFixed(2));
      });
      
      // Glitch visual aleatorio
      if (Math.random() > 0.98) {
        setGlitchActive(true);
        addLogEntry("ERR: IONIZING_RADIATION_INTERFERENCE");
        setTimeout(() => setGlitchActive(false), 80);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [cpuLoad, isUnlocked, addLogEntry]);

  // --- SECUENCIA DE BOOT ---
  useEffect(() => {
    const bootSteps = [
      "LOADER: Bypassing BIOS...",
      "KERNEL: VOS-DARK-33 Attached",
      "AUTH: Artyom confirmed via Biometrics",
      "NET: D6 Internal Mesh connected",
      "SUCCESS: UI_INVENTORY_MOUNTED"
    ];
    bootSteps.forEach((step, i) => setTimeout(() => addLogEntry(step), 500 * i));
    const timer = setTimeout(() => setBootSequence(false), 3000);
    return () => clearTimeout(timer);
  }, [addLogEntry]);

  // --- MOTOR DE FILTRADO ---
  const filteredFolders = useMemo(() => {
    const term = searchTerm.toUpperCase().trim();
    return METRO_FOLDERS.filter(f => {
      const matchesSearch = !term || 
        f.title.toUpperCase().includes(term) || 
        f.id.toUpperCase().includes(term);
      const matchesCategory = activeCategory === 'ALL' || f.category === activeCategory;
      return matchesSearch && matchesCategory;
    }).map(folder => ({
      ...folder,
      integrity: Math.floor(Math.random() * 15) + 85,
      sector: radLevel > 0.55 ? "SECTOR_G_CONTAMINATED" : "ARCHIVE_STORAGE"
    }));
  }, [searchTerm, activeCategory, radLevel]);

  // --- RENDERIZADO DE CARGA ---
  if (bootSequence) {
    return (
      <div className={styles.bootingScreen}>
        <div className={styles.scanlineOverlay} />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.bootTerminal}
        >
          <div className={styles.bootHeader}>
            <div className={styles.bootTitle}>[ D6_BIOS_V.2033 ]</div>
            <div className={styles.bootDate}>{new Date().toISOString()}</div>
          </div>
          <div className={styles.bootProgressWrapper}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: "linear" }}
              className={styles.bootBar} 
            />
          </div>
          <div className={styles.bootLogContainer}>
            {systemLog.map((log, i) => (
              <div key={i} className={styles.bootLogLine}>{log}</div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`
      ${styles.terminalContainer} 
      ${glitchActive ? styles.glitchEffect : ''}
      ${isUnlocked ? styles.overrideActive : ''}
    `}>
      
      {/* CAPAS ATMOSFÉRICAS CRT */}
      <div className={styles.crtLayers}>
        <div className={styles.amberScanlines} />
        <div className={styles.phosphorGlow} />
        <div className={styles.dustOverlay} />
      </div>

      {/* HUD SUPERIOR */}
      <header className={styles.hudHeader}>
        <div className={styles.headerLayout}>
          <div className={styles.hudBranding}>
            <div className={styles.d6Badge}>D6</div>
            {!isMobile && (
              <div className={styles.systemMetadata}>
                <div className={styles.metaRow}>NODE: <span>{D6_SYSTEM_CONFIG.terminal_id}</span></div>
                <div className={styles.metaRow}>USER: <span>{D6_SYSTEM_CONFIG.operator}</span></div>
              </div>
            )}
          </div>

          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            isUnlocked={isUnlocked}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isMobile={isMobile} 
          />

          <div className={styles.hudStats}>
            <div className={styles.statBox}>
              <CpuIcon size={14} className={cpuLoad > 70 ? styles.critIcon : ''} />
              <span className={cpuLoad > 70 ? styles.critText : ''}>{cpuLoad}%</span>
            </div>
            <div className={styles.statBox}>
              <Thermometer size={14} />
              <span>{temp.toFixed(1)}°C</span>
            </div>
            <div className={styles.statBox}>
              <Radio size={14} className={styles.radioActive} />
            </div>
          </div>
        </div>
      </header>

      {/* ÁREA DE TRABAJO PRINCIPAL */}
      <div className={styles.workspace}>
        <AnimatePresence>
          {(sidebarOpen || !isMobile) && (
            <motion.aside 
              initial={isMobile ? { x: -300 } : false}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={styles.sidebar}
            >
              <div className={styles.sidebarSection}>
                <div className={styles.sectionHeader}>
                  {isUnlocked ? <Zap size={14} /> : <Lock size={14} />}
                  <span>SEC_OVERRIDE</span>
                </div>
                <div className={styles.sectionContent}>
                  <TerminalPuzzle 
                    isUnlocked={isUnlocked} 
                    onUnlock={(val) => {
                      setIsUnlocked(val);
                      addLogEntry(val ? "CRITICAL: SYSTEM_BYPASS_ENABLED" : "SEC: ENCRYPTION_RESTORED");
                    }} 
                  />
                </div>
              </div>

              <div className={`${styles.sidebarSection} ${styles.logSection}`}>
                <div className={styles.sectionHeader}>
                  <Activity size={14} /> <span>KERNEL_STREAM</span>
                </div>
                <div className={styles.logStream}>
                  {systemLog.map((log, i) => (
                    <div key={i} className={styles.logEntry}>
                      <span className={styles.logIndex}>{systemLog.length - i}</span>
                      <p>{log}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className={styles.mainExplorer} ref={mainScrollRef}>
          <FileGrid 
            items={filteredFolders} 
            isUnlocked={isUnlocked} 
            onSelectItem={(folder) => {
              setSelectedFolder(folder);
              addLogEntry(`I/O: OPEN_FILE_${folder.id}`);
            }} 
          />
        </main>
      </div>

      {/* BOTÓN MÓVIL DE SEGURIDAD */}
      {isMobile && (
        <button 
          className={`${styles.mobileFab} ${sidebarOpen ? styles.fabClose : ''}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <ShieldAlert className={!isUnlocked ? styles.pulse : ''} />}
        </button>
      )}

      {/* FOOTER DE ESTADO */}
      <footer className={styles.hudFooter}>
        <div className={styles.footerStatus}>
          <div className={`${styles.led} ${isUnlocked ? styles.ledUnlocked : ''}`} />
          <span>SYS_MODE: {isUnlocked ? 'BYPASS_AUTHORIZED' : 'ENCRYPTED_ARCHIVE'}</span>
        </div>
        
        {!isMobile && (
          <div className={styles.footerEnv}>
            <div className={`${styles.radMeter} ${radLevel > 0.5 ? styles.radHigh : ''}`}>
              <AlertTriangle size={12} />
              RAD: {radLevel} Sv/h
            </div>
            <div className={styles.divider} />
            <div className={styles.locBadge}>D6_SECTOR_G</div>
          </div>
        )}

        <div className={styles.footerClock}>
          <Database size={12} />
          <span>{new Date().toLocaleDateString('ru-RU')}</span>
        </div>
      </footer>

      {/* MODAL DE CONTENIDO */}
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