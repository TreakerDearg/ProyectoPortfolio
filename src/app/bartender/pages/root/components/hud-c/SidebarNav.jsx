"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Cpu, Box, LayoutDashboard, ChevronRight, X } from "lucide-react";
import { useMemo, useEffect, useState } from "react";
import { DRINKS } from "../../data/drinks";
import styles from "../../../../styles/root-styles/c-styles-comps/SidebarNav.module.css";

const navItems = [
  { id: 'ALL', icon: <LayoutDashboard size={18} />, label: 'ALL UNITS' },
  { id: 'KINETIC', icon: <Shield size={18} />, label: 'KINETIC' },
  { id: 'ENERGY', icon: <Zap size={18} />, label: 'ENERGY' },
  { id: 'ELECTRONIC', icon: <Cpu size={18} />, label: 'ELECTRONIC' },
  { id: 'OTHER', icon: <Box size={18} />, label: 'MISC' },
];

export default function SidebarNav({ activeFilter, onFilterChange, isOpen, onClose }) {

  /* =========================
     DETECTAR MOBILE
  ========================= */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* =========================
     COUNTS
  ========================= */
  const counts = useMemo(() => {
    const total = DRINKS.length;

    const byType = DRINKS.reduce((acc, drink) => {
      acc[drink.type] = (acc[drink.type] || 0) + 1;
      return acc;
    }, {});

    return { ALL: total, ...byType };
  }, []);

  return (
    <>
      {/* =========================
          OVERLAY (SOLO MOBILE)
      ========================= */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className={styles.overlay}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* =========================
          SIDEBAR
      ========================= */}
      <motion.nav
        className={`${styles.sidebar} ${isMobile && isOpen ? styles.open : ''}`}
        initial={false}
        animate={{
          x: isMobile ? (isOpen ? 0 : "-100%") : 0
        }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
      >

        {/* HEADER */}
        <div className={styles.navHeader}>
          <span>COMMAND INDEX</span>

          {isMobile && (
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={16} />
            </button>
          )}

          <div className={styles.headerScanline} />
        </div>

        {/* LIST */}
        <div className={styles.navList}>
          {navItems.map((item) => {
            const isActive = activeFilter === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  onFilterChange(item.id);
                  if (isMobile) onClose(); // 🔥 solo mobile
                }}
                className={`${styles.navButton} ${isActive ? styles.active : ''}`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className={styles.iconWrapper} 
                  style={{ color: isActive ? '#0ff' : '#888' }}
                >
                  {item.icon}
                </div>

                <span className={styles.navLabel}>
                  {item.label}
                </span>

                <span className={styles.itemCount}>
                  {counts[item.id] || 0}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={styles.activeBar}
                  />
                )}

                <div className={styles.hoverLine} />
              </motion.button>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className={styles.sidebarFooter}>
          <div className={styles.footerLine}>
            <ChevronRight size={12} />
            <span>ONLINE</span>
          </div>

          <div className={styles.footerLine}>
            <span>v.4.0.9</span>
          </div>
        </div>

      </motion.nav>
    </>
  );
}