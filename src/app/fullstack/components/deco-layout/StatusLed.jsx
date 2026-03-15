import styles from '../../styles/deco-layout/led.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

// Patrones de parpadeo avanzados (definidos fuera para no recrearlos)
const blinkPatterns = {
  heartbeat: [1, 0.2, 1, 0.2, 1],
  warning: [1, 0, 1, 0],
  pulse: [0.4, 1, 0.4],
  fast: [1, 0, 1, 0, 1, 0],
  slow: [1, 0.5, 1, 0.5],
};

// Mapa de estados predefinidos (también fuera)
const statusMap = {
  online: { color: 'green', active: true },
  warning: { color: 'amber', active: true },
  error: { color: 'red', active: true },
  idle: { color: 'green', active: false },
};

export const StatusLed = ({
  color = 'green',
  label,
  active = false,
  size = 'md',
  blink = false,
  pattern = 'pulse',
  intensity = 1,
  sound = false,
  status,
  tooltip,
  'aria-label': ariaLabel,
  className = '',
  ...props
}) => {
  // Resolver estado final
  const resolved = useMemo(() => {
    if (status) return statusMap[status] || statusMap.idle;
    return { color, active };
  }, [status, color, active]);

  const finalColor = resolved.color;
  const finalActive = resolved.active;

  // Referencia para el sonido (evitar reproducción múltiple)
  const prevActiveRef = useRef(finalActive);
  useEffect(() => {
    if (sound && prevActiveRef.current !== finalActive) {
      const audio = new Audio('/sounds/relay-click.mp3');
      audio.volume = 0.1;
      audio.play().catch(() => {});
      prevActiveRef.current = finalActive;
    }
  }, [finalActive, sound]);

  // Flicker aleatorio (solo cuando está activo, memoizado por render)
  const flicker = useMemo(() => (finalActive ? Math.random() * 0.05 : 0), [finalActive]);

  // Secuencia de parpadeo (memoizada)
  const blinkSequence = useMemo(() => {
    if (!blink) return null;
    return blinkPatterns[pattern] || blinkPatterns.pulse;
  }, [blink, pattern]);

  // Opacidad base (con flicker)
  const baseOpacity = finalActive ? 0.9 + flicker : 0.3;

  // Intensidad del glow
  const glowIntensity = intensity * (finalActive ? 1 : 0.3);
  const glowBlur = 4 * intensity;

  // Variantes de animación para el LED body
  const ledVariants = {
    initial: { scale: 0.7, opacity: 0 },
    active: (custom) => ({
      scale: 1,
      opacity: custom.blinkSequence ? custom.blinkSequence : baseOpacity,
      transition: custom.blinkSequence
        ? { duration: 0.8, repeat: Infinity, ease: 'linear' }
        : { duration: 0.25, ease: 'easeOut' }
    }),
    inactive: {
      scale: 1,
      opacity: 0.3,
      transition: { duration: 0.2 }
    }
  };

  // Variantes para el glow
  const glowVariants = {
    initial: { opacity: 0 },
    active: {
      opacity: [0.2 * glowIntensity, 0.5 * glowIntensity, 0.2 * glowIntensity],
      transition: { duration: 2, repeat: Infinity, ease: 'linear' }
    },
    inactive: { opacity: 0 }
  };

  // Clases CSS
  const colorClass = styles[finalColor] || styles.green;
  const sizeClass = styles[size] || styles.md;

  return (
    <div
      className={`${styles.wrapper} ${sizeClass} ${className}`}
      title={tooltip || label}
      aria-label={ariaLabel || `${label} ${finalActive ? 'active' : 'inactive'}`}
      role="status"
      aria-live="polite"
      {...props}
    >
      <div className={styles.ledUnit}>
        <div className={styles.bezel}>
          <motion.div
            className={`${styles.ledBody} ${colorClass} ${finalActive ? styles.active : ''}`}
            variants={ledVariants}
            initial="initial"
            animate={finalActive ? 'active' : 'inactive'}
            custom={{ blinkSequence }}
            style={{
              filter: `brightness(${intensity})`,
            }}
          >
            <div className={styles.innerChip} />
            <div
              className={styles.lensReflection}
              style={{ animation: 'lensMove 6s infinite ease-in-out' }}
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {finalActive && (
            <motion.div
              key="glow"
              className={`${styles.glow} ${colorClass}`}
              variants={glowVariants}
              initial="initial"
              animate="active"
              exit="inactive"
              style={{
                filter: `blur(${glowBlur}px)`,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {label && (
        <div className={styles.textStack}>
          <span className={styles.label}>{label}</span>
          <div className={styles.indicatorLine} />
        </div>
      )}
    </div>
  );
};