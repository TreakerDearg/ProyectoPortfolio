"use client";
import React, { useMemo } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { 
  Terminal, Database, Network, Lock, Cpu, 
  ShieldCheck, Globe, Zap, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../styles/Styles-C/SystemRoot.module.css';

const SystemRoot = () => {
  const { kernelMetrics = {} } = useAnalysis();

  // Sanitización de métricas
  const cpuLoad = kernelMetrics?.cpuLoad ?? 0;
  const memUsed = kernelMetrics?.memUsed ?? 0;
  const memTotal = kernelMetrics?.memTotal ?? 512;

  const systemData = useMemo(() => ({
    version: "ARASAKA_KNG_PROTOCOL_v4.2",
    nodeName: "SATO_NODE_ALPHA",
    security: "MAXIMUM_CLEARANCE",
    integrity: "98.4%",
    region: "NIGHT_CITY_SUB_NET"
  }), []);

  return (
    <div className={styles.rootContainer}>
      {/* CAPA DE RUIDO TÉCNICO SUPERIOR */}
      <div className={styles.topUtilityBar}>
        <div className={styles.utilityLeft}>
          <ShieldCheck size={10} className="text-red-500" />
          <span>CRYPTO_BUFFER: STABLE</span>
          <span className={styles.divider}>|</span>
          <Globe size={10} />
          <span>REGION: {systemData.region}</span>
        </div>
        <div className={styles.utilityRight}>
          <span>INT_CHECK: {systemData.integrity}</span>
        </div>
      </div>

      {/* HEADER CORPORATIVO */}
      <header className={styles.systemHeader}>
        <div className={styles.brandGroup}>
          <div className={styles.arasakaMon}>
            <div className={styles.monInner} />
          </div>
          <div className={styles.titleStack}>
            <h1 className={styles.mainTitle}>{systemData.version}</h1>
            <p className={styles.subTitle}>SISTEMA DE ANÁLISIS DE INFRAESTRUCTURA DE RED // {systemData.nodeName}</p>
          </div>
        </div>
        <div className={styles.accessBadge}>
          <span className={styles.badgeLabel}>CLEARANCE</span>
          <span className={styles.badgeValue}>{systemData.security}</span>
        </div>
      </header>

      {/* DASHBOARD CENTRAL DE MÉTRICAS */}
      <div className={styles.mainGrid}>
        
        {/* PANEL IZQUIERDO: RECURSOS */}
        <div className={styles.resourceSection}>
          <div className={styles.panelTitle}>
            <BarChart3 size={12} />
            <span>CORE_RESOURCES</span>
          </div>
          
          <div className={styles.resourceCard}>
            <div className={styles.resInfo}>
              <Cpu size={14} className="text-red-600" />
              <div className={styles.resLabel}>
                <span className={styles.resName}>KERNEL_CPU</span>
                <span className={styles.resSpec}>16-CORE_QUANTUM</span>
              </div>
              <span className={styles.resValue}>{typeof cpuLoad === 'number' ? cpuLoad.toFixed(2) : "0.00"}%</span>
            </div>
            <div className={styles.resGraph}>
              <motion.div 
                className={styles.resFill} 
                animate={{ width: `${cpuLoad}%` }} 
              />
            </div>
          </div>

          <div className={styles.resourceCard}>
            <div className={styles.resInfo}>
              <Database size={14} className="text-red-600" />
              <div className={styles.resLabel}>
                <span className={styles.resName}>MEMORY_VRAM</span>
                <span className={styles.resSpec}>ECC_DDR6_STACK</span>
              </div>
              <span className={styles.resValue}>{memUsed}/{memTotal}GB</span>
            </div>
            <div className={styles.resGraph}>
              <motion.div 
                className={styles.resFill} 
                animate={{ width: `${(memUsed / memTotal) * 100}%` }} 
              />
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: ESTADO DE RED */}
        <div className={styles.networkSection}>
          <div className={styles.panelTitle}>
            <Network size={12} />
            <span>ACTIVE_PROTOCOLS</span>
          </div>
          <div className={styles.protocolStack}>
            <div className={styles.protocolItem} data-active="true">
              <Zap size={10} />
              <span>HTTP_OVER_NEURAL: OK</span>
              <div className={styles.statusDot} />
            </div>
            <div className={styles.protocolItem} data-active="true">
              <Lock size={10} />
              <span>SSL_ARASAKA_V4: SECURE</span>
              <div className={styles.statusDot} />
            </div>
            <div className={styles.protocolItem} data-active="false">
              <Terminal size={10} />
              <span>SSH_TUNNEL: DISCONNECTED</span>
              <div className={`${styles.statusDot} ${styles.inactive}`} />
            </div>
          </div>
        </div>
      </div>

      {/* TERMINAL DE COMANDOS ANALISTA */}
      <section className={styles.terminalSection}>
        <div className={styles.terminalHeader}>
          <div className={styles.termInfo}>
            <Terminal size={12} />
            <span>SUBSYSTEM_ROOT_ACCESS</span>
          </div>
          <div className={styles.termCoords}>
            LAT: 34.0522 N // LON: 118.2437 W
          </div>
        </div>
        <div className={styles.terminalBody}>
          <div className={styles.logLine}>
            <span className={styles.logTag}>[SUCCESS]</span>
            <span className={styles.logMsg}>Neural bridge established with SATO_NODE_ALPHA.</span>
          </div>
          <div className={styles.logLine}>
            <span className={styles.logTag}>[INFO]</span>
            <span className={styles.logMsg}>Analyzing {kernelMetrics?.threads || 0} active execution threads...</span>
          </div>
          <div className={styles.logLine}>
            <span className={styles.logTagWarning}>[WARNING]</span>
            <span className={styles.logMsg}>Detected packet jitter in Sector 7-G. Re-routing via Arasaka Backbone.</span>
          </div>
          <div className={styles.promptLine}>
            <span className={styles.prompt}>USER@ARASAKA_INTEL:~$</span>
            <motion.span 
              animate={{ opacity: [0, 1] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className={styles.cursor}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemRoot;