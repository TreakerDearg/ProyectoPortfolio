'use client';
import { useRouter } from 'next/navigation';
import { 
  Power, 
  X, 
  LogOut, 
  Zap, 
  Terminal, // Importado para corregir el ReferenceError
  ChevronLeft 
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../../styles/components/back-to-home.module.css';

/**
 * BackToHome - Sistema de Navegación de Emergencia D6
 * Variantes: metro (Búnker), soma (Terminal Bio), ac (Alerta Crítica)
 */
export default function BackToHome({ variant = 'metro' }) {
  const router = useRouter();
  const destination = '/bartender';

  const renderContent = () => {
    switch (variant) {
      case 'metro':
        return (
          <div className={styles.btnMetro}>
            <div className={styles.innerMetro}>
              <Power size={16} strokeWidth={2.5} />
              <span className="text-[10px] font-mono tracking-widest uppercase">
                Cut_Power
              </span>
            </div>
            {/* Efecto visual de sombra proyectada para profundidad física */}
            <div className={styles.metroShadow} />
          </div>
        );

      case 'soma':
        return (
          <div className={styles.btnSoma}>
            <div className={styles.innerSoma}>
              {/* Ahora Terminal está definido correctamente */}
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
            {/* Efecto de desgaste en los bordes para estilo industrial */}
            <div className={styles.industrialWear} />
          </div>
        );

      default:
        return (
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs border border-amber-900/50 p-2 bg-black/20">
            <ChevronLeft size={12} />
            RETURN_TO_BASE
          </div>
        );
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ 
        y: -2, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(destination)}
      className="relative block outline-none bg-transparent border-none p-0 cursor-pointer group"
      aria-label="Volver al inicio"
    >
      {renderContent()}
      
      {/* Tooltip retro opcional al hacer hover */}
      <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[9px] font-mono text-white/40 whitespace-nowrap">
          EXEC_NAV_BACK.SYS
        </span>
      </div>
    </motion.button>
  );
}