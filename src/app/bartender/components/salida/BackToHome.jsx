'use client';

import { useRouter } from 'next/navigation';
import {
  Power,
  LogOut,
  Terminal,
  ChevronLeft,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../../styles/components/back-to-home.module.css';

export default function BackToHome({
  variant = 'soma',
  floating = false,
  size = 'md'
}) {
  const router = useRouter();
  const destination = '/bartender';

  const handleClick = () => {
    router.push(destination);
  };

  /* =========================
     VARIANTES DE ANIMACIÓN
  ========================= */
  const containerVariants = {
    initial: { opacity: 0, y: -10, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 }
  };

  const energyVariants = {
    hover: {
      height: '100%',
      opacity: 1,
      transition: { duration: 0.25 }
    }
  };

  /* =========================
     VARIANT RENDER
  ========================= */
  const renderVariantStructure = () => {
    switch (variant) {

      /* 🧬 SOMA (MEJORADO) */
      case 'soma':
        return (
          <div className={`${styles.btnSoma} ${styles[size]} ${styles.somaWrapper}`}>
            
            {/* Escáner biológico animado */}
            <motion.div 
              className={styles.bioScanner}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />

            {/* Contenido */}
            <div className={styles.innerSoma}>
              
              {/* Icono */}
              <motion.div
                className={styles.iconContainer}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Terminal size={14} />
              </motion.div>

              {/* Info */}
              <div className={styles.somaInfo}>
                <span className={styles.somaLabel}>
                  DISCONNECT_BIO_LINK
                </span>

                <div className={styles.statusRow}>
                  
                  {/* LED vivo */}
                  <motion.div
                    className={styles.ledPulse}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />

                  <span className={styles.statusText}>
                    SYNC_STABLE
                  </span>
                </div>
              </div>
            </div>

            {/* Ruido / capa orgánica */}
            <div className={styles.bioNoise} />
          </div>
        );

      /*  AC */
      case 'ac':
        return (
          <div className={`${styles.btnAC} ${styles[size]}`}>
            <div className={styles.warningStripes}>
              <ShieldAlert size={10} />
            </div>

            <div className={styles.innerAC}>
              <LogOut size={18} strokeWidth={3} />
              <span>EJECT</span>
            </div>

            <div className={styles.industrialWear} />
            <div className={styles.boltTL} />
            <div className={styles.boltBR} />
          </div>
        );

      /* 🚇 METRO */
      case 'metro':
        return (
          <div className={styles.btnMetro}>
            <div className={styles.metroGlow} />

            <div className={styles.innerMetro}>
              <Power size={14} strokeWidth={3} />
              <div className={styles.textStack}>
                <span>CUT_POWER</span>
                <span>BUNKER_D6_AUTH</span>
              </div>
            </div>

            <div className={styles.metroShadow} />
          </div>
        );

      /* DEFAULT */
      default:
        return (
          <div className={styles.defaultBack}>
            <ChevronLeft size={14} />
            <span>RETURN</span>
          </div>
        );
    }
  };

  return (
    <motion.button
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      className={`
        ${styles.mainContainer}
        ${floating ? styles.floating : ''}
      `}
      aria-label="Volver al inicio"
    >
      {/* HUD (más sutil ahora) */}
      <motion.div 
        className={styles.hudOverlay}
        variants={{
          hover: { opacity: 0.6 },
          tap: { opacity: 0.3 }
        }}
      >
        <div className={styles.targetCornerTL} />
        <div className={styles.targetCornerBR} />
      </motion.div>

      {/* CONTENIDO */}
      <div className={styles.contentWrapper}>
        {renderVariantStructure()}
      </div>

      {/* ENERGY LINE */}
      <motion.div
        className={styles.energyLink}
        variants={energyVariants}
        style={{
          backgroundColor: variant === 'ac'
            ? '#ce1212'
            : variant === 'metro'
            ? '#ffb300'
            : '#76b5b5'
        }}
      />
    </motion.button>
  );
}