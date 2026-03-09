"use client";
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAnalysis } from '../context/AnalysisContext';
import styles from '../styles/Styles-C/dataStreamLine.module.css';

// ================= FUNCIÓN AUXILIAR =================
const getLineStats = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const distance = Math.sqrt(dx*dx + dy*dy);
  const width = Math.max(1.5, 4 - (distance / 400)); // grosor dinámico
  const duration = Math.max(0.6, distance / 250); // velocidad de animación
  return { distance, width, duration };
};

// ================= COMPONENTE =================
export const DataStreamLine = ({ sourceNode, targetNode, isAlert, load = 50 }) => {
  const { selectedNode } = useAnalysis();

  const { x1, y1, x2, y2 } = {
    x1: sourceNode.x,
    y1: sourceNode.y,
    x2: targetNode.x,
    y2: targetNode.y
  };

  const { distance, width, duration } = useMemo(
    () => getLineStats({ x: x1, y: y1 }, { x: x2, y: y2 }),
    [x1, y1, x2, y2]
  );

  const isSelected = useMemo(
    () => selectedNode && (selectedNode.id === sourceNode.id || selectedNode.id === targetNode.id),
    [selectedNode, sourceNode.id, targetNode.id]
  );

  const streamColor = useMemo(() => {
    if (isAlert) return '#f43f5e'; // rojo crítico
    if (isSelected) return '#a855f7'; // violeta seleccion
    return sourceNode.color || '#7c3aed'; // violeta por defecto
  }, [isAlert, isSelected, sourceNode.color]);

  const gradientId = `grad-${sourceNode.id}-${targetNode.id}`;

  return (
    <g className={`${styles.streamGroup} ${isSelected ? styles.active : ''}`}>
      {/* ================= GRADIENTE DEL CONDUCTO ================= */}
      <defs>
        <linearGradient
          id={gradientId}
          x1={x1} y1={y1} x2={x2} y2={y2}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={streamColor} stopOpacity="0.1" />
          <stop offset="50%" stopColor={streamColor} stopOpacity="0.5" />
          <stop offset="100%" stopColor={streamColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* ================= CONDUCTO BASE ================= */}
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={`url(#${gradientId})`}
        strokeWidth={width}
        fill="none"
        className={styles.conduitBase}
      />

      {/* ================= FLUJO CONTINUO ================= */}
      <motion.path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={streamColor}
        strokeWidth={width * 0.4}
        fill="none"
        strokeDasharray="3,12"
        strokeLinecap="round"
        animate={{ strokeDashoffset: [50, 0] }}
        transition={{ duration: duration * 3, repeat: Infinity, ease: "linear" }}
      />

      {/* ================= PULSOS DE DATOS ================= */}
      <motion.path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={streamColor}
        strokeWidth={width * 1.2}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`2, ${distance / (load > 0 ? (load / 8) : 1)}`}
        animate={{ strokeDashoffset: [distance, 0] }}
        transition={{
          duration: isAlert ? duration * 0.25 : duration / (1 + (load / 100)),
          repeat: Infinity,
          ease: "linear"
        }}
        filter={isSelected || isAlert ? "url(#neonGlow)" : "none"}
      />

      {/* ================= HIT DE SELECCIÓN ================= */}
      {isSelected && (
        <motion.circle
          r={width + 1}
          fill="#fff"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: duration * 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            offsetPath: `path('M ${x1} ${y1} L ${x2} ${y2}')`,
            filter: `drop-shadow(0 0 6px ${streamColor})`
          }}
        />
      )}
    </g>
  );
};