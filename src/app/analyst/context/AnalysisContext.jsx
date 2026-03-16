"use client";
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { 
  INITIAL_NODES, 
  SECURITY_LOGS, 
  INITIAL_STREAMS, 
  INITIAL_KERNEL_STATE 
} from '../data/nodes';

const AnalysisContext = createContext(undefined);

export function AnalysisProvider({ children }) {
  // --- ESTADOS DE UI / NAVEGACIÓN ---
  const [activeView, setActiveView] = useState('Network_Map');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [systemStatus, setSystemStatus] = useState('NOMINAL');
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  
  // --- ESTADOS DE DATOS ---
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [logs, setLogs] = useState(SECURITY_LOGS);
  const [activeStreams, setActiveStreams] = useState(INITIAL_STREAMS);
  const [kernelMetrics, setKernelMetrics] = useState(INITIAL_KERNEL_STATE);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // --- REFERENCIAS PARA CÁLCULOS ---
  // Usar refs ayuda a evitar re-renders innecesarios en intervalos
  const statusTimerRef = useRef(null);

  // --- SIMULACIÓN DE HARDWARE (Métricas de Kernel) ---
  useEffect(() => {
    const hardwareInterval = setInterval(() => {
      setKernelMetrics(prev => ({
        ...prev,
        cpu: {
          ...prev.cpu,
          baseLoad: Math.min(100, Math.max(0, parseFloat((prev.cpu.baseLoad + (Math.random() * 4 - 2)).toFixed(2))))
        },
        threads: 1200 + Math.floor(Math.random() * 250),
        uptime: (prev.uptime || 0) + 1
      }));
    }, 2500);

    return () => clearInterval(hardwareInterval);
  }, []);

  // --- GENERADOR DE EVENTOS DE RED (Logs) ---
  const addLog = useCallback((eventData) => {
    const newLog = {
      id: `L-${crypto.randomUUID().slice(0, 4)}`, // ID más profesional
      timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      ...eventData
    };

    setLogs(prev => [newLog, ...prev].slice(0, 25)); // Aumentado a 25 para mejor scroll

    if (eventData.level === 'critical') {
      setSystemStatus('WARNING');
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
      statusTimerRef.current = setTimeout(() => setSystemStatus('NOMINAL'), 5000);
    }
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const events = [
        { event: 'DDoS_Mitigation_Active', level: 'warning', status: 'FILTERING', origin: 'EXTERNAL_GATEWAY' },
        { event: 'Node_Handshake_Complete', level: 'info', status: 'CLEAN', origin: 'CORE_NODE' },
        { event: 'Encrypted_Tunnel_Opened', level: 'info', status: 'SUCCESS', origin: 'NEURAL_LINK' },
        { event: 'Heuristic_Anomaly_Detected', level: 'critical', status: 'BLOCKED', origin: 'DB_CLUSTER' },
        { event: 'Auth_Token_Rotation', level: 'info', status: 'SUCCESS', origin: 'SUBNET_0x4' }
      ];
      
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      addLog(randomEvent);
    }, 8000); // Frecuencia ajustada a 8s para no saturar visualmente

    return () => {
      clearInterval(logInterval);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, [addLog]);

  // --- ACCIONES DEL SISTEMA ---
  const navigateTo = useCallback((view) => {
    if (view === activeView) return;
    setIsAnalyzing(true);
    setActiveView(view);
    // Tiempo de "Glitch" o carga de interfaz
    setTimeout(() => setIsAnalyzing(false), 600);
  }, [activeView]);

  const updateNodePosition = useCallback((id, delta) => {
    setNodes(current =>
      current.map(node =>
        node.id === id ? { ...node, x: node.x + delta.x, y: node.y + delta.y } : node
      )
    );
  }, []);

  const selectNode = useCallback((nodeOrId) => {
    const id = typeof nodeOrId === 'object' ? nodeOrId?.id : nodeOrId;
    setSelectedNodeId(id || null);
  }, []);

  // --- MEMOIZACIÓN DE VALORES ---
  const selectedNode = useMemo(() => 
    nodes.find(n => n.id === selectedNodeId) || null, 
    [nodes, selectedNodeId]
  );

  const value = useMemo(() => ({
    // Datos
    nodes, 
    logs, 
    activeStreams, 
    kernelMetrics, 
    selectedNode,
    
    // UI State
    activeView,
    isAnalyzing, 
    systemStatus, 
    leftCollapsed, 
    rightCollapsed,
    
    // Métodos
    setLeftCollapsed, 
    setRightCollapsed, 
    updateNodePosition,
    setSelectedNode: selectNode, 
    setActiveView: navigateTo,
    setSystemStatus,
    addLog,
    setActiveStreams
  }), [
    nodes, logs, activeStreams, kernelMetrics, selectedNode, 
    activeView, isAnalyzing, systemStatus, leftCollapsed, rightCollapsed, 
    updateNodePosition, selectNode, navigateTo, addLog
  ]);

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis debe ser usado dentro de un AnalysisProvider');
  }
  return context;
}