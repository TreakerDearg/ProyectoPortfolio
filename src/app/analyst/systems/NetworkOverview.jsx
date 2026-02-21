"use client";
import React, { useCallback, useRef, useMemo } from 'react'; // Añadido useMemo
import { motion } from 'framer-motion';
import { useAnalysis } from '../context/AnalysisContext';
import styles from '@/app/analyst/styles/Styles-C/networkOverview.module.css';

const OVERVIEW_SCALE = 0.15;

export const NetworkOverview = ({ currentViewBox = { x: 0, y: 0, width: 0, height: 0 } }) => {
  const { nodes, selectedNode, updateNodePosition } = useAnalysis();
  const overviewRef = useRef(null);

  // 2. Calcular límites de forma segura
  const networkBounds = useMemo(() => {
    const xs = nodes.map(n => n.x || 0);
    const ys = nodes.map(n => n.y || 0);
    
    return {
      minX: Math.min(...xs),
      minY: Math.min(...ys),
      maxX: Math.max(...xs),
      maxY: Math.max(...ys)
    };
  }, [nodes]);

  const handleViewBoxDrag = useCallback((e, info) => {
    const deltaX = info.delta.x / OVERVIEW_SCALE;
    const deltaY = info.delta.y / OVERVIEW_SCALE;
    
    nodes.forEach(node => {
        updateNodePosition(node.id, { x: -deltaX, y: -deltaY });
    });
  }, [nodes, updateNodePosition]);

  // 1. Validar que existan nodos antes de proceder
  if (!nodes || nodes.length === 0) return null;

  const networkWidth = (networkBounds.maxX - networkBounds.minX) + 100;
  const networkHeight = (networkBounds.maxY - networkBounds.minY) + 100;

  const overviewWidth = networkWidth * OVERVIEW_SCALE;
  const overviewHeight = networkHeight * OVERVIEW_SCALE;

  // 3. Mapeo seguro del ViewBox
  const viewBox = useMemo(() => {
    return {
      x: (currentViewBox.x - networkBounds.minX) * OVERVIEW_SCALE,
      y: (currentViewBox.y - networkBounds.minY) * OVERVIEW_SCALE,
      width: (currentViewBox.width || 0) * OVERVIEW_SCALE,
      height: (currentViewBox.height || 0) * OVERVIEW_SCALE
    };
  }, [currentViewBox, networkBounds]);

  return (
    <motion.div 
      className={styles.overviewContainer}
      style={{ width: overviewWidth, height: overviewHeight }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <svg 
        width="100%" 
        height="100%" 
        // viewBox dinámico para que los nodos siempre estén centrados en el mini-mapa
        viewBox={`${networkBounds.minX * OVERVIEW_SCALE} ${networkBounds.minY * OVERVIEW_SCALE} ${overviewWidth} ${overviewHeight}`}
        className={styles.overviewSvg}
        ref={overviewRef}
      >
        {/* Líneas simplificadas */}
        {nodes.map((sourceNode, i) =>
          nodes.slice(i + 1).map((targetNode) => (
            <line
              key={`ov-l-${sourceNode.id}-${targetNode.id}`}
              x1={(sourceNode.x) * OVERVIEW_SCALE}
              y1={(sourceNode.y) * OVERVIEW_SCALE}
              x2={(targetNode.x) * OVERVIEW_SCALE}
              y2={(targetNode.y) * OVERVIEW_SCALE}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
            />
          ))
        )}

        {/* Nodos simplificados */}
        {nodes.map(node => (
          <circle
            key={`ov-n-${node.id}`}
            cx={(node.x) * OVERVIEW_SCALE}
            cy={(node.y) * OVERVIEW_SCALE}
            r={1.5}
            fill={selectedNode?.id === node.id ? '#eab308' : node.color}
            opacity={selectedNode?.id === node.id ? 1 : 0.6}
          />
        ))}

        {/* El visor táctico */}
        <motion.rect
          x={viewBox.x}
          y={viewBox.y}
          width={viewBox.width}
          height={viewBox.height}
          className={styles.viewBox}
          drag
          dragMomentum={false}
          onDrag={handleViewBoxDrag}
        />
      </svg>
      
      {/* Decoración HUD para el mini-mapa */}
      <div className={styles.scanEffect} />
    </motion.div>
  );
};