"use client";
import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/deco-layout/HeaderExhaust.module.css";

export const HeaderExhaust = ({
  intensity = "normal",        // normal | high | critical
  status = "active",           // active | inactive | warning
  radiationLevel = 0,
  temperature = 35,
  diagnosticMode = false
}) => {

  const [displayTemp, setDisplayTemp] = useState(temperature);

  // Simulación de pequeñas variaciones térmicas
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTemp(prev => {
        const variation = (Math.random() * 4) - 2;
        return Math.max(0, Math.min(120, prev + variation));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Configuración térmica
  const thermalConfig = useMemo(() => {

    const configs = {
      normal: {
        heatColor: "rgba(217,119,6,0.25)",
        ledColor: "#10b981",
        fanSpeed: 6,
        label: "VENT_TEMP_NOM"
      },

      high: {
        heatColor: "rgba(234,88,12,0.45)",
        ledColor: "#f59e0b",
        fanSpeed: 3,
        label: "VENT_TEMP_HIGH"
      },

      critical: {
        heatColor: "rgba(220,38,38,0.7)",
        ledColor: "#ef4444",
        fanSpeed: 1,
        label: "THERMAL_CRITICAL"
      }
    };

    return configs[intensity];

  }, [intensity]);

  const isCritical = intensity === "critical";
  const isWarning = intensity === "high";

  const heatStrength = displayTemp / 100;

  const fins = useMemo(() => Array.from({ length: 12 }), []);

  return (
    <motion.div
      className={styles.exhaustChassis}

      animate={
        isCritical
          ? { x: [-1, 1, -1] }
          : {}
      }

      transition={{
        duration: 0.2,
        repeat: Infinity
      }}
    >

      {/* ============================= */}
      {/* NÚCLEO TÉRMICO */}
      {/* ============================= */}

      <div className={styles.thermalCore}>

        <motion.div
          className={styles.heatGlow}
          style={{
            backgroundColor: thermalConfig.heatColor,
            boxShadow: `0 0 ${20 + heatStrength * 40}px ${thermalConfig.heatColor}`
          }}
        />

        {/* Turbina */}
        <motion.div
          className={styles.fanRotor}
          animate={{ rotate: 360 }}
          transition={{
            duration: thermalConfig.fanSpeed,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className={styles.heatHaze} />

      </div>

      {/* ============================= */}
      {/* ALETAS DE DISIPACIÓN */}
      {/* ============================= */}

      <div className={styles.finArray}>

        {fins.map((_, i) => (

          <motion.div
            key={i}
            className={styles.coolingFin}

            animate={
              isCritical
                ? { y: [0, -2, 0] }
                : {}
            }

            transition={{
              delay: i * 0.05,
              duration: 0.4,
              repeat: Infinity
            }}
          >

            <div className={styles.finBevel} />
            <div className={styles.finShadow} />

          </motion.div>

        ))}

      </div>

      {/* ============================= */}
      {/* PARTÍCULAS DE VAPOR */}
      {/* ============================= */}

      <div className={styles.steamField}>

        {Array.from({ length: 6 }).map((_, i) => (

          <motion.span
            key={i}
            className={styles.steamParticle}

            animate={{
              y: [-10, -60],
              opacity: [0.2, 0.7, 0]
            }}

            transition={{
              duration: 3 + Math.random(),
              repeat: Infinity,
              delay: i * 0.4
            }}
          />

        ))}

      </div>

      {/* ============================= */}
      {/* READOUT */}
      {/* ============================= */}

      <div className={styles.decoOverlay}>

        <div className={styles.readout}>

          <motion.div
            className={styles.statusLed}

            style={{
              backgroundColor: thermalConfig.ledColor
            }}

            animate={
              isCritical
                ? {
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.4, 1]
                  }
                : isWarning
                ? {
                    scale: [1, 1.2, 1]
                  }
                : {}
            }

            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />

          <span className={styles.serialNumber}>

            {radiationLevel > 0
              ? `RAD:${Math.round(radiationLevel)}`
              : `TEMP:${Math.round(displayTemp)}°F`}

          </span>

        </div>

      </div>

      {/* ============================= */}
      {/* BARRA DE RADIACIÓN */}
      {/* ============================= */}

      {radiationLevel > 0 && (

        <div className={styles.radBar}>

          <motion.div
            className={styles.radFill}
            initial={{ width: "0%" }}
            animate={{ width: `${radiationLevel}%` }}
            transition={{ duration: 0.5 }}
          />

        </div>

      )}

      {/* ============================= */}
      {/* WARNING LABEL */}
      {/* ============================= */}

      <motion.div
        className={styles.warningLabel}

        animate={
          isCritical
            ? { opacity: [0.5, 1, 0.5] }
            : {}
        }

        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
      >

        <span
          className={
            isCritical
              ? styles.criticalText
              : styles.warningText
          }
        >

          CAUTION: {thermalConfig.label}

        </span>

      </motion.div>

      {/* ============================= */}
      {/* DIAGNOSTIC MODE */}
      {/* ============================= */}

      {diagnosticMode && (

        <div className={styles.diagnosticPanel}>

          <span>RPM: {Math.round(1800 + heatStrength * 2200)}</span>

          <span>
            PRESSURE: {Math.round(12 + heatStrength * 8)} PSI
          </span>

          <span>
            FLOW: {status === "active" ? "OK" : "LOW"}
          </span>

        </div>

      )}

    </motion.div>
  );
};