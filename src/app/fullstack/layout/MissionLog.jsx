"use client";
import { motion } from "framer-motion";
import { SYSTEM_DATA } from "../data/projects";
import { Activity, Database, ListFilter } from "lucide-react";
import MissionCard from "../components/MissionCard";
import { useSystem } from "../context/SystemContext";
import styles from "../styles/layout/MissionLog.module.css";

export default function MissionLog() {
  const { projects } = SYSTEM_DATA;
  const { setSelectedMission, addLog, selectedMission } = useSystem();

  const handleSelectMission = (mission) => {
    // Evitar recarga si ya está seleccionada
    if (selectedMission?.id === mission.id) return;

    setSelectedMission(mission);
    
    // Log dinámico basado en el estado del proyecto
    const timestamp = new Date().toLocaleTimeString();
    addLog(`[${timestamp}] ACCESSING_DATABANK: ${mission.title}...`);
    
    if (mission.status === "LOCKED") {
      addLog(`ERR: ENCRYPTED_CONTENT. RANK_S_REQUIRED.`);
    } else {
      addLog(`SUCCESS: SYNCING_NEURAL_LINK... ${mission.progress}%`);
    }
  };

  return (
    <aside className={styles.logContainer}>
      {/* OVERLAY DE ESCANEO LOCAL */}
      <div className={styles.localScanline} />

      {/* HEADER: MONITOR DE OPERACIONES */}
      <div className={styles.logHeader}>
        <div className="flex items-center gap-3">
          <div className={styles.headerIconBox}>
            <ListFilter size={16} className={styles.pulseIcon} />
          </div>
          <div className="flex flex-col">
            <h2 className={styles.headerTitle}>MISSION_LOG</h2>
            <div className="flex items-center gap-2">
               <span className={styles.statusDot} />
               <span className={styles.headerSub}>ACTIVE_FILES: {projects.length}</span>
            </div>
          </div>
        </div>
        <div className={styles.headerDecorator}>
          <div className={styles.rect} />
          <div className={styles.rect} />
        </div>
      </div>

      {/* LISTA DE ARCHIVOS (SCROLLABLE) */}
      <div className={styles.scrollArea}>
        {projects.map((m, index) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MissionCard
              mission={m}
              isSelected={selectedMission?.id === m.id}
              onClick={() => handleSelectMission(m)}
            />
          </motion.div>
        ))}
      </div>

      {/* FOOTER: IDENTIFICADOR DE HARDWARE */}
      <div className={styles.footerDetail}>
        <div className="flex flex-col gap-1">
          <div className={styles.barcode} />
          <div className="flex justify-between items-center w-full">
            <span className="text-[8px] opacity-40 font-mono tracking-widest">
              SEC_OS_V.4.0.0_AMBER
            </span>
            <div className="flex gap-1">
              <div className={styles.indicatorLight} />
              <div className={styles.indicatorLightActive} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}