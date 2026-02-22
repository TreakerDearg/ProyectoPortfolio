'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ExitPrompt from './ExitPrompt';
import styles from '../../styles/exitButton.module.css';
import { Power, Skull } from 'lucide-react';

export default function ExitButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center h-full">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className={styles.metroExitBtn}
        title="Abandon Bunker"
      >
        {/* Tornillos estéticos (solo visibles en desktop) */}
        <div className={styles.bolt} style={{ top: '4px', left: '4px' }} />
        <div className={styles.bolt} style={{ top: '4px', right: '4px' }} />
        <div className={styles.bolt} style={{ bottom: '4px', left: '4px' }} />
        <div className={styles.bolt} style={{ bottom: '4px', right: '4px' }} />
        
        {/* Contenedor de Texto: Se oculta en móviles mediante CSS */}
        <div className={styles.textContainer}>
          <div className="flex items-center gap-1.5">
            <Skull size={10} className="text-red-600 animate-pulse" />
            <span className={styles.systemTag}>PROTOCOL_D6</span>
          </div>
          <span className={styles.mainAction}>EXIT_STATION</span>
        </div>

        {/* El "Interruptor" físico */}
        <div className={styles.emergencyIconBox}>
          <Power size={16} className={styles.powerIcon} />
          <div className={styles.redGlow} />
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