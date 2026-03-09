"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAnalysis } from "../context/AnalysisContext";
import styles from "../styles/sidebarRight.module.css";

import {
  Cpu, Shield, Database, Activity, Lock, ChevronLeft, 
  ExternalLink, Terminal, Scan, Radio, Target, 
  BarChart3, Crosshair, Menu, X
} from "lucide-react";

// Componentes decorativos (Asumiendo que existen en tu estructura)
import { SystemCircularNode } from "../ui/decorations/right-d/SystemCircularNode";
import { InProcessProjects } from "../ui/decorations/right-d/InProcessProjects";
import { DeletedProjects } from "../ui/decorations/right-d/DeletedProjects";
import { SignalInterference } from "../ui/decorations/right-d/SignalInterference";

export const SidebarRight = () => {
  const router = useRouter();
  const { selectedNode, rightCollapsed, setRightCollapsed } = useAnalysis();
  const [timestamp, setTimestamp] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detector de tamaño de pantalla para comportamiento responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      {/* BOTÓN DE CONTROL: Cambia de estilo en Mobile vs Desktop */}
      <div className={`${styles.handleWrapper} ${rightCollapsed ? styles.isCollapsed : ""}`}>
        <button 
          className={styles.collapseHandle}
          onClick={() => setRightCollapsed(!rightCollapsed)}
          title={rightCollapsed ? "Expand Intel" : "Collapse Intel"}
        >
          <div className={styles.handleContent}>
            {isMobile ? (
              rightCollapsed ? <Menu size={16} /> : <X size={16} />
            ) : (
              <motion.div 
                animate={{ rotate: rightCollapsed ? 0 : 180 }}
                className="flex items-center justify-center"
              >
                <ChevronLeft size={14} strokeWidth={3} />
              </motion.div>
            )}
          </div>
          <div className={styles.handleGlow} />
          {/* Decoración estética del botón */}
          <div className={styles.handleDetail} />
        </button>
      </div>

      <aside className={`
        ${styles.sidebarRoot} 
        ${rightCollapsed ? styles.collapsed : styles.expandedWidth}
        ${isMobile && !rightCollapsed ? styles.mobileOverlay : ""}
      `}>
        
        <header className={styles.sidebarHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.scanIconBox}>
              <Scan size={14} className="text-sky-400" />
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }} 
                transition={{ duration: 2, repeat: Infinity }} 
                className={styles.scanLineInner} 
              />
            </div>
            {!rightCollapsed && (
              <div className={styles.headerTitles}>
                <span className={styles.arasakaIntelText}>ARASAKA_INTEL</span>
                <span className={styles.localNodeText}>NODE_ST_V9.4</span>
              </div>
            )}
          </div>
          {!rightCollapsed && (
            <div className={styles.headerRight}>
              <span className={styles.clockText}>{timestamp}</span>
              <div className={styles.statusBadge}>
                <div className={styles.statusDot} />
                <span>SECURED</span>
              </div>
            </div>
          )}
        </header>

        <div className={styles.mainContainer}>
          <div className={styles.scrollArea}>
            {!rightCollapsed ? (
              <div className={styles.contentPadding}>
                
                <section className={styles.spectrumSection}>
                  <div className={styles.miniHeader}>
                    <span className={styles.miniTitle}>Spectrum_Analyze</span>
                    <Radio size={8} className="text-sky-400 opacity-50" />
                  </div>
                  <div className={styles.spectrumContent}>
                    <SignalInterference />
                  </div>
                </section>

                <AnimatePresence mode="wait">
                  {selectedNode ? (
                    <motion.div
                      key={selectedNode.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={styles.nodeDetails}
                    >
                      <section className={styles.moduleSection}>
                        <div className={styles.sectionLabel}>
                          <Crosshair size={8} /> <span>TARGET_DESIGNATION</span>
                        </div>
                        <div className={styles.targetCard}>
                          <div className={styles.cardCorner} />
                          <span className={styles.identityLock}>ID_LOCK_CONFIRMED:</span>
                          <h3 className={styles.targetName}>{selectedNode.name}</h3>
                          <button className={styles.vaultBtn} onClick={() => router.push("/analyst/projects")}>
                            <Terminal size={10} />
                            <span>DATA_VAULT_ACCESS</span>
                            <ExternalLink size={8} className="ml-auto opacity-40" />
                          </button>
                        </div>
                      </section>

                      <div className={styles.telemetryGrid}>
                        <DataTile icon={<Activity size={10} />} label="LOAD" value="1.42" sub="ms" />
                        <DataTile icon={<Database size={10} />} label="BUFF" value="0.04" sub="db" />
                        <DataTile icon={<Cpu size={10} />} label="PROC" value="12.2" sub="gb" />
                        <DataTile icon={<Lock size={10} />} label="ENCR" value="X_AES" sub="v2" />
                      </div>

                      <section className={styles.forensicsSection}>
                        <div className={styles.sectionLabel}>
                          <BarChart3 size={8} /> <span>PROCESS_FORENSICS</span>
                        </div>
                        <div className={styles.forensicsWrapper}>
                          <InProcessProjects />
                          <div className={styles.dividerGradient} />
                          <DeletedProjects />
                        </div>
                      </section>
                    </motion.div>
                  ) : (
                    <div className={styles.waitingState}>
                      <Target size={32} className={styles.pulseIcon} />
                      <span className={styles.waitingText}>LINK_STBY</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className={styles.collapsedIcons}>
                <div className={styles.iconGroup}>
                  <Database size={14} className="opacity-40" />
                  <Cpu size={14} className="opacity-40" />
                  <Shield size={14} className="opacity-40" />
                </div>
                <div className={styles.verticalDivider} />
                <span className={styles.verticalText}>ASKA_NODE_9.4</span>
              </div>
            )}
          </div>

          {!rightCollapsed && (
            <footer className={styles.sidebarFooter}>
              <div className={styles.footerInner}>
                <div className={styles.coreIntegrityBox}>
                  <div className={styles.circularNodeWrapper}>
                    <SystemCircularNode baseSize={1.4} />
                    <div className={styles.nodeCoreCenter} />
                  </div>
                  <div className={styles.integrityInfo}>
                    <span className={styles.integrityText}>CORE_INTEGRITY</span>
                    <div className={styles.miniBarContainer}>
                      <div className={styles.miniBarTrack}>
                        <motion.div className={styles.miniBarFill} animate={{ width: "100%" }} />
                      </div>
                      <span className={styles.syncText}>100%</span>
                    </div>
                  </div>
                </div>
                <div className={styles.resourceBars}>
                  <ResourceBar label="NEURAL_LOAD" val={32} color="#00eaff" />
                  <ResourceBar label="ICE_BARRIER" val={94} color="#00eaff" />
                </div>
              </div>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
};

/* --- AUXILIARES (Sin cambios) --- */
const DataTile = ({ icon, label, value, sub }) => (
  <div className={styles.dataTile}>
    <div className={styles.tileHeader}>{icon}<span className={styles.tileLabel}>{label}</span></div>
    <div className={styles.tileMain}><span className={styles.tileValue}>{value}</span><span className={styles.tileSub}>{sub}</span></div>
  </div>
);

const ResourceBar = ({ label, val, color }) => (
  <div className={styles.resBarWrapper}>
    <div className={styles.resBarInfo}><span className={styles.resLabel}>{label}</span><span className={styles.resVal}>{val}%</span></div>
    <div className={styles.barTrack}><motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} style={{ backgroundColor: color }} className={styles.barFill} /></div>
  </div>
);