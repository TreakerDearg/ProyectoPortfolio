'use client';
import React, { useState, useMemo, useEffect } from 'react';
import styles from '../../styles/logs-styles/soma-page.module.css';
import { motion, AnimatePresence, LayoutGroup, Reorder } from 'framer-motion';

// Componentes y Data
import { SOMA_APPS } from './logos/dataSoma';
import { DrinkBriefcase } from './components/DrinkBriefcase';
import { SomaSearch } from './components/SomaSearch';
import { SomaArchives } from './components/SomaArchives';
import { CRTEffects } from './components/CRTEffects';
import NoiseOverlay from './components/NoiseOverlay';
import { SomaStatusBar } from './components/SomaStatusBar';
import { SomaVent } from './components/SomaVent';
import { SomaCable } from './components/SomaCable';
import { SomaWarningLight } from './components/SomaWarningLight';
import { Taskbar } from './components/Taskbar';

// Iconos para sidebar
import {
  RefreshCw,
  Search,
  Database,
  Layers,
  HardDrive,
  Monitor,
  Power,
  Globe,
  Cpu,
  Scan,
  Battery,
  Minus,
  X,
  ShieldAlert,
} from 'lucide-react';

export default function LogsPage() {
  const [appsData, setAppsData] = useState(SOMA_APPS);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'archives' | 'icons'
  const [isMounted, setIsMounted] = useState(false);

  const [openApps, setOpenApps] = useState([]);
  const [minimizedApps, setMinimizedApps] = useState([]);
  const [focusedApp, setFocusedApp] = useState(null);

  const [selectedDrink, setSelectedDrink] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [desktopIconsOrder, setDesktopIconsOrder] = useState(() =>
    SOMA_APPS.filter(app => !app.isArchiveOnly).map(app => app.id)
  );

  useEffect(() => {
    setIsMounted(true);
    if (SOMA_APPS.length > 0) {
      setOpenApps([SOMA_APPS[0].id]);
      setFocusedApp(SOMA_APPS[0].id);
    }
  }, []);

  const desktopApps = useMemo(() => {
    return appsData.filter(app =>
      !app.isArchiveOnly &&
      (app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, appsData]);

  const sortedDesktopApps = useMemo(() => {
    return [...desktopApps].sort((a, b) => {
      const indexA = desktopIconsOrder.indexOf(a.id);
      const indexB = desktopIconsOrder.indexOf(b.id);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [desktopApps, desktopIconsOrder]);

  const handleToggleApp = (id) => {
    if (minimizedApps.includes(id)) {
      setMinimizedApps(prev => prev.filter(a => a !== id));
      setFocusedApp(id);
    } else if (!openApps.includes(id)) {
      setOpenApps(prev => [...prev, id]);
      setFocusedApp(id);
    } else {
      setMinimizedApps(prev => [...prev, id]);
      if (focusedApp === id) setFocusedApp(null);
    }
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleCloseApp = (id) => {
    setOpenApps(prev => prev.filter(a => a !== id));
    setMinimizedApps(prev => prev.filter(a => a !== id));
    if (focusedApp === id) setFocusedApp(null);
  };

  const handleMinimizeApp = (id) => {
    setMinimizedApps(prev => [...prev, id]);
    if (focusedApp === id) setFocusedApp(null);
  };

  const handleRestoreApp = (id) => {
    setMinimizedApps(prev => prev.filter(a => a !== id));
    setFocusedApp(id);
  };

  if (!isMounted) return null;

  return (
    <div className={`${styles.systemContainer} ${styles.somaTerminalRoot}`}>
      <CRTEffects />
      <NoiseOverlay 
  intensity={0.8}
  scanlineIntensity={0.6}
  flickerSpeed="slow"
  color="rgb"
  showVignette={true}
/>

      <SomaStatusBar className={styles.decorTopRight} />
      <SomaVent className={styles.decorLeft} />
      <SomaCable className={styles.decorBottomLeft} />
      <SomaWarningLight className={styles.decorBottomRight} />

      {/* Top Status Bar */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.stationBrand}>
            <Globe size={14} className={styles.pulseIcon} />
            <span className={styles.stationLabel}>UPSILON_TERMINAL_v4.0</span>
          </div>
          <div className={styles.nodeStatus}>
            <div className={styles.ledDotGreen} />
            <span className={styles.nodeText}>LINK: ACTIVE</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.systemMetrics}>
            <Cpu size={12} /> <span>MEM: 14.4%</span>
          </div>
          <div className={styles.sessionType}>
            <Scan size={12} /> <span>SEC_ENCRYPTED</span>
          </div>
          <div className={styles.batteryStatus}>
            <Battery size={12} /> <span>87%</span>
          </div>
        </div>
      </header>

      <div className={styles.mainWrapper}>
        {/* Sidebar */}
        <aside
          className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
          aria-label="Panel de control"
        >
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarGroup}>
              <DesktopIcon label="REBOOT" icon={<RefreshCw size={18} />} onClick={() => window.location.reload()} tooltip="Reiniciar sistema" />
              <DesktopIcon label="SEARCH" icon={<Search size={18} />} isActive={isSearchOpen} onClick={() => setIsSearchOpen(!isSearchOpen)} tooltip="Búsqueda de registros" />
              <DesktopIcon label="ARCHIVE" icon={<Database size={18} />} isActive={viewMode === 'archives'} onClick={() => setViewMode(viewMode === 'desktop' ? 'archives' : 'desktop')} tooltip="Archivos históricos" />
              <DesktopIcon label="ICONS" icon={<Layers size={18} />} isActive={viewMode === 'icons'} onClick={() => setViewMode(viewMode === 'icons' ? 'desktop' : 'icons')} tooltip="Vista de iconos" />
              <DesktopIcon label="DISK" icon={<HardDrive size={18} />} onClick={() => alert('Disco local C:')} tooltip="Explorar disco" />
              <DesktopIcon label="TERM" icon={<Monitor size={18} />} onClick={() => alert('Terminal abierta')} tooltip="Abrir terminal" />
            </div>
            <div className={styles.sidebarFooter}>
              <DesktopIcon label="POWER" icon={<Power size={18} />} onClick={() => setOpenApps([])} variant="danger" tooltip="Apagar" />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.desktopArea}>
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={styles.searchOverlay}
              >
                <SomaSearch onSearch={setSearchTerm} onClose={() => setIsSearchOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.viewContainer}>
            <AnimatePresence mode="wait">
              {viewMode === 'archives' ? (
                <SomaArchives
                  key="archives"
                  apps={appsData}
                  openApps={openApps}
                  onToggleApp={(id) => { handleToggleApp(id); setViewMode('desktop'); }}
                  onOpenBriefcase={(app) => setSelectedDrink(app)}
                />
              ) : viewMode === 'icons' ? (
                <Reorder.Group
                  axis="both"
                  values={desktopIconsOrder}
                  onReorder={setDesktopIconsOrder}
                  className={styles.iconGrid}
                >
                  {sortedDesktopApps.map((app) => (
                    <Reorder.Item key={app.id} value={app.id} className={styles.iconGridItem}>
                      <DesktopIconItem
                        app={app}
                        onDoubleClick={() => handleToggleApp(app.id)}
                      />
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              ) : (
                <LayoutGroup>
                  <div className={styles.bentoGrid}>
                    {sortedDesktopApps
                      .filter(app => !minimizedApps.includes(app.id)) // No mostrar minimizadas
                      .map((app) => (
                        <AppWindow
                          key={app.id}
                          app={app}
                          isOpen={openApps.includes(app.id)}
                          isMinimized={minimizedApps.includes(app.id)}
                          isFocused={focusedApp === app.id}
                          onToggle={() => handleToggleApp(app.id)}
                          onClose={() => handleCloseApp(app.id)}
                          onMinimize={() => handleMinimizeApp(app.id)}
                          onFocus={() => setFocusedApp(app.id)}
                          onRecover={() => setAppsData(prev => prev.map(a => a.id === app.id ? { ...a, corruption: 0.05 } : a))}
                          onOpenBriefcase={() => setSelectedDrink(app)}
                        />
                      ))}
                  </div>
                </LayoutGroup>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Taskbar component (integrada en el flujo) */}
      <Taskbar
        appsData={appsData}
        openApps={openApps}
        minimizedApps={minimizedApps}
        focusedApp={focusedApp}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleApp={handleToggleApp}
        onRestoreApp={handleRestoreApp}
      />

      {/* Modal */}
      <AnimatePresence>
        {selectedDrink && (
          <DrinkBriefcase key="modal" drink={selectedDrink} onClose={() => setSelectedDrink(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- AppWindow (ventana estilo Windows 95) ---
function AppWindow({ app, isOpen, isMinimized, isFocused, onClose, onMinimize, onFocus, onRecover, onOpenBriefcase, onToggle }) {
  const isCorrupted = app.corruption >= 0.8;
  const IconComponent = app.icon;

  if (!isOpen || isMinimized) {
    return (
      <motion.div
        layout
        className={`${styles.bentoItem} ${app.size === 'large' ? styles.spanTwo : ''}`}
        onClick={onToggle}
        title={app.title}
      >
        <div className={styles.bentoIconInner} style={{ '--accent': app.color }}>
          <IconComponent size={32} />
          <span className={styles.bentoLabel}>{app.title}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onFocus}
      className={`${styles.win95Container} ${app.size === 'large' ? styles.spanTwo : ''} ${isFocused ? styles.windowFocused : ''}`}
      style={{ zIndex: isFocused ? 100 : 1 }}
    >
      <div className={`${styles.win95Header} ${isFocused ? styles.win95HeaderActive : ''}`}>
        <div className={styles.headerTitleBox}>
          <IconComponent size={12} style={{ color: isCorrupted ? '#ff0000' : app.color }} />
          <span className={styles.windowTitle}>
            {isCorrupted ? 'SYSTEM_CORRUPTION_DETECTED' : app.title}
          </span>
        </div>
        <div className={styles.windowControls}>
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className={styles.winButton} title="Minimizar">
            <Minus size={10} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className={styles.winButton} title="Cerrar">
            <X size={10} />
          </button>
        </div>
      </div>

      <div className={styles.win95Body}>
        {isCorrupted ? (
          <div className={styles.corruptedOverlay}>
            <ShieldAlert size={32} className={styles.flickerRed} />
            <p className={styles.errorText}>SEGMENT_FAULT: NODE_{app.node}</p>
            <button onClick={onRecover} className={styles.repairBtn}>RUN_RECOVERY.EXE</button>
          </div>
        ) : (
          <div className={styles.windowContent}>
            <div className={styles.contentScrollArea}>
              <div className={styles.metaHeader}>
                <div className={styles.metaItem}><label>NODE</label><span>{app.node}</span></div>
                <div className={styles.metaItem}><label>STATUS</label><span style={{ color: app.color }}>{app.status}</span></div>
              </div>
              <div className={styles.textContent}>{app.content}</div>
            </div>
            <footer className={styles.contentFooter}>
              <div className={styles.tagPill}><Layers size={10} /> {app.tag}</div>
              <button onClick={onOpenBriefcase} className={styles.analyzeBtn} title="Analizar bio-señal">
                <Database size={12} /> ANALYZE_BIO_SIGN
              </button>
            </footer>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- DesktopIconItem (ícono de escritorio para vista icons) ---
function DesktopIconItem({ app, onDoubleClick }) {
  const IconComponent = app.icon;
  return (
    <div className={styles.iconItem} onDoubleClick={onDoubleClick} title={app.title}>
      <div className={styles.iconItemInner}>
        <IconComponent size={24} style={{ color: app.color }} />
        <span className={styles.iconItemLabel}>{app.title}</span>
      </div>
    </div>
  );
}

// --- DesktopIcon (ícono de la sidebar) ---
function DesktopIcon({ label, icon, onClick, variant, isActive, tooltip }) {
  return (
    <button className={styles.desktopIconContainer} onClick={onClick} title={tooltip || label}>
      <div className={`${styles.iconBase} ${isActive ? styles.iconActive : ''} ${variant === 'danger' ? styles.iconDanger : ''}`}>
        {icon}
      </div>
      <span className={styles.iconLabel}>{label}</span>
    </button>
  );
}