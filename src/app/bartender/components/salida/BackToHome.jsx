'use client';
import { useRouter } from 'next/navigation';
import { 
  Power, 
  LogOut, 
  Terminal,
  ChevronLeft, 
  AlertTriangle,
  Zap,
  Activity,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/components/back-to-home.module.css';

export default function BackToHome({ variant = 'metro' }) {
  const router = useRouter();
  const destination = '/bartender';

  // Renderizado de estructuras mecánicas por variante
  const renderVariantStructure = () => {
    switch (variant) {
      case 'metro':
        return (
          <div className={styles.btnMetro}>
            <div className={styles.metroGlow} />
            <div className={styles.innerMetro}>
              <Power size={14} strokeWidth={3} className={styles.iconPulse} />
              <div className={styles.textStack}>
                <span className={styles.mainText}>CUT_POWER</span>
                <span className={styles.subText}>BUNKER_D6_AUTH</span>
              </div>
            </div>
            <div className={styles.metroShadow} />
          </div>
        );

      case 'soma':
        return (
          <div className={styles.btnSoma}>
            <div className={styles.bioScanner} />
            <div className={styles.innerSoma}>
              <Terminal size={14} className="text-[#76b5b5]" />
              <div className={styles.somaInfo}>
                <span className={styles.somaLabel}>DISCONNECT_BIO_LINK</span>
                <div className={styles.statusRow}>
                  <div className={styles.ledPulse} />
                  <span className={styles.statusText}>SYNC_STABLE</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ac':
        return (
          <div className={styles.btnAC}>
            <div className={styles.warningStripes}>
              <ShieldAlert size={10} />
              <span>SYSTEM_CRITICAL_EJECT</span>
            </div>
            <div className={styles.innerAC}>
              <LogOut size={18} strokeWidth={3} className={styles.ejectIcon} />
              <span className={styles.ejectText}>EJECT</span>
            </div>
            <div className={styles.industrialWear} />
            {/* Detalle de tornillos/remaches mecánicos */}
            <div className={styles.boltTL} />
            <div className={styles.boltBR} />
          </div>
        );

      default:
        return (
          <div className={styles.defaultBack}>
            <ChevronLeft size={14} />
            <span>RETURN_TO_BASE</span>
          </div>
        );
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      whileHover="hover"
      whileTap="tap"
      onClick={() => router.push(destination)}
      className={styles.mainContainer}
      aria-label="Volver al inicio"
    >
      {/* 1. HUD Overlay (FCS targeting logic) */}
      <motion.div 
        variants={{
          hover: { opacity: 1, scale: 1.05 },
          tap: { scale: 0.98 }
        }}
        className={styles.hudOverlay}
      >
        <div className={styles.targetCornerTL} />
        <div className={styles.targetCornerBR} />
      </motion.div>

      {/* 2. El cuerpo del botón según variante */}
      <div className={styles.contentWrapper}>
        {renderVariantStructure()}
      </div>

      {/* 3. Feedback de Alerta (Solo se activa en hover intenso) */}
      <AnimatePresence>
        <motion.div 
          variants={{
            hover: { opacity: 1, y: 0 },
            initial: { opacity: 0, y: 10 }
          }}
          className={styles.alertTooltip}
        >
          <div className={styles.tooltipLine} />
          <div className={styles.tooltipContent}>
            <AlertTriangle size={10} className="text-red-500 animate-pulse" />
            <div className="flex flex-col">
              <span className={styles.tooltipMain}>EXEC_NAV_BACK.SYS</span>
              <span className={styles.tooltipSub}>REDIRECT: {destination}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4. Línea de Enlace Neural (Energía) */}
      <motion.div 
        variants={{
          hover: { height: '100%', backgroundColor: variant === 'ac' ? '#ce1212' : '#00ffff' }
        }}
        className={styles.energyLink} 
      />
    </motion.button>
  );
}