"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Terminal, AlertCircle, Info, Download } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import styles from '../styles/Styles-C/securityLogs.module.css';

export const SecurityLogs = () => {
  const { logs, isAnalyzing: isLoading, systemStatus } = useAnalysis();

  const stats = useMemo(() => {
    if (!logs) return { total: 0, threats: 0 };
    return {
      total: logs.length,
      threats: logs.filter(l => ['critical', 'warning', 'CRITICAL'].includes(l.level)).length
    };
  }, [logs]);

  if (isLoading) {
    return (
      <div className={styles.centerFull}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>SYNCHRONIZING_ENCRYPTED_LOGS...</p>
      </div>
    );
  }

  return (
    <div className={styles.logWrapper}>
      {/* HEADER: Fijo arriba */}
      <header className={styles.logHeader}>
        <div className={styles.titleGroup}>
          <Terminal size={16} className={styles.iconCyan} />
          <div className={styles.textGroup}>
            <h2 className={styles.mainTitle}>SEC_AUDIT_LOGS</h2>
            <div className={styles.subTitle}>
              <span className={`${styles.pulseDot} ${systemStatus !== 'NOMINAL' ? styles.dotCritical : styles.dotNominal}`} />
              {systemStatus === 'NOMINAL' ? 'INTRUSION_DETECTION_ACTIVE' : 'SYSTEM_BREACH_DETECTED'}
            </div>
          </div>
        </div>

        <div className={styles.headerStats}>
          <div className={styles.miniStat}>
            <span className={styles.miniLabel}>FIREWALL</span>
            <span className={systemStatus === 'NOMINAL' ? styles.textCyan : styles.textRed}>
              {systemStatus === 'NOMINAL' ? 'REINFORCED' : 'COMPROMISED'}
            </span>
          </div>
        </div>
      </header>

      {/* VIEWPORT: El corazón que hace scroll */}
      <div className={styles.tableViewport}>
        <table className={styles.cyberTable}>
          <thead>
            <tr>
              <th>TRACE_ID</th>
              <th>TIMESTAMP</th>
              <th>EVENT_DATA</th>
              <th>ORIGIN_NODE</th>
              <th className="text-right">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {logs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={styles.logRow}
                  data-level={log.level.toLowerCase()}
                >
                  <td className={styles.idCell}><span>0x</span>{log.id.split('-')[1] || log.id}</td>
                  <td className={styles.timeCell}>{log.timestamp}</td>
                  <td className={styles.eventCell}>
                    <div className={styles.eventFlex}>
                      {log.level.toLowerCase() === 'critical' ? <ShieldAlert size={12} /> : <Info size={12} />}
                      {log.event}
                    </div>
                  </td>
                  <td className={styles.originCell}>{log.origin}</td>
                  <td className={styles.statusCell}>
                    <span className={`${styles.statusTag} ${styles[log.level.toLowerCase()]}`}>
                      {log.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* FOOTER: Fijo abajo */}
      <footer className={styles.logFooter}>
        <div className={styles.footerStats}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>PROCESSED</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>THREATS</span>
            <span className={`${styles.statValue} ${stats.threats > 0 ? styles.textRed : ''}`}>
              {stats.threats}
            </span>
          </div>
        </div>

        <button className={styles.reportBtn}>
          <Download size={14} />
          <span>DUMP_BUFFER</span>
        </button>
      </footer>
    </div>
  );
};