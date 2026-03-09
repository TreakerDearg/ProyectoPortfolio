"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import styles from '../../styles/root-styles/armored.module.css';

import HudHeader from './components/hud-c/HudHeader';
import ModuleGrid from './components/hud-c/ModuleGrid';
import DiagnosticFooter from './components/hud-c/DiagnotsticFooter';
import SidebarNav from './components/hud-c/SidebarNav';
import Briefcase from './components/hud-c/Briefcase';

export default function RootPage() {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para búsqueda

  // Cerrar Briefcase con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setSelectedDrink(null);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <main className={styles.acContainer}>
      {/* Capas de fondo holográfico */}
      <div className={styles.holoGrid} />
      <div className={styles.scanlineOverlay} />

      <div className={styles.hudFrame}>
        <HudHeader onSearch={setSearchTerm} searchTerm={searchTerm} />

        <section className={styles.mainLayout}>
          <SidebarNav
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className={`${styles.contentArea} ${selectedDrink ? styles.dimmed : ''}`}>
            {/* Panel de vidrio para el contenido */}
            <div className={styles.glassPanel}>
              <ModuleGrid
                onSelectDrink={setSelectedDrink}
                filter={activeFilter}
                searchTerm={searchTerm} // Pasamos el término de búsqueda
              />
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedDrink && (
            <Briefcase
              drink={selectedDrink}
              onClose={() => setSelectedDrink(null)}
            />
          )}
        </AnimatePresence>

        <DiagnosticFooter />
      </div>

      {/* Esquinas decorativas */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerTR} />
      <div className={styles.cornerBL} />
      <div className={styles.cornerBR} />
    </main>
  );
}