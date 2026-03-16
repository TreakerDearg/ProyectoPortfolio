'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Radio, Activity } from 'lucide-react';

import styles from '../styles/footer.module.css';

export const Footer = () => {

  const sensors = [
    { label: "Radiation", value: "0.04 mSv/h", status: "SAFE", color: "safe" },
    { label: "Air_Quality", value: "Optimal", status: "W_02", color: "warn" },
    { label: "Station_Temp", value: "18°C", status: "NOMINAL", color: "cold" },
    { label: "Bar_Pressure", value: "1013 hPa", status: "STABLE", color: "neutral" }
  ];

  return (

    <footer className={styles.footerContainer}>

      {/* ===============================
          SENSOR TELEMETRY GRID
      =============================== */}

      <div className={styles.sensorGrid}>

        {sensors.map((sensor) => (
          <SensorReading key={sensor.label} {...sensor} />
        ))}

      </div>


      <div className={styles.divider} />


      {/* ===============================
          OPERATOR + STATUS
      =============================== */}

      <div className={styles.deployInfo}>

        <div className={styles.operatorSection}>

          <div className={styles.operatorBlock}>
            <span className={styles.miniLabel}>
              Current_Operator
            </span>

            <span className={styles.operatorName}>
              Artyom_D6
            </span>
          </div>


          <div className={styles.linkStatus}>

            <span className={styles.miniLabel}>
              Link_Status
            </span>

            <div className={styles.linkSignal}>

              <motion.div
                animate={{
                  opacity: [1, .3, 1],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity
                }}
                className={styles.signalDot}
              />

              <span className={styles.signalText}>
                Synchronized
              </span>

            </div>

          </div>

        </div>


        {/* QUOTE + VERSION */}

        <div className={styles.systemMeta}>

          <span className={styles.metroQuote}>
            "If not us, then who?"
          </span>

          <span className={styles.systemVersion}>
            B_v4.2.6 // D6_TERMINAL
          </span>

        </div>

      </div>



      {/* ===============================
          SOCIAL LINKS
      =============================== */}

      <div className={styles.socialSection}>

        <span className={styles.socialLabel}>
          External_Links
        </span>

        <div className={styles.socialLinks}>

          <a
            href="https://github.com/"
            target="_blank"
            className={styles.socialBtn}
          >
            <Github size={18} />
            <span>Github</span>
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            className={styles.socialBtn}
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>

        </div>

      </div>



      {/* ===============================
          BOTTOM BAR
      =============================== */}

      <div className={styles.bottomBar}>

        <div className={styles.bottomContent}>

          <span>
            © 2026 Metro_Mix_Collective
          </span>

          <div className={styles.bottomNodes}>

            <span>Polis_Network_Node</span>

            <div className={styles.nodeDivider} />

            <span>Encrypted_Line_09</span>

          </div>

        </div>

      </div>

    </footer>
  );
};



/* =================================
   SENSOR COMPONENT
================================= */

const SensorReading = ({ label, value, status, color }) => (

  <div className={styles.sensorBlock}>

    <div className={styles.sensorHeader}>

      <span className={styles.sensorLabel}>
        {label}
      </span>

      <span className={styles.sensorStatus}>
        {status}
      </span>

    </div>

    <div className={`${styles.sensorValue} ${styles[color]}`}>
      {value}
    </div>

  </div>

);