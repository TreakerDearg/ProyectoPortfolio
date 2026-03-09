"use client";
import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, Box, LayoutDashboard, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { DRINKS } from '../../data/drinks'; // Necesario para contar unidades por tipo
import styles from '../../../../styles/root-styles/c-styles-comps/SidebarNav.module.css';

const navItems = [
  { id: 'ALL', icon: <LayoutDashboard size={18} />, label: 'ALL UNITS' },
  { id: 'KINETIC', icon: <Shield size={18} />, label: 'KINETIC' },
  { id: 'ENERGY', icon: <Zap size={18} />, label: 'ENERGY' },
  { id: 'ELECTRONIC', icon: <Cpu size={18} />, label: 'ELECTRONIC' },
  { id: 'OTHER', icon: <Box size={18} />, label: 'MISC' },
];

export default function SidebarNav({ activeFilter, onFilterChange }) {
  // Calcular conteo de unidades por tipo (para mostrarlo opcionalmente)
  const counts = useMemo(() => {
    const total = DRINKS.length;
    const byType = DRINKS.reduce((acc, drink) => {
      acc[drink.type] = (acc[drink.type] || 0) + 1;
      return acc;
    }, {});
    return { ALL: total, ...byType };
  }, []);

  return (
    <nav className={styles.sidebar}>
      <div className={styles.navHeader}>
        <span>COMMAND INDEX</span>
        <div className={styles.headerScanline} />
      </div>

      <div className={styles.navList}>
        {navItems.map((item) => {
          const isActive = activeFilter === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={`${styles.navButton} ${isActive ? styles.active : ''}`}
              whileHover={{
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
                borderLeftColor: '#0ff',
                x: 4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.iconWrapper} style={{ color: isActive ? '#0ff' : '#888' }}>
                {item.icon}
              </div>
              <span className={styles.navLabel}>{item.label}</span>
              
              {/* Contador opcional (solo si no es ALL, o siempre) */}
              <span className={styles.itemCount}>
                {counts[item.id] || 0}
              </span>

              {/* Barra de acento lateral para el activo */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className={styles.activeBar}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Línea decorativa hover */}
              <div className={styles.hoverLine} />
            </motion.button>
          );
        })}
      </div>

      {/* Pie de la sidebar con información del sistema */}
      <div className={styles.sidebarFooter}>
        <div className={styles.footerLine}>
          <ChevronRight size={12} />
          <span>ONLINE</span>
        </div>
        <div className={styles.footerLine}>
          <span>v.4.0.9</span>
        </div>
      </div>
    </nav>
  );
}