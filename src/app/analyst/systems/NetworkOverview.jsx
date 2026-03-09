"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Styles-C/NetworkOverview.module.css';

export const NetworkOverview = ({ nodes, canvasX, canvasY, focusNode }) => {
  // Ajustamos la escala para que el mapa de 10000px quepa en el radar
  const RADAR_SCALE = 0.015; 
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubX = canvasX.on("change", (v) => setCoords(prev => ({ ...prev, x: v })));
    const unsubY = canvasY.on("change", (v) => setCoords(prev => ({ ...prev, y: v })));
    return () => { unsubX(); unsubY(); };
  }, [canvasX, canvasY]);

  return (
    <div className={styles.radarWrapper}>
      <div className={styles.radarContainer}>
        {/* HEADER MODULAR */}
        <div className={styles.scannerHeader}>
          <div className={styles.tag}>
            <span className={styles.blink}>▶</span>
            <span className={styles.terminalText}>SYS_RADAR_V4.2</span>
          </div>
          <div className={styles.systemLoad}>
            <motion.div 
              className={styles.loadBar} 
              animate={{ width: ["20%", "85%", "60%"] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </div>

        {/* MAPA DE CALOR/REJILLA */}
        <div className={styles.radarMap}>
          <div className={styles.scannerSweep} />
          
          {/* NODOS: Representados como pixeles de datos */}
          {nodes.map(node => (
            <motion.div
              key={`radar-${node.id}`}
              className={styles.radarDot}
              style={{
                left: `calc(50% + ${node.x * RADAR_SCALE}px)`,
                top: `calc(50% + ${node.y * RADAR_SCALE}px)`
              }}
              onClick={() => focusNode(node)}
            >
              <div className={styles.pingRing} />
            </motion.div>
          ))}

          {/* INDICADOR DE VIEWPORT (CORREGIDO) */}
          <div 
            className={styles.viewportIndicator}
            style={{
              left: '50%',
              top: '50%',
              // Invertimos la relación: si el canvas va a la derecha (+x), 
              // el indicador en el radar va a la izquierda (-x)
              transform: `translate(${-coords.x * RADAR_SCALE}px, ${-coords.y * RADAR_SCALE}px)`
            }}
          >
            <div className={styles.focusCorner} />
          </div>
        </div>

        {/* TELEMETRÍA INFERIOR */}
        <div className={styles.scannerFooter}>
          <div className={styles.coordGroup}>
            <div className={styles.dataPoint}>
              <span className={styles.label}>X_POS</span>
              <span className={styles.value}>{Math.round(coords.x).toString().padStart(6, '0')}</span>
            </div>
            <div className={styles.dataPoint}>
              <span className={styles.label}>Y_POS</span>
              <span className={styles.value}>{Math.round(coords.y).toString().padStart(6, '0')}</span>
            </div>
          </div>
          <div className={styles.statusInfo}>
            ACTIVE_NODES: {nodes.length.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};