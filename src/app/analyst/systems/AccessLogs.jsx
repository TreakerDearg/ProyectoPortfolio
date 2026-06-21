"use client";
import React, { useState, useEffect } from "react";
import { Clock, Shield, AlertTriangle, User, Lock, Unlock, Activity } from "lucide-react";
import styles from "../styles/Styles-C/accessLogs.module.css";

export const AccessLogs = ({ nodes }) => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const generateLogs = () => {
      const eventTypes = [
        { type: "access", icon: User, color: "#3b82f6", label: "ACCESS" },
        { type: "security", icon: Shield, color: "#22c55e", label: "SECURITY" },
        { type: "alert", icon: AlertTriangle, color: "#f59e0b", label: "ALERT" },
        { type: "lock", icon: Lock, color: "#a855f7", label: "LOCK" },
        { type: "unlock", icon: Unlock, color: "#10b981", label: "UNLOCK" },
        { type: "activity", icon: Activity, color: "#6366f1", label: "ACTIVITY" }
      ];

      const sampleLogs = [];
      const now = new Date();

      for (let i = 0; i < 15; i++) {
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        const timestamp = new Date(now - i * 60000 * Math.random() * 10);
        
        sampleLogs.push({
          id: i,
          type: eventType.type,
          icon: eventType.icon,
          color: eventType.color,
          label: eventType.label,
          node: node?.name || "SYSTEM",
          nodeId: node?.id || "SYS-001",
          message: `${eventType.label} event on ${node?.name || "SYSTEM"}`,
          timestamp: timestamp
        });
      }

      return sampleLogs.sort((a, b) => b.timestamp - a.timestamp);
    };

    setLogs(generateLogs());
  }, [nodes]);

  const filteredLogs = filter === "all" ? logs : logs.filter(log => log.type === filter);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" });
  };

  return (
    <div className={styles.logsContainer}>
      <div className={styles.logsHeader}>
        <div className={styles.headerLeft}>
          <Clock size={14} />
          <span className={styles.logsTitle}>ACCESS_LOGS</span>
        </div>
        <select
          className={styles.filterSelect}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">ALL</option>
          <option value="access">ACCESS</option>
          <option value="security">SECURITY</option>
          <option value="alert">ALERT</option>
          <option value="lock">LOCK</option>
          <option value="unlock">UNLOCK</option>
          <option value="activity">ACTIVITY</option>
        </select>
      </div>

      <div className={styles.logsTimeline}>
        {filteredLogs.map((log, index) => {
          const Icon = log.icon;
          return (
            <div key={log.id} className={styles.logEntry}>
              <div className={styles.logMarker}>
                <div className={styles.markerDot} style={{ background: log.color }} />
                {index < filteredLogs.length - 1 && <div className={styles.markerLine} />}
              </div>
              <div className={styles.logContent}>
                <div className={styles.logHeader}>
                  <div className={styles.logIcon} style={{ color: log.color }}>
                    <Icon size={12} />
                  </div>
                  <span className={styles.logType} style={{ color: log.color }}>
                    {log.label}
                  </span>
                  <span className={styles.logTime}>{formatTime(log.timestamp)}</span>
                </div>
                <div className={styles.logMessage}>{log.message}</div>
                <div className={styles.logMeta}>
                  <span className={styles.logNode}>{log.node}</span>
                  <span className={styles.logNodeId}>{log.nodeId}</span>
                  <span className={styles.logDate}>{formatDate(log.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.logsFooter}>
        <span className={styles.footerLabel}>TOTAL EVENTS:</span>
        <span className={styles.footerValue}>{filteredLogs.length}</span>
      </div>
    </div>
  );
};
