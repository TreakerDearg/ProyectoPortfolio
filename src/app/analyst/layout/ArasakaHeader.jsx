"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import {
  Terminal,
  Cpu,
  Globe,
  Activity,
  Zap,
  ShieldCheck,
  Radio,
  AlertTriangle,
  Skull
} from "lucide-react";

import ExitButton from "../ui/ExitButton";
import styles from "../styles/header.module.css";



/* ==================================================
   REDUCED MOTION
================================================== */

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
};



/* ==================================================
   HEADER COMPONENT
================================================== */

export default function ArasakaHeader({ isOverclocked = false }) {

  const router = useRouter();

  const prefersReducedMotion = usePrefersReducedMotion();



  /* ==================================================
     CLOCK
  ================================================== */

  const [sysTime, setSysTime] = useState("");

  useEffect(() => {

    const updateClock = () => {

      const now = new Date();

      setSysTime(
        now.toLocaleTimeString("en-GB", {
          hour12: false
        })
      );

    };

    updateClock();

    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);

  }, []);



  /* ==================================================
     TELEMETRY SIMULATION
  ================================================== */

  const [cpuLoad, setCpuLoad] = useState(24);

  useEffect(() => {

    const cpuTimer = setInterval(() => {

      setCpuLoad((prev) => {

        const variation = Math.floor(Math.random() * 6 - 3);

        let next = prev + variation;

        if (next < 5) next = 5;
        if (next > 92) next = 92;

        return next;

      });

    }, 4000);

    return () => clearInterval(cpuTimer);

  }, []);



  /* ==================================================
     TELEMETRY DATA
  ================================================== */

  const telemetryItems = useMemo(() => {

    const items = [

      { label: "CPU", val: `${cpuLoad}%`, icon: Cpu },

      { label: "SEC", val: "ENCRYPTED", icon: ShieldCheck },

      { label: "NET", val: "V-SAT_ACTIVE", icon: Globe },

      { label: "PWR", val: "STABLE", icon: Zap },

      { label: "LOG", val: "LISTENING", icon: Activity }

    ];

    /* duplicamos para ticker infinito */

    return [...items, ...items];

  }, [cpuLoad]);



  /* ==================================================
     EXIT HANDLER
  ================================================== */

  const handleExit = () => {

    router.push("/");

  };



  /* ==================================================
     RENDER
  ================================================== */

  return (

    <header
      className={`${styles.headerRoot} ${
        isOverclocked ? styles.overclock : ""
      }`}
      role="banner"
    >



      {/* DECORATIVE LAYERS */}

      <div className={styles.scanline} />
      <div className={styles.powerLine} />



      {/* LEFT SECTION */}

      <div className={styles.leftSection}>


        {/* SYSTEM BADGE */}

        <div className={styles.systemBadge}>

          <div
            className={styles.pulseDot}
            style={{
              animation: prefersReducedMotion ? "none" : undefined
            }}
          />

          <Terminal size={14} />

          <span className={styles.systemText}>
            ANALYST_NODE_01
          </span>

        </div>



        {/* CORPORATE BADGE */}

        <div className={styles.corpBadge}>

          <Skull size={12} />

          <span className={styles.corpName}>
            ARASAKA
          </span>

          <span className={styles.corpSector}>
            SEC-7
          </span>

        </div>



        {/* META INFO */}

        <div className={styles.metaGroup}>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>USR</span>
            <span className={styles.metaValue}>ROOT</span>
          </div>

          <div className={styles.metaItem}>
            <Radio size={10} />
            <span className={styles.linked}>LINKED</span>
          </div>

        </div>

      </div>



      {/* CENTER TELEMETRY TICKER */}

      <div
        className={styles.tickerContainer}
        aria-live="off"
      >

        <div className={styles.tickerContent}>

          {telemetryItems.map((item, i) => {

            const Icon = item.icon;

            return (

              <div key={i} className={styles.tickerItem}>

                <Icon size={12} />

                <span className={styles.tickerLabel}>
                  {item.label}
                </span>

                <span className={styles.tickerValue}>
                  [{item.val}]
                </span>

              </div>

            );

          })}

        </div>

      </div>



      {/* RIGHT SECTION */}

      <div className={styles.rightSection}>



        {/* OVERCLOCK WARNING */}

        {isOverclocked && (

          <div
            className={styles.overclockIndicator}
            role="status"
          >

            <AlertTriangle size={14} />

            <span className={styles.overclockText}>
              OVERCLOCK
            </span>

          </div>

        )}



        {/* CLOCK */}

        <div className={styles.clockWrapper}>

          <span
            className={styles.timeText}
            aria-live="off"
          >
            {sysTime || "--:--:--"}
          </span>

          <span className={styles.dateText}>
            GMT_REF_00
          </span>

        </div>



        {/* EXIT */}

        <ExitButton onClick={handleExit} />

      </div>



      {/* DATA SWEEP */}

      <div className={styles.dataSweep} />

    </header>
  );
}