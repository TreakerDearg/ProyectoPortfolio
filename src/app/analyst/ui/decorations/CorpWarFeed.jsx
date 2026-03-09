'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert, Lock, FileCheck, FileX, FileWarning,
  Activity, Database, Terminal, Zap, Globe, Cpu, AlertCircle
} from 'lucide-react';
import '../../styles/corpWarFeed.css';

/* --------------------------
    CONFIGURACIÓN DE EVENTOS EXPANDIDA
-------------------------- */
const CORPORATIONS = ['MILITECH', 'KANG_TAO', 'BIOTECHNICA', 'KIROSHI', 'PETROCHEM', 'NETWATCH', 'ARASAKA_INTEL'];

const EVENT_TYPES = [
  { label: 'ICE_BREACH', icon: <Zap size={10} />, color: '#ff1a1a' },
  { label: 'DATA_SIPHON', icon: <Database size={10} />, color: '#00eaff' },
  { label: 'NEURAL_BURN', icon: <Activity size={10} />, color: '#ff8000' },
  { label: 'DAEMON_INJ', icon: <Cpu size={10} />, color: '#a855f7' },
  { label: 'GHOST_SIGNAL', icon: <Globe size={10} />, color: '#22c55e' },
  { label: 'UPLINK_LOSS', icon: <ShieldAlert size={10} />, color: '#ef4444' }
];

const FILE_TYPES = [
  'USR_DATA.db', 'AUTH_KEY.secure', 'CORE_LOG.txt', 
  'ENCRYPT_NAV.sys', 'CORP_INTEL.pdf', 'BIO_SIG.raw',
  'BLACK_ICE.exe', 'PROTO_09.bin'
];

/* -------------------------- */

const nowTime = () => new Date().toLocaleTimeString('en-GB', { hour12: false, minute: '2-digit', second: '2-digit' });

const generateAttack = () => {
  const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
  return {
    id: crypto.randomUUID(),
    time: nowTime(),
    corp: CORPORATIONS[Math.floor(Math.random() * CORPORATIONS.length)],
    label: type.label,
    icon: type.icon,
    color: type.color,
    status: Math.random() > 0.5 ? 'COMPROMISED' : 'DEFLECTED',
    priority: Math.random() > 0.8 ? 'CRITICAL' : 'LOW'
  };
};

