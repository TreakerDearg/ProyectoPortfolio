'use client';
import React, { useState, useMemo } from 'react';
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

  const filteredItems = useMemo(() => {
    return INVENTORY_DATA.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(search.toLowerCase()) || 
        item.metadata.sector.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = activeFilter === "ALL" || item.metadata.stability === activeFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, activeFilter]);

  const handleOpenDrawer = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  return (
    <div className={styles.inventoryContainer}>
      {/* 1. HEADER */}
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
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          <div className="relative group flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-amber-500 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="FILTER_REGISTRY..."
              className="bg-black/40 border border-stone-800 py-3 pl-10 pr-4 text-[11px] font-mono text-amber-500 w-full lg:w-72 focus:outline-none focus:border-amber-500/50 transition-all uppercase"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1 bg-stone-950/50 p-1 border border-stone-900 overflow-x-auto no-scrollbar">
            {["ALL", "STABLE", "DEGRADING", "CRITICAL"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-[9px] font-black border transition-all whitespace-nowrap ${
                  activeFilter === f 
                    ? 'bg-amber-600 border-amber-600 text-black' 
                    : 'bg-transparent border-transparent text-stone-500 hover:text-stone-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. GRID (Corregido el error de etiquetas duplicadas) */}
      <main className="flex-grow">
        <motion.div layout className={styles.itemGrid}>
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleOpenDrawer(item)}
                className={`${styles.itemCard} group`}
                data-universe={item.universe}
              >
                {/* Status Bar */}
                <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-500 group-hover:w-1.5 ${
                  item.metadata.stability === 'CRITICAL' ? 'bg-red-600 shadow-[2px_0_15px_rgba(220,38,38,0.4)]' : 
                  item.metadata.stability === 'DEGRADING' ? 'bg-amber-500' : 'bg-blue-600'
                }`} />

                <div className={styles.cardHeader}>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2 opacity-30 mb-1 group-hover:opacity-60 transition-opacity">
                      <Layers size={12} />
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em]">
                        SEC_{item.metadata.sector}
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-white uppercase leading-none truncate group-hover:text-amber-500 transition-colors">
                      {item.name}
                    </h4>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <Activity size={16} className={item.qty < 20 ? 'text-red-500 animate-pulse' : 'text-stone-600'} />
                    <span className="text-[10px] font-mono mt-1 text-stone-500">{item.metadata.radiation}</span>
                  </div>
                </div>

                <div className="mt-6 mb-4">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-2">
                      <Box size={12} className="text-stone-700" />
                      <span className="text-[9px] font-mono text-stone-600 uppercase font-bold">In_Stock</span>
                    </div>
                    <span className={`text-sm font-mono font-black ${item.qty < 20 ? 'text-red-500' : 'text-white'}`}>
                      {item.qty}%
                    </span>
                  </div>
                  <div className={styles.quantityBarContainer}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.qty}%` }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className={`h-full ${
                        item.qty < 20 ? 'bg-red-600' : 
                        item.universe === 'soma' ? 'bg-cyan-400' :
                        item.universe === 'ac' ? 'bg-orange-600' : 
                        'bg-amber-600'
                      }`}
                    />
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className="flex items-center gap-2">
                     <ShieldAlert size={14} className={item.metadata.stability === 'CRITICAL' ? 'text-red-600' : 'text-stone-800'} />
                     <code className="text-[10px] text-stone-600 font-mono tracking-tighter uppercase">{item.code}</code>
                  </div>
                  <div className="flex items-center gap-1 text-stone-800 group-hover:text-amber-500 transition-all">
                    <span className="text-[9px] font-black font-mono">SCAN</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* 3. FOOTER */}
      <footer className="mt-16 flex flex-col lg:flex-row justify-between items-center gap-8 border-t border-stone-900 pt-8 pb-8">
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Package size={14} className="text-stone-700" />
              <span className="text-[9px] text-stone-700 uppercase font-black">Registry_Count</span>
            </div>
            <span className="text-3xl font-black text-stone-600 font-mono">{filteredItems.length}</span>
          </div>
          <div className="flex flex-col border-l border-stone-800 pl-10">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-red-950" />
              <span className="text-[9px] text-stone-800 uppercase font-black">Bio_Threats</span>
            </div>
            <span className="text-3xl font-black text-red-950 font-mono">
              {INVENTORY_DATA.filter(i => i.metadata.stability === 'CRITICAL').length}
            </span>
          </div>
        </div>
        
        <div className="text-center lg:text-right opacity-40">
          <p className="text-[9px] font-mono text-stone-500 tracking-[0.4em] uppercase mb-1">
            Polis_Central_Terminal
          </p>
          <p className="text-[8px] font-mono text-stone-700 uppercase">
            {new Date().toLocaleTimeString()} // DATA_INTEGRITY_VERIFIED
          </p>
        </div>
      </footer>

      {/* Drawer con props correctas */}
      <Drawer 
        item={selectedItem} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
}