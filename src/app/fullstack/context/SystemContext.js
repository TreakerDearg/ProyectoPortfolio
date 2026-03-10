"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const SystemContext = createContext();

export function SystemProvider({ children }) {
  /* =========================
      ESTADOS DE NÚCLEO
  ========================= */
  const [currentView, setCurrentView] = useState("SYSTEM_INIT");
  const [selectedMission, setSelectedMission] = useState(null);
  const [systemStatus, setSystemStatus] = useState("BOOTING"); // ONLINE, OFFLINE, BOOTING
  const [isBooting, setIsBooting] = useState(true);

  /* =========================
      LOGS DE TERMINAL
  ========================= */
  const [terminalLogs, setTerminalLogs] = useState([]);

  const addLog = useCallback((message, type = "INFO") => {
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
    let prefix = ">>";
    if (type === "ERR") prefix = "!! ERROR !!";
    if (type === "WARN") prefix = ">> WARN";
    if (type === "CMD") prefix = "[CMD]";
    
    setTerminalLogs(prev => {
      const newLog = `[${timestamp}] ${prefix} ${message.toUpperCase()}`;
      return [...prev, newLog].slice(-50); // Buffer de 50 líneas
    });
  }, []);

  /* =========================
      MÉTRICAS DINÁMICAS
  ========================= */
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    temp: 0,
    sync: 0
  });

  /* =========================
      ACCIONES DE NAVEGACIÓN
  ========================= */
  const changeView = (viewId) => {
    if (systemStatus === "OFFLINE" && viewId !== "SYSTEM_EXIT") {
      setSystemStatus("ONLINE");
    }
    setCurrentView(viewId);
    addLog(`navigating_to: ${viewId}`, "CMD");
  };

  const selectMission = (mission) => {
    if (mission.status === "LOCKED") {
      addLog(`access_denied: mission_${mission.id} is encrypted`, "ERR");
      return false;
    }
    setSelectedMission(mission);
    addLog(`mounting_data_strata: ${mission.title}...`);
    return true;
  };

  /* =========================
      EFECTO DE ARRANQUE (BOOT)
  ========================= */
  useEffect(() => {
    const bootSequence = [
      "loading_amber_kernel_v2.1.0",
      "initializing_robco_protocols",
      "mounting_local_node_arg_01",
      "check_biometrics: valid",
      "system_check: operational",
      "welcome_back_operator"
    ];

    bootSequence.forEach((msg, i) => {
      setTimeout(() => addLog(msg), i * 500);
    });

    setTimeout(() => {
      setIsBooting(false);
      setSystemStatus("ONLINE");
      setMetrics({ cpu: 12, memory: 34, temp: 32, sync: 99.8 });
    }, bootSequence.length * 500);
  }, [addLog]);

  /* =========================
      SIMULACIÓN DE CARGA REAL
  ========================= */
  useEffect(() => {
    if (isBooting || systemStatus === "OFFLINE") return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.floor(Math.random() * 12) + 8,
        memory: Math.floor(Math.random() * 5) + 42,
        temp: Math.floor(Math.random() * 3) + 38,
        sync: parseFloat((99 + Math.random() * 0.9).toFixed(2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isBooting, systemStatus]);

  return (
    <SystemContext.Provider
      value={{
        // Estados
        currentView,
        changeView,
        selectedMission,
        setSelectedMission,
        selectMission,
        systemStatus,
        setSystemStatus,
        terminalLogs,
        addLog,
        metrics,
        isBooting
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) throw new Error("useSystem must be used within a SystemProvider");
  return context;
}