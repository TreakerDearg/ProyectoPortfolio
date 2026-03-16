"use client";

import { useEffect, useState } from "react";
import { 
  Terminal, 
  Cpu, 
  MemoryStick, 
  Network, 
  Activity,
  Wifi,
  HardDrive,
  Clock,
  BatteryMedium,
  Volume2
} from "lucide-react";
import styles from "../../styles/kernelStyles/kernelHeader.module.css";

export default function KernelHeader() {
  const [time, setTime] = useState("");
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [latency, setLatency] = useState(0);

  // Reloj en vivo
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simular métricas del sistema
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 70) + 10); // 10-80%
      setMemory((Math.random() * 6 + 2).toFixed(1)); // 2-8 GB
      setLatency(Math.floor(Math.random() * 40) + 5); // 5-45 ms
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.header}>
      {/* Menú de sistema (similar a la barra de menús de Windows 95) */}
      <div className={styles.menuBar}>
        <div className={styles.menuItem}>Archivo</div>
        <div className={styles.menuItem}>Edición</div>
        <div className={styles.menuItem}>Ver</div>
        <div className={styles.menuItem}>Herramientas</div>
        <div className={styles.menuItem}>Ayuda</div>
      </div>

      {/* Barra de herramientas con indicadores */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <Terminal className={styles.icon} size={20} />
          <span className={styles.title}>Portfolio OS</span>
          <span className={styles.version}>v3.0.4</span>
        </div>

        <div className={styles.toolbarRight}>
          <div className={styles.metrics}>
            <div className={styles.metric} title="CPU Usage">
              <Cpu size={14} />
              <span>{cpu}%</span>
            </div>
            <div className={styles.metric} title="Memory Usage">
              <MemoryStick size={14} />
              <span>{memory} GB</span>
            </div>
            <div className={styles.metric} title="Network Latency">
              <Network size={14} />
              <span>{latency} ms</span>
            </div>
            <div className={styles.metric} title="Disk Activity">
              <HardDrive size={14} />
              <span>✓</span>
            </div>
            <div className={styles.metric} title="WiFi">
              <Wifi size={14} />
              <span>●</span>
            </div>
          </div>

          <div className={styles.separator}></div>

          <div className={styles.systemTray}>
            <BatteryMedium size={16} />
            <Volume2 size={16} />
            <div className={styles.clock}>
              <Clock size={12} />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}