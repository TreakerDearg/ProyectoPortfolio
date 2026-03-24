"use client";

import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Zap,
  ShieldCheck,
  Activity,
  ChevronLeft,
  Terminal,
  AlertTriangle
} from "lucide-react";

import styles from "../styles/drawer.module.css";

import { SignalGraph } from "./Draw-Comple/SignalGraph";
import { AtomicStructure } from "./Draw-Comple/AtomicStructure";


/* =========================
   ANIMATIONS
========================= */

const panelVariants = {
  hidden: { x: "100%", opacity: 0.6, filter: "blur(4px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 160,
      staggerChildren: 0.05
    }
  },
  exit: {
    x: "100%",
    opacity: 0,
    filter: "blur(6px)",
    transition: { duration: 0.25 }
  }
};


/* =========================
   COMPONENT
========================= */

export const Drawer = ({ item, isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);


  /* =========================
     SYSTEM STATE
  ========================= */

  const systemState = useMemo(() => {
    if (!item) return "OFFLINE";
    if (item.qty < 15) return "CRITICAL";
    if (item.qty < 40) return "DEGRADED";
    return "STABLE";
  }, [item]);

  const stateConfig = {
    OFFLINE: { color: "gray", glow: false },
    STABLE: { color: "green", glow: false },
    DEGRADED: { color: "amber", glow: true },
    CRITICAL: { color: "red", glow: true }
  };

  const currentState = stateConfig[systemState];
  const isCritical = systemState === "CRITICAL";


  /* =========================
     BOOT EFFECT
  ========================= */

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setBooted(true), 120);
      return () => clearTimeout(t);
    } else {
      setBooted(false);
    }
  }, [isOpen]);


  /* =========================
     SCROLL LOCK
  ========================= */

  useEffect(() => {

    if (isOpen) {
      const scrollWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };

  }, [isOpen]);


  /* =========================
     ESC KEY CLOSE
  ========================= */

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);
  if (!mounted || !item || !isOpen) return null;
  const drawerJSX = (

    <AnimatePresence>

      <div
        className={styles.drawerOverlay}
        onClick={onClose}
      >

        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          data-state={systemState}
          data-color={currentState.color}
          data-glow={currentState.glow}
          className={styles.drawerContent}
          onClick={(e) => e.stopPropagation()}
        >

          {/* =========================
             SYSTEM BAR
          ========================= */}

          <div className={styles.systemBar}>

            <div className={styles.systemLeft}>
              <Terminal size={12} />
              <span className={styles.systemCode}>
                SYS://D6_TERMINAL_NODE
              </span>
            </div>

            <div className={styles.systemRight}>
              <span className={styles.systemState}>
                [{systemState}]
              </span>

              <div className={styles.statusWrapper}>
                <div className={styles.statusDot} />
                <div className={styles.statusPulse} />
              </div>
            </div>

          </div>


          {/* =========================
             EJECT HANDLE
          ========================= */}

          <button
            className={styles.ejectHandle}
            onClick={onClose}
          >
            <div className={styles.handleTrack}>
              <ChevronLeft size={16} />
              <span className={styles.handleText}>
                EJECT_PANEL
              </span>
              <div className={styles.handleLed} />
            </div>
          </button>


          {/* =========================
             FX LAYERS
          ========================= */}

          <div className={styles.scanOverlay} />
          <div className={styles.grainOverlay} />


          {/* =========================
             BODY
          ========================= */}

          <motion.div
            animate={{ opacity: booted ? 1 : 0 }}
            className={styles.technicalBody}
          >

            {/* =========================
               HEADER (TERMINAL)
            ========================= */}

            <section className={styles.sectionPrimary}>
              <div className={styles.terminalBlock}>
                <span className={styles.terminalLine}>
                  Data_Link_Established
                </span>

                <span className={styles.terminalLine}>
                  UID_{item.id || "UNKNOWN"}
                </span>

                <span className={styles.terminalStatus}>
                  {systemState}
                </span>

                <h2 className={styles.terminalTitle}>
                  {item.name}
                </h2>

                <div className={styles.terminalGroup}>
                  <span className={styles.terminalLabel}>Origin_Sector</span>
                  <span className={styles.terminalValue}>
                    {item.metadata?.sector || "UNKNOWN"}
                  </span>
                </div>

                <div className={styles.terminalGroup}>
                  <span className={styles.terminalLabel}>Rad_Exposure</span>
                  <span className={styles.terminalValue}>
                    {item.metadata?.radiation || "0.00 mSv"}
                  </span>
                </div>
              </div>
            </section>


            {/* =========================
               METRICS
            ========================= */}

            <section className={styles.sectionGrid}>
              <DataField
                label="Inventory_Volume"
                value={item.qty}
                unit="%_STOCK"
                critical={isCritical}
              />
              <DataField
                label="Registry_UID"
                value={item.code}
              />
            </section>


            {/* =========================
               LOG (TERMINAL STYLE)
            ========================= */}

            <section className={styles.sectionLog}>
              <div className={styles.terminalBlock}>
                <span className={styles.terminalLabel}>
                  COMPOSITION_LOG
                </span>
                <span className={styles.terminalLine}>
                  INIT_SEQUENCE...
                </span>
                <span className={styles.terminalLine}>
                  PARSING_COMPOUND...
                </span>
                <span className={`${styles.terminalLine} ${styles.logHighlight}`}>
                  {item.flavorText}
                </span>
              </div>
            </section>


            {/* =========================
               ATOMIC
            ========================= */}

            <section>
              <AtomicStructure
                category={item.category}
                specs={item.atomicSpecs}
                universe={item.universe}
              />
            </section>


            {/* =========================
               SIGNAL
            ========================= */}

            <section>
              <SignalGraph
                label="Molecular_Stability_Wave"
                percentage={item.qty}
              />
            </section>


            {/* =========================
               TELEMETRY
            ========================= */}

            <section className={styles.telemetrySection}>
              <div className={styles.terminalBlock}>
                <span className={styles.terminalLabel}>
                  TELEMETRY_STREAM
                </span>
                <span className={styles.terminalLine}>
                  ORIGIN: {item.metadata?.sector || "UNKNOWN"}
                </span>
                <span className={styles.terminalLine}>
                  RAD_LEVEL: {item.metadata?.radiation || "N/A"}
                </span>
              </div>
            </section>


            {/* =========================
               SECURITY
            ========================= */}

            <section
              className={`
                ${styles.securityProtocol}
                ${isCritical ? styles.protocolAlert : ""}
              `}
            >
              <div className={styles.terminalBlock}>
                <span className={styles.terminalStatus}>
                  Protocol_D6 // {systemState}
                </span>
                <span
                  className={`
                    ${styles.terminalValue}
                    ${isCritical ? styles.terminalValueCritical : ""}
                  `}
                >
                  {isCritical
                    ? "CRITICAL FAILURE: ATOMIC INSTABILITY DETECTED"
                    : "SYSTEM STABLE: READY FOR DISPENSING"}
                </span>
              </div>
            </section>
          </motion.div>


          {/* =========================
             FOOTER
          ========================= */}

          <div className={styles.actionFooter}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className={`
                ${styles.mainActionButton}
                ${isCritical ? styles.btnCritical : styles.btnAmber}
              `}
            >
              <div className={styles.buttonInner}>
                <Zap size={18} />
                <span className={styles.buttonLabel}>
                  {isCritical
                    ? "OVERRIDE_LOCKDOWN"
                    : "DISPENSE_BATCH"}
                </span>
                <div className={styles.buttonGlow} />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
  return createPortal(drawerJSX, document.body);
};


/* =========================
   SUB COMPONENT
========================= */

const DataField = ({ label, value, unit, critical }) => (

  <div
    className={styles.dataField}
    data-critical={critical}
  >
    <div className={styles.fieldDecoration} />
    <span className={styles.terminalLabel}>
      {label}
    </span>
    <div className={styles.valueRow}>
      <span className={styles.terminalValue}>
        {value}
      </span>
      {unit && (
        <span className={styles.unit}>
          {unit}
        </span>
      )}
    </div>

    {typeof value === "number" && (
      <div className={styles.valueBar}>
        <div
          className={styles.valueFill}
          style={{ width: `${value}%` }}
        />
      </div>
    )}
  </div>
);