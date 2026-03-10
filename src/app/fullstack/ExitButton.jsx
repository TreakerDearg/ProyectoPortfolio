"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Power, ShieldAlert, Terminal } from 'lucide-react';
import { useSystem } from "./context/SystemContext";
import ExitPrompt from './ExitPrompt';
import styles from './styles/exitButton.module.css';

export default function ExitButton() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { systemStatus } = useSystem();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const isCritical = systemStatus === "OFFLINE";

  return (
    <div className={styles.exitContainer}>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02, x: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className={`
          ${styles.retroExitBtn} 
          ${isCritical ? styles.criticalState : styles.normalState}
        `}
      >
        {/* INDICADOR DE HARDWARE IZQUIERDO */}
        <div className={styles.hardwareSlot}>
          <div className={styles.slotDetail} />
          <div className={styles.slotDetail} />
          <div className={styles.slotDetail} />
        </div>

        {/* CONTENEDOR DE INFORMACIÓN TÉCNICA */}
        <div className={styles.infoWrapper}>
          <div className={styles.topRow}>
            <span className={styles.userTag}>
              {isCritical ? "ERR: SYSTEM_HALTED" : "OP: LEANDRO_DEV"}
            </span>
            <div className={styles.statusIndicator}>
              <div className={styles.pulsePoint} />
            </div>
          </div>
          
          <div className={styles.mainLabel}>
            {isCritical ? "CONFIRM_SHUTDOWN" : "DISCONNECT_NODE"}
          </div>
        </div>

        {/* MÓDULO DE ICONO CON ESTILO DE BOTÓN DE PRESIÓN */}
        <div className={styles.iconModule}>
          {isCritical ? (
            <ShieldAlert size={16} className={styles.alertIcon} />
          ) : (
            <Power size={16} className={styles.powerIcon} />
          )}
        </div>

        {/* DECORACIÓN DE CÓDIGO DE ERROR / REGISTRO */}
        <div className={styles.serialCode}>
          {isCritical ? "0xDEADBEEF" : "0x000F-12"}
        </div>
      </motion.button>

      {/* PORTAL PARA EL PROMPT DE SALIDA */}
      {mounted && open && createPortal(
        <AnimatePresence mode="wait">
          <ExitPrompt 
            onCancel={() => setOpen(false)} 
            isCritical={isCritical}
          />
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}