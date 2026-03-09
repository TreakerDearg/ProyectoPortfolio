"use client";
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Activity, Zap, ShieldAlert, BarChart3, Wifi, Server } from 'lucide-react';
import styles from '../styles/Styles-C/dataTraffic.module.css';

// Hook para detectar preferencia de movimiento reducido
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
};

export const DataTraffic = ({ isCritical = false }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Cantidad de barras en el monitor (32 para un look denso)
  const barCount = 32;
  
  // Estado inicial estable
  const initialBars = useMemo(() => 
    [...Array(barCount)].map(() => Math.floor(Math.random() * 40 + 20)), 
    []
  );
  
  const [bars, setBars] = useState(initialBars);
  const [metrics, setMetrics] = useState({ stream: 2.44, loss: 0.00 });
  const timerRef = useRef(null);

  // LÓGICA DE TELEMETRÍA: Ruido Browniano para movimiento orgánico
  const updateTelemetry = useCallback(() => {
    setBars(prev => {
      const lastVal = prev[prev.length - 1];
      
      // En estado crítico la volatilidad es mayor y los picos son más altos
      const volatility = isCritical ? 28 : 14;
      const drift = isCritical ? 8 : 0; 
      
      const change = (Math.random() - 0.5) * volatility + drift;
      const newVal = Math.max(10, Math.min(98, lastVal + change));
      
      // Desplazamos el array (ventana deslizante)
      return [...prev.slice(1), newVal];
    });

    // Fluctuar métricas numéricas secundarias
    setMetrics(prev => ({
      stream: Math.max(0.5, Math.min(9.9, prev.stream + (Math.random() - 0.5) * 0.2)),
      loss: isCritical 
        ? Math.max(1.2, Math.min(5.8, prev.loss + (Math.random() - 0.2) * 0.5)) 
        : 0.00
    }));
  }, [isCritical]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Velocidad de refresco: más rápida en crítico para aumentar la tensión
    const intervalTime = isCritical ? 65 : 110;
    timerRef.current = setInterval(updateTelemetry, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [updateTelemetry, isCritical, prefersReducedMotion]);

  return (
    <div 
      className={`${styles.dataTrafficWidget} ${isCritical ? styles.stateCritical : ''}`}
      role="complementary"
      aria-label="Network telemetry monitor"
    >
      {/* Efectos visuales de HUD */}
      <div className={styles.glassReflection} />
      <div className={styles.widgetScanline} />

      {/* CABECERA: Status del Canal */}
      <div className={styles.widgetHeader}>
        <div className={styles.trafficTitle}>
          {isCritical ? (
            <ShieldAlert size={12} className="text-red-500 animate-pulse" />
          ) : (
            <Activity size={12} className="text-cyan-400" />
          )}
          <span>DATA_LINK_STREAMS</span>
        </div>
        <div className={styles.latencyBadge}>
          {isCritical ? 'ERR_LATENCY: >450ms' : 'LATENCY: 12ms'}
        </div>
      </div>

      {/* MONITOR DE BARRAS (OSCILOSCOPIO) */}
      <div className={styles.barsContainer} aria-hidden="true">
        {bars.map((h, i) => (
          <div key={i} className={styles.barWrapper}>
            <div 
              className={styles.barFill} 
              style={{ 
                height: `${h}%`,
                // Efecto de rastro: las barras más viejas (izquierda) son más transparentes
                opacity: 0.2 + (i / barCount) * 0.8,
                transition: prefersReducedMotion ? 'none' : 'height 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Solo la barra de lectura actual tiene el cabezal brillante */}
              {i === bars.length - 1 && <div className={styles.barCap} />}
            </div>
          </div>
        ))}
      </div>

      {/* MÉTRICAS DE RED DINÁMICAS */}
      <div className={styles.dataGridMini}>
        <div className={styles.dataItem}>
          <div className="flex items-center gap-1 mb-1">
            <Zap size={10} className={isCritical ? 'text-red-400' : 'text-cyan-400'} />
            <span className={styles.label}>Incoming_Flux</span>
          </div>
          <span className={styles.value}>
            {isCritical ? (Math.random() * 9).toFixed(2) : metrics.stream.toFixed(2)}
            <span className={styles.unit}>GB/s</span>
          </span>
        </div>

        <div className={styles.dataItem}>
          <div className="flex items-center gap-1 mb-1">
            <BarChart3 size={10} className={isCritical ? 'text-red-400' : 'text-purple-400'} />
            <span className={styles.label}>Integrity_Loss</span>
          </div>
          <span className={`${styles.value} ${isCritical ? 'text-red-500' : ''}`}>
            {isCritical ? metrics.loss.toFixed(2) : '0.00'}
            <span className={styles.unit}>%</span>
          </span>
        </div>
      </div>

      {/* FOOTER: Información del Host */}
      <div className={styles.widgetFooter}>
        <div className="flex items-center gap-2">
          <Server size={8} />
          <span>HOST_ARASAKA_MAIN</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi size={8} />
          <span>PORT_8080: [SECURE]</span>
        </div>
      </div>
    </div>
  );
};