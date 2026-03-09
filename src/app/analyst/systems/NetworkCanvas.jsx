"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { NodeCard } from "./NodeCard";
import { DataStreamLine } from "./DataStreamLine";
import { useAnalysis } from "../context/AnalysisContext";
import styles from "../styles/Styles-C/networkCanvas.module.css";

const NODE_CENTER = { x: 100, y: 40 };
const ZOOM_LIMITS = { min: 0.3, max: 2.5 };

export const NetworkCanvas = ({ initialZoom = 1 }) => {
  const { nodes = [], activeStreams = [], updateNodePosition, selectedNode, setSelectedNode, systemStatus } = useAnalysis();
  const containerRef = useRef(null);

  // --- MOTION VALUES ---
  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const zoom = useSpring(Math.min(ZOOM_LIMITS.max, Math.max(ZOOM_LIMITS.min, zoomLevel)), { stiffness: 150, damping: 25 });

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
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

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
            />
          );
          processedPairs.add(pairId);
        }
      });
    });

    return lines;
  }, [nodes, activeStreams, systemStatus]);

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
      </div>

      {/* VIEWPORT */}
      <motion.div
        drag
        dragMomentum
        dragElastic={0.05}
        style={{ x: canvasX, y: canvasY, scale: zoom }}
        className={styles.draggableViewport}
      >
        {/* GRID */}
        <div className={styles.gridLayer} />

        {/* CONEXIONES */}
        <svg className={styles.connectionsLayer} width="5000" height="5000">
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {connectionLines}
        </svg>

        {/* NODOS */}
        <div className={styles.nodesLayer}>
          {nodes.map(node => (
            <NodeCard
              key={node.id}
              node={node}
              handleDrag={updateNodePosition}
              isSelected={selectedNode?.id === node.id}
              isSystemAlert={systemStatus !== "NOMINAL"}
            />
          ))}
        </div>
      </motion.div>

      {/* OVERLAYS */}
      <div className={styles.vignetteOverlay}/>
      <div className={styles.scanlineOverlay}/>
    </div>
  );
};