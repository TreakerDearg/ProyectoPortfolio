"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Cpu } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import styles from '@/app/analyst/styles/Styles-C/nodeSearch.module.css';

export const NodeSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  // Extraemos los nodos y las funciones directamente del contexto
  const { nodes, setSelectedNode, setIsAnalyzing } = useAnalysis();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    const val = e.target.value.toUpperCase();
    setQuery(val);
    
    // Solo buscamos si hay más de un caracter
    if (val.length > 0) {
      const matches = nodes.filter(n => 
        n.name.toUpperCase().includes(val) || 
        n.id.toString().includes(val)
      );
      setResults(matches);
    } else {
      setResults([]);
    }
  };

  const onSelectNode = (node) => {
    setIsAnalyzing(true);
    
    // Seleccionamos el nodo (esto activará el brillo en el canvas)
    setSelectedNode(node);
    
    // Limpiamos la búsqueda
    setQuery("");
    setResults([]);
    
    // Feedback visual de "Syncing"
    setTimeout(() => {
      setIsAnalyzing(false);
      // Opcional: Podrías añadir lógica aquí para hacer scroll hasta el nodo
    }, 1000);
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputContainer}>
        <div className={styles.glowEffect} />
        
        <div className={styles.iconBox}>
          <Search size={14} className={styles.searchIcon} />
        </div>

        <input 
          ref={inputRef}
          type="text" 
          value={query}
          onChange={handleSearch}
          placeholder="QUERY_SYSTEM_NODE..."
          className={styles.cliInput}
        />
        
        <div className={styles.commandHint}>
          <Command size={10} />
          <span>F</span>
        </div>

        {/* Decoración de escaneo activo: Solo brilla si hay query */}
        <div className={`${styles.scanLine} ${query ? styles.activeScan : ''}`} />
      </div>

      {/* RESULTADOS TÁCTICOS */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.resultsPanel}
          >
            <div className={styles.resultsHeader}>
              <span className={styles.headerText}>MATCHING_CORES_FOUND: {results.length}</span>
              <div className={styles.headerLine} />
            </div>

            <div className={styles.scrollArea}>
              {results.map((node) => (
                <motion.div 
                  whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  key={node.id} 
                  onClick={() => onSelectNode(node)}
                  className={styles.resultItem}
                  style={{ '--accent': node.color }}
                >
                  <div className={styles.resultIndicator} style={{ backgroundColor: node.color }} />
                  <Cpu size={14} className={styles.nodeIcon} style={{ color: node.color }} />
                  
                  <div className={styles.resultInfo}>
                    <span className={styles.resultName}>{node.name}</span>
                    <span className={styles.resultMeta}>
                      <span className={styles.metaLabel}>ID:</span> 0x{node.id}  
                      <span className={styles.metaStatus}> ONLINE</span>
                    </span>
                  </div>
                  
                  <div className={styles.jumpArrow}>›</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};