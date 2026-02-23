'use client';
import React, { useState, useMemo, useEffect } from 'react';
import styles from '../../styles/logs-styles/soma-page.module.css';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// Componentes y Data
import { SOMA_APPS } from './logos/dataSoma'; 
import { DrinkBriefcase } from './components/DrinkBriefcase'; 
import { SomaSearch } from './components/SomaSearch'; 
import { SomaArchives } from './components/SomaArchives'; 
import { NoiseOverlay } from './components/NoiseOverlay';

import { 
  Activity as ActivityIcon, Trash2, RefreshCw,  
  Search, Database, Globe, Cpu, Scan, X,
  Minimize2, AlertTriangle, Terminal, Layers, Menu, ShieldAlert
} from 'lucide-react';

export default function LogsPage() {
  const [appsData, setAppsData] = useState(SOMA_APPS);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('desktop'); 
  const [isMounted, setIsMounted] = useState(false);
  
  const [openApps, setOpenApps] = useState([]);
  const [minimizedApps, setMinimizedApps] = useState([]);
  const [focusedApp, setFocusedApp] = useState(null);
  
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Auto-abrir la primera app de alta prioridad
    if (SOMA_APPS.length > 0) {
      setOpenApps([SOMA_APPS[0].id]);
      setFocusedApp(SOMA_APPS[0].id);
    }
  }, []);

  // Filtrado para el modo Desktop (Bento Grid)
  const desktopApps = useMemo(() => {
    return appsData.filter(app => 
      !app.isArchiveOnly && 
      (app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       app.tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, appsData]);

  const handleToggleApp = (id) => {
    if (openApps.includes(id)) {
      setMinimizedApps(prev => prev.filter(a => a !== id));
      setFocusedApp(id);
    } else {
      setOpenApps(prev => [...prev, id]);
      setMinimizedApps(prev => prev.filter(a => a !== id));
      setFocusedApp(id);
    }
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleCloseApp = (id) => {
    setOpenApps(prev => prev.filter(a => a !== id));
    setMinimizedApps(prev => prev.filter(a => a !== id));
    if (focusedApp === id) setFocusedApp(null);
  };

  if (!isMounted) return null;

  return (
    <div className={styles.systemContainer}>
      <NoiseOverlay />
      
      {/* --- TOP STATUS BAR --- */}
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
            <Cpu size={12}/> <span>MEM: 14.4%</span>
          </div>
          <div className={styles.sessionType}>
            <Scan size={12} /> <span>SEC_ENCRYPTED</span>
          </div>
        </div>
      </header>

      <div className={styles.mainWrapper}>
        {/* --- SIDEBAR --- */}
        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarContent}>
             <div className={styles.sidebarGroup}>
                <DesktopIcon label="REBOOT" icon={<RefreshCw size={18} />} onClick={() => window.location.reload()} />
                <DesktopIcon label="SEARCH" icon={<Search size={18} />} isActive={isSearchOpen} onClick={() => setIsSearchOpen(!isSearchOpen)} />
                <DesktopIcon label="ARCHIVE" icon={<Database size={18} />} isActive={viewMode === 'archives'} onClick={() => setViewMode(viewMode === 'desktop' ? 'archives' : 'desktop')} />
             </div>
            
            <div className={styles.sidebarFooter}>
              <DesktopIcon label="EXIT" icon={<Trash2 size={18} />} onClick={() => setOpenApps([])} variant="danger" />
            </div>
          </div>
        </aside>

        {/* --- VIEWPORT / BENTO GRID --- */}
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
              ) : (
                <div className={styles.bentoGrid}>
                  <LayoutGroup key="desktop">
                    {desktopApps.map((app) => (
                      <AppWindow 
                        key={app.id}
                        app={app}
                        isOpen={openApps.includes(app.id)}
                        isMinimized={minimizedApps.includes(app.id)}
                        isFocused={focusedApp === app.id}
                        onToggle={() => handleToggleApp(app.id)}
                        onClose={() => handleCloseApp(app.id)}
                        onFocus={() => setFocusedApp(app.id)}
                        onRecover={() => setAppsData(prev => prev.map(a => a.id === app.id ? {...a, corruption: 0.05} : a))}
                        onOpenBriefcase={() => setSelectedDrink(app)}
                      />
                    ))}
                  </LayoutGroup>
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* --- TASKBAR --- */}
      <footer className={styles.taskbar}>
        <button 
          className={`${styles.startButton} ${isSidebarOpen ? styles.taskItemActive : ''}`} 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={16} /> <span className={styles.startText}>MENU</span>
        </button>

        <div className={styles.taskItemsContainer}>
          {appsData.map(app => (
            openApps.includes(app.id) && (
              <button 
                key={app.id}
                onClick={() => handleToggleApp(app.id)}
                className={`${styles.taskItem} ${focusedApp === app.id && !minimizedApps.includes(app.id) ? styles.taskItemActive : ''}`}
              >
                <app.icon size={12} style={{ color: app.color }} />
                <span className={styles.taskItemLabel}>{app.title}</span>
              </button>
            )
          ))}
        </div>

        <div className={styles.systemTray}>
          <ActivityIcon size={12} className={styles.trayIconPulse} />
          <div className={styles.trayDivider} />
          <span className={styles.clock}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </footer>

      {/* MODAL ANALYZER */}
      <AnimatePresence>
        {selectedDrink && (
          <DrinkBriefcase 
            key="modal"
            drink={selectedDrink} 
            onClose={() => setSelectedDrink(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- APP WINDOW (BENTO COMPATIBLE) ---
function AppWindow({ app, isOpen, isMinimized, onClose, onFocus, isFocused, onRecover, onOpenBriefcase, onToggle }) {
  const isCorrupted = app.corruption >= 0.8;
  const IconComponent = app.icon;
  
  // Si no está abierta, mostramos una versión "icono de escritorio" dentro del grid
  if (!isOpen || isMinimized) {
    return (
      <motion.div 
        layout
        className={`${styles.bentoItem} ${app.size === 'large' ? styles.spanTwo : ''}`}
        onClick={onToggle}
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
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className={styles.winButton}><X size={10} /></button>
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
                <div className={styles.metaItem}><label>STATUS</label><span style={{color: app.color}}>{app.status}</span></div>
              </div>

              <div className={styles.textContent}>{app.content}</div>
            </div>

            <footer className={styles.contentFooter}>
               <div className={styles.tagPill}><Layers size={10} /> {app.tag}</div>
               <button onClick={onOpenBriefcase} className={styles.analyzeBtn}>
                 <Database size={12} /> ANALYZE_BIO_SIGN
               </button>
            </footer>
          </div>
        )}
      </div>
    </motion.div>
  );
}


function DesktopIcon({ label, icon, onClick, variant, isActive }) {
  return (
    <button className={styles.desktopIconContainer} onClick={onClick}>
      <div className={`${styles.iconBase} ${isActive ? styles.iconActive : ''} ${variant === 'danger' ? styles.iconDanger : ''}`}>
        {icon}
      </div>
      <span className={styles.iconLabel}>{label}</span>
    </button>
  );
}