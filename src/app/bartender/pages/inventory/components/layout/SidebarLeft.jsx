"use client";

import { useMemo, useContext } from "react";
import { motion } from "framer-motion";
import {
  Package, ShoppingCart, Eye, Syringe, Gauge, Shield,
  FolderArchive, Terminal, Radio, HardDrive, AlertTriangle
} from "lucide-react";
import styles from "../../../../styles/inventory-styles/layout/sidebar-left.module.css";
import { MetroContext } from "../../context/MetroContext";

const CATEGORIES = [
  { id: "all", label: "ALL FILES", icon: FolderArchive },
  { id: "logistics", label: "LOGISTICS", icon: Package },
  { id: "commerce", label: "COMMERCE", icon: ShoppingCart },
  { id: "intel", label: "INTEL", icon: Eye },
  { id: "biomedical", label: "BIOMEDICAL", icon: Syringe },
  { id: "engineering", label: "ENGINEERING", icon: Gauge },
  { id: "military", label: "MILITARY", icon: Shield },
];

export default function SidebarLeft({ active, onChange }) {
  const data = useContext(MetroContext);
  const { allItems, system } = data || { allItems: [], system: { radiation_level: 0 } };

  // Conteos por categoría
  const counts = useMemo(() => {
    const result = {};
    CATEGORIES.forEach(cat => {
      if (cat.id === "all") {
        result[cat.id] = allItems.length;
      } else {
        const count = allItems.filter(item => {
          const itemCat = item.type === 'drink' ? item.itemCategory : item.category;
          return itemCat === cat.id;
        }).length;
        result[cat.id] = count;
      }
    });
    return result;
  }, [allItems]);

  // Indicador de radiación (puede venir del sistema)
  const radLevel = system?.radiation_level ? parseFloat(system.radiation_level) : 0.45;
  const isRadCritical = radLevel > 0.6;

  return (
    <aside className={`${styles.sidebar} ${styles.open}`}>
      {/* Capas decorativas */}
      <div className={styles.scanlines} />
      <div className={styles.rivets} />

      <div className={styles.container}>
        {/* Cabecera tipo panel de control */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <Terminal size={20} />
          </div>
          <div className={styles.headerText}>
            <p>D6_TERMINAL</p>
            <span>ARCH_OS v33</span>
          </div>
          <div className={`${styles.radiation} ${isRadCritical ? styles.critical : ''}`}>
            <Radio size={14} className={isRadCritical ? styles.pulseIcon : ''} />
            <span>{system?.radiation_level || "0.45 Sv/h"}</span>
            {isRadCritical && <AlertTriangle size={10} className={styles.alertIcon} />}
          </div>
        </div>

        {/* Navegación modular */}
        <div className={styles.navWrapper}>
          <p className={styles.sectionTitle}>
            <span>SYSTEMS</span>
            <span className={styles.sectionBadge}>ACTIVE</span>
          </p>

          <nav className={styles.nav}>
            {CATEGORIES.map(cat => {
              const isActive = cat.id === active;
              const total = counts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => onChange?.(cat.id)}
                  className={`${styles.item} ${isActive ? styles.active : ''}`}
                >
                  <span className={styles.icon}>
                    <cat.icon size={16} />
                  </span>
                  <span className={styles.label}>{cat.label}</span>
                  <span className={styles.total}>{total}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={styles.activeBar}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Panel inferior con estado del sistema */}
        <div className={styles.footer}>
          <div className={styles.status}>
            <div className={styles.statusLight} />
            <p>D6 NODE ACTIVE</p>
          </div>
          <div className={styles.signal}>
            <motion.div
              className={styles.signalBar}
              animate={{ x: ["-100%", "120%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className={styles.footerHint}>
            <HardDrive size={12} />
            <p>KEY: D6_{active.slice(0,2).toUpperCase()}•</p>
          </div>
        </div>

        {/* Remaches inferiores */}
        <div className={styles.bottomRivets}>
          <div className={styles.rivet} />
          <div className={styles.rivet} />
        </div>
      </div>
    </aside>
  );
}