'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, AlertTriangle, ChevronRight, Filter, Database, Search, ShieldAlert, Radio } from 'lucide-react';

import styles from '../styles/inventory.module.css';
import { Drawer } from '../components/Drawer';
import { INVENTORY_DATA } from '../data/inventory';

export default function BartenderPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Estados de filtrado
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL"); // ALL, STABLE, DEGRADING, CRITICAL

  // Lógica de filtrado dinámico
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
      {/* 1. Header de Sección con Controles de Búsqueda */}
      <div className={styles.manifestHeader}>
        <div className={styles.titleGroup}>
          <div className="flex items-center gap-2 mb-1">
            <Radio size={10} className="text-amber-500 animate-pulse" />
            <p className="text-[9px] text-stone-500 font-mono tracking-widest uppercase">
              Network: D6_Sub_Link // Active_Terminal: {activeFilter}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Supply_Manifest</h2>
          </div>
        </div>
        
        {/* Barra de Búsqueda Estilizada */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-amber-500 transition-colors" size={14} />
            <input 
              type="text"
              placeholder="SEARCH_BY_NAME_OR_SECTOR..."
              className="bg-black border border-stone-800 py-3 pl-10 pr-4 text-[10px] font-mono text-amber-500 w-64 focus:outline-none focus:border-amber-500/50 transition-all uppercase"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {["ALL", "STABLE", "DEGRADING", "CRITICAL"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 text-[9px] font-black border transition-all ${
                  activeFilter === f 
                    ? 'bg-amber-600 border-amber-600 text-black' 
                    : 'bg-stone-900/50 border-stone-800 text-stone-500 hover:border-stone-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Grid de Inventario con Animación de entrada */}
      <motion.div layout className={styles.itemGrid}>
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5, borderColor: '#d97706' }}
              className={`${styles.itemCard} relative overflow-hidden`}
              onClick={() => handleOpenDrawer(item)}
            >
              {/* Overlay de Estabilidad para la Card */}
              <div className={`absolute top-0 left-0 w-1 h-full ${
                item.metadata.stability === 'CRITICAL' ? 'bg-red-600 animate-pulse' : 
                item.metadata.stability === 'DEGRADING' ? 'bg-amber-500' : 'bg-green-600'
              }`} />

              <div className={styles.cardHeader}>
                <div>
                  <span className="text-[8px] text-stone-500 font-mono block uppercase">
                    Sector: {item.metadata.sector}
                  </span>
                  <h4 className="text-xl font-black text-white uppercase leading-tight truncate w-48">
                    {item.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-amber-500/40 block">RAD_LVL</span>
                  <span className="text-[10px] font-mono text-stone-400">{item.metadata.radiation}</span>
                </div>
              </div>

              {/* Barra de Stock Visual */}
              <div className="my-6">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[8px] font-mono text-stone-600 uppercase">Current_Inventory</span>
                  <span className={`text-xs font-mono font-black ${item.qty < 20 ? 'text-red-500' : 'text-stone-300'}`}>
                    {item.qty}%
                  </span>
                </div>
                <div className="h-1 w-full bg-stone-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.qty}%` }}
                    className={`h-full ${item.qty < 20 ? 'bg-red-600' : 'bg-amber-600'}`}
                  />
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${item.qty < 20 ? 'bg-red-500' : 'bg-green-900'}`} />
                   <span className="text-[10px] font-mono text-stone-500 italic">{item.code}</span>
                </div>
                <ChevronRight size={14} className="text-stone-700" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 3. Footer Informativo */}
      <div className="mt-12 flex justify-between items-center border-t border-stone-900 pt-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[8px] text-stone-700 uppercase">Total_Items_Loaded</span>
            <span className="text-xl font-black text-stone-500 font-mono">{filteredItems.length}</span>
          </div>
          <div className="flex flex-col border-l border-stone-900 pl-6">
            <span className="text-[8px] text-stone-700 uppercase">Critical_Alerts</span>
            <span className="text-xl font-black text-red-900 font-mono">
              {INVENTORY_DATA.filter(i => i.metadata.stability === 'CRITICAL').length}
            </span>
          </div>
        </div>
        <p className="text-[9px] font-mono text-stone-800 tracking-[1em] uppercase">
          Authorization_Required // Polis_Central_Station
        </p>
      </div>

      <Drawer 
        item={selectedItem} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
}