"use client";
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { 
  INITIAL_NODES, 
  SECURITY_LOGS, 
  INITIAL_STREAMS, 
  INITIAL_KERNEL_STATE 
} from '../data/nodes';

const AnalysisContext = createContext(undefined);

export function AnalysisProvider({ children }) {
  const [activeView, setActiveView] = useState('Network_Map');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [systemStatus, setSystemStatus] = useState('NOMINAL');
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [logs, setLogs] = useState(SECURITY_LOGS);
  const [activeStreams, setActiveStreams] = useState(INITIAL_STREAMS);
  const [kernelMetrics, setKernelMetrics] = useState(INITIAL_KERNEL_STATE);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // --- SIMULACIÓN DE HARDWARE ---
  useEffect(() => {
    const interval = setInterval(() => {
      setKernelMetrics(prev => ({
        ...prev,
        cpu: {
          ...prev.cpu,
          baseLoad: parseFloat((prev.cpu.baseLoad + (Math.random() * 2 - 1)).toFixed(2))
        },
        threads: 1200 + Math.floor(Math.random() * 100)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- NUEVO: GENERADOR DE LOGS ALEATORIOS ---
  useEffect(() => {
    const logInterval = setInterval(() => {
      const events = [
        { event: 'DDoS_Mitigation_Active', level: 'warning', status: 'FILTERING' },
        { event: 'Node_Handshake_Complete', level: 'info', status: 'CLEAN' },
        { event: 'Encrypted_Tunnel_Opened', level: 'info', status: 'SUCCESS' },
        { event: 'Heuristic_Anomaly_Detected', level: 'critical', status: 'BLOCKED' },
        { event: 'Auth_Token_Rotation', level: 'info', status: 'SUCCESS' }
      ];

      const origins = ['CORE_NODE', 'EXTERNAL_GATEWAY', 'DB_CLUSTER', 'SUBNET_0x4', 'NEURAL_LINK'];
      
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const randomOrigin = origins[Math.floor(Math.random() * origins.length)];
      
      const newLog = {
        id: `L-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
        origin: randomOrigin,
        ...randomEvent
      };

      setLogs(prevLogs => {
        // Mantener solo los últimos 20 logs para optimizar performance
        const updatedLogs = [newLog, ...prevLogs];
        return updatedLogs.slice(0, 20);
      });

      // Si el evento es crítico, cambiamos el status del sistema brevemente
      if (newLog.level === 'critical') {
        setSystemStatus('WARNING');
        setTimeout(() => setSystemStatus('NOMINAL'), 4000);
      }
    }, 10000); // Cada 10 segundos

    return () => clearInterval(logInterval);
  }, []);

  // --- MEMOIZACIÓN Y ACCIONES ---
  const selectedNode = useMemo(() => 
    nodes.find(n => n.id === selectedNodeId) || null, 
    [nodes, selectedNodeId]
  );

  const updateNodePosition = useCallback((id, delta) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === id ? { ...node, x: node.x + delta.x, y: node.y + delta.y } : node
      )
    );
  }, []);

  const navigateTo = useCallback((view) => {
    if (view === activeView) return;
    setIsAnalyzing(true);
    setActiveView(view);
    setTimeout(() => setIsAnalyzing(false), 800);
  }, [activeView]);

  const inspectNode = useCallback((node) => {
    const id = node?.id || node;
    setSelectedNodeId(id); 
    if (!node) setSelectedNodeId(null);
  }, []);

  const value = useMemo(() => ({
    nodes, logs, activeStreams, kernelMetrics, selectedNode, activeView,
    isAnalyzing, systemStatus, leftCollapsed, rightCollapsed,
    setLeftCollapsed, setRightCollapsed, updateNodePosition,
    setSelectedNode: inspectNode, setActiveView: navigateTo,
    setSystemStatus, setIsAnalyzing, setLogs, setActiveStreams
  }), [
    nodes, logs, activeStreams, kernelMetrics, selectedNode, activeView, 
    isAnalyzing, systemStatus, leftCollapsed, rightCollapsed, 
    updateNodePosition, inspectNode, navigateTo
  ]);

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis debe ser usado dentro de un AnalysisProvider');
  }
  return context;
}