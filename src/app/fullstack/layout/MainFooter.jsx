"use client";
import React from "react";
import { ShieldAlert, Github, Linkedin, Cpu, Activity, Terminal } from "lucide-react";

import { Screw } from "../components/deco-layout/Screw";
import { ConnectionPort } from "../components/deco-layout/ConnectionPort";
import ExitButton from "../ExitButton";

import styles from "../styles/layout/MainFooter.module.css";

export const MainFooter = () => {
  return (
    <footer className={styles.footerChassis}>
      {/* Tornillos estructurales (esquinas) */}
      <Screw
        size="sm"
        type="torx"
        condition="grimy"
        className={styles.screwTL}
        rotation={22}
      />
      <Screw
        size="sm"
        type="torx"
        condition="rusted"
        className={styles.screwTR}
        rotation={145}
      />

      {/* ===== LEFT ZONE — DATA UPLINKS ===== */}
      <nav className={styles.footerLeft} aria-label="Data uplink connections">
        <div className={styles.moduleSection}>
          <div className={styles.moduleHeader}>
            <Cpu size={10} className={styles.headerIcon} />
            <span className={styles.moduleTitle}>DATA_UPLINKS</span>
          </div>
          <div className={styles.moduleBody}>
            <Screw
              size="xs"
              type="slot"
              condition="clean"
              className={styles.moduleScrew}
            />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ioPort}
              aria-label="GitHub Repository"
              title="GitHub Repository"
            >
              <div className={styles.portInternal}>
                <Github size={16} className={styles.phosphorIcon} />
              </div>
              <span className={styles.portLabel}>HUB_01</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ioPort}
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <div className={styles.portInternal}>
                <Linkedin size={16} className={styles.phosphorIcon} />
              </div>
              <span className={styles.portLabel}>LNK_02</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ===== CENTER — SYSTEM CORE BUS + POWER ===== */}
      <div className={styles.footerCore} role="presentation">
        <div className={styles.coreColumn}>
          <div className={styles.coreHeader}>
            <Activity size={12} className={styles.coreIcon} />
            <span className={styles.coreLabel}>SIGNAL_MATRIX</span>
          </div>
          <ConnectionPort
            activeBlocks={5}
            variant="amber"
            frequency="0.92"
            signalQuality="stable"
          />
        </div>

        {/* Divider con etiqueta POWER */}
        <div className={styles.powerDivider} aria-hidden="true">
          <div className={styles.hazardStripes} />
          <span className={styles.powerLabel}>POWER</span>
        </div>

        <div className={styles.coreColumn}>
          <div className={styles.coreHeader}>
            <div className={styles.memoryLed} />
            <span className={styles.coreLabel}>CORE_MEMORY</span>
          </div>
          <ConnectionPort
            activeBlocks={2}
            variant="amber"
            frequency="0.45"
            signalQuality="unstable"
          />
        </div>
      </div>

      {/* ===== RIGHT ZONE — SECURITY + VAULT + TERMINAL ===== */}
      <div className={styles.footerRight}>
        {/* Security readout */}
        <div className={styles.securityReadout}>
          <div className={styles.statusBadge}>
            <span className={styles.statusPing} aria-hidden="true" />
            <div className={styles.statusLed} />
            <span className={styles.statusText}>SECURE_SYNC: OK</span>
          </div>
          <div className={styles.protocolLabel}>
            <ShieldAlert size={10} />
            <span>ROBCO_PROT_V6.2</span>
          </div>
        </div>

        {/* Exit vault */}
        <div className={styles.vaultChassis}>
          <div className={styles.vaultInner}>
            <ExitButton />
          </div>
          <Screw
            size="xs"
            type="rivet"
            condition="clean"
            className={styles.vaultTL}
          />
          <Screw
            size="xs"
            type="rivet"
            condition="clean"
            className={styles.vaultTR}
          />
          <Screw
            size="xs"
            type="rivet"
            condition="rusted"
            className={styles.vaultBL}
          />
          <Screw
            size="xs"
            type="rivet"
            condition="grimy"
            className={styles.vaultBR}
          />
        </div>
      </div>
    </footer>
  );
};