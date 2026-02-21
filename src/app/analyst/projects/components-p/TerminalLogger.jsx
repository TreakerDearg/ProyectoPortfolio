"use client";
import React, { useState, useEffect } from 'react';
import styles from '@/app/analyst/styles//Proyectos-styles/TerminalLogger.module.css';

const LOG_MESSAGES = [
  "QUERY_PLAN_OPTIMIZED::0.002s",
  "INDEX_FRAGMENTATION_CLEARED",
  "ESTABLISHING_TLS_HANDSHAKE...",
  "BACKUP_SEQUENCE_INITIATED",
  "FETCHING_FROM_REPLICA_SECTOR_B",
  "ANALYZE_TABLE_PERMISSIONS_GRANTED",
  "ALERT::UNUSUAL_LATENCY_DETECTED",
  "MIGRATION_LOCK_RELEASED",
];

export const TerminalLogger = () => {
  const [logs, setLogs] = useState(["SESSION_INITIALIZED..."]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
      
      setLogs(prev => [...prev.slice(-4), `[${timestamp}] ${newMessage}`]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {logs.map((log, i) => (
        <div key={i} className={styles.logLine}>
          <span className={styles.prompt}>$</span> {log}
        </div>
      ))}
    </div>
  );
};