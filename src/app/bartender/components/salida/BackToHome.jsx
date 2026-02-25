'use client';
import { useRouter } from 'next/navigation';
import { Power, X, LogOut, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../../styles/components/back-to-home.module.css';

export default function BackToHome({ variant = 'metro' }) {
  const router = useRouter();
  const destination = '/bartender';

  const renderContent = () => {
    switch (variant) {
      case 'metro':
        return (
          <div className={styles.btnMetro}>
            <div className={styles.innerMetro}>
              {/* Cambiado a Power para simular interruptor de búnker */}
              <Power size={16} strokeWidth={2.5} />
              <span className="text-[10px] font-mono tracking-widest uppercase">
                Cut_Power
              </span>
            </div>
          </div>
        );
      case 'soma':
        return (
          <div className={styles.btnSoma}>
            <div className={styles.innerSoma}>
              <Terminal size={14} className="text-[#76b5b5]" strokeWidth={2} />
              <span className={styles.somaLabel}>Terminate_Session</span>
              <div className={styles.ledPulse} /> 
            </div>
          </div>
        );
      case 'ac':
        return (
          <div className={styles.btnAC}>
            <div className={styles.warningStripes}>! SYSTEM_CRITICAL !</div>
            <div className={styles.innerAC}>
              <LogOut size={18} strokeWidth={3} />
              <span className="font-black italic text-sm tracking-tighter">EJECT</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-amber-500 font-mono text-xs border border-amber-900 p-2">
            RETURN_TO_BASE
          </div>
        );
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(destination)}
      className="block outline-none bg-transparent border-none p-0"
    >
      {renderContent()}
    </motion.button>
  );
}