'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ExitPrompt from './ExitPrompt';
import styles from '@/app/analyst/styles/exitButton.module.css';
import { Power, ShieldOff } from 'lucide-react';

export default function ExitButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center h-full">
      <motion.button
        whileHover={{ scale: 1.02, x: 2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className={styles.exitContainer}
      >
        {/* Lado Izquierdo: Brackets de seguridad */}
        <div className={styles.bracketLeft} />
        
        {/* Cuerpo Central */}
        <div className={styles.buttonBody}>
          <div className={styles.statusGlow} />
          
          <div className="flex flex-col items-end mr-3">
            <span className={styles.topLabel}>Emergency_Stop</span>
            <span className={styles.mainLabel}>DISCONNECT_LINK</span>
          </div>

          <div className={styles.iconBox}>
            <Power size={14} className={styles.powerIcon} />
            <ShieldOff size={10} className={styles.shieldIcon} />
          </div>
        </div>

        {/* Lado Derecho: Indicador de zona */}
        <div className={styles.bracketRight}>
           <div className={styles.warningStripes} />
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <ExitPrompt onCancel={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}