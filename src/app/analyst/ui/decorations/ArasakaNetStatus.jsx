'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, TrendingUp, TrendingDown,
  Shield, Target, Database, Radio, Lock, Server, 
  BarChart3, Zap, ShieldAlert, Fingerprint, Activity
} from 'lucide-react';

import { CORPORATE_DATA, CORPORATE_EVENTS } from '../../data/corporateData';
import '../../styles/arasakaWarBoard.css';

const STATUS_CONFIG = {
  allied: { label: 'STRATEGIC_PARTNER', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)' },
  watched: { label: 'SURVEILLANCE_ACTIVE', color: '#eab308', bg: 'rgba(234, 179, 8, 0.12)' },
  hostile: { label: 'TARGET_ACQUIRED', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
  collapsing: { label: 'TOTAL_LIQUIDATION', color: '#7f1d1d', bg: 'rgba(127, 29, 29, 0.25)' }
};

export const ArasakaWarBoard = () => {
  const [index, setIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const total = CORPORATE_DATA.length;
  const corp = CORPORATE_DATA[index];

  // Efecto visual de interferencia al cambiar de objetivo
  useEffect(() => {
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 300);
    return () => clearTimeout(timer);
  }, [index]);

  const globalDominance = useMemo(() => {
    const totalCap = CORPORATE_DATA.reduce((acc, c) => acc + c.marketCap, 0);
    const alliedCap = CORPORATE_DATA
      .filter(c => c.status === 'allied')
      .reduce((acc, c) => acc + c.marketCap, 0);
    return Math.min(100, Math.floor((alliedCap / totalCap) * 100));
  }, []);

  const marketSentiment = globalDominance > 60 ? 'DOMINANT' : 'CONTESTED';
  
  const takeoverProb = useMemo(() => {
    if (corp.status === 'allied') return 5;
    if (corp.status === 'collapsing') return 94;
    return corp.status === 'hostile' ? 65 : 35;
  }, [corp.status]);

  const recentEvent = useMemo(() => 
    CORPORATE_EVENTS.find(e => e.corpId === corp.id), 
  [corp.id]);

  const next = useCallback(() => setIndex(prev => (prev + 1) % total), [total]);
  const prev = useCallback(() => setIndex(prev => (prev - 1 + total) % total), [total]);

  const statusInfo = STATUS_CONFIG[corp.status] || STATUS_CONFIG.watched;

  return (
    <div className={`arasaka-board-container ${isGlitching ? 'terminal-glitch' : ''}`}>
      {/* CAPAS ESTÉTICAS HUD */}
      <div className="arasaka-grid-bg" />
      <div className="arasaka-scan-line" />
      
      {/* 1. HEADER: ESTADO DE RED */}
      <header className="arasaka-header-v2">
        <div className="system-branding">
          <div className="system-text">
            <span className="version">K-HUD v5.2</span>
            <span className="protocol animate-pulse">LINK_STABLE</span>
          </div>
        </div>
        <div className="dominance-gauge">
          <div className="gauge-track">
            <div className="gauge-fill" style={{ width: `${globalDominance}%` }} />
          </div>
          <span className="gauge-value">{globalDominance}%_DOM</span>
        </div>
      </header>

      {/* 2. SELECTOR DE OBJETIVO (DOSSIER) */}
      <nav className="dossier-stepper">
        <button onClick={prev} className="step-btn">
          <ChevronLeft size={14} />
        </button>
        <div className="current-dossier">
          <Fingerprint size={10} className="text-red-500 opacity-50" />
          <span className="corp-id">{corp.symbol}</span>
          <span className="pagination">[{index + 1}/{total}]</span>
        </div>
        <button onClick={next} className="step-btn">
          <ChevronRight size={14} />
        </button>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={corp.id}
          className="panel-inner"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
        >
          {/* 3. IDENTIDAD Y AMENAZA */}
          <section className="identity-panel">
            <h2 className="glitch-text" style={{ color: corp.color }}>
              {corp.name}
            </h2>
            
            <div className="status-row-v2">
              <div className="status-indicator" style={{ '--accent': statusInfo.color }}>
                <Activity size={10} className="pulse-icon" />
                <span>{statusInfo.label}</span>
              </div>
              <div className="threat-tag">
                <ShieldAlert size={10} />
                <span>{corp.riskLevel}</span>
              </div>
            </div>
          </section>

          {/* 4. REJILLA TÁCTICA ADAPTADA (2x2 o 1x1 según espacio) */}
          <div className="tactical-grid">
            <div className="data-node">
              <div className="node-label">NET_VALUATION</div>
              <div className="node-value">{corp.marketCap}T</div>
              <div className="node-sub">SHARE: {corp.marketShare}%</div>
            </div>
            <div className="data-node">
              <div className="node-label">TRAJECTORY</div>
              <div className={`node-value flex items-center gap-1 ${corp.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {corp.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {corp.change}%
              </div>
              <div className="node-sub">ICE_STAB: {corp.networkIntegrity}%</div>
            </div>
          </div>

          {/* 5. MÓDULO DE ABSORCIÓN (SLIM) */}
          <section className="absorption-module">
            <div className="module-header">
              <div className="flex items-center gap-1">
                <Target size={10} className="text-red-500" />
                <span>ABSORPTION_PROB</span>
              </div>
              <span className="val-pct">{takeoverProb}%</span>
            </div>
            <div className="progress-segments">
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i} 
                  className={`segment ${i / 15 < takeoverProb / 100 ? 'active' : ''}`}
                  style={{ '--active-color': corp.color }}
                />
              ))}
            </div>
          </section>

          {/* 6. INTEL FEED (ACCESIBLE Y LEGIBLE) */}
          {recentEvent && (
            <div className="intel-box-v2">
              <div className="intel-header">
                <span className="category">// {recentEvent.category.toUpperCase()}</span>
                <span className="timestamp">{recentEvent.time}</span>
              </div>
              <p className="intel-body">{recentEvent.event}</p>
              <div className={`impact-badge ${recentEvent.type}`}>
                <Zap size={8} />
                <span>IMPACT: {recentEvent.impact}</span>
              </div>
            </div>
          )}

          {/* 7. FOOTER DE DATOS DE SISTEMA */}
          <footer className="dossier-footer">
            <div className="footer-item">
              <Server size={10} />
              <span>{corp.meta.headquarters.split(',')[0].toUpperCase()}</span>
            </div>
            <div className="footer-item">
              <Lock size={10} />
              <span>{marketSentiment}</span>
            </div>
          </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};