"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { NodeCard } from "./NodeCard";
import { DataStreamLine } from "./DataStreamLine";
import { NodeContextMenu } from "./NodeContextMenu";
import { NodeFilter } from "./NodeFilter";
import { NetworkTopology } from "./NetworkTopology";
import { SecurityMonitoring } from "./SecurityMonitoring";
import { ThreatLevelIndicator } from "./ThreatLevelIndicator";
import { useAnalysis } from "../context/AnalysisContext";
import styles from "../styles/Styles-C/networkCanvas.module.css";

const NODE_CENTER = { x: 100, y: 40 };
const ZOOM_LIMITS = { min: 0.5, max: 3 };

export const NetworkCanvas = ({ initialZoom = 1 }) => {
  const { nodes = [], activeStreams = [], updateNodePosition, selectedNode, setSelectedNode, systemStatus, addConnection } = useAnalysis();
  const containerRef = useRef(null);

  // --- DRAG-TO-CONNECT STATE ---
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStartNode, setConnectionStartNode] = useState(null);
  const [connectionEndPosition, setConnectionEndPosition] = useState({ x: 0, y: 0 });

  // --- CONTEXT MENU STATE ---
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    node: null,
    position: { x: 0, y: 0 }
  });

  // --- FILTER STATE ---
  const [filters, setFilters] = useState({
    company: "all",
    securityLevel: "all",
    status: "all"
  });
  const [groupBy, setGroupBy] = useState("none");

  // --- MOBILE DETECTOR ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- MOTION VALUES ---
  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const zoom = useSpring(Math.min(ZOOM_LIMITS.max, Math.max(ZOOM_LIMITS.min, zoomLevel)), { stiffness: 150, damping: 25 });

  // --- AUTO-CENTER ON MOBILE ---
  useEffect(() => {
    if (isMobile && nodes.length > 0) {
      // Calculate center of all nodes
      const centerX = nodes.reduce((sum, n) => sum + n.x, 0) / nodes.length;
      const centerY = nodes.reduce((sum, n) => sum + n.y, 0) / nodes.length;
      canvasX.set(-centerX + window.innerWidth / 2);
      canvasY.set(-centerY + window.innerHeight / 2);
    }
  }, [isMobile, nodes, canvasX, canvasY]);

  // --- PREVENT BODY SCROLL DURING DRAG ---
  const handleDragStart = () => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  };

  const handleDragEnd = () => {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  // --- ZOOM HANDLERS ---
  const handleZoom = (delta) => {
    setZoomLevel(prev => Math.min(ZOOM_LIMITS.max, Math.max(ZOOM_LIMITS.min, prev + delta)));
  };

  const handleZoomChange = (e) => {
    const value = parseFloat(e.target.value);
    setZoomLevel(value);
  };

  // --- KEYBOARD SUPPORT ---
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "+" || e.key === "=") handleZoom(0.1);
      if (e.key === "-") handleZoom(-0.1);
      if (e.key === "Escape") {
        if (isConnecting) {
          setIsConnecting(false);
          setConnectionStartNode(null);
        }
        if (contextMenu.visible) {
          setContextMenu({ visible: false, node: null, position: { x: 0, y: 0 } });
        }
      }
      if (e.key === "Delete" && selectedNode) {
        // Handle delete node
        console.log("Delete node:", selectedNode.id);
      }
      if (e.key === "c" && (e.ctrlKey || e.metaKey) && selectedNode) {
        e.preventDefault();
        // Handle copy node
        console.log("Copy node:", selectedNode.id);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [isConnecting, contextMenu.visible, selectedNode]);

  // --- DRAG-TO-CONNECT HANDLERS ---
  const handleConnectionStart = (node, e) => {
    if (e.shiftKey) {
      setIsConnecting(true);
      setConnectionStartNode(node);
      const rect = containerRef.current.getBoundingClientRect();
      setConnectionEndPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleConnectionMove = (e) => {
    if (isConnecting && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setConnectionEndPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleConnectionEnd = (targetNode) => {
    if (isConnecting && connectionStartNode && targetNode && connectionStartNode.id !== targetNode.id) {
      addConnection?.(connectionStartNode.id, targetNode.id);
    }
    setIsConnecting(false);
    setConnectionStartNode(null);
  };

  const handleConnectionCancel = () => {
    setIsConnecting(false);
    setConnectionStartNode(null);
  };

  // Track mouse movement for connection line
  useEffect(() => {
    if (isConnecting) {
      const handleMouseMove = (e) => handleConnectionMove(e);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleConnectionCancel);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleConnectionCancel);
      };
    }
  }, [isConnecting]);

  // --- CONTEXT MENU HANDLERS ---
  const handleContextMenu = (node, e) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      visible: true,
      node,
      position: { x: e.clientX, y: e.clientY }
    });
  };

  const handleContextMenuAction = (action, node) => {
    console.log("Context menu action:", action, node);
    // Handle different actions based on action type
    switch (action) {
      case "delete":
        // Delete node logic
        break;
      case "duplicate":
        // Duplicate node logic
        break;
      case "connect":
        // Start connection mode
        break;
      case "view":
        // View details logic
        break;
      case "security":
        // Show security info logic
        break;
      case "lock":
        // Lock node logic
        break;
      case "unlock":
        // Unlock node logic
        break;
      case "hide":
        // Hide node logic
        break;
    }
  };

  // --- CONNECTION LINES ---
  const connectionLines = useMemo(() => {
    const lines = [];
    const processedPairs = new Set();

    nodes.forEach(sourceNode => {
      if (!sourceNode.connections) return;
      sourceNode.connections.forEach(targetId => {
        const pairId = [sourceNode.id, targetId].sort().join("-");
        if (processedPairs.has(pairId)) return;

        const targetNode = nodes.find(n => n.id === targetId);
        if (targetNode) {
          const activeStream = activeStreams.find(s =>
            (s.source === sourceNode.id && s.target === targetId) ||
            (s.source === targetId && s.target === sourceNode.id)
          );

          lines.push(
            <DataStreamLine
              key={`line-${pairId}`}
              sourceNode={{ ...sourceNode, x: sourceNode.x + NODE_CENTER.x, y: sourceNode.y + NODE_CENTER.y }}
              targetNode={{ ...targetNode, x: targetNode.x + NODE_CENTER.x, y: targetNode.y + NODE_CENTER.y }}
              load={activeStream ? activeStream.load : 0}
              isAlert={systemStatus !== "NOMINAL" || (activeStream?.load > 85)}
              company={sourceNode.company}
            />
          );
          processedPairs.add(pairId);
        }
      });
    });

    return lines;
  }, [nodes, activeStreams, systemStatus]);

  // --- FILTERED NODES ---
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      if (filters.company !== "all" && node.company?.toLowerCase() !== filters.company) return false;
      if (filters.securityLevel !== "all" && node.securityLevel?.toLowerCase() !== filters.securityLevel) return false;
      if (filters.status !== "all" && node.status?.toLowerCase() !== filters.status) return false;
      return true;
    });
  }, [nodes, filters]);

  // --- GROUPED NODES ---
  const groupedNodes = useMemo(() => {
    if (groupBy === "none") return { all: filteredNodes };

    return filteredNodes.reduce((groups, node) => {
      const key = node[groupBy] || "unknown";
      if (!groups[key]) groups[key] = [];
      groups[key].push(node);
      return groups;
    }, {});
  }, [filteredNodes, groupBy]);

  return (
    <div
      ref={containerRef}
      className={`${styles.canvasWrapper} ${systemStatus !== "NOMINAL" ? styles.systemAlert : ""}`}
      onClick={() => setSelectedNode(null)}
    >
      {/* HUD superior */}
      <div className={styles.canvasInterface}>
        <div className={styles.hudTop}>
          <div className={styles.statsBox}>
            <span className={styles.statLabel}>GRID</span>
            <span className={styles.statValue}>{Math.round(-canvasX.get())}:{Math.round(-canvasY.get())}</span>
          </div>

          <div className={styles.statsBox}>
            <span className={styles.statLabel}>ZOOM</span>
            <span className={styles.statValue}>{(zoomLevel * 100).toFixed(0)}%</span>
          </div>

          <div className={styles.statsBox} style={{ minWidth: "100px" }}>
            <span className={styles.statLabel}>NET</span>
            <span className={`${systemStatus === "NOMINAL" ? styles.nominalText : styles.alertText}`}>
              {systemStatus}
            </span>
          </div>

          <NodeFilter
            nodes={nodes}
            onFilter={setFilters}
            onGroup={setGroupBy}
          />
        </div>

        {/* SLIDER DE ZOOM */}
        <div className={styles.zoomSliderWrapper}>
          <input
            type="range"
            min={ZOOM_LIMITS.min}
            max={ZOOM_LIMITS.max}
            step={0.01}
            value={zoomLevel}
            onChange={handleZoomChange}
            className={styles.zoomSlider}
          />
        </div>

        {/* BOTONES DE ZOOM */}
        <div className={styles.zoomControls}>
          <button className={styles.zoomBtn} onClick={() => handleZoom(0.1)}>+</button>
          <button className={styles.zoomBtn} onClick={() => handleZoom(-0.1)}>-</button>
        </div>

        {/* NETWORK TOPOLOGY */}
        <NetworkTopology
          nodes={nodes}
          connections={activeStreams}
          viewport={{ x: canvasX.get(), y: canvasY.get(), scale: zoom.get() }}
          onViewportClick={({ x, y }) => {
            canvasX.set(-x);
            canvasY.set(-y);
          }}
        />

        {/* SECURITY MONITORING */}
        <SecurityMonitoring
          nodes={nodes}
          systemStatus={systemStatus}
        />

        {/* THREAT LEVEL INDICATOR */}
        <ThreatLevelIndicator
          nodes={nodes}
          systemStatus={systemStatus}
        />
      </div>

      {/* VIEWPORT */}
      <motion.div
        drag
        dragMomentum
        dragElastic={0.05}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x: canvasX, y: canvasY, scale: zoom }}
        className={styles.draggableViewport}
      >
        {/* GRID */}
        <div className={styles.gridLayer} />

        {/* CONEXIONES */}
        <svg
          className={styles.connectionsLayer}
          width={isMobile ? "calc(100vw * 3)" : "5000"}
          height={isMobile ? "calc(100vh * 3)" : "5000"}
        >
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {connectionLines}
          
          {/* TEMPORARY CONNECTION LINE */}
          {isConnecting && connectionStartNode && (
            <line
              x1={connectionStartNode.x + NODE_CENTER.x}
              y1={connectionStartNode.y + NODE_CENTER.y}
              x2={connectionEndPosition.x}
              y2={connectionEndPosition.y}
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="5,5"
              className={styles.tempConnectionLine}
            />
          )}
        </svg>

        {/* NODOS */}
        <div className={styles.nodesLayer}>
          {Object.entries(groupedNodes).map(([groupKey, groupNodes]) => (
            <React.Fragment key={groupKey}>
              {groupBy !== "none" && (
                <div className={styles.groupLabel}>
                  {groupKey.toUpperCase()}
                </div>
              )}
              {groupNodes.map(node => (
                <NodeCard
                  key={node.id}
                  node={node}
                  handleDrag={updateNodePosition}
                  isSelected={selectedNode?.id === node.id}
                  isSystemAlert={systemStatus !== "NOMINAL"}
                  onConnectionStart={handleConnectionStart}
                  onConnectionEnd={handleConnectionEnd}
                  isConnecting={isConnecting}
                  onContextMenu={handleContextMenu}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* OVERLAYS */}
      <div className={styles.vignetteOverlay}/>
      <div className={styles.scanlineOverlay}/>

      {/* CONTEXT MENU */}
      <NodeContextMenu
        node={contextMenu.node}
        position={contextMenu.position}
        onClose={() => setContextMenu({ visible: false, node: null, position: { x: 0, y: 0 } })}
        onAction={handleContextMenuAction}
      />
    </div>
  );
};