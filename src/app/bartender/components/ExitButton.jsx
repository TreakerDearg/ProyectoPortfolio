// @/app/fullstack/components/layout/salida/ExitButton.jsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ExitPrompt from './ExitPrompt';
import styles from '@/app/fullstack/components/layout/Salida/ExitButton.module.css';

export default function ExitButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className={styles.combineBtn}
      >
        {/* Capas decorativas de terminal */}
        <div className={styles.scanline} />
        <div className={`${styles.corner} ${styles.topL}`} />
        <div className={`${styles.corner} ${styles.botR}`} />

        <span className="relative flex items-center gap-3 px-4 py-1.5 z-10">
          <span className="material-symbols-outlined text-[16px] animate-pulse text-[#00f2ff]">
            power_settings_new
          </span>
          <span className="font-aldrich tracking-[0.2em] text-[11px]">
            TERMINATE_SESSION
          </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <ExitPrompt onCancel={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}