"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Binary, Box, Cpu, HardDrive, Share2, Triangle } from 'lucide-react';
import styles from '../../../styles/D-side/inProcessProjects.module.css';

export const InProcessProjects = () => {
  const [systemTick, setSystemTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSystemTick(prev => prev + 1), 1200);
    return () => clearInterval(timer);
  }, []);

  const tasks = useMemo(() => [
    { id: 'NP-01', name: 'NEURAL_TOPOLOGY', status: 'SYNTHESIZING', progress: (systemTick * 4) % 101 },
    { id: 'XD-09', name: 'GHOST_ENCRYPTION', status: 'INJECTING', progress: (systemTick * 7) % 101 },
  ], [systemTick]);

  return (
    <div className={styles.foundryContainer}>
      {/* DECORACIÓN SUPERIOR: LÍNEA DE ENSAMBLAJE */}
      <div className={styles.assemblyLine}>
        <div className={styles.scannerBeam} />
      </div>

      <div className={styles.header}>
        <div className="flex flex-col">
          <span className={styles.nodeLabel}>CONSTRUCTION_MODULE</span>
          <h3 className={styles.mainTitle}>NODE_FOUNDRY_V9</h3>
        </div>
        <div className={styles.pulseScanner}>
          <Share2 size={12} className="text-sky-400" />
        </div>
      </div>

      <div className={styles.nodeGrid}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.nodeCard}>
            {/* INDICADOR LATERAL DE CONSTRUCCIÓN */}
            <div className={styles.sideIndicator}>
              <div className={task.progress > 50 ? styles.dotActive : styles.dotIdle} />
              <div className={styles.verticalLine} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-end mb-1">
                <span className={styles.taskId}>{task.id} // {task.status}</span>
                <span className={styles.taskPercent}>{Math.floor(task.progress)}%</span>
              </div>
              
              <h4 className={styles.taskName}>{task.name}</h4>

              {/* MATRIZ DE CONSTRUCCIÓN (Visualización de bloques) */}
              <div className={styles.matrixContainer}>
                {[...Array(12)].map((_, i) => {
                  const isActive = task.progress > (i * 8.33);
                  return (
                    <motion.div
                      key={i}
                      animate={isActive ? { 
                        backgroundColor: ["rgba(0,234,255,0.1)", "rgba(0,234,255,0.6)", "rgba(0,234,255,0.2)"],
                        border: "1px solid rgba(0,234,255,0.5)"
                      } : {}}
                      className={`${styles.matrixBlock} ${isActive ? styles.blockActive : ''}`}
                    >
                      {isActive && i % 3 === 0 && <div className={styles.innerCore} />}
                    </motion.div>
                  );
                })}
              </div>

              {/* SUB-DATOS TÉCNICOS */}
              <div className="flex gap-4 mt-2 opacity-40 font-mono text-[6px]">
                <span className="flex items-center gap-1"><Cpu size={8} /> ADDR: 0x{task.id}</span>
                <span className="flex items-center gap-1"><HardDrive size={8} /> SECTOR: 7-G</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER: TERMINAL DE ESTADO */}
      <div className={styles.foundryFooter}>
        <div className={styles.terminalLine}>
          <Triangle size={6} className="rotate-90 fill-sky-500" />
          <span>SYSTEM_READY: AWAITING_COMPLETE_INTEGRATION</span>
        </div>
      </div>
    </div>
  );
};