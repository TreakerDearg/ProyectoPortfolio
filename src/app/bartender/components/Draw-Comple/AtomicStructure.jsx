'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Droplets, Zap, Skull, AlertOctagon } from 'lucide-react';
import styles from '../../styles/atomic.module.css';

const ICON_MAP = {
  atom: Atom,
  drop: Droplets,
  zap: Zap,
  skull: Skull,
  alert: AlertOctagon
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0, scale: 0.98 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', damping: 12 }
  }
};

// Añadimos la prop 'universe'
export const AtomicStructure = ({ category, specs = [], universe = 'metro' }) => {
  return (
    <motion.section 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      /* El secreto está aquí: pasamos el universo al dataset */
      data-universe={universe}
    >
      <div className={styles.categoryWatermark}>{category}</div>

      <div className={styles.header}>
        <div className="flex items-center gap-2">
          <div className={styles.pulseDot} />
          <span className="font-black uppercase tracking-widest text-[10px]">Molecular_Analysis_Report</span>
        </div>
        <span className={styles.liveIndicator}>[SYSTEM_READY]</span>
      </div>

      <div className={styles.grid}>
        {specs.map((spec, index) => {
          const Icon = ICON_MAP[spec.type] || Atom;
          
          return (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`${styles.elementBox} ${spec.critical ? styles.criticalBorder : ''}`}
            >
              <div className={`${styles.iconWrapper} ${spec.critical ? styles.criticalIcon : styles.normalIcon}`}>
                <Icon size={18} />
              </div>

              <div className={styles.data}>
                <span className={styles.desc}>{spec.desc}</span>
                <div className={styles.valueWrapper}>
                  <span className={`${styles.value} ${spec.critical ? styles.criticalValue : styles.normalValue}`}>
                    {spec.val}
                  </span>
                  <span className={styles.unit}>{spec.label}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};