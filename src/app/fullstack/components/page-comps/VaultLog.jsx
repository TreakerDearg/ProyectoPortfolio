"use client";
import React, { useState, useEffect } from "react";
import { Terminal, AlertTriangle, Shield, CheckCircle } from "lucide-react";
import { logsData } from "../../data/logs";
import styles from "../../styles/page-comp-styles/VaultLog.module.css";

export const VaultLog = () => {
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [index, setIndex] = useState(0);

  // Inicializar con los primeros 3 logs
  useEffect(() => {
    setVisibleLogs(logsData.slice(0, 3));
    setIndex(3);
  }, []);

  // Rotar logs cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogs(prev => {
        // Si hemos llegado al final, reiniciamos
        if (index >= logsData.length) {
          setIndex(0);
          return [logsData[0], logsData[1], logsData[2]];
        } else {
          const newLogs = [prev[1], prev[2], logsData[index]];
          setIndex(prevIndex => prevIndex + 1);
          return newLogs;
        }
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [index]);

  // Función para obtener el ícono según tipo
  const getIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={10} className={styles.iconWarning} />;
      case 'danger': return <Shield size={10} className={styles.iconDanger} />;
      case 'success': return <CheckCircle size={10} className={styles.iconSuccess} />;
      default: return <Terminal size={10} className={styles.iconInfo} />;
    }
  };

  return (
    <div className={styles.log}>
      <div className={styles.logHeader}>
        <Terminal size={10} />
        <span>VAULT-TEC LOG</span>
      </div>
      <div className={styles.logEntries}>
        {visibleLogs.map((log, i) => (
          <div key={`${log.id}-${i}`} className={`${styles.logEntry} ${styles[log.type]}`}>
            <div className={styles.logLeft}>
              {getIcon(log.type)}
              <span className={styles.logTime}>[{log.time}]</span>
              {log.zone && <span className={styles.logZone}>{log.zone}</span>}
            </div>
            <span className={styles.logMessage}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};