"use client";

import { useState, useEffect } from "react";
import { Cpu, HardDrive, Wifi, Activity, Terminal, Clock } from "lucide-react";
import styles from "../../styles/kernelStyles/kernelRightPanel.module.css";

export default function KernelRightPanel() {
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [network, setNetwork] = useState(0);
  const [logs, setLogs] = useState([]);

  const logMessages = [
    "Process scan complete",
    "Network handshake OK",
    "Module loaded",
    "Packet received",
    "Cache updated",
    "System check passed",
    "I/O operation completed",
    "Kernel tick",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 80) + 10);
      setMemory(Math.floor(Math.random() * 60) + 20);
      setNetwork(Math.floor(Math.random() * 100));

      setLogs((prev) => {
        const newLog = logMessages[Math.floor(Math.random() * logMessages.length)];
        const updated = [...prev, newLog];
        if (updated.length > 6) updated.shift();
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className={styles.panel}>
      {/* SYSTEM METRICS */}
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <Activity size={14} className={styles.titleIcon} />
          <span className={styles.titleText}>System Metrics</span>
        </div>
        <div className={styles.content}>
          <div className={styles.metric}>
            <div className={styles.metricHeader}>
              <Cpu size={14} />
              <span>CPU</span>
              <span>{cpu}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${cpu}%` }} />
            </div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricHeader}>
              <HardDrive size={14} />
              <span>MEM</span>
              <span>{memory}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${memory}%` }} />
            </div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricHeader}>
              <Wifi size={14} />
              <span>NET</span>
              <span>{network}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${network}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS LIST */}
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <Terminal size={14} className={styles.titleIcon} />
          <span className={styles.titleText}>Active Processes</span>
        </div>
        <div className={styles.content}>
          <div className={styles.processList}>
            <div className={styles.processHeader}>
              <span>Name</span>
              <span>PID</span>
              <span>CPU</span>
            </div>
            <div className={styles.processItem}>
              <span className={styles.procName}>UI_ENGINE</span>
              <span className={styles.procPid}>234</span>
              <span className={styles.procCpu}>2.3%</span>
            </div>
            <div className={styles.processItem}>
              <span className={styles.procName}>PORTFOLIO_CORE</span>
              <span className={styles.procPid}>567</span>
              <span className={styles.procCpu}>5.1%</span>
            </div>
            <div className={styles.processItem}>
              <span className={styles.procName}>NET_MONITOR</span>
              <span className={styles.procPid}>890</span>
              <span className={styles.procCpu}>1.2%</span>
            </div>
            <div className={styles.processItem}>
              <span className={styles.procName}>DATA_INDEXER</span>
              <span className={styles.procPid}>123</span>
              <span className={styles.procCpu}>0.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEM LOGS */}
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <Clock size={14} className={styles.titleIcon} />
          <span className={styles.titleText}>System Log</span>
        </div>
        <div className={styles.content}>
          <div className={styles.logs}>
            {logs.map((log, i) => (
              <div key={i} className={styles.logLine}>
                <span className={styles.logTime}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className={styles.logMessage}>{log}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <div className={styles.logEmpty}>Waiting for logs...</div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}