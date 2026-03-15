"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  HardDrive,
  Thermometer,
  Clock,
  Activity,
  Zap,
  Wifi,
} from "lucide-react";

import { useSystem } from "../context/SystemContext";
import { Screw } from "../components/deco-layout/Screw";
import { StatusLed } from "../components/deco-layout/StatusLed";

import styles from "../styles/layout/RightPanel.module.css";

/* =========================================
   SUBCOMPONENTE: SEGMENT METER (con animación y color dinámico)
========================================= */
const MeterBar = ({
  label,
  value,
  max = 10,
  icon: Icon,
  thresholdWarning = 6,
  thresholdDanger = 8,
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  // Transición suave entre valores
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 120);
    return () => clearTimeout(timer);
  }, [value]);

  // Jitter electrónico (pequeña fluctuación)
  const jitter = Math.floor(Math.random() * 2);
  const adjustedValue = Math.min(max, displayValue + jitter);

  // Color automático según el valor
  const getColorClass = () => {
    if (adjustedValue >= thresholdDanger) return styles.barRed;
    if (adjustedValue >= thresholdWarning) return styles.barYellow;
    return styles.barGreen;
  };

  const getBarColor = (i) => {
    if (i >= adjustedValue) return styles.barInactive;
    return getColorClass();
  };

  return (
    <div className={styles.meterWrapper} title={`${label}: ${adjustedValue * 10}%`}>
      <div className={styles.meterHeader}>
        <div className={styles.meterLabel}>
          {Icon && <Icon size={10} strokeWidth={2.5} />}
          <span>{label}</span>
        </div>
        <span className={styles.meterValue}>{adjustedValue * 10}%</span>
      </div>
      <div className={styles.meterBars}>
        {[...Array(max)].map((_, i) => (
          <div
            key={i}
            className={`${styles.barSegment} ${getBarColor(i)}`}
            style={{ opacity: i % 2 === 0 ? 1 : 0.8 }} // variación de brillo
          />
        ))}
      </div>
    </div>
  );
};

