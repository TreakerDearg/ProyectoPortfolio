'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/terminalLiveFeed.css';

const MESSAGES = [
  "ENCRYPTED_LINK_ESTABLISHED",
  "NEURAL_SYNC_OPTIMIZED",
  "UPLINK_STATUS: STABLE",
  "DECRYPTING_PACKET_STREAM",
  "LATENCY_CORRECTED: 12ms",
  "TRACE_CLEANUP_IN_PROGRESS",
  "SECURE_HANDSHAKE_COMPLETE",
  "FIREWALL_BYPASS_ACTIVE",
  "PROXY_CHAIN_ROTATED",
  "DATA_FRAGMENTATION_RATE: 72%",
  "NODE_AUTHENTICATION_OK",
  "SATELLITE_LOCK_ACQUIRED",
  "STEALTH_MODE_ENGAGED",
  "COUNTERMEASURE_READY",
  "AI_CORE_TEMPERATURE: 42°C",
  "QUANTUM_ENTANGLEMENT_STABLE",
  "CORP_NETWORK_INFILTRATED",
  "BLACKWALL_PROTOCOL_ACTIVE"
];

const MAX_LOGS = 20;

const getTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-GB');
};

export const TerminalLiveFeed = () => {
  const [logs, setLogs] = useState([]);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * MESSAGES.length);

      const newLog = {
        id: crypto.randomUUID(),
        message: MESSAGES[randomIndex],
        time: getTimestamp()
      };

      setLogs(prev => {
        const updated = [...prev, newLog];
        return updated.slice(-MAX_LOGS);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="terminal-live-wrapper">

      {/* Header */}
      <div className="terminal-live-header">
        <div className="terminal-live-title">
          <span className="live-dot" />
          SYSTEM_LOG
        </div>

        <button
          onClick={() => setPaused(prev => !prev)}
          className="terminal-live-toggle"
          aria-pressed={paused}
        >
          {paused ? 'RESUME' : 'PAUSE'}
        </button>
      </div>

      {/* Log Container */}
      <div
        ref={containerRef}
        className="terminal-live-container"
        role="log"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="terminal-log-line"
            >
              <span className="terminal-log-time">
                [{log.time}]
              </span>

              <span className="terminal-log-message">
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="terminal-live-footer">
        <button
          onClick={() => setLogs([])}
          className="terminal-live-clear"
        >
          CLEAR_LOG
        </button>

        <span className="terminal-live-count">
          {logs.length} ENTRIES
        </span>
      </div>
    </div>
  );
};