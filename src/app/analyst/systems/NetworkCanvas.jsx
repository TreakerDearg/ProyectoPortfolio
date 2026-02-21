"use client";
import React from 'react';
import { NodeCard } from './NodeCard';
import { useAnalysis } from '../context/AnalysisContext';
import { DataStreamLine } from './DataStreamLine';
import styles from '@/app/analyst/styles/Styles-C/networkCanvas.module.css';

export const NetworkCanvas = () => {
  const { nodes, updateNodePosition, setSelectedNode, selectedNode } = useAnalysis();

  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedNode(null); // Deselecciona si el clic es en el fondo
    }
  };

  const CENTER_OFFSET = 27; 

  return (
    <div className={styles.canvasWrapper} onClick={handleCanvasClick}>
      <div className={styles.coordinateSystems}>
        <div className={styles.horizonLine} />
        <div className={styles.verticalIndex} />
      </div>
      
      <svg className={styles.connectionsLayer}>
        {nodes.map((sourceNode, i) =>
          nodes.slice(i + 1).map((targetNode) => (
            <DataStreamLine
              key={`${sourceNode.id}-${targetNode.id}`}
              // ¡CAMBIO CLAVE AQUÍ! Pasamos los nodos completos
              sourceNode={{ ...sourceNode, x: sourceNode.x + CENTER_OFFSET, y: sourceNode.y + CENTER_OFFSET }}
              targetNode={{ ...targetNode, x: targetNode.x + CENTER_OFFSET, y: targetNode.y + CENTER_OFFSET }}
            />
          ))
        )}
      </svg>

      <div className={styles.nodesLayer}>
        {nodes.map((node) => (
          <NodeCard 
            key={node.id} 
            node={node} 
            handleDrag={updateNodePosition} 
          />
        ))}
      </div>

      <div className={styles.canvasLegend}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} />
          <span>LIVE_NODES: {nodes.length}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#a855f7'}} />
          <span>FOCUS: {selectedNode ? selectedNode.name : 'IDLE'}</span>
        </div>
      </div>
    </div>
  ); 
};