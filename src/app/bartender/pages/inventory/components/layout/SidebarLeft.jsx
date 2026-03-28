"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Package, ShoppingCart, Eye, Syringe, Gauge, Shield, FolderArchive, Terminal,Radio, HardDrive
} from "lucide-react";
import styles from "../../../../styles/inventory-styles/layout/sidebar-left.module.css";

const CATEGORIES = [
  { id: "all", label: "ALL FILES", icon: FolderArchive },
  { id: "logistics", label: "LOGISTICS", icon: Package },
  { id: "commerce", label: "COMMERCE", icon: ShoppingCart },
  { id: "intel", label: "INTEL", icon: Eye },
  { id: "biomedical", label: "BIOMEDICAL", icon: Syringe },
  { id: "engineering", label: "ENGINEERING", icon: Gauge },
  { id: "military", label: "MILITARY", icon: Shield },
];

export default function SidebarLeft({ active, onChange, data }) {
  const { allItems, system } = data;

  // Count items per category
  const counts = useMemo(() => {
    const result = {};
    CATEGORIES.forEach(cat => {
      if (cat.id === "all") {
        result[cat.id] = allItems.length;
      } else {
        // For other categories, count items where itemCategory (for drinks) or category (for folders) matches
        const count = allItems.filter(item => {
          const itemCat = item.type === 'drink' ? item.itemCategory : item.category;
          return itemCat === cat.id;
        }).length;
        result[cat.id] = count;
      }
    });
    return result;
  }, [allItems]);

  return (
    <aside className={`${styles.sidebar} ${styles.open}`}>
      <div className={styles.scanlines} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}><Terminal size={20} /></div>
          <div className={styles.headerText}>
            <p>D6_TERMINAL</p>
            <span>ARCH_OS v33</span>
          </div>
          <div className={styles.radiation}>
            <Radio size={14} />
            <span>{system.radiation_level}</span>
          </div>
        </div>

        <div className={styles.navWrapper}>
          <p className={styles.sectionTitle}>SYSTEMS</p>
          <nav className={styles.nav}>
            {CATEGORIES.map(cat => {
              const isActive = cat.id === active;
              const total = counts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => onChange?.(cat.id)}
                  className={`${styles.item} ${isActive ? styles.active : ""}`}
                >
                  <span className={styles.icon}><cat.icon size={16} /></span>
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
      </div>
    </aside>
  );
}