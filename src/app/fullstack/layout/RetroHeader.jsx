"use client";
import { Terminal, Activity, Cpu } from "lucide-react";
import { useSystem } from "../context/SystemContext";
import ExitButton from "../ExitButton";
import styles from "../styles/layout/RetroHeader.module.css";

export default function RetroHeader() {
  const { 
    currentView, 
    changeView, 
    metrics, 
    systemStatus, 
    addLog 
  } = useSystem();

  // Definimos los nodos de navegación central
  const navItems = [
    { id: 'SYSTEM_INIT', label: 'SYSTEM_INIT' },
    { id: 'GOTO_PROJ', label: 'GOTO_PROJ' },
    { id: 'MISSION_LOG', label: 'MISSION_LOG' }
  ];

  const handleNavClick = (id) => {
    // Si el sistema está OFFLINE, bloqueamos la navegación
    if (systemStatus === "OFFLINE") return;

    addLog(`EXEC_CMD: MOUNTING_VIEW_${id}`, "CMD");
    changeView(id); // Este es el disparador para el Layout
  };

  const isOffline = systemStatus === "OFFLINE";

  return (
    <header className={styles.headerContainer}>
      {/* --- BLOQUE 01: STATUS DE IDENTIDAD --- */}
      <div className="flex items-center gap-4 z-20">
        <div className={styles.logoBox}>
          <Terminal 
            size={20} 
            className={isOffline ? "text-[#ff9d00]" : "text-[#00ff9d]"} 
          />
        </div>
        <div className="flex flex-col">
          <h1 className={styles.pixelTitle}>AMBER_OS v2.1.0</h1>
          <div className="flex items-center gap-2">
            <div className={`${styles.statusDot} ${isOffline ? styles.dotOffline : styles.dotOnline}`} />
            <span className={styles.connectionStatus}>
              {isOffline ? "[SYSTEM_HALTED]" : "[CONNECTION_STABLE]"}
            </span>
          </div>
        </div>
      </div>

      {/* --- BLOQUE 02: NAVEGACIÓN (CAMBIO DE VISTA) --- */}
      <nav className={styles.centerNav}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`
              ${styles.navItem} 
              ${currentView === item.id ? styles.active : ""}
            `}
            disabled={isOffline}
          >
            <span className={styles.bracket}>[</span>
            <span className={styles.navLabel}>{item.label}</span>
            <span className={styles.bracket}>]</span>
            
            {/* Resplandor inferior solo para la pestaña activa */}
            {currentView === item.id && <div className={styles.activeGlowLine} />}
          </button>
        ))}
      </nav>

      {/* --- BLOQUE 03: TELEMETRÍA Y PORTAL DE SALIDA --- */}
      <div className="flex items-center gap-6 z-20">
        <div className="flex items-center gap-4">
          <div className={styles.statBox}>
            <span className={styles.statSub}>UPTIME</span>
            <span className={styles.statLabel}>99.9%</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statSub}>CORE_LOAD</span>
            <span className={styles.statLabel}>
              {isOffline ? "00" : metrics.cpu}%
            </span>
          </div>
        </div>

        {/* El ExitButton maneja su propio estado de apertura y portal */}
        <div className={styles.exitZone}>
          <ExitButton />
        </div>
      </div>

      {/* Decoración de línea de escaneo base */}
      <div className={styles.bottomLine} />
    </header>
  );
}