/* =========================================
   COMPONENTE PRINCIPAL: RIGHT PANEL
========================================= */
export const RightPanel = () => {
  const {
    uptime: uptimeMs,
    cpuLoad: contextCpu = 45,
    memUsage: contextMem = 62,
    temp: contextTemp = 58,
    linkEst,
    syncLock,
  } = useSystem();

  // Estado para valores dinámicos (varían alrededor de los valores del contexto)
  const [cpuLoad, setCpuLoad] = useState(contextCpu);
  const [memUsage, setMemUsage] = useState(contextMem);
  const [temp, setTemp] = useState(contextTemp);
  const [networkLevels, setNetworkLevels] = useState([3, 5, 2, 7, 4, 6]);

  // Estado para el glow del panel
  const [panelState, setPanelState] = useState("normal");

  // Historial para el mini gráfico (basado en cpuLoad dinámico)
  const [cpuHistory, setCpuHistory] = useState([]);

  // Simulación de error aleatorio
  const [glitch, setGlitch] = useState(false);

  // Formateo de uptime a HH:MM:SS
  const formatUptime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const uptimeFormatted = formatUptime(uptimeMs);

  // Simular variación suave de telemetría cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad((prev) => {
        // Variación aleatoria entre -5 y +5, manteniéndose cerca del contexto
        const delta = Math.floor(Math.random() * 11) - 5;
        return Math.min(100, Math.max(0, prev + delta));
      });
      setMemUsage((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 a +3
        return Math.min(100, Math.max(0, prev + delta));
      });
      setTemp((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 a +2
        return Math.min(100, Math.max(0, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Actualizar historial cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuHistory((prev) => [...prev.slice(-15), cpuLoad]);
    }, 2000);
    return () => clearInterval(interval);
  }, [cpuLoad]);

  // Determinar estado del panel para el glow
  useEffect(() => {
    if (temp > 75 || cpuLoad > 85) setPanelState("danger");
    else if (temp > 65 || cpuLoad > 70) setPanelState("warning");
    else setPanelState("normal");
  }, [temp, cpuLoad]);

  // Simulación de glitch aleatorio (1% de probabilidad cada 10s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.01) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Simular actividad de red variable cada 2.5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkLevels(() =>
        Array.from({ length: 6 }, () => Math.floor(Math.random() * 8) + 1) // valores 1-8
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      className={`${styles.rightAside} ${styles[`state-${panelState}`]}`}
      tabIndex={0}
      role="region"
      aria-label="System telemetry panel"
    >
      {/* Tornillería industrial (fija) */}
      <Screw size="xs" type="hex" className={styles.screwTopLeft} />
      <Screw size="xs" type="hex" className={styles.screwTopRight} />
      <Screw size="xs" type="hex" className={styles.screwBottomLeft} />
      <Screw size="xs" type="hex" className={styles.screwBottomRight} />

      {/* Placa principal */}
      <div className={styles.panelShell}>
        <div className={styles.techGrid} />

        {/* Contenedor con scroll */}
        <div className={styles.scrollContainer}>
          {/* ===== MÓDULO: TELEMETRÍA ===== */}
          <section className={styles.moduleWrapper}>
            <header className={styles.panelHeader}>
              <Activity size={12} strokeWidth={2.5} className={styles.headerIcon} />
              <span>SYSTEM_TELEMETRY</span>
            </header>

            {/* Bus de datos animado */}
            <div className={styles.dataBusContainer}>
              <div className={styles.dataBusTrack}>
                <div className={styles.dataFlow} />
              </div>
            </div>

            <div className={styles.telemetrySection}>
              <MeterBar
                label="CORE_UTIL"
                value={Math.floor(cpuLoad / 10)}
                icon={Cpu}
                thresholdWarning={6}
                thresholdDanger={8}
              />
              <MeterBar
                label="MEM_VALVE"
                value={Math.floor(memUsage / 10)}
                icon={HardDrive}
                thresholdWarning={6}
                thresholdDanger={8}
              />
              <MeterBar
                label="THERM_STAT"
                value={Math.floor(temp / 10)}
                icon={Thermometer}
                thresholdWarning={6}
                thresholdDanger={8}
              />
            </div>
          </section>

          {/* Mini gráfico de actividad CPU */}
          <div className={styles.graphWrapper}>
            <div className={styles.graphLabel}>CPU ACTIVITY (15s)</div>
            <div className={styles.miniGraph}>
              {cpuHistory.map((val, i) => (
                <div
                  key={i}
                  className={styles.graphBar}
                  style={{ height: `${val * 0.6}px` }}
                />
              ))}
            </div>
          </div>

          <div className={styles.panelDivider} />

          {/* ===== MÓDULO: INDICADORES DE ESTADO ===== */}
          <section className={styles.moduleWrapper}>
            <div className={styles.sectionHeader}>
              <span className={styles.headerLine} />
              <span className={styles.headerText}>STATUS_INDICATORS</span>
              <span className={styles.headerLine} />
            </div>

            <div className={styles.ledGrid}>
              {/* LINK_EST: Estado del enlace */}
              <div className={styles.ledCell}>
                <StatusLed
                  status={linkEst ? "online" : "idle"}
                  label="LINK_EST"
                  size="xs"
                  tooltip={linkEst ? "Connection established" : "Link down"}
                />
              </div>

              {/* REACT_FEED: Carga de CPU */}
              <div className={styles.ledCell}>
                <StatusLed
                  status={cpuLoad > 70 ? "warning" : "online"}
                  label="REACT_FEED"
                  blink={cpuLoad > 80}
                  pattern="warning"
                  intensity={1.2}
                  tooltip={`CPU load: ${Math.round(cpuLoad)}%`}
                />
              </div>

              {/* SYNC_LOCK: Sincronización */}
              <div className={styles.ledCell}>
                <StatusLed
                  status={syncLock ? "online" : "error"}
                  label="SYNC_LOCK"
                  size="xs"
                  blink={!syncLock}
                  pattern="fast"
                  tooltip={syncLock ? "Synchronized" : "Sync lost"}
                />
              </div>

              {/* RAD_ALERT: Alerta térmica */}
              <div className={styles.ledCell}>
                <StatusLed
                  status={temp > 70 ? "error" : "idle"}
                  label="RAD_ALERT"
                  blink={temp > 80}
                  pattern="pulse"
                  intensity={1.5}
                  tooltip={`Temperature: ${Math.round(temp)}°F`}
                />
              </div>
            </div>

            <div className={styles.indicatorIcon}>
              <Zap size={10} fill="currentColor" />
            </div>
          </section>

          {/* ===== MÓDULO: RUNTIME ===== */}
          <section className={styles.runtimeSection}>
            <div className={styles.runtimeHeader}>
              <Clock size={10} />
              <span>RUNTIME_CYCLES</span>
            </div>
            <div className={styles.runtimeDisplay}>
              <div className={styles.runtimeDigits}>{uptimeFormatted}</div>
              <span className={styles.runtimeUnit}>HH:MM:SS</span>
            </div>
            <div className={styles.moduleFootprint}>ROBCO_IND_v6.2</div>
          </section>

          {/* ===== MÓDULO: ACTIVIDAD DE RED (dinámico) ===== */}
          <section className={styles.networkSection}>
            <div className={styles.networkHeader}>
              <Wifi size={8} />
              <span>NETWORK ACTIVITY</span>
            </div>
            <div className={styles.networkBars}>
              {networkLevels.map((level, i) => (
                <div
                  key={i}
                  className={`${styles.networkBar} ${level > 4 ? styles.active : ""}`}
                  style={{ height: `${level * 2}px` }}
                />
              ))}
            </div>
          </section>

          {/* ===== CONECTOR VISUAL CON EL LEFT PANEL ===== */}
          <div className={styles.busConnector} />

          {/* ===== NOTA ADHESIVA CON ASPECTO DEGRADADO ===== */}
          <div className={`${styles.stickyNote} ${styles.stickyNoteDegraded}`}>
            <div className={styles.notePin} />
            <p> recuerda revisar el sistema mas abajo</p>
          </div>

          {/* ===== GLITCH SIMULADO ===== */}
          {glitch && (
            <div className={styles.glitchOverlay}>
              <Zap size={8} /> VOLTAGE_SPIKE
            </div>
          )}
        </div> {/* fin scrollContainer */}
      </div> {/* fin panelShell */}
    </aside>
  );
};