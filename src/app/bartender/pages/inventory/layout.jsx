"use client";

import { useState, useMemo } from "react";
import styles from '../../styles/inventory-styles/metro-layout.module.css';
import HardwareHeader from "./components/layout/HardwareHeader";
import HardwareFooter from "./components/layout/HardwareFooter";
import SidebarLeft from "./components/layout/SidebarLeft";
import SidebarRight from "./components/layout/SidebarRight";
import MonitorFrame from "./components/layout/MonitorFrame";
import Screws from "./components/decoration/Screws";
import { METRO_DRINKS, METRO_FOLDERS, D6_SYSTEM_CONFIG } from "./data/dataMetro";
import { REAL_RECIPES } from "./data/RecipesReal";
import { MetroProvider } from "./context/MetroContext";

export default function MetroLayout({ children }) {
  const [currentCategory, setCurrentCategory] = useState("all");

  // Flatten all items
  const allDrinksWithCategory = useMemo(() => {
    const drinksList = [];
    Object.entries(METRO_DRINKS).forEach(([cat, drinks]) => {
      drinks.forEach(drink => {
        drinksList.push({
          ...drink,
          itemCategory: cat,
          type: 'drink'
        });
      });
    });
    return drinksList;
  }, []);

  const allFoldersWithCategory = useMemo(() => {
    return METRO_FOLDERS.map(folder => ({
      ...folder,
      type: 'folder'
    }));
  }, []);

  const allItems = useMemo(() => {
    return [...allDrinksWithCategory, ...allFoldersWithCategory];
  }, [allDrinksWithCategory, allFoldersWithCategory]);

  const sharedData = {
    currentCategory,
    setCurrentCategory,
    allItems,
    allDrinks: METRO_DRINKS,
    allFolders: METRO_FOLDERS,
    system: D6_SYSTEM_CONFIG,
    recipes: REAL_RECIPES
  };

  return (
    <div className={styles.root}>
      <div className={styles.chassis}>
        <Screws />
        <MetroProvider value={sharedData}>
          <header className={styles.header}>
            <HardwareHeader />
          </header>
          <div className={styles.body}>
            <aside className={styles.sidebarLeft}>
              <SidebarLeft
                active={currentCategory}
                onChange={setCurrentCategory}
                data={sharedData}
              />
            </aside>
            <div className={styles.monitorWrapper}>
              <MonitorFrame>
                <main className={styles.main}>
                  {children}
                </main>
              </MonitorFrame>
            </div>
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