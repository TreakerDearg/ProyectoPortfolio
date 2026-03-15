"use client";
import React, { useState, useEffect } from "react";
import {
  Fan,
  Terminal,
  ShieldAlert,
  Activity,
  Cpu,
  Gauge,
  Zap,
  HardDrive,
  Radio,
  AlertTriangle,
  Wifi,
  Thermometer,
  Droplets,
} from "lucide-react";

import { Screw } from "../components/deco-layout/Screw";
import { Ventilation } from "../components/deco-layout/Ventilation";
import { StatusLed } from "../components/deco-layout/StatusLed";
import { useSystem } from "../context/SystemContext";

import styles from "../styles/layout/LeftPanel.module.css";

export const LeftPanel = () => {
  const { cpuLoad, temp, systemStatus } = useSystem();

  // Estados para animaciones y datos simulados
  const [rpm, setRpm] = useState(3200);
  const [airPressure, setAirPressure] = useState(12);
  const [flowRate, setFlowRate] = useState(85);
  const [logEntries, setLogEntries] = useState([
    "[21:03:12] PORT_80_OPEN",
    "[21:03:18] ENCRYPTION_ON",
    "[21:04:01] AUTH_REQUIRED",
  ]);
  const [logicPattern, setLogicPattern] = useState([]);
  const [busLoads, setBusLoads] = useState({
    main: 78,
    aux: 42,
    cooling: 35,
  });

  // Generar patrón aleatorio para los LEDs del logic array
  useEffect(() => {
    const pattern = Array.from({ length: 16 }, () => Math.random() > 0.5);
    setLogicPattern(pattern);
    const interval = setInterval(() => {
      setLogicPattern(prev => prev.map(() => Math.random() > 0.5));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Simular cambios en los medidores basados en la temperatura/CPU
  useEffect(() => {
    // RPM proporcional a temperatura (base 3200 + variación)
    const baseRpm = 3200 + (temp - 58) * 30;
    setRpm(Math.min(4800, Math.max(2000, Math.round(baseRpm))));

    // Presión de aire varía con la carga
    setAirPressure(Math.round(12 + cpuLoad / 20));

    // Flujo de aire correlacionado con RPM
    setFlowRate(Math.min(100, Math.round(60 + (rpm - 3200) / 20)));

    // Carga de los buses (simulación)
    setBusLoads({
      main: Math.min(100, Math.round(70 + cpuLoad * 0.3)),
      aux: Math.min(100, Math.round(40 + cpuLoad * 0.2)),
      cooling: Math.min(100, Math.round(30 + temp * 0.8)),
    });
  }, [temp, cpuLoad, rpm]);

  // Actualizar log de seguridad cada 10 segundos con eventos simulados
  useEffect(() => {
    const interval = setInterval(() => {
      const events = [
        "[21:05:22] AUTH_SUCCESS",
        "[21:06:47] PORT_443_CLOSED",
        "[21:07:13] SCAN_DETECTED",
        "[21:08:01] FIREWALL_ACTIVE",
        "[21:09:34] CONNECTION_RESET",
      ];
      const newEvent = events[Math.floor(Math.random() * events.length)];
      setLogEntries(prev => [...prev.slice(-3), newEvent]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className={styles.leftAside}>
      {/* Tornillos estructurales */}
      <Screw size="sm" type="flat" className={styles.screwTop} rotation={180} />
      <Screw size="sm" type="flat" className={styles.screwBottom} rotation={90} />
      <Screw size="xs" type="rivet" className={styles.screwLeft} />
      <Screw size="xs" type="rivet" className={styles.screwRight} />

      <div className={styles.innerContent}>
        {/* ================================================= */}
        {/* 1 — ACTIVE COOLING SYSTEM (Vintage IBM) */}
        {/* ================================================= */}
        <section className={styles.coolingModule}>
          <div className={styles.fanHousing}>
            <div className={styles.fanGrill} />
            <div className={styles.fanBlades}>
              <Fan size={44} strokeWidth={1.2} className={styles.fanIcon} />
            </div>
            <Screw size="xs" type="rivet" className={styles.fanRivetTL} />
            <Screw size="xs" type="rivet" className={styles.fanRivetTR} />
            <Screw size="xs" type="rivet" className={styles.fanRivetBL} />
            <Screw size="xs" type="rivet" className={styles.fanRivetBR} />
            <div className={styles.warningSticker}>
              <AlertTriangle size={8} />
              <span>HOT</span>
            </div>
          </div>

          <div className={styles.coolingStats}>
            <div className={styles.meter}>
              <Gauge size={12} />
              <span>RPM</span>
              <span className={styles.meterValue}>{rpm}</span>
            </div>
            <div className={styles.meter}>
              <Activity size={12} />
              <span>FLOW</span>
              <span className={styles.meterValue}>{flowRate}%</span>
            </div>
            <div className={styles.meter}>
              <Thermometer size={12} />
              <span>TEMP</span>
              <span className={styles.meterValue}>{Math.round(temp)}°F</span>
            </div>
          </div>

          <div className={styles.moduleLabel}>
            <span>ACTIVE_COOLING_SYS</span>
            <span className={styles.labelSub}>MODEL: A/C-742</span>
          </div>
        </section>

        {/* ================================================= */}
        {/* 2 — MAINFRAME LOGIC LIGHT ARRAY (IBM 7090) */}
        {/* ================================================= */}
        <section className={styles.logicPanel}>
          <div className={styles.logicHeader}>
            <Cpu size={14} />
            <span>MAINFRAME_LOGIC_ARRAY</span>
            <span className={styles.headerBadge}>IBM 7090</span>
          </div>

          <div className={styles.logicLights}>
            {logicPattern.map((active, i) => (
              <div key={i} className={styles.logicLed}>
                <div
                  className={styles.ledInner}
                  style={{
                    backgroundColor: active ? "#ffb300" : "#1a1a1a",
                    boxShadow: active ? "0 0 6px #ffb300" : "none",
                  }}
                />
              </div>
            ))}
          </div>

          <div className={styles.cycleCounter}>
            <span>CYCLES: {Math.floor(Math.random() * 10000)}</span>
            <div className={styles.activityBar}>
              <div
                className={styles.activityFill}
                style={{ width: `${cpuLoad}%` }}
              />
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* 3 — AIR INTAKE / FILTER SYSTEM (Industrial Grade) */}
        {/* ================================================= */}
        <section className={styles.intakeSection}>
          <div className={styles.ventilationWrapper}>
            <Ventilation count={12} size="md" />
            <div className={styles.meshOverlay} />
          </div>

          <div className={styles.filterFrame}>
            <span>FILTER_SLOT_A</span>
            <span className={styles.filterType}>HEPA 99.97%</span>
          </div>

          <div className={styles.airPressure}>
            <Activity size={10} />
            <span>AIR_PRESS: {airPressure} PSI</span>
            <div className={styles.pressureBar}>
              <div
                className={styles.pressureFill}
                style={{ width: `${(airPressure / 20) * 100}%` }}
              />
            </div>
          </div>

          <Screw size="xs" type="slot" className={styles.filterScrewTL} />
          <Screw size="xs" type="slot" className={styles.filterScrewTR} />
        </section>

        {/* ================================================= */}
        {/* 4 — POWER ROUTER (Mainframe Bus Bars) */}
        {/* ================================================= */}
        <section className={styles.powerRouter}>
          <div className={styles.routerHeader}>
            <Zap size={12} />
            <span>POWER_ROUTER</span>
            <span className={styles.headerSub}>480V 3PH</span>
          </div>

          <div className={styles.busLines}>
            <div className={styles.busLine}>
              <span>MAIN_BUS</span>
              <div className={styles.busLoadBar}>
                <div
                  className={styles.busLoadFill}
                  style={{ width: `${busLoads.main}%` }}
                />
              </div>
              <StatusLed
                status={busLoads.main > 80 ? "error" : busLoads.main > 60 ? "warning" : "online"}
                size="xxs"
                tooltip={`Main bus load: ${busLoads.main}%`}
              />
            </div>
            <div className={styles.busLine}>
              <span>AUX_BUS</span>
              <div className={styles.busLoadBar}>
                <div
                  className={styles.busLoadFill}
                  style={{ width: `${busLoads.aux}%` }}
                />
              </div>
              <StatusLed
                status={busLoads.aux > 80 ? "error" : busLoads.aux > 60 ? "warning" : "online"}
                size="xxs"
              />
            </div>
            <div className={styles.busLine}>
              <span>COOLING_BUS</span>
              <div className={styles.busLoadBar}>
                <div
                  className={styles.busLoadFill}
                  style={{ width: `${busLoads.cooling}%` }}
                />
              </div>
              <StatusLed
                status={busLoads.cooling > 80 ? "error" : busLoads.cooling > 60 ? "warning" : "online"}
                size="xxs"
              />
            </div>
          </div>

          <div className={styles.fuseBank}>
            <div className={styles.fuse} />
            <div className={styles.fuse} />
            <div className={styles.fuse} />
          </div>
        </section>

        {/* ================================================= */}
        {/* 5 — SECURITY TERMINAL LOG (Vault-Tec) */}
        {/* ================================================= */}
        <section className={styles.accessLog}>
          <div className={styles.logHeader}>
            <Terminal size={12} />
            <span>SECURITY_LOG</span>
            <ShieldAlert size={10} className={styles.lockIcon} />
          </div>

          <div className={styles.logEntries}>
            {logEntries.map((entry, i) => (
              <div key={i} className={styles.logItem}>
                {entry.includes("AUTH_REQUIRED") && <ShieldAlert size={8} />}
                <span className={styles.logTime}>{entry.slice(0, 9)}</span>
                <span>{entry.slice(9)}</span>
              </div>
            ))}
            <div className={styles.cursor}>&gt;_</div>
          </div>

          <div className={styles.securityBadge}>
            <span>CLEARANCE: B</span>
          </div>
        </section>

        {/* ================================================= */}
        {/* 6 — SERVICE PORT PANEL (RobCo Maintenance) */}
        {/* ================================================= */}
        <section className={styles.servicePort}>
          <div className={styles.serviceHeader}>
            <HardDrive size={10} />
            <span>SERVICE_PORT</span>
            <span className={styles.portNumber}>COM1</span>
          </div>

          <div className={styles.serviceButtons}>
            <button className={styles.serviceBtn}>
              <span>RESET</span>
              <span className={styles.btnSub}>SYSTEM</span>
            </button>
            <button className={styles.serviceBtn}>
              <span>DEBUG</span>
              <span className={styles.btnSub}>MODE</span>
            </button>
          </div>

          <div className={styles.activityLeds}>
            <div className={styles.ledGreen} />
            <div className={styles.ledYellow} />
            <div className={styles.ledRed} />
          </div>
        </section>

        {/* ================================================= */}
        {/* 7 — INDUSTRIAL SERIAL MARK (Vintage IBM Tag) */}
        {/* ================================================= */}
        <div className={styles.stampedLabel}>
          <div className={styles.serialText}>
            <span>UNIT_09</span>
            <span className={styles.serialDivider}>//</span>
            <span>ROBCO_REV_4.0</span>
          </div>
          <div className={styles.barcodePlaceholder}>
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
          </div>
        </div>

        {/* ================================================= */}
        {/* 8 — MAINTENANCE TAG (Vault-Tec Inspection) */}
        {/* ================================================= */}
        <div className={styles.maintenanceTag}>
          <Radio size={8} />
          <span>MAINT_CHECK: 2077</span>
          <span className={styles.tagSub}>INSPECTED</span>
        </div>

        {/* ================================================= */}
        {/* 9 — WARNING PLATE (High Voltage) */}
        {/* ================================================= */}
        <div className={styles.warningPlate}>
          <AlertTriangle size={10} />
          <span>HIGH VOLTAGE</span>
          <span className={styles.warningSub}>480V AC</span>
        </div>
      </div>
    </aside>
  );
};