'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Radio, Shield, Wifi } from 'lucide-react';
import ExitButton from '../components/salida/ExitButton';

import styles from '../styles/header.module.css';

export const Header = ({ isDrawerOpen }) => {

  const navModules = [
    { name: 'Root', path: '/bartender/pages/root' },
    { name: 'Logs', path: '/bartender/pages/logss' },
    { name: 'Inventory', path: '/bartender/pages/inventory' }
  ];

  return (

    <header
      className={`${styles.headerContainer} ${isDrawerOpen ? styles.headerDimmed : ''}`}
    >

      {/* =========================
          TELEMETRY BAR
      ========================== */}

      <div className={styles.telemetryBar}>

        <div className={styles.telemetryLeft}>

          <div className={styles.sensorStatus}>

            <motion.div
              animate={{
                scale: isDrawerOpen ? 1 : [1, 1.25, 1],
                backgroundColor: isDrawerOpen ? '#444' : '#22c55e'
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity
              }}
              className={styles.sensorDot}
            />

            <span className={styles.activeSensor}>
              {isDrawerOpen
                ? 'DATA_TRANSFER_ACTIVE'
                : 'SYS_STABLE'}
            </span>

          </div>

          <span className={styles.cpuStat}>
            CPU_LOAD: <span>12.4%</span>
          </span>

        </div>


        <div className={styles.telemetryRight}>

          <div className={styles.signalBlock}>

            <Wifi
              size={10}
              className={
                isDrawerOpen
                  ? styles.signalIdle
                  : styles.signalActive
              }
            />

            <span>Signal_Secure</span>

          </div>


          <div className={styles.securityBlock}>

            <Shield
              size={10}
              className={
                isDrawerOpen
                  ? styles.shieldIdle
                  : styles.shieldActive
              }
            />

            <span>Bunker_Link</span>

          </div>

        </div>

      </div>



      {/* =========================
          MAIN NAV ROW
      ========================== */}

      <div className={styles.mainNavRow}>

        {/* BRAND / TERMINAL */}

        <div className={styles.logoArea}>

          <div className={styles.terminalTag}>

            <Terminal
              size={14}
              className={styles.terminalIcon}
            />

            <span>
              Bunker_Terminal_09
            </span>

          </div>


          <h1 className={styles.logoMain}>
            METRO
            <span className={styles.logoMix}>
              MIX
            </span>
          </h1>

        </div>



        {/* NAVIGATION */}

        <nav className={styles.navigationArea}>

          <div className={styles.navModuleContainer}>

            {navModules.map((item, idx) => (

              <a
                key={item.name}
                href={item.path}
                className={styles.navLink}
              >

                <span className={styles.navNumber}>
                  0{idx + 1}
                </span>

                <span className={styles.navLabel}>
                  {item.name}
                </span>

              </a>

            ))}

          </div>


          {/* CONTROLS */}

          <div className={styles.controlCluster}>

            <motion.button

              whileHover={{
                scale: 1.06
              }}

              whileTap={{
                scale: 0.94
              }}

              className={styles.radioBtn}

              aria-label="Communication Link"

            >

              <Radio
                size={18}
                strokeWidth={2.5}
              />

              <div className={styles.radioPing} />

            </motion.button>


            <ExitButton />

          </div>

        </nav>

      </div>



      {/* =========================
          DATA LINE
      ========================== */}

      <div className={styles.dataLine}>

        <motion.div

          animate={{
            x: ['-100%', '600%']
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}

          className={styles.dataScanner}

        />

      </div>

    </header>
  );
};