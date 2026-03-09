"use client";
import { motion } from "framer-motion";
import {
  Shield, Zap, Cpu, MapPin, Gauge,
  AlertTriangle, Activity, Wifi, Radio, XCircle, ZapOff,
  Beaker // Para el tipo OTHER
} from "lucide-react";
import { useMemo } from "react";
import styles from "../../../../styles/root-styles/c-styles-comps/DrinkCard.module.css";

// Configuración de tipos (incluye OTHER)
const TYPE_CONFIG = {
  KINETIC:    { icon: <Shield size={14} />, label: "BALISTIC_UNIT", color: "#ff3c00" },
  ENERGY:     { icon: <Zap size={14} />,    label: "PLASMA_CELL",   color: "#3b82f6" },
  ELECTRONIC: { icon: <Cpu size={14} />,    label: "DATA_NODE",     color: "#a855f7" },
  OTHER:      { icon: <Beaker size={14} />, label: "BIOTECH_UNIT",  color: "#10b981" } // Verde tecnológico
};

// Configuración de variantes visuales
const VARIANT_CONFIG = {
  pristine: {
    borderGlow: "#4ade80",
    statusIcon: <Activity size={12} />,
    statusText: "NOMINAL",
    overlayClass: styles.pristineOverlay
  },
  damaged: {
    borderGlow: "#b91c1c",
    statusIcon: <AlertTriangle size={12} />,
    statusText: "DAMAGED",
    overlayClass: styles.damagedOverlay
  },
  encrypted: {
    borderGlow: "#a855f7",
    statusIcon: <Wifi size={12} />,
    statusText: "ENCRYPTED",
    overlayClass: styles.encryptedOverlay
  },
  helghast: {
    borderGlow: "#8b0000",
    statusIcon: <Radio size={12} />,
    statusText: "HELGH AST",
    overlayClass: styles.helghastOverlay
  },
  corrupted: {
    borderGlow: "#f97316",
    statusIcon: <XCircle size={12} />,
    statusText: "CORRUPTED",
    overlayClass: styles.corruptedOverlay
  }
};

