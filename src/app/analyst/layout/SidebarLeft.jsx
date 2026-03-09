"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalysis } from '../context/AnalysisContext';
import {
  Network,
  Database,
  Workflow,
  ShieldAlert,
  ChevronLeft,
  Zap,
  Activity,
  Menu,
  X
} from 'lucide-react';

import { TerminalLiveFeed } from '../ui/decorations/TerminalLiveFeed';
import { ArasakaWarBoard } from '../ui/decorations/ArasakaNetStatus';
import { CorpWarFeed } from '../ui/decorations/CorpWarFeed';

import styles from '../styles/sidebarLeft.module.css';

export const SidebarLeft = () => {
  const { 
    activeView, 
    setActiveView, 
    nodes, 
    leftCollapsed, 
    setLeftCollapsed 
  } = useAnalysis();

  const [isMobile, setIsMobile] = useState(false);

  // Detector de Media Query para comportamiento Responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const metrics = useMemo(() => {
    const totalNodes = nodes?.length || 0;
    const securityNodes = nodes?.filter((n) => n.type === 'security').length || 0;
    const potentialFlows = totalNodes > 0 ? Math.floor(totalNodes * 1.5) : 0;
    const rootLoad = "42.08%";
    return { totalNodes, securityNodes, potentialFlows, rootLoad };
  }, [nodes]);

  const menuItems = [
    { id: 'Network_Map', label: 'NETWORK', ext: 'SYS', Icon: Network, badge: metrics.totalNodes },
    { id: 'Security_Logs', label: 'LOGS', ext: 'DB', Icon: ShieldAlert, badge: metrics.securityNodes },
    { id: 'Analytic_Flow', label: 'FLOW', ext: 'EXE', Icon: Workflow, badge: metrics.potentialFlows },
    { id: 'System_Root', label: 'ROOT', ext: 'CFG', Icon: Database, badge: metrics.rootLoad }
  ];

  return (
    <>
      {/* BOTÓN DE COLAPSO (HANDLE EXTERNO) */}
      <div className={`${styles.handleWrapper} ${leftCollapsed ? styles.isCollapsed : ""}`}>
        <button
          onClick={() => setLeftCollapsed(!leftCollapsed)}
          className={styles.collapseHandle}
          aria-label="Toggle Operations"
        >
          <div className={styles.handleContent}>
            {isMobile ? (
              leftCollapsed ? <Menu size={16} /> : <X size={16} />
            ) : (
              <motion.div animate={{ rotate: leftCollapsed ? 180 : 0 }}>
                <ChevronLeft size={14} strokeWidth={3} />
              </motion.div>
            )}
          </div>
          <div className={styles.handleGlow} />
        </button>
      </div>

      <aside
        className={`
          ${styles.sidebarRoot} 
          ${leftCollapsed ? styles.collapsed : styles.expanded}
          ${isMobile && !leftCollapsed ? styles.mobileOverlay : ""}
        `}
        data-collapsed={leftCollapsed}
      >
        {/* ===== HEADER ===== */}
        <header className={styles.header}>
          <AnimatePresence mode="wait">
            {!leftCollapsed ? (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={styles.brandContainer}
              >
                <div className={styles.statusLight} />
                <h2 className={styles.brandText}>
                  ARASAKA<span className={styles.brandAccent}>.NET</span>
                </h2>
              </motion.div>
            ) : (
              <motion.div
                key="mini-logo"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.miniLogo}
              >
                <div className={styles.diamondOuter}>
                  <div className={styles.diamondInner} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ===== NAV ===== */}
        <nav className={styles.navigation}>
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            const IconComponent = item.Icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  if(isMobile) setLeftCollapsed(true); // Auto-cerrar en móvil al elegir
                }}
                className={`${styles.navItem} ${isActive ? styles.navActive : ''}`}
              >
                <div className={styles.navItemContent}>
                  <div className={styles.iconWrapper}>
                    <IconComponent size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                  </div>
                  {!leftCollapsed && (
                    <div className={styles.labelGroup}>
                      <span className={styles.mainLabel}>{item.label}</span>
                      <span className={styles.extLabel}>EXT://{item.ext}</span>
                    </div>
                  )}
                </div>

                {!leftCollapsed && (
                  <span className={styles.badge}>[{item.badge}]</span>
                )}

                {leftCollapsed && (
                  <div className={styles.tooltip}>{item.label}</div>
                )}
              </button>
            );
          })}
        </nav>

        {/* ===== ÁREA DE DATOS DINÁMICOS ===== */}
        <div className={styles.scrollArea}>
          <AnimatePresence>
            {!leftCollapsed ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={styles.extraContent}
              >
                <div className={styles.terminalSection}>
                  <TerminalLiveFeed />
                </div>
                <div className={styles.decorationGroup}>
                  <ArasakaWarBoard />
                  <CorpWarFeed />
                </div>
              </motion.div>
            ) : (
              <div className={styles.collapsedDecor}>
                <Zap size={14} className={styles.pulseZap} />
                <div className={styles.verticalLine} />
                <Activity size={14} className={styles.flickerActivity} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className={styles.footer}>
          {!leftCollapsed ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className={styles.footerMetric}
            >
              <div className={styles.metricLabel}>
                <div className={styles.alertDot} />
                <span>MEM_OVERFLOW</span>
              </div>
              <span className={styles.metricValue}>{metrics.rootLoad}</span>
            </motion.div>
          ) : (
            <div className={styles.miniFooter}>
              <span className={styles.verticalMetric}>{metrics.rootLoad}</span>
            </div>
          )}
        </footer>
      </aside>
    </>
  );
};