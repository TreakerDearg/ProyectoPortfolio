"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Power, ShieldAlert } from 'lucide-react';
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className={`${styles.industrialBtn} ${isCritical ? styles.critical : styles.normal} ${styles.footerButton}`}
      >
        {/* Textura de metal cepillado */}
        <div className={styles.metalGrain} />

        {/* Tornillos decorativos (simplificados, se posicionarán con CSS) */}
        <div className={styles.screw} />
        <div className={styles.screw} />
        <div className={styles.screw} />
        <div className={styles.screw} />

        {/* Contenedor principal en fila horizontal */}
        <div className={styles.buttonContent}>
          {/* LED de estado */}
          <div className={`${styles.statusLed} ${isCritical ? styles.ledRed : styles.ledGreen}`}>
            <div className={styles.ledInner} />
          </div>

          {/* Grupo de textos */}
          <div className={styles.textGroup}>
            <span className={styles.tag}>
              {isCritical ? "EMERGENCY" : "POWER"}
            </span>
            <span className={styles.label}>
              {isCritical ? "SHUTDOWN" : "TERMINATE"}
            </span>
            <span className={styles.subLabel}>
              {isCritical ? "ERR_0xDEADBEEF" : "PRESS"}
            </span>
          </div>

          {/* Módulo de icono */}
          <div className={styles.iconModule}>
            <div className={styles.iconHousing}>
              <AnimatePresence mode="wait">
                {isCritical ? (
                  <motion.div
                    key="alert"
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ShieldAlert size={14} className={styles.iconAlert} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="power"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Power size={14} className={styles.iconPower} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.button>

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