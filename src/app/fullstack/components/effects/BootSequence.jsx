"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Bolt,
  Settings,
  Activity,
  ShieldCheck,
  Cpu,
  Database,
  Network,
  Unlock,
  Radio,
  AlertTriangle,
} from "lucide-react";
import styles from "../../styles/effects/BootSequence.module.css";

export default function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [glitch, setGlitch] = useState(false);

  // Generar columnas de hexágonos (fondo tipo matriz)
  const hexColumns = useMemo(() => {
    const cols = 6;
    const rows = 12;
    const hexValues = ["0x4F", "0xA2", "0xBD", "0x09", "0x8E", "0xFF", "0x21", "0xCC", "0xAA", "0x54", "0x22", "0x11"];
    return Array.from({ length: cols }).map((_, colIdx) => ({
      id: colIdx,
      offset: colIdx * 20,
      cells: Array.from({ length: rows }).map(
        () => hexValues[Math.floor(Math.random() * hexValues.length)]
      ),
    }));
  }, []);

  // Logs del boot (igual que antes)
  const bootLogs = [
    { time: "0.003s", msg: "INITIALIZING AMBER_KERNEL_V2...", type: "info" },
    { time: "0.124s", msg: "LOADING CORE_MODULES FROM /DEV/BASE", type: "info" },
    { time: "0.310s", msg: "ALLOCATING VIRTUAL_MEM: 16GB_READY", type: "success" },
    { time: "0.452s", msg: "DECRYPTING DATA STREAM: 0x4F_A2_BD", type: "process" },
    { time: "0.789s", msg: "VOLTAGE_STABLE: 1.22V", type: "info" },
    { time: "1.002s", msg: "WARNING: BUFFER_DRIFT IN THREAD_02", type: "warn" },
    { time: "1.250s", msg: "ESTABLISHING MONGODB_ATLAS_LINK...", type: "process" },
    { time: "1.450s", msg: "AUTHENTICATION_GRANTED: LEANDRO_DEV", type: "success" },
    { time: "1.600s", msg: "STARTING_OS_SHELL...", type: "info" },
  ];

  // Threads de ejemplo (podrían ser dinámicos según el progreso)
  const threads = [
    { id: "0x01", component: "SEC_AUTH_MODULE", val: "DECRYPT_AES_256", state: "RUNNING", stateClass: "running" },
    { id: "0x02", component: "FS_STYLING_ENGINE", val: "CSS_INJECT_V3", state: "WAITING", stateClass: "waiting" },
    { id: "0x03", component: "PORTFOLIO_DB_LINK", val: "QUERY_PROJECTS", state: "ACTIVE", stateClass: "active" },
    { id: "0x04", component: "CORE_UI_BOOT", val: "DOM_CONSTRUCT", state: "PENDING", stateClass: "pending" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1500);
          return 100;
        }
        const jump = Math.random() > 0.8 ? 5 : 1;
        return Math.min(prev + jump, 100);
      });
    }, 60);

    bootLogs.forEach((log, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        if (log.type === "warn") {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 200);
        }
      }, i * 450);
    });

    return () => clearInterval(timer);
  }, [onComplete]);

  // Representación ASCII de la barra de progreso
  const asciiBarLength = 20;
  const filled = Math.floor((progress / 100) * asciiBarLength);
  const asciiBar = "█".repeat(filled) + "░".repeat(asciiBarLength - filled);

  return (
    <div className={`${styles.bootOverlay} ${glitch ? styles.glitchActive : ""}`}>
      {/* Fondo de columnas hexadecimales (efecto matriz) */}
      <div className={styles.hexBackground}>
        {hexColumns.map((col) => (
          <div
            key={col.id}
            className={styles.hexColumn}
            style={{ marginTop: `${col.offset}px` }}
          >
            {col.cells.map((hex, i) => (
              <span key={i} className={styles.hexCell}>
                {hex}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Laterales con datos de sistema (vertical) */}
      <div className={styles.sideStripLeft}>
        <div className={styles.verticalText}>
          <span>MEM_STABLE_01101</span>
          <span className={styles.separator}>|</span>
          <span>LATENCY: 12ms</span>
          <span className={styles.separator}>|</span>
          <span>CORE_TEMP: 42°C</span>
        </div>
      </div>

      <div className={styles.sideStripRight}>
        <div className={styles.verticalText}>
          <span>ENCRYPT_KEY: X-779-B</span>
          <span className={styles.separator}>|</span>
          <span>AUTH_TOKEN: VALID</span>
          <span className={styles.separator}>|</span>
          <span>SIG_INT: ACTIVE</span>
        </div>
      </div>

      {/* Contenedor principal con efecto terminal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.bootContainer}
      >
        {/* Cabecera */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <Terminal size={24} className={styles.terminalIcon} />
            <h1 className={styles.title}>INITIALIZING_DEV_CORE</h1>
          </div>
          <div className={styles.headerRight}>
            <span>SYS_ARCH: x64_FULL_STACK</span>
            <span className={styles.divider}>|</span>
            <span>BUILD: 2.0.42_AMBER</span>
          </div>
        </header>

        {/* Ventana principal con borde y scanline */}
        <div className={styles.terminalWindow}>
          <div className={styles.scanline}></div>
          <div className={styles.windowContent}>
            {/* Área de estado superior */}
            <div className={styles.statusArea}>
              <div className={styles.statusLeft}>
                <span className={styles.asciiSpinner}></span>
                <h2>DECRYPTING_MODULE_01...</h2>
              </div>
              <div className={styles.statusBadge}>
                <AlertTriangle size={12} />
                <span>UNSTABLE_LOAD</span>
              </div>
            </div>

            {/* Barra de progreso con representación ASCII */}
            <div className={styles.progressSection}>
              <div className={styles.progressLabels}>
                <span>DECOMPILING_HEX_STREAM</span>
                <span>
                  {progress}% [{asciiBar}]
                </span>
              </div>
              <div className={styles.progressBarOuter}>
                <motion.div
                  className={styles.progressBarInner}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Tabla de procesos (threads) */}
            <div className={styles.threadTable}>
              <table>
                <thead>
                  <tr>
                    <th>THREAD_ID</th>
                    <th>COMPONENT</th>
                    <th>VAL</th>
                    <th className={styles.textRight}>STATE</th>
                  </tr>
                </thead>
                <tbody>
                  {threads.map((thread) => (
                    <tr key={thread.id}>
                      <td>{thread.id}</td>
                      <td>{thread.component}</td>
                      <td>{thread.val}</td>
                      <td className={styles.textRight}>
                        <span className={`${styles.stateBadge} ${styles[thread.stateClass]}`}>
                          {thread.state}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Logs en vivo */}
            <div className={styles.consoleOutput}>
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${styles.logLine} ${styles[log.type]}`}
                  >
                    <span className={styles.logTime}>[{log.time}]</span>
                    <span className={styles.logMsg}>{log.msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.span
                animate={{ opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className={styles.cursor}
              >
                _
              </motion.span>
            </div>
          </div>
        </div>

        {/* Botones de control */}
        <div className={styles.controls}>
          <button className={styles.btnPrimary}>
            <Bolt size={14} />
            <span>OVERRIDE_BOOT</span>
          </button>
          <button className={styles.btnSecondary}>
            <Settings size={14} />
            <span>CONFIG_SYS</span>
          </button>
        </div>

        {/* Footer con metadatos */}
        <footer className={styles.bootFooter}>
          <div className={styles.footerLeft}>
            <Radio size={10} className={styles.pulse} />
            <span>LINK_ESTABLISHED: PORT-443</span>
            <Unlock size={10} />
            <span>ROOT_ACCESS: GRANTED</span>
          </div>
          <span className={styles.copyright}>© 2026 AMBER_TECH_SYSTEMS</span>
        </footer>
      </motion.div>
    </div>
  );
}