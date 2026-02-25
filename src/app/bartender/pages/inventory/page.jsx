'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Cpu as CpuIcon, Scan, Thermometer, X, 
  Lock, Zap, AlertTriangle, Menu, HardDrive, Wifi 
} from 'lucide-react';

// Estilos
import styles from '../../styles/inventory-styles/bunker.module.css';

// Datos
import { METRO_FOLDERS, METRO_DRINKS, D6_SYSTEM_CONFIG } from './data/dataMetro';

// --- COMPONENTES DINÁMICOS (Protección total contra ReferenceError: Terminal) ---
const TerminalPuzzle = dynamic(() => import('./components/TerminalPuzzle').then(mod => mod.TerminalPuzzle), { 
  ssr: false,
  loading: () => <div className={styles.loadingPlaceholder}>INICIALIZANDO_NODO_D6...</div>
});

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
  // --- ESTADOS DE NÚCLEO ---
  const [mounted, setMounted] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  // --- NAVEGACIÓN ---
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- TELEMETRÍA ---
  const [systemLog, setSystemLog] = useState([]);
  const [metrics, setMetrics] = useState({
    cpu: 12,
    temp: 38.5,
    rad: parseFloat(D6_SYSTEM_CONFIG?.radiation_level || 0.44),
  });

  // --- MANEJO DE LOGS ---
  const addLogEntry = useCallback((entry) => {
    const time = new Date().toLocaleTimeString('ru-RU', { hour12: false });
    setSystemLog(prev => [`[${time}] ${entry}`, ...prev].slice(0, 40));
  }, []);

  // --- EFECTO DE INICIALIZACIÓN ---
  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Simulación de arranque de D6
    const bootSteps = [
      "SYSTEM: VOS-33 Kernel Loaded",
      "AUTH: Biometrics Confirmed (Artyom)",
      "NET: D6 Mesh Connection Established",
      "STORAGE: Archive /mnt/d6_records mounted",
      "READY: Command Line Interface Active"
    ];

    bootSteps.forEach((step, i) => {
      setTimeout(() => addLogEntry(step), 600 * i);
    });

    const bootTimer = setTimeout(() => setBootSequence(false), 3500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(bootTimer);
    };
  }, [addLogEntry]);

  // --- BUCLE DE TELEMETRÍA VIVA ---
  useEffect(() => {
    if (!mounted || bootSequence) return;

    const interval = setInterval(() => {
      setMetrics(prev => {
        const jitterCpu = Math.floor(Math.random() * 10) - 5;
        const newCpu = Math.max(8, Math.min(99, prev.cpu + jitterCpu));
        
        // Probabilidad de Glitch ante CPU alta
        if (newCpu > 90 || Math.random() > 0.98) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 150);
          addLogEntry("WARNING: EMP Interference Detected");
        }

        return {
          cpu: newCpu,
          rad: parseFloat((prev.rad + (Math.random() * 0.01 - 0.005)).toFixed(3)),
          temp: 38 + (newCpu / 15)
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted, bootSequence, addLogEntry]);

  // --- MOTOR DE BÚSQUEDA ---
  const filteredFolders = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return METRO_FOLDERS.filter(folder => {
      const matchesSearch = folder.title.toLowerCase().includes(term) || 
                           folder.id.toLowerCase().includes(term);
      const matchesCat = activeCategory === 'ALL' || folder.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, activeCategory]);

  // Bloqueo de hidratación para Next.js
  if (!mounted) return null;

  // --- PANTALLA DE ARRANQUE (BOOT) ---
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
            <span className={styles.blink}>[ INIT_D6_SEQUENCE ]</span>
            <span>v.2033.4</span>
          </div>
          <div className={styles.bootLogContainer}>
            {systemLog.map((log, i) => (
              <div key={i} className={styles.bootLogLine}>{log}</div>
            ))}
          </div>
          <div className={styles.bootProgressBase}>
            <motion.div 
              className={styles.bootProgressBar}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`
      ${styles.terminalContainer} 
      ${glitchActive ? styles.glitchActive : ''}
      ${isUnlocked ? styles.unlockedMode : ''}
    `}>
      {/* CAPAS DE ATMÓSFERA CRT */}
      <div className={styles.crtEffectLayer}>
        <div className={styles.scanlines} />
        <div className={styles.vignette} />
      </div>

      {/* HEADER: HUD PRINCIPAL */}
      <header className={styles.hudHeader}>
        <div className={styles.hudMain}>
          <div className={styles.brandGroup}>
            <div className={styles.d6Logo}>D6</div>
            <div className={styles.statusInfo}>
              <div className={styles.statusRow}>
                <Wifi size={10} /> <span>NET_LINK: STABLE</span>
              </div>
              <div className={styles.statusRow}>
                <HardDrive size={10} /> <span>VOL: /ARCHIVE</span>
              </div>
            </div>
          </div>

          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isUnlocked={isUnlocked}
            isMobile={isMobile}
          />

          <div className={styles.telemetryGroup}>
            <div className={`${styles.teleBox} ${metrics.cpu > 85 ? styles.warn : ''}`}>
              <CpuIcon size={14} /> <span>{metrics.cpu}%</span>
            </div>
            <div className={styles.teleBox}>
              <Thermometer size={14} /> <span>{metrics.temp.toFixed(1)}°C</span>
            </div>
          </div>
        </div>
      </header>

      {/* ÁREA DE TRABAJO */}
      <div className={styles.workspace}>
        <AnimatePresence mode="wait">
          {(sidebarOpen || !isMobile) && (
            <motion.aside 
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              className={styles.sidebar}
            >
              {/* MÓDULO DE SEGURIDAD */}
              <section className={styles.sidebarSection}>
                <div className={styles.sectionTitle}>
                  {isUnlocked ? <Zap size={14} className={styles.textAmber} /> : <Lock size={14} />}
                  <span>SECURITY_OVERRIDE</span>
                </div>
                <div className={styles.puzzleContainer}>
                  <TerminalPuzzle 
                    isUnlocked={isUnlocked} 
                    onUnlock={(val) => {
                      setIsUnlocked(val);
                      addLogEntry(val ? "CRITICAL: AUTH_BYPASS_ENABLED" : "SEC: ENCRYPTION_RESTORED");
                    }} 
                  />
                </div>
              </section>

              {/* LIVE LOG STREAM */}
              <section className={`${styles.sidebarSection} ${styles.flexFill}`}>
                <div className={styles.sectionTitle}>
                  <Activity size={14} /> <span>KERNEL_STREAM</span>
                </div>
                <div className={styles.logContainer}>
                  {systemLog.map((log, i) => (
                    <div key={i} className={styles.logLine}>
                      <span className={styles.logTime}>{log.substring(0, 10)}</span>
                      <p className={styles.logText}>{log.substring(10)}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* EXPLORADOR DE ARCHIVOS */}
        <main className={styles.mainContent}>
          <div className={styles.explorerHeader}>
            <div className={styles.pathDisplay}>
              <Scan size={14} />
              <span>ROOT://DATA/{activeCategory}</span>
            </div>
            <div className={styles.itemCount}>
              {filteredFolders.length} NODES_FOUND
            </div>
          </div>

          <div className={styles.scrollArea}>
            <FileGrid 
              items={filteredFolders} 
              isUnlocked={isUnlocked} 
              onSelectItem={(folder) => {
                setSelectedFolder(folder);
                addLogEntry(`I/O: ACCESS_SECTOR_${folder.id}`);
              }} 
            />
          </div>
        </main>
      </div>

      {/* FOOTER: ESTADO AMBIENTAL */}
      <footer className={styles.hudFooter}>
        <div className={styles.footerLeft}>
          <div className={`${styles.statusLed} ${isUnlocked ? styles.ledGreen : styles.ledAmber}`} />
          <span>MODE: {isUnlocked ? 'ADMIN_OVERRIDE' : 'READ_ONLY'}</span>
        </div>

        <div className={styles.footerCenter}>
          <div className={`${styles.radSensor} ${metrics.rad > 0.5 ? styles.radCritical : ''}`}>
            <AlertTriangle size={12} />
            <span>RAD: {metrics.rad.toFixed(3)} Sv/h</span>
          </div>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.locationTag}>BUNKER_D6_SEC_G</div>
          <div className={styles.timestamp}>
            {new Date().toLocaleDateString('ru-RU')}
          </div>
        </div>
      </footer>

      {/* MODAL DE EXPEDIENTES */}
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

      {/* BOTÓN TOGGLE PDA (Móvil) */}
      {isMobile && (
        <button 
          className={styles.mobileToggle}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      )}
    </div>
  );
}