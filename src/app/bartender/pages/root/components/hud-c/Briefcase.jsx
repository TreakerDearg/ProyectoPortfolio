"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, MapPin, Shield, Zap, Cpu, AlertTriangle, Activity, Wifi, Radio, XCircle,Beaker } from "lucide-react";
import { useMemo } from "react";
import styles from "../../../../styles/root-styles/c-styles-comps/Briefcase.module.css";

// Misma configuración de tipos que en DrinkCard
const TYPE_CONFIG = {
  KINETIC:    { icon: <Shield size={14} />, label: "BALISTIC_UNIT", color: "#ff3c00" },
  ENERGY:     { icon: <Zap size={14} />,    label: "PLASMA_CELL",   color: "#3b82f6" },
  ELECTRONIC: { icon: <Cpu size={14} />,    label: "DATA_NODE",     color: "#a855f7" },
  OTHER:      { icon: <Beaker size={14} />, label: "BIOTECH_UNIT",  color: "#10b981" }
};

// Configuración de variantes visuales (misma que en DrinkCard)
const VARIANT_CONFIG = {
  pristine: {
    borderGlow: "#4ade80",
    statusIcon: <Activity size={12} />,
    statusText: "NOMINAL",
    overlayClass: styles.pristineOverlay,
    accentColor: "#4ade80"
  },
  damaged: {
    borderGlow: "#b91c1c",
    statusIcon: <AlertTriangle size={12} />,
    statusText: "DAMAGED",
    overlayClass: styles.damagedOverlay,
    accentColor: "#b91c1c"
  },
  encrypted: {
    borderGlow: "#a855f7",
    statusIcon: <Wifi size={12} />,
    statusText: "ENCRYPTED",
    overlayClass: styles.encryptedOverlay,
    accentColor: "#a855f7"
  },
  helghast: {
    borderGlow: "#8b0000",
    statusIcon: <Radio size={12} />,
    statusText: "HELGH AST",
    overlayClass: styles.helghastOverlay,
    accentColor: "#8b0000"
  },
  corrupted: {
    borderGlow: "#f97316",
    statusIcon: <XCircle size={12} />,
    statusText: "CORRUPTED",
    overlayClass: styles.corruptedOverlay,
    accentColor: "#f97316"
  }
};

export default function Briefcase({ drink, onClose }) {
  if (!drink) return null;

  const typeConfig = TYPE_CONFIG[drink.type] || { icon: <Terminal size={14} />, label: "UNKNOWN", color: "#fff" };
  const variantKey = drink.styleVariant || "pristine";
  const variant = VARIANT_CONFIG[variantKey];
  const accentColor = variant?.accentColor || drink.color;

  // Animación para las barras de progreso
  const barVariants = {
    hidden: { width: 0 },
    visible: (width) => ({
      width: `${width}%`,
      transition: { duration: 1, ease: "easeOut" }
    })
  };

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`${styles.briefcase} ${styles[variantKey]}`}
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Capa de textura de fondo (variante) */}
        <div className={`${styles.baseTexture} ${variant?.overlayClass || ''}`} />

        {/* Scanline local */}
        <div className={styles.scanline} />

        {/* Header con tipo e ID */}
        <div className={styles.header}>
          <div className={styles.typeTag} style={{ color: typeConfig.color }}>
            {typeConfig.icon}
            <span>{typeConfig.label}</span>
          </div>
          <div className={styles.idTag}>{drink.id}</div>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={18} />
          </button>
        </div>

        {/* Contenido principal */}
        <div className={styles.content}>
          {/* Nombre y origen */}
          <div className={styles.titleSection}>
            <h2 className={styles.unitName} style={{ color: accentColor }}>
              {drink.name}
            </h2>
            <div className={styles.origin}>
              <MapPin size={12} />
              <span>{drink.origin}</span>
            </div>
          </div>

          {/* Barras de telemetría */}
          <div className={styles.telemetry}>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>STR</span>
              <div className={styles.barContainer}>
                <motion.div
                  className={styles.barFill}
                  custom={drink.strength}
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
              <span className={styles.statValue}>{drink.strength}%</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>STB</span>
              <div className={styles.barContainer}>
                <motion.div
                  className={styles.barFill}
                  custom={drink.stability}
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ backgroundColor: accentColor, opacity: 0.7 }}
                />
              </div>
              <span className={styles.statValue}>{drink.stability}%</span>
            </div>
          </div>

          {/* Descripción de misión */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Terminal size={14} />
              <span>MISSION_BRIEF</span>
            </div>
            <p className={styles.description}>{drink.description}</p>
          </div>

          {/* Lista de componentes */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Zap size={14} />
              <span>COMPONENT_LIST</span>
            </div>
            <ul className={styles.ingredients}>
              {drink.ingredients?.map((ing, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                >
                  <span className={styles.bullet} style={{ backgroundColor: accentColor }} />
                  {ing}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Pie con estado y flavor */}
          <div className={styles.footer}>
            <div className={styles.statusIndicator} style={{ borderColor: variant?.borderGlow }}>
              {variant?.statusIcon}
              <span>{variant?.statusText}</span>
            </div>
            <div className={styles.flavor} style={{ color: accentColor }}>
              {drink.flavor}
            </div>
          </div>

          {/* LOG regenerando (como en la imagen) */}
          <div className={styles.log}>
            [ LOG ] EN_REGENERATING
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}