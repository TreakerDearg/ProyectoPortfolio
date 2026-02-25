'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Cpu as CpuIcon, Scan, Database, 
  Thermometer, X, Radio, ShieldAlert, Lock, Zap, 
  Terminal as TerminalIcon, AlertTriangle, Menu,
  HardDrive, Wifi, Eye
} from 'lucide-react';

// Estilos (Asegúrate de tener estos archivos o sus equivalentes)
import styles from '../../styles/inventory-styles/bunker.module.css';

// Datos (Verifica las rutas de tus archivos de datos)
import { METRO_FOLDERS, METRO_DRINKS, D6_SYSTEM_CONFIG } from './data/dataMetro';

// --- COMPONENTES DINÁMICOS (SOLUCIÓN AL ERROR DE PRERENDER) ---
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
  // --- ESTADOS DE SISTEMA ---
  const [mounted, setMounted] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  // --- NAVEGACIÓN Y FILTROS ---
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- TELEMETRÍA DINÁMICA ---
  const [systemLog, setSystemLog] = useState([]);
  const [metrics, setMetrics] = useState({
    cpu: 12,
    temp: 38.5,
    rad: parseFloat(D6_SYSTEM_CONFIG?.radiation_level || 0.44),
    integrity: 98
  });

  // --- LOGICA DE LOGS ---
  const addLogEntry = useCallback((entry) => {
    const time = new Date().toLocaleTimeString('ru-RU', { hour12: false });
    setSystemLog(prev => [`[${time}] ${entry}`, ...prev].slice(0, 50));
  }, []);

  // --- EFECTO DE MONTAJE INICIAL ---
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Secuencia de arranque simulada
    const bootSteps = [
      "SISTEMA: Iniciando secuencia de arranque...",
      "KERNEL: VOS-DARK-33 detectado",
      "AUTH: Escaneo biométrico Artyom...",
      "NET: Enlace con el búnker D6 establecido",
      "SUCCESS: Acceso al archivo concedido"
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

  // --- BUCLE DE HARDWARE (METRICAS VIVAS) ---
  useEffect(() => {
    if (!mounted || bootSequence) return;

    const interval = setInterval(() => {
      setMetrics(prev => {
        const newCpu = Math.max(5, Math.min(99, prev.cpu + (Math.random() * 20 - 10)));
        const newRad = parseFloat((prev.rad + (Math.random() * 0.02 - 0.01)).toFixed(3));
        
        // Disparar Glitch si la radiación o el CPU suben mucho
        if (newCpu > 90 || Math.random() > 0.97) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 120);
          addLogEntry("ALERTA: Interferencia electromagnética detectada");
        }

        return {
          cpu: Math.floor(newCpu),
          rad: newRad,
          temp: 38 + (newCpu / 10),
          integrity: isUnlocked ? 100 : 98
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted, bootSequence, isUnlocked, addLogEntry]);

  // --- FILTRADO DE CONTENIDO ---
  const filteredFolders = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return METRO_FOLDERS.filter(folder => {
      const matchesSearch = folder.title.toLowerCase().includes(term) || 
                           folder.id.toLowerCase().includes(term);
      const matchesCat = activeCategory === 'ALL' || folder.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, activeCategory]);

  // --- PREVENCIÓN DE ERRORES SSR ---
  if (!mounted) return null;

  // --- PANTALLA DE BOOT ---
  if (bootSequence) {
    return (
      <div className={styles.bootingScreen}>
        <div className={styles.scanlineOverlay} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.bootTerminal}
        >
          <div className={styles.bootHeader}>
            <span className={styles.blink}>[ LOADING_D6_OS ]</span>
            <span>v2033.4.1</span>
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
      {/* CAPAS ATMOSFÉRICAS */}
      <div className={styles.crtEffectLayer}>
        <div className={styles.scanlines} />
        <div className={styles.vignette} />
      </div>

      {/* HEADER: HUD DE COMANDO */}
      <header className={styles.hudHeader}>
        <div className={styles.hudMain}>
          <div className={styles.brandGroup}>
            <div className={styles.d6Logo}>D6</div>
            <div className={styles.statusInfo}>
              <div className={styles.statusRow}>
                <Wifi size={10} className={styles.iconDim} /> 
                <span>ENLACE: ESTABLE</span>
              </div>
              <div className={styles.statusRow}>
                <HardDrive size={10} className={styles.iconDim} /> 
                <span>DRIVE: /MNT/D6_ARCHIVE</span>
              </div>
            </div>
          </div>

          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <div className={styles.telemetryGroup}>
            <div className={`${styles.teleBox} ${metrics.cpu > 80 ? styles.warn : ''}`}>
              <CpuIcon size={14} />
              <span>{metrics.cpu}%</span>
            </div>
            <div className={styles.teleBox}>
              <Thermometer size={14} />
              <span>{metrics.temp.toFixed(1)}°C</span>
            </div>
          </div>
        </div>
      </header>

      {/* ÁREA DE TRABAJO */}
      <div className={styles.workspace}>
        <AnimatePresence>
          {(sidebarOpen || !isMobile) && (
            <motion.aside 
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className={styles.sidebar}
            >
              {/* MODULO DE SEGURIDAD (PUZZLE) */}
              <section className={styles.sidebarSection}>
                <div className={styles.sectionTitle}>
                  {isUnlocked ? <Zap size={14} className={styles.textAmber} /> : <Lock size={14} />}
                  <span>CONTROL_DE_ACCESO</span>
                </div>
                <div className={styles.puzzleContainer}>
                  <TerminalPuzzle 
                    isUnlocked={isUnlocked} 
                    onUnlock={(val) => {
                      setIsUnlocked(val);
                      addLogEntry(val ? "CRITICAL: ACCESO TOTAL CONCEDIDO" : "SEG: CIFRADO RESTAURADO");
                    }} 
                  />
                </div>
              </section>

              {/* STREAM DE DATOS DEL KERNEL */}
              <section className={`${styles.sidebarSection} ${styles.flexFill}`}>
                <div className={styles.sectionTitle}>
                  <Activity size={14} /> <span>DATALOG_STREAM</span>
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
              <span>ROOT / ARCHIVOS / {activeCategory}</span>
            </div>
            <div className={styles.itemCount}>
              {filteredFolders.length} OBJETOS ENCONTRADOS
            </div>
          </div>

          <div className={styles.scrollArea}>
            <FileGrid 
              items={filteredFolders} 
              isUnlocked={isUnlocked} 
              onSelectItem={(folder) => {
                setSelectedFolder(folder);
                addLogEntry(`I/O: ACCEDIENDO A SECTOR ${folder.id}`);
              }} 
            />
          </div>
        </main>
      </div>

      {/* FOOTER: ESTADO AMBIENTAL */}
      <footer className={styles.hudFooter}>
        <div className={styles.footerLeft}>
          <div className={`${styles.statusLed} ${isUnlocked ? styles.ledGreen : styles.ledAmber}`} />
          <span>MODO: {isUnlocked ? 'OVERRIDE_ACTIVO' : 'LECTURA_SOLO'}</span>
        </div>

        <div className={styles.footerCenter}>
          <div className={`${styles.radSensor} ${metrics.rad > 0.5 ? styles.radCritical : ''}`}>
            <AlertTriangle size={12} />
            <span>RADIACIÓN: {metrics.rad} Sv/h</span>
          </div>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.locationTag}>D6_SEC_G_ARCHIVE</div>
          <div className={styles.timestamp}>
            {new Date().toLocaleDateString('ru-RU')}
          </div>
        </div>
      </footer>

      {/* MODAL DE DETALLES */}
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

      {/* BOTÓN MÓVIL (SÓLO MOBILE) */}
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