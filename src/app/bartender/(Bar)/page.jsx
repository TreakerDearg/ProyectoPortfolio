'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Package,
  AlertTriangle,
  ChevronRight,
  Database,
  Search,
  ShieldAlert,
  Radio,
  Activity,
  Layers,
  Box
} from 'lucide-react';

import styles from '../styles/inventory.module.css';
import { Drawer } from '../components/Drawer';
import { INVENTORY_DATA } from '../data/inventory';

export default function BartenderPage() {

  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  /* -------------------- HELPERS -------------------- */

  const getStatusColor = (status) => {
    switch (status) {
      case "CRITICAL":
        return "bg-red-600 shadow-[2px_0_15px_rgba(220,38,38,0.4)]";
      case "DEGRADING":
        return "bg-amber-500";
      default:
        return "bg-blue-600";
    }
  };

  const getBarColor = (item) => {
    if (item.qty < 20) return "bg-red-600";
    if (item.universe === "soma") return "bg-cyan-400";
    if (item.universe === "ac") return "bg-orange-600";
    return "bg-amber-600";
  };

  /* -------------------- FILTERED DATA -------------------- */

  const filteredItems = useMemo(() => {

    const normalizedSearch = search.toLowerCase().trim();

    return INVENTORY_DATA.filter((item) => {

      const matchesSearch =
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.metadata.sector.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        activeFilter === "ALL" ||
        item.metadata.stability === activeFilter;

      return matchesSearch && matchesStatus;

    });

  }, [search, activeFilter]);

  /* -------------------- EVENTS -------------------- */

  const handleOpenDrawer = useCallback((item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  }, []);

  /* -------------------- RENDER -------------------- */

  return (

    <div className={styles.inventoryContainer}>

      {/* ================= HEADER ================= */}

      <header className={styles.manifestHeader}>

        <div className={styles.titleGroup}>

          <div className="flex items-center gap-2 mb-2">
            <Radio size={12} className="text-amber-500 animate-pulse" />
            <p className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">
              D6_Link: {activeFilter}_MODE
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Database size={28} className="text-stone-800 hidden sm:block" />
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">
              Supply_Manifest
            </h2>
          </div>

        </div>


        {/* SEARCH + FILTER */}

        <div className={styles.controls}>

          {/* SEARCH */}

          <div className="relative group flex-1">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-amber-500 transition-colors"
              size={16}
            />

            <input
              aria-label="Search inventory"
              type="text"
              placeholder="FILTER_REGISTRY..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          {/* FILTERS */}

          <div className={styles.filterBar}>

            {["ALL", "STABLE", "DEGRADING", "CRITICAL"].map((filter) => (

              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`${styles.filterButton} ${
                  activeFilter === filter ? styles.filterActive : ""
                }`}
              >
                {filter}
              </button>

            ))}

          </div>

        </div>

      </header>


      {/* ================= GRID ================= */}

      <main className={styles.inventoryMain}>

        <motion.div
          layout="position"
          className={styles.itemGrid}
        >

          <AnimatePresence mode="popLayout">

            {filteredItems.map((item) => (

              <motion.article
                layout="position"
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                role="button"
                tabIndex={0}
                aria-label={`Open item ${item.name}`}
                onClick={() => handleOpenDrawer(item)}
                className={`${styles.itemCard} group`}
                data-universe={item.universe}
              >

                {/* STATUS BAR */}

                <div
                  className={`absolute top-0 left-0 w-1 h-full transition-all duration-500 group-hover:w-1.5 ${getStatusColor(
                    item.metadata.stability
                  )}`}
                />


                {/* HEADER */}

                <div className={styles.cardHeader}>

                  <div className="overflow-hidden">

                    <div className="flex items-center gap-2 opacity-30 mb-1 group-hover:opacity-60 transition-opacity">
                      <Layers size={12} />
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em]">
                        SEC_{item.metadata.sector}
                      </span>
                    </div>

                    <h4 className={styles.itemTitle}>
                      {item.name}
                    </h4>

                  </div>

                  <div className="flex flex-col items-end shrink-0">

                    <Activity
                      size={16}
                      className={
                        item.qty < 20
                          ? "text-red-500 animate-pulse"
                          : "text-stone-600"
                      }
                    />

                    <span className="text-[10px] font-mono mt-1 text-stone-500">
                      {item.metadata.radiation}
                    </span>

                  </div>

                </div>


                {/* QUANTITY */}

                <div className={styles.quantitySection}>

                  <div className={styles.quantityHeader}>

                    <div className="flex items-center gap-2">
                      <Box size={12} className="text-stone-700" />
                      <span className="text-[9px] font-mono text-stone-600 uppercase font-bold">
                        In_Stock
                      </span>
                    </div>

                    <span
                      className={`text-sm font-mono font-black ${
                        item.qty < 20 ? "text-red-500" : "text-white"
                      }`}
                    >
                      {item.qty}%
                    </span>

                  </div>


                  {/* BAR */}

                  <div className={styles.quantityBarContainer}>

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.qty}%` }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className={`h-full ${getBarColor(item)}`}
                    />

                  </div>

                </div>


                {/* FOOTER */}

                <div className={styles.cardFooter}>

                  <div className="flex items-center gap-2">

                    <ShieldAlert
                      size={14}
                      className={
                        item.metadata.stability === "CRITICAL"
                          ? "text-red-600"
                          : "text-stone-800"
                      }
                    />

                    <code className="text-[10px] text-stone-600 font-mono tracking-tighter uppercase">
                      {item.code}
                    </code>

                  </div>

                  <div className="flex items-center gap-1 text-stone-800 group-hover:text-amber-500 transition-all">

                    <span className="text-[9px] font-black font-mono">
                      SCAN
                    </span>

                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />

                  </div>

                </div>

              </motion.article>

            ))}

          </AnimatePresence>

        </motion.div>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className={styles.inventoryFooter}>

        <div className={styles.footerStats}>

          <div className={styles.statBlock}>

            <div className="flex items-center gap-2 mb-1">
              <Package size={14} className="text-stone-700" />
              <span className="text-[9px] text-stone-700 uppercase font-black">
                Registry_Count
              </span>
            </div>

            <span className="text-3xl font-black text-stone-600 font-mono">
              {filteredItems.length}
            </span>

          </div>


          <div className={styles.statBlockDanger}>

            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-red-950" />
              <span className="text-[9px] text-stone-800 uppercase font-black">
                Bio_Threats
              </span>
            </div>

            <span className="text-3xl font-black text-red-950 font-mono">
              {
                INVENTORY_DATA.filter(
                  (i) => i.metadata.stability === "CRITICAL"
                ).length
              }
            </span>

          </div>

        </div>


        <div className={styles.footerTerminal}>

          <p className="text-[9px] font-mono text-stone-500 tracking-[0.4em] uppercase mb-1">
            Polis_Central_Terminal
          </p>

          <p className="text-[8px] font-mono text-stone-700 uppercase">
            {new Date().toLocaleTimeString()} // DATA_INTEGRITY_VERIFIED
          </p>

        </div>

      </footer>


      {/* ================= DRAWER ================= */}

      <Drawer
        item={selectedItem}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

    </div>
  );
}