export const CorpWarFeed = () => {
  const [events, setEvents] = useState([]);
  const [files, setFiles] = useState([]);
  const [systemState, setSystemState] = useState('normal'); // normal | breach | reboot
  const [view, setView] = useState('network');
  const systemStateRef = useRef(systemState);

  useEffect(() => { systemStateRef.current = systemState; }, [systemState]);

  /* GENERADOR DE FLUJO CONSTANTE */
  useEffect(() => {
    const interval = setInterval(() => {
      if (systemStateRef.current !== 'normal') return;

      setEvents((prev) => [generateAttack(), ...prev].slice(0, 10));

      if (Math.random() > 0.6) {
        setFiles((prev) => {
          const newFile = {
            id: crypto.randomUUID(),
            name: FILE_TYPES[Math.floor(Math.random() * FILE_TYPES.length)],
            state: ['STOLEN', 'RECOVERED', 'CORRUPTED', 'ENCRYPTED'][Math.floor(Math.random() * 4)],
            integrity: Math.floor(Math.random() * 100),
            classification: ['RESTRICTED', 'BLACKOPS', 'PUBLIC'][Math.floor(Math.random() * 3)]
          };
          return [newFile, ...prev].slice(0, 8);
        });
      }
    }, 2000); // Más rápido para dar sensación de "feed vivo"
    return () => clearInterval(interval);
  }, []);

  /* LÓGICA DE CAOS DINÁMICO */
  useEffect(() => {
    const chaosTrigger = setInterval(() => {
      if (Math.random() > 0.85 && systemStateRef.current === 'normal') {
        setSystemState('breach');
        setTimeout(() => {
          setSystemState('reboot');
          setTimeout(() => setSystemState('normal'), 5000);
        }, 4000);
      }
    }, 25000);
    return () => clearInterval(chaosTrigger);
  }, []);

  const threatLevel = useMemo(() => {
    const criticals = events.filter(e => e.status === 'COMPROMISED').length;
    return Math.min(100, Math.floor((criticals / (events.length || 1)) * 100) + 10);
  }, [events]);

  return (
    <div className={`corpwar-hud-container ${systemState !== 'normal' ? 'system-glitch' : ''}`}>
      
      {/* HEADER DE NAVEGACIÓN TÁCTICA */}
      <div className="corpwar-header">
        <button onClick={() => setView('network')} className={`corpwar-tab ${view === 'network' ? 'active' : ''}`}>
          <Activity size={12} /> <span>NET_FEED</span>
        </button>
        <button onClick={() => setView('files')} className={`corpwar-tab ${view === 'files' ? 'active' : ''}`}>
          <Database size={12} /> <span>MATRIX</span>
        </button>
      </div>

      {/* MONITOR DE AMENAZA GLOBAL */}
      <div className="corpwar-threat-section">
        <div className="threat-info">
          <span className="label">GLOBAL_THREAT_LEVEL</span>
          <span className="value" style={{ color: threatLevel > 60 ? '#ff1a1a' : '#ff8000' }}>
            {threatLevel}%
          </span>
        </div>
        <div className="threat-bar-container">
          <motion.div 
            className="threat-bar-fill"
            animate={{ width: `${threatLevel}%` }}
            style={{ backgroundColor: threatLevel > 60 ? '#ff1a1a' : '#ff8000' }}
          />
          <div className="threat-bar-grid" />
        </div>
      </div>

      {/* ÁREA DE CONTENIDO DINÁMICO */}
      <div className="corpwar-content-scroll">
        <AnimatePresence mode="wait">
          {view === 'network' ? (
            <motion.div 
              key="net" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              className="event-list"
            >
              {events.map((event) => (
                <div key={event.id} className={`event-card ${event.priority === 'CRITICAL' ? 'critical-border' : ''}`}>
                  <div className="event-sidebar-line" style={{ backgroundColor: event.color }} />
                  <div className="event-body">
                    <div className="event-meta">
                      <span className="time">{event.time}</span>
                      <span className={`status-tag ${event.status.toLowerCase()}`}>{event.status}</span>
                    </div>
                    <div className="event-main">
                      <span className="icon" style={{ color: event.color }}>{event.icon}</span>
                      <span className="corp-name">{event.corp}</span>
                    </div>
                    <div className="event-vector">{event.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="files" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              className="file-list"
            >
              {files.map((file) => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-class">{file.classification}</span>
                  </div>
                  <div className="file-status">
                    <div className="integrity-mini-bar">
                      <div className="fill" style={{ width: `${file.integrity}%` }} />
                    </div>
                    <span className="percent">{file.integrity}%</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* OVERLAY DE BREACH (CALAVERA MEJORADA) */}
      <AnimatePresence>
        {systemState === 'breach' && (
          <motion.div 
            className="overlay-breach"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div 
              className="skull-container"
              animate={{ 
                scale: [1, 1.2, 1],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
              }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <ShieldAlert size={60} color="#ff1a1a" />
              <div className="skull-text">BREACH_DETECTED</div>
            </motion.div>
            <div className="glitch-line" />
          </motion.div>
        )}

        {/* OVERLAY DE REBOOT (BARRA CARGA MILITAR) */}
        {systemState === 'reboot' && (
          <motion.div 
            className="overlay-reboot"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="reboot-box">
              <Terminal size={20} className="mb-2" />
              <div className="reboot-text">RECALIBRATING_OS</div>
              <div className="reboot-progress">
                <motion.div 
                  className="reboot-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.5, ease: "linear" }}
                />
              </div>
              <div className="loading-dots">Initializing Secure ICE...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER DE ESTADO */}
      <div className="corpwar-footer">
        <div className="pulse-dot" />
        <span>ENCRYPTED_FEED_ACTIVE</span>
      </div>
    </div>
  );
};