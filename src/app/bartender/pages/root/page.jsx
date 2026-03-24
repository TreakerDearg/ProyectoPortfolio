"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "../../styles/root-styles/armored.module.css";

import HudHeader from "./components/hud-c/HudHeader";
import ModuleGrid from "./components/hud-c/ModuleGrid";
import DiagnosticFooter from "./components/hud-c/DiagnotsticFooter";
import SidebarNav from "./components/hud-c/SidebarNav";
import Briefcase from "./components/hud-c/Briefcase";

export default function RootPage() {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================
     HANDLERS
  ========================= */
  const handleClose = useCallback(() => {
    setSelectedDrink(null);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  /* =========================
     ESC GLOBAL (MEJORADO)
  ========================= */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (sidebarOpen) return closeSidebar();
        if (selectedDrink) return handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [sidebarOpen, selectedDrink, closeSidebar, handleClose]);

  /* =========================
     BLOQUEO SCROLL (MOBILE UX)
  ========================= */
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  return (
    <main className={styles.acContainer}>
      {/* BACKGROUND */}
      <div className={styles.bgLayer}>
        <div className={styles.holoGrid} />
        <div className={styles.scanlineOverlay} />
      </div>

      {/* HUD */}
      <div className={styles.hudFrame}>
        
        {/* 🔥 IMPORTANTE: PASAMOS EL TRIGGER */}
        <HudHeader 
          onSearch={setSearchTerm} 
          searchTerm={searchTerm}
          onMenuClick={toggleSidebar}
        />

        <section className={styles.mainLayout}>
          
          {/* SIDEBAR */}
          <SidebarNav
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isOpen={sidebarOpen}
            onClose={closeSidebar}
          />

          {/* CONTENT */}
          <div
            className={`${styles.contentArea} ${
              selectedDrink ? styles.dimmed : ""
            }`}
          >
            <div className={styles.glassPanel}>
              <ModuleGrid
                onSelectDrink={setSelectedDrink}
                filter={activeFilter}
                searchTerm={searchTerm}
              />
            </div>
          </div>

        </section>

        <DiagnosticFooter />

        {/* MODAL */}
        <AnimatePresence mode="wait">
          {selectedDrink && (
            <Briefcase
              drink={selectedDrink}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      </div>

      {/* CORNERS */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerTR} />
      <div className={styles.cornerBL} />
      <div className={styles.cornerBR} />
    </main>
  );
}