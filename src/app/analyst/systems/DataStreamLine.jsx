"use client";
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAnalysis } from '../context/AnalysisContext';
import styles from '@/app/analyst/styles/Styles-C/dataStreamLine.module.css';

const calculateDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

export const DataStreamLine = ({ sourceNode, targetNode }) => {
  const { selectedNode } = useAnalysis();

  const x1 = sourceNode.x;
  const y1 = sourceNode.y;
  const x2 = targetNode.x;
  const y2 = targetNode.y;
  const color = sourceNode.color;

  // Calculamos la física de la línea basada en la distancia
  const { distance, dynamicWidth, dynamicDuration } = useMemo(() => {
    const dist = calculateDistance({ x: x1, y: y1 }, { x: x2, y: y2 });
    
    // Grosor: Más cerca = Conducto más robusto
    const mappedWidth = Math.max(0.8, 3 - (dist / 250)); 
    
    // Velocidad: Más cerca = Transferencia casi instantánea
    const mappedDuration = Math.max(0.8, dist / 200); 
    
    return { distance: dist, dynamicWidth: mappedWidth, dynamicDuration: mappedDuration };
  }, [x1, y1, x2, y2]);

  const isConnectedToSelected = useMemo(() => 
    selectedNode && (selectedNode.id === sourceNode.id || selectedNode.id === targetNode.id),
    [selectedNode, sourceNode.id, targetNode.id]
  );

  const gradientId = `grad-${sourceNode.id}-${targetNode.id}`;

  return (
    <g className={`${styles.streamGroup} ${isConnectedToSelected ? styles.selectedStream : ''}`}>
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        <filter id="glowLine">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. EL CONDUCTO - Reacciona al ancho dinámico */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        className={styles.conduit}
        stroke={`url(#${gradientId})`}
        strokeWidth={dynamicWidth}
      />
      
      {/* 2. FLUJO PRIMARIO - Pulso de datos base */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={dynamicWidth * 0.5}
        className={styles.primaryFlux}
        strokeDasharray="5, 15" 
        animate={{ strokeDashoffset: [0, -40] }}
        transition={{
          duration: dynamicDuration * 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 3. IMPULSOS TÁCTICOS - Los "paquetes" que brillan al seleccionar */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={dynamicWidth * 0.7}
        className={styles.dataBit}
        strokeDasharray="2, 60" 
        animate={{ strokeDashoffset: [120, -120] }}
        transition={{
          duration: dynamicDuration,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 4. PUNTO DE CABEZA - Partícula de alta energía */}
      <motion.circle
        r={isConnectedToSelected ? 2.5 : 1.5}
        fill="#fff"
        animate={{ 
            offsetDistance: "100%",
            filter: isConnectedToSelected 
                ? [`drop-shadow(0 0 2px ${color})`, `drop-shadow(0 0 8px ${color})`, `drop-shadow(0 0 2px ${color})`] 
                : `drop-shadow(0 0 4px ${color})`
        }}
        transition={{
          offsetDistance: {
            duration: dynamicDuration * 0.8,
            repeat: Infinity,
            ease: "linear"
          },
          filter: {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        style={{ 
          offsetPath: `path('M ${x1} ${y1} L ${x2} ${y2}')`,
        }}
      />
    </g>
  ); 
};