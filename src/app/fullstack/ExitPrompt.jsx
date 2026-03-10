"use client";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles/exitPrompt.module.css';
import { ShieldAlert, Database, Lock } from 'lucide-react';

export default function ExitPrompt({ onCancel }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel();
      if (e.key.toLowerCase() === 'y') handleConfirm();
      if (e.key.toLowerCase() === 'n') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  const handleConfirm = () => {
    router.push('/');
  };

  if (!mounted) return null;

  return createPortal(
    <div className={styles.metroOverlay} onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
        className={styles.terminalContainer}
      >
        {/* Decoración Superior */}
        <div className={styles.terminalHeader}>
          <ShieldAlert size={14} />
          <span>SECURE_CONNECTION_TERMINATION</span>
        </div>

        <div className={styles.terminalBody}>
          <div className={styles.warningBox}>
            <p className={styles.warningText}>
              {">"} ¿CONFIRMAR DESCONEXIÓN DEL NÚCLEO?
            </p>
            <p className={styles.subText}>
              TODAS LAS SESIONES ACTIVAS SERÁN CIFRADAS Y FINALIZADAS.
            </p>
          </div>

          <div className={styles.actionGrid}>
            <button onClick={handleConfirm} className={styles.confirmBtn}>
              <span className={styles.btnKey}>[Y]</span> TERMINATE
            </button>
            <button onClick={onCancel} className={styles.cancelBtn}>
              <span className={styles.btnKey}>[N]</span> ABORT_EXIT
            </button>
          </div>
        </div>

        {/* Footer de datos técnicos */}
        <div className={styles.terminalFooter}>
          <div className="flex items-center gap-2">
            <Database size={10} />
            <span>SESSION_ID: 0x8892_ADMIN</span>
          </div>
          <div className="flex items-center gap-2 uppercase tracking-tighter">
            <span>Status: Waiting_input</span>
            <span className="w-1.5 h-1.5 bg-[#00ff9d] animate-pulse" />
          </div>
        </div>

        {/* Pequeña marca de agua de seguridad */}
        <div className="absolute top-[40px] right-[10px] opacity-[0.03] pointer-events-none">
          <Lock size={120} />
        </div>
      </motion.div>
    </div>,
    document.body
  );
}