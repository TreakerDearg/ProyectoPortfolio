"use client";
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { INITIAL_NODES } from '../data/nodes';

const AnalysisContext = createContext(undefined);

export function AnalysisProvider({ children }) {
  // Estado de UI y Navegación
  const [activeView, setActiveView] = useState('Network_Map');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [systemStatus, setSystemStatus] = useState('NOMINAL');
  
  // Estado de Datos (Nodos y Selección)
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Memoizar el nodo seleccionado para evitar cálculos innecesarios
  const selectedNode = useMemo(() => 
    nodes.find(n => n.id === selectedNodeId) || null, 
    [nodes, selectedNodeId]
  );

  // ACCIÓN: Actualizar posición (DRAG)
  // Optimizamos con programación funcional para evitar mutaciones
  const updateNodePosition = useCallback((id, delta) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === id 
          ? { ...node, x: node.x + delta.x, y: node.y + delta.y } 
          : node
      )
    );
  }, []);

  // ACCIÓN: Navegación con delay de "procesamiento"
  const navigateTo = useCallback((view) => {
    if (view === activeView) return;
    setIsAnalyzing(true);
    setActiveView(view);
    setTimeout(() => setIsAnalyzing(false), 600);
  }, [activeView]);

  // ACCIÓN: Selección de Nodo
  const inspectNode = useCallback((node) => {
    const id = node?.id || node; // Acepta el objeto nodo o solo el ID
    setSelectedNodeId(id === selectedNodeId ? id : id); 
    // Si pasas null, deselecciona
    if (!node) setSelectedNodeId(null);
  }, [selectedNodeId]);

  // Valores del contexto memoizados para prevenir re-renders masivos
  const value = useMemo(() => ({
    nodes,
    selectedNode,
    activeView,
    isAnalyzing,
    systemStatus,
    updateNodePosition,
    setSelectedNode: inspectNode,
    setActiveView: navigateTo,
    setSystemStatus,
    setIsAnalyzing
  }), [nodes, selectedNode, activeView, isAnalyzing, systemStatus, updateNodePosition, inspectNode, navigateTo]);

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