export default function DrinkCard({ drink, onClick }) {
  // Configuración según el tipo de bebida (con fallback)
  const typeConfig = TYPE_CONFIG[drink.type] || {
    icon: <Gauge size={14} />,
    label: "UNKNOWN_OBJ",
    color: "#ffffff"
  };

  const variantKey = drink.styleVariant || "pristine";
  const variant = VARIANT_CONFIG[variantKey];
  const variantClass = styles[`variant${variantKey.charAt(0).toUpperCase() + variantKey.slice(1)}`] || "";

  // Generar un strip binario estable para la variante encrypted (basado en el id)
  const binaryStrip = useMemo(() => {
    // Usamos el id como semilla para generar 12 bits pseudoaleatorios pero estables
    const seed = drink.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (n) => (seed * (n + 1)) % 2; // Simple generador
    return [...Array(12)].map((_, i) => (random(i) > 0.5 ? "1" : "0")).join('');
  }, [drink.id]);

  // Valores simulados para los paneles
  const hullIntegrity = drink.stability;
  const coolantLeak = 100 - drink.strength; // A más fuerza, más fuga
  const corruptSector = useMemo(() => {
    const hash = drink.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `0x${(hash % 0xFFFF).toString(16).toUpperCase().padStart(4, '0')}`;
  }, [drink.id]);

  // Animaciones para la barra LED (parpadeo en variantes inestables)
  const ledBarAnimation = (variantKey === 'damaged' || variantKey === 'corrupted')
    ? { opacity: [1, 0.6, 1], transition: { repeat: Infinity, duration: 1.2 } }
    : {};

  return (
    <motion.div
      className={`${styles.card} ${variantClass}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-variant={drink.styleVariant}
    >
      {/* Capa base de textura */}
      <div className={`${styles.baseTexture} ${variant.overlayClass}`} />

      {/* Barra LED superior con animación de parpadeo */}
      <motion.div
        className={styles.topLedBar}
        style={{ backgroundColor: variant.borderGlow }}
        animate={ledBarAnimation}
      >
        <div className={styles.statusIndicator}>
          {variant.statusIcon}
          <span>{variant.statusText}</span>
        </div>
        <div className={styles.powerIndicator}>
          <span className={styles.pulseDot} />
          <span>SYS</span> {/* Cambiado de PWR a SYS por coherencia */}
        </div>
      </motion.div>

      {/* Cabecera */}
      <div className={styles.cardHeader}>
        <div className={styles.typeTag} style={{ color: typeConfig.color }}>
          {typeConfig.icon}
          <span>{typeConfig.label}</span>
        </div>
        <span className={styles.serialId}>{drink.id}</span>
      </div>

      {/* Nombre con efecto hover */}
      <motion.h3 className={styles.unitName} whileHover={{ letterSpacing: "2px" }}>
        {drink.name}
      </motion.h3>

      {/* Telemetría */}
      <div className={styles.telemetryContainer}>
        <div className={styles.statLine}>
          <div className={styles.statLabel}>STR</div>
          <div className={styles.barPath}>
            <motion.div
              className={styles.barLevel}
              initial={{ width: 0 }}
              animate={{ width: `${drink.strength}%` }}
              style={{ backgroundColor: typeConfig.color, boxShadow: `0 0 10px ${typeConfig.color}` }}
            />
          </div>
          <span className={styles.statValue}>{drink.strength}%</span>
        </div>

        <div className={styles.statLine}>
          <div className={styles.statLabel}>STB</div>
          <div className={styles.barPath}>
            <motion.div
              className={styles.barLevel}
              initial={{ width: 0 }}
              animate={{ width: `${drink.stability}%` }}
              style={{ backgroundColor: typeConfig.color, opacity: 0.7 }}
            />
          </div>
          <span className={styles.statValue}>{drink.stability}%</span>
        </div>
      </div>

      {/* Paneles específicos de variante (mejorados) */}
      {variantKey === "pristine" && (
        <div className={styles.diagnosticPanel} style={{ borderLeftColor: "#4ade80" }}>
          <Activity size={16} color="#4ade80" />
          <span>ALL SYSTEMS NOMINAL</span>
        </div>
      )}

      {variantKey === "damaged" && (
        <div className={styles.diagnosticPanel}>
          <AlertTriangle size={16} color="#ffaa00" />
          <span>HULL: {hullIntegrity}% | COOLANT LEAK: {coolantLeak}%</span>
        </div>
      )}

      {variantKey === "encrypted" && (
        <div className={styles.encryptionPanel}>
          <div className={styles.binaryStrip}>
            {binaryStrip.split('').map((bit, i) => (
              <span key={i}>{bit}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Wifi size={14} />
            <span style={{ fontSize: 8 }}>AES-256</span>
          </div>
        </div>
      )}

      {variantKey === "helghast" && (
        <div className={styles.helghastCrest}>
          <div className={styles.crestSymbol} />
          <span>
            {drink.origin?.toLowerCase().includes('helgh') 
              ? 'HELGH AST HIGH COMMAND' 
              : 'MILITARY ISSUE'}
          </span>
        </div>
      )}

      {variantKey === "corrupted" && (
        <div className={styles.corruptionMark}>
          <ZapOff size={16} />
          <span>DATA CORRUPT | SECTOR {corruptSector}</span>
        </div>
      )}

      {/* Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.originInfo}>
          <MapPin size={10} />
          <span>{drink.origin}</span>
        </div>
        <div className={styles.flavorProfile} style={{ borderColor: typeConfig.color }}>
          {drink.flavor}
        </div>
      </div>

      {/* Esquina funcional */}
      <div
        className={styles.angleNotch}
        style={{ borderRightColor: typeConfig.color, borderBottomColor: typeConfig.color }}
      />

      {/* Código de barras decorativo (solo para algunas variantes) */}
      {(variantKey === "pristine" || variantKey === "helghast") && (
        <div className={styles.barcodeLine}>
          <div className={styles.barcode} />
        </div>
      )}
    </motion.div>
  );
}