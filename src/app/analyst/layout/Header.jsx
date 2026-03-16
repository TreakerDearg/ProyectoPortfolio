'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Terminal,
  Cpu,
  Globe,
  Activity,
  Zap,
  ShieldCheck,
  Radio,
  AlertTriangle,
  Skull
} from 'lucide-react';
import ExitButton from '../ui/ExitButton';
import styles from '../styles/header.module.css';

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

export const Header = ({ isOverclocked = false }) => {
  const [sysTime, setSysTime] = useState('');
  const [showTooltip, setShowTooltip] = useState(null);
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSysTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Datos de telemetría con tooltips
  const telemetryItems = useMemo(
    () => [
      { label: 'CPU', val: '24%', icon: Cpu, color: 'text-sky-400', desc: 'Central Processing Unit load' },
      { label: 'SEC', val: 'ENCRYPTED', icon: ShieldCheck, color: 'text-emerald-400', desc: 'Security protocol status' },
      { label: 'NET', val: 'V-SAT_ACTIVE', icon: Globe, color: 'text-purple-400', desc: 'Network uplink' },
      { label: 'PWR', val: 'STABLE', icon: Zap, color: 'text-amber-400', desc: 'Power supply' },
      { label: 'LOG', val: 'LISTENING...', icon: Activity, color: 'text-slate-400', desc: 'System log activity' },
    ],
    []
  );

  const handleExit = () => {
    router.push('/');
  };

  return (
    <header 
      className={`${styles.headerRoot} ${isOverclocked ? styles.overclock : ''}`}
      aria-label="System header"
    >
      {/* Capa de scanline (efecto CRT) */}
      <div className={styles.scanline} aria-hidden="true" />

      {/* Línea de energía decorativa */}
      <div className={styles.powerLine} aria-hidden="true" />

      {/* SECCIÓN IZQUIERDA: IDENTIDAD DEL SISTEMA */}
      <div className={styles.leftSection}>
        {/* Badge de nodo */}
        <div className={styles.systemBadge}>
          <div
            className={`${styles.pulseDot} ${prefersReducedMotion ? 'opacity-50' : ''}`}
            style={{ animation: prefersReducedMotion ? 'none' : undefined }}
          />
          <Terminal size={14} className="text-aska-cyan" aria-hidden="true" />
          <span className={styles.systemText}>ANALYST_NODE_01</span>
        </div>

        {/* Badge corporativo */}
        <div className={styles.corpBadge}>
          <Skull size={12} className="text-aska-red" />
          <span className={styles.corpName}>ARASAKA</span>
          <span className={styles.corpSector}>SEC-7</span>
        </div>

        {/* Metadatos adicionales (solo visible en desktop grande) */}
        <div className={styles.metaGroup}>
          <div className={styles.metaItem}>
            <span className="opacity-40">USR:</span>
            <span className="text-white font-bold">ROOT</span>
          </div>
          <div className={styles.metaItem}>
            <Radio
              size={10}
              className={`text-emerald-500 ${prefersReducedMotion ? '' : 'animate-pulse'}`}
              aria-hidden="true"
            />
            <span className="text-emerald-500 font-bold uppercase">Linked</span>
          </div>
        </div>
      </div>

      {/* SECCIÓN CENTRAL: TELEMETRÍA (TICKER) */}
      <div className={styles.tickerContainer}>
        <div className={styles.tickerContent}>
          {telemetryItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={styles.tickerItem}
                onMouseEnter={() => setShowTooltip(i)}
                onMouseLeave={() => setShowTooltip(null)}
                title={item.desc} // fallback para navegadores sin tooltip personalizado
              >
                <Icon size={12} className="opacity-40" aria-hidden="true" />
                <span className={styles.tickerLabel}>{item.label}</span>
                <span className={`${item.color} font-black`}>[{item.val}]</span>

                {/* Tooltip personalizado */}
                {showTooltip === i && (
                  <div className={styles.tooltip} role="tooltip">
                    {item.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN DERECHA: RELOJ, OVERCLOCK Y EXIT */}
      <div className={styles.rightSection}>
        {/* Indicador de overclock (solo si está activo) */}
        {isOverclocked && (
          <div className={styles.overclockIndicator}>
            <AlertTriangle size={14} className="text-aska-red animate-pulse" />
            <span className={styles.overclockText}>OVERCLOCK</span>
          </div>
        )}

        {/* Reloj digital */}
        <div className={styles.clockWrapper}>
          <div className="flex flex-col items-end leading-none">
            <span className={styles.timeText}>{sysTime || '--:--:--'}</span>
            <span className={styles.dateText}>GMT_REF_00</span>
          </div>
          <div className={styles.statusIndicator} aria-hidden="true" />
        </div>

        {/* Botón de salida (estilo militar) */}
        <ExitButton onClick={handleExit} aria-label="Exit system" />
      </div>

      {/* Efecto de barrido de datos (decorativo) */}
      <div className={styles.dataSweep} aria-hidden="true" />
    </header>
  );
};