"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SystemContext = createContext();

// Valores iniciales
const INITIAL_STATE = {
  systemStatus: "ONLINE",        // ONLINE, OFFLINE, MAINTENANCE, BOOTING
  uptime: 0,
  cpuLoad: 45,
  memUsage: 62,
  temp: 58,
  radiationLevel: 12,
  geigerActive: true,
  radDanger: false,
  exhaustIntensity: "normal",    // normal, high, critical
  linkEst: true,
  syncLock: false,
  networkActivity: [3, 5, 2, 7, 4, 6], // valores para las barras
};

export function SystemProvider({ children }) {
  const [systemStatus, setSystemStatus] = useState(INITIAL_STATE.systemStatus);
  const [uptime, setUptime] = useState(INITIAL_STATE.uptime);
  const [cpuLoad, setCpuLoad] = useState(INITIAL_STATE.cpuLoad);
  const [memUsage, setMemUsage] = useState(INITIAL_STATE.memUsage);
  const [temp, setTemp] = useState(INITIAL_STATE.temp);
  const [radiationLevel, setRadiationLevel] = useState(INITIAL_STATE.radiationLevel);
  const [geigerActive, setGeigerActive] = useState(INITIAL_STATE.geigerActive);
  const [linkEst, setLinkEst] = useState(INITIAL_STATE.linkEst);
  const [syncLock, setSyncLock] = useState(INITIAL_STATE.syncLock);
  const [networkActivity, setNetworkActivity] = useState(INITIAL_STATE.networkActivity);

  // Simulador de contador de actividad (uptime)
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simular fluctuaciones normales del sistema cuando está ONLINE
  useEffect(() => {
    if (systemStatus !== "ONLINE") return;

    const interval = setInterval(() => {
      // Pequeñas variaciones aleatorias (±3 para cpu, ±2 para otros)
      setCpuLoad(prev => Math.min(100, Math.max(0, prev + (Math.random() * 6 - 3))));
      setMemUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))));
      setTemp(prev => Math.min(100, Math.max(0, prev + (Math.random() * 2 - 1))));
      setRadiationLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() * 2 - 1))));

      // Actualizar actividad de red (simula tráfico)
      setNetworkActivity(prev => {
        const newArr = [...prev.slice(1), Math.floor(Math.random() * 8) + 2];
        return newArr;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [systemStatus]);

  // Derivar radDanger de radiationLevel
  useEffect(() => {
    // No se usa estado separado, lo calculamos en el value
  }, [radiationLevel]);

  // Derivar exhaustIntensity de temp
  useEffect(() => {
    // No se usa estado separado, lo calculamos en el value
  }, [temp]);

  // Derivar geigerActive (por ejemplo, siempre true si hay radiación)
  useEffect(() => {
    setGeigerActive(radiationLevel > 0);
  }, [radiationLevel]);

  // Función para forzar un error crítico (simula fallo)
  const triggerSystemFailure = useCallback(() => {
    setSystemStatus("OFFLINE");
    setCpuLoad(0);
    setMemUsage(0);
    setTemp(90); // sobrecalentamiento
    setRadiationLevel(85);
    setLinkEst(false);
    setSyncLock(false);
    // networkActivity se queda como está
  }, []);

  // Función para reiniciar el sistema
  const rebootSystem = useCallback(() => {
    setSystemStatus("BOOTING");
    setCpuLoad(20);
    setMemUsage(30);
    setTemp(40);
    setRadiationLevel(5);
    setLinkEst(false);
    setSyncLock(false);
    // Después de 2 segundos pasa a ONLINE
    setTimeout(() => {
      setSystemStatus("ONLINE");
      setCpuLoad(45);
      setMemUsage(62);
      setTemp(58);
      setRadiationLevel(12);
      setLinkEst(true);
      setSyncLock(false);
    }, 2000);
  }, []);

  // Función para simular entrada en mantenimiento
  const setMaintenance = useCallback(() => {
    setSystemStatus("MAINTENANCE");
    // En mantenimiento, algunos valores pueden congelarse o mostrar estados especiales
  }, []);

  // Valores calculados (derivados) para no duplicar estado
  const radDanger = radiationLevel > 50;
  const exhaustIntensity = temp > 75 ? "critical" : temp > 65 ? "high" : "normal";

  const value = {
    // Estados principales
    systemStatus,
    setSystemStatus,
    uptime,
    
    // Telemetría
    cpuLoad,
    memUsage,
    temp,
    radiationLevel,
    geigerActive,
    radDanger,
    exhaustIntensity,
    
    // Indicadores de red/comms
    linkEst,
    syncLock,
    networkActivity,
    
    // Funciones de control
    triggerSystemFailure,
    rebootSystem,
    setMaintenance,
    
    // Setters individuales (para debugging o casos especiales)
    setCpuLoad,
    setMemUsage,
    setTemp,
    setRadiationLevel,
    setLinkEst,
    setSyncLock,
  };

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystem debe ser usado dentro de un SystemProvider");
  }
  return context;
}