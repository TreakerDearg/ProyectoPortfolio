'use client';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../../../styles/inventory-styles/decos-styles/nixie-tube.module.css';

export const NixieTube = ({ value, label }) => {
  const digits = String(value).split('');

  return (
    <div className={styles.nixieContainer}>
      {/* Definición del Filtro SVG de Neón */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="neonBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -6" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </svg>

      <div className={styles.socketHole}>
        <div className={styles.nixieWrapper}>
          <div className={styles.nixieGlass}>
            <div className={styles.nixieMesh} />
            
            <div className={styles.gasChamber}>
              <span className={styles.nixieGhost}>88</span>
              
              <div className={styles.digitContainer} style={{ display: 'flex' }}>
                <AnimatePresence mode="wait">
                  {digits.map((d, i) => (
                    <motion.span 
                      key={`${d}-${i}`}
                      className={styles.nixieDigit}
                      initial={{ opacity: 0.3, filter: 'url(#neonBlur) brightness(2)' }}
                      animate={{ opacity: 1, filter: 'url(#neonBlur) brightness(1)' }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                      {d}
                      {/* Aura de Plasma con Framer Motion */}
                      <motion.span 
                        className={styles.gasPlasma}
                        animate={{ 
                          opacity: [0.3, 0.6, 0.4],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      />
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className={styles.glassReflections}>
              <div className={styles.reflectionMain} />
            </div>
          </div>
          
          <div className={styles.internalBase} />
        </div>
      </div>
      
      <div className={styles.labelModule}>
        <div className={styles.labelScrew} />
        <span className={styles.nixieLabelText}>{label}</span>
        <div className={styles.labelScrew} />
      </div>
    </div>
  );
};