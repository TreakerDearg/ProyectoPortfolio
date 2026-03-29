"use client";

import { useState, useMemo } from "react";
import styles from '../../styles/inventory-styles/metro-layout.module.css';

import HardwareHeader from "./components/layout/HardwareHeader";
import HardwareFooter from "./components/layout/HardwareFooter";
import SidebarLeft from "./components/layout/SidebarLeft";
import SidebarRight from "./components/layout/SidebarRight";
import MonitorFrame from "./components/layout/MonitorFrame";
import Screws from "./components/decoration/Screws";

import {
  METRO_DRINKS,
  METRO_FOLDERS,
  D6_SYSTEM_CONFIG
} from "./data/dataMetro";

import { REAL_RECIPES } from "./data/RecipesReal";
import { MetroProvider } from "./context/MetroContext";

export default function MetroLayout({ children }) {
  const [currentCategory, setCurrentCategory] = useState("all");

  // =============================
  // NORMALIZACIÓN DE DATOS
  // =============================
  const allDrinksWithCategory = useMemo(() => {
    return Object.entries(METRO_DRINKS).flatMap(([cat, drinks]) =>
      drinks.map(drink => ({
        ...drink,
        itemCategory: cat,
        type: "drink"
      }))
    );
  }, []);

  const allFoldersWithCategory = useMemo(() => {
    return METRO_FOLDERS.map(folder => ({
      ...folder,
      type: "folder"
    }));
  }, []);

  const allItems = useMemo(
    () => [...allDrinksWithCategory, ...allFoldersWithCategory],
    [allDrinksWithCategory, allFoldersWithCategory]
  );

  // =============================
  // CONTEXTO MEMOIZADO
  // =============================
  const contextValue = useMemo(
    () => ({
      currentCategory,
      setCurrentCategory,
      allItems,
      allDrinks: METRO_DRINKS,
      allFolders: METRO_FOLDERS,
      system: D6_SYSTEM_CONFIG,
      recipes: REAL_RECIPES,
    }),
    [currentCategory, allItems]
  );

  // =============================
  // LAYOUT
  // =============================
  return (
    <div className={styles.root}>
      <div className={styles.chassis}>
        <Screws />

        <MetroProvider value={contextValue}>
          <header className={styles.header}>
            <HardwareHeader />
          </header>

          <div className={styles.body}>
            {/* Sidebar izquierda: ocupa su columna y scrolla si es necesario */}
            <aside className={styles.sidebarLeft}>
              <SidebarLeft active={currentCategory} onChange={setCurrentCategory} />
            </aside>

            {/* Monitor principal: se expande para llenar el espacio */}
            <div className={styles.monitorWrapper}>
              <MonitorFrame>
                <main className={styles.main}>{children}</main>
              </MonitorFrame>
            </div>

            {/* Sidebar derecha: solo visible en pantallas grandes */}
            <aside className={styles.sidebarRight}>
              <SidebarRight />
            </aside>
          </div>

          <footer className={styles.footer}>
            <HardwareFooter />
          </footer>
        </MetroProvider>
      </div>
    </div>
  );
}