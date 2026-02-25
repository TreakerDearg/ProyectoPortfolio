'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Cpu as CpuIcon, Scan, Thermometer, X, Lock, Zap, 
  AlertTriangle, Menu, HardDrive, Wifi, ChevronRight
} from 'lucide-react';

// Estilos
import styles from '../../styles/inventory-styles/bunker.module.css';

// Datos - Asegura que estas rutas existan
import { METRO_FOLDERS, METRO_DRINKS, D6_SYSTEM_CONFIG } from './data/dataMetro';

// --- COMPONENTES DINÁMICOS (BLINDAJE TOTAL SSR) ---
const TerminalPuzzle = dynamic(
  () => import('./components/TerminalPuzzle').then(mod => mod.TerminalPuzzle),
  { ssr: false, loading: () => <div className="p-4 animate-pulse text-metro-amber">INICIALIZANDO_NODO_D6...</div> }
);

const FileGrid = dynamic(() => import('./components/FileGrid').then(mod => mod.FileGrid), { ssr: false });
const BriefcaseModal = dynamic(() => import('./components/BriefcaseModal').then(mod => mod.BriefcaseModal), { ssr: false });
const SearchBar = dynamic(() => import('./components/SearchBar').then(mod => mod.SearchBar), { ssr: false });

export default function InventoryPage() {
  const [mounted, setMounted] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [systemLog, setSystemLog] = useState([]);
  const [metrics, setMetrics] = useState({
    cpu: 12,
    temp: 38.5,
    rad: parseFloat(D6_SYSTEM_CONFIG?.radiation_level || 0.44),
    integrity: 98
  });

  const addLogEntry = useCallback((entry) => {
    const time = new Date().toLocaleTimeString('ru-RU', { hour12: false });
    setSystemLog(prev => [`[${time}] ${entry}`, ...prev].slice(0, 30));
  }, []);

  // --- MANEJO DE MONTAJE E INTERFAZ ---
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Boot Sequence
    const bootSteps = [
      "SISTEMA: Iniciando secuencia de arranque...",
      "KERNEL: VOS-DARK-33 detectado",
      "AUTH: Escaneo biométrico Artyom...",
      "SUCCESS: Enlace D6 establecido"
    ];

    bootSteps.forEach((step, i) => {
      setTimeout(() => addLogEntry(step), 700 * i);
    });

    const timer = setTimeout(() => setBootSequence(false), 3500);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [addLogEntry]);

  // --- SIMULACIÓN DE TELEMETRÍA ---
  useEffect(() => {
    if (!mounted || bootSequence) return;

    const interval = setInterval(() => {
      setMetrics(prev => {
        const newCpu = Math.floor(Math.random() * (45 - 12 + 1) + 12);
        const shouldGlitch = Math.random() > 0.95;
        
        if (shouldGlitch) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 150);
          addLogEntry("ALERTA: Fluctuación en red de alta tensión");
        }

        return {
          ...prev,
          cpu: newCpu,
          temp: 38 + (newCpu / 15),
          rad: parseFloat((prev.rad + (Math.random() * 0.01 - 0.005)).toFixed(3))
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted, bootSequence, addLogEntry]);

  const filteredFolders = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return METRO_FOLDERS.filter(folder => {
      const matchesSearch = folder.title.toLowerCase().includes(term) || folder.id.toLowerCase().includes(term);
      const matchesCat = activeCategory === 'ALL' || folder.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, activeCategory]);

  // Prevenir desajustes de hidratación
  if (!mounted) return <div className="bg-black min-h-screen" />;

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
            <span className="animate-pulse">[ INICIALIZANDO_D6_OS ]</span>
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
    <div className={`${styles.terminalContainer} ${glitchActive ? styles.glitchActive : ''}`}>
      <div className={styles.crtEffectLayer}>
        <div className={styles.scanlines} />
        <div className={styles.vignette} />
      </div>

      {/* HUD SUPERIOR */}
      <header className={styles.hudHeader}>
        <div className={styles.hudMain}>
          <div className={styles.brandGroup}>
            <div className={styles.d6Logo}>D6</div>
            <div className={styles.statusInfo}>
              <div className="flex items-center gap-2 opacity-60">
                <Wifi size={10} /> <span>ENLACE: ESTABLE</span>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <HardDrive size={10} /> <span>SCTR_G_ARCHIVE</span>
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
            <div className={styles.teleBox}>
              <CpuIcon size={14} className={metrics.cpu > 80 ? 'text-red-500' : ''} />
              <span>{metrics.cpu}%</span>
            </div>
            <div className={styles.teleBox}>
              <Thermometer size={14} />
              <span>{metrics.temp.toFixed(1)}°C</span>
            </div>
          </div>
        </div>
      </header>

      {/* WORKSPACE PRINCIPAL */}
      <div className={styles.workspace}>
        <aside className={`${styles.sidebar} ${isMobile && !sidebarOpen ? 'hidden' : 'flex'}`}>
          <section className={styles.sidebarSection}>
            <div className={styles.sectionTitle}>
              {isUnlocked ? <Zap size={14} className="text-yellow-500" /> : <Lock size={14} />}
              <span>ACCESO_SISTEMA</span>
            </div>
            <TerminalPuzzle 
              isUnlocked={isUnlocked} 
              onUnlock={(val) => {
                setIsUnlocked(val);
                addLogEntry(val ? "OVERRIDE: ACCESO CONCEDIDO" : "SEG: CIFRADO ACTIVO");
              }} 
            />
          </section>

          <section className={`${styles.sidebarSection} flex-1 overflow-hidden`}>
            <div className={styles.sectionTitle}>
              <Activity size={14} /> <span>LOG_STREAM</span>
            </div>
            <div className={styles.logContainer}>
              {systemLog.map((log, i) => (
                <div key={i} className={styles.logLine}>
                  <span className="opacity-40">{log.substring(0, 10)}</span>
                  <span className="ml-2">{log.substring(10)}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.explorerHeader}>
            <div className="flex items-center gap-2">
              <Scan size={14} className="text-metro-amber" />
              <span className="uppercase tracking-widest">D6://ROOT/{activeCategory}</span>
            </div>
          </div>

          <div className={styles.scrollArea}>
            <FileGrid 
              items={filteredFolders} 
              isUnlocked={isUnlocked} 
              onSelectItem={(folder) => {
                setSelectedFolder(folder);
                addLogEntry(`I/O: LECTURA SECTOR ${folder.id}`);
              }} 
            />
          </div>
        </main>
      </div>

      {/* HUD INFERIOR */}
      <footer className={styles.hudFooter}>
        <div className="flex items-center gap-4">
          <div className={`${styles.statusLed} ${isUnlocked ? styles.ledGreen : styles.ledAmber}`} />
          <span className="text-[10px] uppercase opacity-60">SISTEMA: {isUnlocked ? 'OVERRIDE' : 'READ_ONLY'}</span>
        </div>

        <div className={`${styles.radSensor} ${metrics.rad > 0.5 ? 'text-red-500' : 'text-metro-amber'}`}>
          <AlertTriangle size={12} />
          <span>RADIACIÓN: {metrics.rad} Sv/h</span>
        </div>

        <div className="flex items-center gap-4 text-[10px] opacity-40">
          <span>D6_SEC_G_ARCHIVE</span>
          <span>{new Date().toLocaleDateString('ru-RU')}</span>
        </div>
      </footer>

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

      {isMobile && (
        <button className={styles.mobileToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      )}
    </div>
  );
}