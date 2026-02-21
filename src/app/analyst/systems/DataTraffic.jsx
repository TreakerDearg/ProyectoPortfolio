"use client";
import React, { useEffect, useState, useRef } from 'react';
import styles from '@/app/analyst/styles/Styles-C/dataTraffic.module.css';

export const DataTraffic = ({ isCritical = false }) => {
  const [bars, setBars] = useState([...Array(24)].map(() => Math.random() * 40 + 20));
  const timerRef = useRef(null); // Referencia para el intervalo

  useEffect(() => {
    // Iniciamos el ciclo de vida de la telemetría
    timerRef.current = setInterval(() => {
      setBars(prev => {
        // Lógica de tendencia: el nuevo valor depende del anterior para suavidad
        const lastVal = prev[prev.length - 1];
        const variance = (Math.random() - 0.5) * 25; // Aumentamos un poco la volatilidad
        const newVal = Math.max(15, Math.min(98, lastVal + variance));
        
        return [...prev.slice(1), newVal];
      });
    }, 120);

    // Limpieza absoluta al desmontar el componente
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Clase dinámica basada en el estado de crisis
  const widgetClass = `${styles.dataTrafficWidget} ${isCritical ? styles.stateCritical : ''}`;

  return (
    <div className={widgetClass}>
      {/* Capas de atmósfera digital */}
      <div className={styles.glassReflection} />
      <div className={styles.widgetScanline} />

      <div className="relative z-10 p-4">
        {/* Header Táctico */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <h4 className={styles.trafficTitle}>Live_Telemetry</h4>
            <div className="flex items-center gap-2">
               <span className={styles.statusDotBlink} />
               <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">
                 Core_Process: Active
               </span>
            </div>
          </div>
          <div className={styles.latencyBadge}>
            <span className="text-[9px] font-mono font-bold">128ms</span>
          </div>
        </div>

        {/* Gráfico de Barras con Transición Suave */}
        <div className={styles.barsContainer}>
          {bars.map((h, i) => (
            <div key={i} className={styles.barWrapper}>
              <div 
                className={styles.barFill} 
                style={{ 
                  height: `${h}%`,
                  // Inyectamos la transición aquí para que React no la recalcule en el CSS estático
                  transition: 'height 0.12s cubic-bezier(0.4, 0, 0.2, 1)' 
                }}
              >
                <div className={styles.barCap} />
              </div>
            </div>
          ))}
        </div>

        {/* Métricas de Red */}
        <div className={styles.dataGridMini}>
          <div className={styles.dataItem}>
            <span className={styles.label}>Input_Stream</span>
            <span className={styles.value}>2.44 <span className={styles.unit}>GB/s</span></span>
          </div>
          <div className={`${styles.dataItem} text-right`}>
            <span className={styles.label}>Packet_Loss</span>
            <span className={`${styles.value} text-red-500/80`}>0.00%</span>
          </div>
        </div>
      </div>

      {/* Footer de Metadata */}
      <div className={styles.widgetFooter}>
        <div className="flex justify-between w-full opacity-40">
          <span>BUFF_X2: [OK]</span>
          <span className="font-bold">SYS_SCAN: 04.22.88</span>
        </div>
      </div>
    </div>
  );
};