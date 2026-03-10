"use client";
import { motion } from "framer-motion";
import { Lock, Unlock, ChevronRight, Zap } from "lucide-react";
import { useSystem } from "../context/SystemContext";
import styles from "../styles/components/MissionCard.module.css";

const MissionCard = ({ mission }) => {
  const { selectedMission, setSelectedMission, addLog } = useSystem();

  const isLocked = mission.status === "LOCKED";
  const isActive = selectedMission?.id === mission.id;

  const handleClick = () => {
    if (isLocked) {
      addLog("!! ACCESS_DENIED: INSUFFICIENT_CLEARANCE !!");
      return;
    }
    setSelectedMission(mission);
    addLog(`LOAD_SEQUENCE: ${mission.title} INITIALIZED`);
  };

  return (
    <motion.div 
      whileHover={!isLocked ? { x: 8 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={handleClick}
      className={`
        ${styles.cartridge} 
        ${isLocked ? styles.locked : styles.unlocked} 
        ${isActive ? styles.active : ""}
      `}
    >
      {/* Muesca lateral física del cartucho */}
      <div className={styles.notch} />
      
      {/* Indicador de lectura (LED) */}
      <div className={styles.readerLed} />

      <div className={styles.content}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className={styles.serialNumber}>ID_{mission.id.toUpperCase()}</span>
              <span className={styles.typeTag}>{mission.type}</span>
            </div>
            <h3 className={styles.title}>
              {isLocked ? "DATA_ENCRYPTED" : mission.title}
            </h3>
          </div>
          
          <div className={styles.iconContainer}>
            {isLocked ? <Lock size={14} /> : <Zap size={14} className={isActive ? "animate-pulse" : ""} />}
          </div>
        </div>

        {/* Barra de progreso de la misión (Mini) */}
        {!isLocked && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${mission.progress}%` }}
                className={styles.progressFill}
              />
            </div>
            <span className={styles.progressText}>{mission.progress}%</span>
          </div>
        )}

        <div className={styles.footer}>
          <div className="flex gap-4">
            <div className={styles.meta}>
              <span className="opacity-40">XP:</span> {isLocked ? "---" : mission.xp}
            </div>
            <div className={styles.meta}>
              <span className="opacity-40">RANK:</span> {isLocked ? "???" : mission.difficulty}
            </div>
          </div>
          {!isLocked && <ChevronRight size={14} className={styles.arrow} />}
        </div>
      </div>

      {/* Textura de escaneo interna */}
      <div className={styles.cardOverlay} />
    </motion.div>
  );
};

export default MissionCard;