'use client';
import { useRouter } from 'next/navigation';
import { Power, X, LogOut, Terminal } from 'lucide-react';
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
              <X size={16} />
              <span className="text-[10px] font-mono tracking-tighter">CLOSE_VALVE</span>
            </div>
          </div>
        );
      case 'soma':
        return (
          <div className={styles.btnSoma}>
            <div className={styles.innerSoma}>
              <div className="flex items-center gap-2">
                 <Power size={14} className="text-[#76b5b5]" strokeWidth={3} />
                 <div className={styles.ledPulse} /> {/* LED al lado del icono */}
              </div>
              <span className={styles.somaLabel}>TERMINATE_LINK</span>
            </div>
          </div>
        );
      case 'ac':
        return (
          <div className={styles.btnAC}>
            <div className={styles.warningStripes}>! EMERGENCY !</div>
            <div className={styles.innerAC}>
              <LogOut size={16} />
              <span className="font-black italic text-sm tracking-tighter">EJECT</span>
            </div>
          </div>
        );
      default:
        return <span>BACK</span>;
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(destination)}
      className="block outline-none"
    >
      {renderContent()}
    </motion.button>
  );
}