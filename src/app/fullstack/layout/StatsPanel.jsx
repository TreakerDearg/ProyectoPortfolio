"use client";
import { motion } from "framer-motion";
import { User, Zap, Shield, Binary, Cpu, MapPin, Award } from "lucide-react";
import { useSystem } from "../context/SystemContext";
import { SYSTEM_DATA } from "../data/projects";
import styles from "../styles/layout/StatsPanel.module.css";

export default function StatsPanel() {
  const { selectedMission, addLog } = useSystem();
  const { player, core_stats } = SYSTEM_DATA;

  // Si hay misión, mostramos sus stats específicas; si no, las core_stats del perfil
  const activeStats = selectedMission?.stats || core_stats;
  const statusLabel = selectedMission ? "MISSION_SPECS" : "CORE_ATTRIBUTES";

  const handleInitSequence = () => {
    const timestamp = new Date().toLocaleTimeString();
    addLog(`[${timestamp}] INITIALIZING_TACTICAL_OVERLAY...`);
    
    if (selectedMission) {
      addLog(`LINK_ESTABLISHED: ${selectedMission.title}`);
      addLog(`RANK_REQUIREMENT: ${selectedMission.difficulty}`);
    } else {
      addLog("STANDBY_MODE: MONITORING_LOCAL_NODE");
    }
  };

  return (
    <aside className={`${styles.container} col-span-3 p-6 flex flex-col gap-6`}>
      
      {/* SECCIÓN SUPERIOR: PERFIL DEL OPERADOR */}
      <div className={styles.vaultHeader}>
        <div className={styles.avatarFrame}>
          <User size={32} className="text-[#ff9d00]" />
          <div className={styles.scanlineOverlay} />
        </div>
        <div className="flex flex-col">
          <h2 className={styles.vaultTitle}>{player.alias}</h2>
          <p className={styles.vaultSubtitle}>
             {player.rank} // LVL_{player.level}
          </p>
        </div>
      </div>

      {/* DATOS DE LOCALIZACIÓN Y EXP */}
      <div className={styles.playerMeta}>
        <div className="flex items-center gap-2 text-[10px] opacity-70">
          <MapPin size={12} /> {player.location}
        </div>
        <div className="flex items-center gap-2 text-[10px] opacity-70">
          <Award size={12} /> EXP: {player.exp}
        </div>
      </div>

      {/* MÉTRICAS DINÁMICAS (S.P.E.C.I.A.L style) */}
      <div className="space-y-5 flex-grow">
        <h3 className={styles.sectionDivider}>--- {statusLabel} ---</h3>
        
        {activeStats.map((stat, idx) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={styles.statRow}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={styles.statName}>
                {stat.name}
              </span>
              <span className={styles.statValue}>
                {stat.val}<small>%</small>
              </span>
            </div>
            
            {/* Barra segmentada estilo Pip-Boy */}
            <div className={styles.pipBar}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stat.val}%` }}
                className={styles.pipFill}
              />
              {/* Overlay de rejilla para efecto segmentado */}
              <div className={styles.barGrid} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* INDICADORES DE ESTADO DEL SISTEMA */}
      <div className="bg-[#ff9d000a] border border-[#ff9d0022] p-3 space-y-2">
        <div className={styles.passiveTag}>
          <Cpu size={12} className="text-[#ff9d00]" /> 
          <span>SYSTEM: {player.status}</span>
        </div>
        <div className={styles.passiveTag}>
          <Binary size={12} className="text-[#ff9d00]" /> 
          <span>CLASS: {player.class}</span>
        </div>
        <div className={styles.passiveTag}>
          <Shield size={12} className="text-[#ff9d00]" /> 
          <span>SPEC: {player.specialization}</span>
        </div>
      </div>

      {/* ACCIÓN PRINCIPAL */}
      <button 
        onClick={handleInitSequence}
        className={styles.pipButton}
      >
        <Zap size={14} /> [ EXECUTE_OVERRIDE ]
      </button>

    </aside>
  );
}