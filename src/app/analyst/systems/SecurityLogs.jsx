"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Activity, Terminal } from 'lucide-react';
import styles from '@/app/analyst/styles/Styles-C/securityLogs.module.css';

const MOCK_LOGS = [
  { id: '0x12A', timestamp: '22:45:12', event: 'Unauthorized_Access_Attempt', origin: '192.168.1.44', status: 'BLOCKED', level: 'CRITICAL' },
  { id: '0x12B', timestamp: '22:48:05', event: 'Kernel_Handshake_Sync', origin: 'Internal_Core', status: 'SUCCESS', level: 'STABLE' },
  { id: '0x12C', timestamp: '22:50:33', event: 'Packet_Sniffing_Detected', origin: 'Unknown_Proxy', status: 'MONITORING', level: 'WARNING' },
  { id: '0x12D', timestamp: '22:55:01', event: 'Database_Query_Inject', origin: 'SQL_Port_80', status: 'FILTERED', level: 'CRITICAL' },
  { id: '0x12E', timestamp: '23:02:12', event: 'Node_Auth_Refresh', origin: 'System_Admin', status: 'SUCCESS', level: 'STABLE' },
];

export const SecurityLogs = () => {
  return (
    <div className={styles.logContainer}>
      {/* HEADER TÁCTICO */}
      <div className={styles.logHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.brandIcon}><Terminal size={18} /></div>
          <div>
            <h2 className={styles.mainTitle}>SEC_AUDIT_LOGS</h2>
            <div className={styles.subTitle}>
              <span className={styles.pulseDot}></span>
              LIVE_INTRUSION_DETECTION_ACTIVE
            </div>
          </div>
        </div>
        
        <div className={styles.systemStatus}>
          <div className={styles.statusBadge}>
            <span className="opacity-40">ENCRYPTION:</span>
            <span className="text-sky-400">RSA_4096</span>
          </div>
          <div className={styles.decors}>
            {[...Array(5)].map((_, i) => <div key={i} className={styles.decorBit} />)}
          </div>
        </div>
      </div>

      {/* TABLA DE DATOS */}
      <div className={styles.tableViewport}>
        <table className={styles.cyberTable}>
          <thead>
            <tr>
              <th><div className={styles.thContent}>TRACE_ID</div></th>
              <th><div className={styles.thContent}>TIMESTAMP</div></th>
              <th><div className={styles.thContent}>EVENT_DATA</div></th>
              <th><div className={styles.thContent}>ORIGIN_NODE</div></th>
              <th className="text-right"><div className={styles.thContent}>STATUS</div></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LOGS.map((log, index) => (
              <motion.tr 
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={styles.logRow}
                data-level={log.level}
              >
                <td className={styles.idCell}>
                  <span className={styles.hashPrefix}>#</span>{log.id}
                </td>
                <td className={styles.timeCell}>{log.timestamp}</td>
                <td className={styles.eventCell}>
                  <div className={styles.eventWrapper}>
                    {log.level === 'CRITICAL' ? <ShieldAlert size={12} /> : <Activity size={12} />}
                    <span className={log.level === 'CRITICAL' ? styles.criticalText : ''}>
                      {log.event}
                    </span>
                  </div>
                </td>
                <td className={styles.originCell}>{log.origin}</td>
                <td className={styles.statusCell}>
                  <div className={`${styles.statusTag} ${styles[log.level]}`}>
                    {log.status}
                    {log.level === 'STABLE' && <ShieldCheck size={10} className="ml-1" />}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        
        {/* Efecto de Scan Line que baja por la tabla */}
        <div className={styles.tableScanner} />
      </div>

      {/* FOOTER DE METADATOS */}
      <div className={styles.logFooter}>
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>PROCESSED</span>
            <span className={styles.statValue}>1,244</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>THREATS</span>
            <span className={styles.statValue} style={{color: '#ef4444'}}>00</span>
          </div>
        </div>
        
        <button className={styles.reportBtn}>
          <span className={styles.btnText}>GENERATE_SEC_REPORT</span>
          <div className={styles.btnGlow} />
        </button>
      </div>
    </div>
  );
};