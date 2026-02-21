// @/app/fullstack/components/layout/salida/ExitButton.jsx
'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ExitPrompt from './ExitPrompt';
import useSystemState from '@/hooks/useSystemState'; // Importamos el hook
import styles from './ExitButton.module.css';

export default function ExitButton() {
  const [open, setOpen] = useState(false);
  const { closeWindow } = useSystemState(); // Obtenemos la función para limpiar el estado

  const handleFinalExit = () => {
    // 1. Limpiamos el estado global inmediatamente
    if (closeWindow) closeWindow();
    
    // 2. Marcamos la purga para silenciar la animación de boot en la Home
    sessionStorage.setItem('EXIT_PURGE', 'true');
    
    // 3. Salida física
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.2s ease';
    
    setTimeout(() => {
      window.location.href = '/';
    }, 150);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(true)} className={styles.exitBtn}>
        <div className={styles.glitchLayer} />
        <div className={`${styles.corner} ${styles.topR}`} />
        <div className={`${styles.corner} ${styles.botL}`} />

        <span className="relative flex items-center gap-2 font-bold">
          <span className="material-symbols-outlined text-[14px]">terminal_stop</span>
          TERMINATE_SESSION
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <ExitPrompt 
            onConfirm={handleFinalExit} // Pasamos la función de salida real
            onCancel={() => setOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}