"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Cpu, Loader2, ChevronRight, Hash, Activity } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import styles from '../styles/Styles-C/nodeSearch.module.css';

export const NodeSearch = React.memo(() => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const { nodes, setSelectedNode, setIsAnalyzing } = useAnalysis();
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  // Atajo de teclado global: CMD/CTRL + F para buscar
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Filtrado de resultados (Memoizado para rendimiento)
  const results = useMemo(() => {
    const term = query.trim().toUpperCase();
    if (!term) return [];
    
    return nodes.filter(n => 
      n.name.toUpperCase().includes(term) || 
      n.id.toString().includes(term) ||
      (n.type && n.type.toUpperCase().includes(term))
    ).slice(0, 8); // Limitamos a 8 resultados para mantener el HUD limpio
  }, [query, nodes]);

  // Manejo de visibilidad del panel
  useEffect(() => {
    setIsOpen(results.length > 0 && query.length > 0);
    setActiveIndex(-1);
  }, [results, query]);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setQuery("");
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectNode = useCallback((node) => {
    if (!node) return;
    
    setIsAnalyzing(true);
    setSelectedNode(node);
    
    // Feedback visual de "Sincronización"
    setQuery("");
    inputRef.current?.blur();
    
    // Simulamos tiempo de carga de telemetría del nodo
    setTimeout(() => setIsAnalyzing(false), 800);
  }, [setSelectedNode, setIsAnalyzing]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) handleSelectNode(results[activeIndex]);
      else if (results.length > 0) handleSelectNode(results[0]);
    } else if (e.key === 'Escape') {
      setQuery("");
      inputRef.current?.blur();
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={`${styles.inputContainer} ${query ? styles.hasInput : ''}`}>
        <div className={styles.glowEffect} />
        
        <div className={styles.iconBox}>
          {isSearching ? (
            <Loader2 size={14} className={styles.spinner} />
          ) : (
            <Search size={14} className={styles.searchIcon} />
          )}
        </div>

<input
  ref={inputRef}
  type="text"
  value={query}
  onChange={(e) => {
    e.stopPropagation(); // Evita que el evento suba al canvas
    setQuery(e.target.value);
  }}
  onKeyDown={handleKeyDown}
  onFocus={() => {
    if (query.length > 0) setIsOpen(true);
  }}
  placeholder="SEARCH_NETWORK_ID..."
  className={styles.cliInput}
  spellCheck="false"
  autoComplete="off"
/>

        <div className={styles.commandHint}>
          <Command size={10} />
          <span>F</span>
        </div>

        {/* Línea de escaneo animada interna */}
        <div className={styles.innerScanline} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 5, skewX: -2 }}
            animate={{ opacity: 1, y: 0, skewX: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={styles.resultsPanel}
          >
            <div className={styles.resultsHeader}>
              <div className="flex items-center gap-2">
                <Activity size={10} className="text-amber-500 animate-pulse" />
                <span className={styles.headerText}>FOUND: {results.length} CORES</span>
              </div>
              <div className={styles.decorDots} />
            </div>

            <div className={styles.resultsList}>
              {results.map((node, index) => (
                <div
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`${styles.resultItem} ${index === activeIndex ? styles.activeResult : ''}`}
                  style={{ '--node-color': node.color || '#38bdf8' }}
                >
                  <div className={styles.itemIndicator} />
                  
                  <div className={styles.nodeTypeIcon}>
                    <Cpu size={12} />
                  </div>

                  <div className={styles.itemData}>
                    <div className={styles.itemName}>
                      {node.name}
                      {index === activeIndex && <span className={styles.cursor}>_</span>}
                    </div>
                    <div className={styles.itemMeta}>
                      <Hash size={8} />
                      <span>0x{node.id.toString(16).toUpperCase()}</span>
                      <span className={styles.separator}>|</span>
                      <span className={styles.statusLabel}>UPLINK_READY</span>
                    </div>
                  </div>

                  <ChevronRight size={14} className={styles.arrow} />
                </div>
              ))}
            </div>

            <div className={styles.resultsFooter}>
              <span>ESC to abort</span>
              <span className={styles.footerBrand}>ARASAKA_NET_QUERY</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

NodeSearch.displayName = 'NodeSearch';