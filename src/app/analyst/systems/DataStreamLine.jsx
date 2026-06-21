"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnalysis } from '../context/AnalysisContext';
import { Lock, Unlock, Shield, ShieldAlert } from 'lucide-react';
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
export const DataStreamLine = ({ sourceNode, targetNode, isAlert, load = 50, encrypted = true, securityLevel = 'normal', company = 'neutral' }) => {
  const { selectedNode } = useAnalysis();
  const [dataPackets, setDataPackets] = useState([]);

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
    if (securityLevel === 'compromised') return '#ef4444'; // rojo comprometido
    if (isSelected) return '#a855f7'; // violeta seleccion
    
    // Company-specific colors
    switch (company.toLowerCase()) {
      case 'arasaka':
        return '#ef4444'; // rojo corporativo
      case 'militech':
        return '#22c55e'; // verde biológico
      case 'kangtao':
        return '#a855f7'; // violeta holográfico
      case 'neutral':
        return '#3b82f6'; // azul neutral
      default:
        return sourceNode.color || '#7c3aed'; // color por defecto
    }
  }, [isAlert, isSelected, sourceNode.color, securityLevel, company]);

  // Bandwidth visualization - thickness based on load
  const bandwidthWidth = useMemo(() => {
    return Math.max(1, Math.min(6, (load / 100) * 4 + 1));
  }, [load]);

  const gradientId = `grad-${sourceNode.id}-${targetNode.id}`;

  // Company-specific data packet style
  const packetStyle = useMemo(() => {
    switch (company.toLowerCase()) {
      case 'arasaka':
        return { shape: 'square' };
      case 'militech':
        return { shape: 'circle' };
      case 'kangtao':
        return { shape: 'hexagon' };
      default:
        return { shape: 'circle' };
    }
  }, [company]);

  // Generate data packets
  useEffect(() => {
    const packetCount = Math.max(1, Math.floor(load / 20));
    const newPackets = [];
    for (let i = 0; i < packetCount; i++) {
      newPackets.push({
        id: i,
        delay: i * (duration / packetCount),
        progress: (i / packetCount) * 100
      });
    }
    setDataPackets(newPackets);
  }, [load, duration]);

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

      {/* ================= CONDUCTO BASE (BANDWIDTH) ================= */}
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={`url(#${gradientId})`}
        strokeWidth={bandwidthWidth}
        fill="none"
        className={styles.conduitBase}
      />

      {/* ================= FLUJO CONTINUO ================= */}
      <motion.path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={streamColor}
        strokeWidth={bandwidthWidth * 0.4}
        fill="none"
        strokeDasharray="3,12"
        strokeLinecap="round"
        animate={{ strokeDashoffset: [50, 0] }}
        transition={{ duration: duration * 3, repeat: Infinity, ease: "linear" }}
      />

      {/* ================= DATA PACKETS ================= */}
      {dataPackets.map((packet) => (
        <motion.g
          key={packet.id}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: packet.delay,
            ease: "linear"
          }}
          style={{
            offsetPath: `path('M ${x1} ${y1} L ${x2} ${y2}')`,
            filter: `drop-shadow(0 0 4px ${streamColor})`
          }}
          className={styles.dataPacket}
        >
          {packetStyle.shape === 'square' ? (
            <rect x="-3" y="-3" width="6" height="6" fill={streamColor} />
          ) : packetStyle.shape === 'hexagon' ? (
            <polygon points="0,-3.5 3,-1.75 3,1.75 0,3.5 -3,1.75 -3,-1.75" fill={streamColor} />
          ) : (
            <circle r={3} fill={streamColor} />
          )}
        </motion.g>
      ))}

      {/* ================= PULSOS DE DATOS ================= */}
      <motion.path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={streamColor}
        strokeWidth={bandwidthWidth * 1.2}
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

      {/* ================= ENCRYPTION STATUS INDICATOR ================= */}
      <foreignObject x={(x1 + x2) / 2 - 12} y={(y1 + y2) / 2 - 12} width="24" height="24">
        <div className={styles.encryptionBadge}>
          {encrypted ? (
            <Lock size={12} color={securityLevel === 'compromised' ? '#ef4444' : '#22c55e'} />
          ) : (
            <Unlock size={12} color="#f59e0b" />
          )}
        </div>
      </foreignObject>

      {/* ================= SECURITY LEVEL INDICATOR ================= */}
      {securityLevel !== 'normal' && (
        <foreignObject x={(x1 + x2) / 2 + 12} y={(y1 + y2) / 2 - 12} width="24" height="24">
          <div className={styles.securityBadge}>
            {securityLevel === 'compromised' ? (
              <ShieldAlert size={12} color="#ef4444" />
            ) : (
              <Shield size={12} color="#22c55e" />
            )}
          </div>
        </foreignObject>
      )}

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