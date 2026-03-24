"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

export const SignalGraph = ({ label = "STABILITY", percentage = 70 }) => {

  /* =========================
     SEED BASE (CONSISTENTE)
  ========================= */
  const bars = useMemo(
    () => Array.from({ length: 18 }, (_, i) => 0.3 + (i % 5) * 0.1),
    []
  );

  /* =========================
     NORMALIZACIÓN DEL SIGNAL
  ========================= */
  const normalized = Math.max(5, Math.min(percentage, 100));
  const intensity = normalized / 100; // 0 → 1

  return (
    <div className="signalContainer group">

      {/* =========================
         HEADER
      ========================= */}

      <div className="signalHeader">
        <div className="signalLabelBlock">
          <div className="signalLed" />
          <span className="signalLabel">
            [{label}] // SIGNAL_ANALYSIS
          </span>
        </div>
        <div className="signalValue">
          <span className="signalNumber">
            {normalized}
          </span>
          <span className="signalUnit">%</span>
        </div>
      </div>

      {/* =========================
         GRAPH CORE
      ========================= */}

      <div className="signalGraphCore">
        {/* GRID */}
        <div className="signalGrid" />
        {/* BARS */}
        {bars.map((seed, i) => {
          const dynamicBase = 20 + seed * 50;
          const scaledHeight =
            dynamicBase * (0.4 + intensity * 0.8);
          return (
            <motion.div
              key={i}
              className="signalBarWrapper"
              initial={{ height: "10%" }}
              animate={{
                height: [
                  `${scaledHeight}%`,
                  `${scaledHeight + Math.random() * 30}%`,
                  `${scaledHeight - Math.random() * 20}%`,
                  `${scaledHeight}%`
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.4 + seed,
                delay: i * 0.04,
                ease: "easeInOut"
              }}
            >
              {/* CORE BAR */}
              <div
                className="signalBar"
                style={{
                  opacity: 0.25 + intensity * 0.75
                }}
              />
              {/* GLOW */}
              <div className="signalBarGlow" />

            </motion.div>
          );
        })}

        {/* ENERGY OVERLAY */}
        <motion.div
          className="signalEnergy"
          animate={{
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5
          }}
        />
      </div>


      {/* =========================
         FOOTER
      ========================= */}

      <div className="signalFooter">
        <div className="signalMeta">
          <span>Scale_Auto</span>
          <span>D6_Band</span>
        </div>

        <div className="signalFreq">
          <span>2.4GHz</span>
          <span className="divider">|</span>
          <span>5.8GHz</span>
        </div>

      </div>

      {/* =========================
         SCAN LINE
      ========================= */}
      <motion.div
        className="signalScan"
        animate={{ y: ["-20%", "120%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};