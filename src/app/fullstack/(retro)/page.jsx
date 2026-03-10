"use client";
import { motion, AnimatePresence } from "framer-motion";
import { SYSTEM_DATA } from "../data/projects";
import { Terminal, Target, Zap, ShieldAlert, Layers, ExternalLink, Database, Cpu } from "lucide-react";
import { useSystem } from "../context/SystemContext";
import styles from "../styles/fullstack.module.css";

export default function FullstackPage() {
  const { player, modules } = SYSTEM_DATA;
  const { selectedMission } = useSystem();

  const activeMission = selectedMission || SYSTEM_DATA.projects.find(p => p.id === "p2") || SYSTEM_DATA.projects[0];

  return (
    <div className={styles.monitorFrame}>
      {/* CAPA DE VIDRIO Y REFLEJO CURVO */}
      <div className={styles.glassSurface}>
        <div className={styles.reflection} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 1.1, filter: "brightness(2)" }} 
        animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }} 
        className={styles.crtScreen}
      >
        {/* EFECTOS DINÁMICOS FOSFÓRICOS */}
        <div className={styles.scanlines} />
        <div className={styles.flicker} />

        {/* TOP STATUS BAR (V-TEC STANDARD) */}
        <header className={styles.topNav}>
          <div className="flex items-center gap-6">
            <div className={styles.powerLed}>ON</div>
            <h2 className={styles.navBrand}>ROBCO INDUSTRIES (TM) TERMLINK</h2>
          </div>
          <div className={styles.topStats}>
            <span>RADS: 00</span>
            <div className={styles.hpBar}><div className={styles.hpFill} /></div>
            <span>STP: 100%</span>
          </div>
        </header>

        <div className="grid grid-cols-12 flex-grow overflow-hidden">
          
          {/* COLUMNA IZQUIERDA: HARDWARE & STATS */}
          <aside className="col-span-3 border-r border-[#ff9d0044] p-6 bg-[#ff9d0005]">
            <div className={styles.sidebarHeader}>
              <Cpu size={14} /> <span>HARDWARE_STATUS</span>
            </div>
            
            <div className="mt-6 space-y-8">
              <section>
                <label className={styles.microLabel}>USER_PROFILE</label>
                <p className={styles.operatorName}>{player.alias}</p>
                <p className={styles.operatorRank}>{player.rank} // LVL {player.level}</p>
              </section>

              <section>
                <label className={styles.microLabel}>ACTIVE_MODULES</label>
                <div className="space-y-2 mt-2">
                  {modules.map(mod => (
                    <div key={mod.id} className={styles.moduleRow}>
                      <span className="truncate">{mod.name}</span>
                      <span className={styles.statusOk}>READY</span>
                    </div>
                  ))}
                </div>
              </section>

              <div className={styles.diagBox}>
                <Database size={12} />
                <span>CORE_TEMP: {activeMission.diagnostics.core_temp}</span>
                <div className={styles.signalWaves} />
              </div>
            </div>
          </aside>

          {/* ÁREA CENTRAL: DATA_VISUALIZER */}
          <main className="col-span-9 p-10 flex flex-col relative overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.section
                key={activeMission.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="mb-10 flex justify-between items-end border-b border-[#ff9d0022] pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[#ff9d0088] mb-2">
                      <Target size={14} />
                      <span className="text-[10px] tracking-[5px] uppercase">{activeMission.type}</span>
                    </div>
                    <h1 className={styles.mainTitle}>{activeMission.title}</h1>
                  </div>
                  <div className={styles.xpBadge}>+{activeMission.xp} XP</div>
                </div>

                <div className="grid grid-cols-2 gap-12">
                  <article className="space-y-8">
                    <div className={styles.infoGroup}>
                      <h4 className={styles.groupTitle}><Terminal size={14} /> OBJECTIVE_BRIEF</h4>
                      <p className={styles.bodyText}>{activeMission.description}</p>
                    </div>

                    <div className={styles.infoGroup}>
                      <h4 className={styles.groupTitle}><Layers size={14} /> TECH_STACK</h4>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {activeMission.tech.map(t => (
                          <span key={t} className={styles.amberTag}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </article>

                  <aside className="space-y-6">
                    <div className={styles.linkTerminal}>
                      <p className="text-[10px] opacity-40 mb-3">CONNECTION_CHANNELS</p>
                      <a href={`https://${activeMission.repository}`} target="_blank" className={styles.linkItem}>
                        <ExternalLink size={12} /> REPOSITORY_SOURCE
                      </a>
                      <a href={activeMission.deploy} target="_blank" className={styles.linkItem}>
                        <ExternalLink size={12} /> LIVE_DEPLOYMENT
                      </a>
                    </div>

                    <div className={styles.alertPanel}>
                      <ShieldAlert size={20} className="text-[#ff9d00]" />
                      <div>
                        <p className="text-[11px] font-black uppercase">Mission Security</p>
                        <p className="text-[10px] opacity-60">Status: {activeMission.status} // No threats detected</p>
                      </div>
                    </div>
                  </aside>
                </div>

                {/* FOOTER DATA GRID */}
                <footer className={styles.bottomData}>
                   <div className={styles.dataNode}>
                      <span className={styles.nodeLabel}>SYNC</span>
                      <span className={styles.nodeVal}>{activeMission.diagnostics.sync_rate}</span>
                   </div>
                   <div className={styles.dataNode}>
                      <span className={styles.nodeLabel}>LOAD</span>
                      <span className={styles.nodeVal}>{activeMission.diagnostics.load_time}</span>
                   </div>
                   <div className={styles.dataNode}>
                      <span className={styles.nodeLabel}>UPTIME</span>
                      <span className={styles.nodeVal}>{activeMission.diagnostics.uptime || "100%"}</span>
                   </div>
                </footer>
              </motion.section>
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </div>
  );
}