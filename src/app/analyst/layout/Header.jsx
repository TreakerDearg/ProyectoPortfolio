'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Hash, 
  Globe,
  Activity,
  Zap,
  ShieldCheck,
  Radio
} from 'lucide-react';
import ExitButton from '../ui/ExitButton'; 
import styles from '@/app/analyst/styles/header.module.css'; // Usando CSS Modules

export const Header = () => {
  const [sysTime, setSysTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSysTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={styles.headerRoot}>
      <div className={styles.scanline} />
      
      {/* SECCIÓN IZQUIERDA: SISTEMA */}
      <div className="flex items-center gap-6 z-10">
        <div className={styles.systemBadge}>
          <div className={styles.pulseDot} />
          <Terminal size={14} className="text-sky-400" />
          <span className={styles.systemText}>ANALYST_NODE_01</span>
        </div>

        <div className="hidden xl:flex items-center gap-4">
          <div className={styles.metaData}>
            <span className="opacity-40">USR:</span>
            <span className="text-white font-bold">ROOT</span>
          </div>
          <div className={styles.metaData}>
            <Radio size={10} className="text-emerald-500 animate-pulse" />
            <span className="text-emerald-500 font-bold uppercase">Linked</span>
          </div>
        </div>
      </div>

      {/* SECCIÓN CENTRAL: TELEMETRÍA DINÁMICA */}
      <div className={styles.tickerContainer}>
        <div className={styles.tickerContent}>
          {[
            { label: 'CPU', val: '24%', icon: <Cpu size={12}/>, color: 'text-sky-400' },
            { label: 'SEC', val: 'ENCRYPTED', icon: <ShieldCheck size={12}/>, color: 'text-emerald-400' },
            { label: 'NET', val: 'V-SAT_ACTIVE', icon: <Globe size={12}/>, color: 'text-purple-400' },
            { label: 'PWR', val: 'STABLE', icon: <Zap size={12}/>, color: 'text-amber-400' },
            { label: 'LOG', val: 'LISTENING...', icon: <Activity size={12}/>, color: 'text-slate-400' }
          ].map((item, i) => (
            <div key={i} className={styles.tickerItem}>
              <span className="opacity-40">{item.icon}</span>
              <span className={styles.tickerLabel}>{item.label}</span>
              <span className={`${item.color} font-black`}>[{item.val}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN DERECHA: RELOJ Y EXIT */}
      <div className="flex items-center gap-8 z-10">
        <div className={styles.clockWrapper}>
          <div className="flex flex-col items-end leading-none">
            <span className={styles.timeText}>{sysTime}</span>
            <span className={styles.dateText}>GMT_REF_00</span>
          </div>
          <div className={styles.statusIndicator} />
        </div>

        <ExitButton />
      </div>
    </header>
  );
};