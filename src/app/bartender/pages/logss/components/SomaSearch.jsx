'use client';
import React, { useState, useEffect } from 'react';
import { Search, Loader2, Database, AlertTriangle, Terminal, X } from 'lucide-react';
import styles from '../../../styles/logs-styles/SomaSearch.module.css';

export function SomaSearch({ onSearch, onClose }) {
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Debounce mejorado para simular red lenta de Pathos-II
  useEffect(() => {
    if (!query) {
      onSearch('');
      return;
    }

    setIsScanning(true);
    const delayDebounceFn = setTimeout(() => {
      onSearch(query);
      setIsScanning(false);
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [query, onSearch]);

  return (
    <div className={styles.windowFrame}>
      {/* BARRA DE TÍTULO WIN95 */}
      <div className={styles.titleBar}>
        <div className={styles.titleContent}>
          <div className={styles.iconContainer}>
            <Terminal size={12} className="text-white" />
          </div>
          <span className={styles.titleText}>NETWORK_FILE_FINDER.EXE</span>
        </div>
        <div className={styles.titleControls}>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={10} strokeWidth={4} />
          </button>
        </div>
      </div>
      
      {/* CUERPO DE LA VENTANA */}
      <div className={styles.windowBody}>
        <div className={styles.topInfo}>
          <div className="flex items-center gap-2 text-[#76b5b5]/60">
            <AlertTriangle size={10} className="text-yellow-500" />
            <span className="text-[8px] tracking-[0.2em] font-bold">WAU_INTERFERENCE: MODERATE</span>
          </div>
          <span className="text-[8px] opacity-40 font-mono">NODE_UPSILON_04</span>
        </div>

        <div className={styles.inputSection}>
          <div className={styles.labelRow}>
            <Database size={10} className="text-[#76b5b5]" /> 
            <span className={styles.inputLabel}>QUERY_DATABASE:</span>
          </div>
          
          <div className={styles.inputWrapper}>
            <input 
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="AWAITING_INPUT..."
              className={styles.retroInput}
            />
            <div className={styles.statusIndicator}>
              {isScanning ? (
                <Loader2 size={14} className="animate-spin text-blue-800" />
              ) : (
                <Search size={14} className="text-zinc-500" />
              )}
            </div>
          </div>
        </div>

        {/* BARRA DE ESTADO INFERIOR */}
        <div className={styles.statusBar}>
          <div className={styles.statusField}>
            <span className={isScanning ? styles.scanningText : ''}>
              {isScanning ? 'INDEXING_DATA...' : 'SYSTEM_READY'}
            </span>
          </div>
          <div className={styles.statusField}>
            ENCRYPTION: AES-256
          </div>
        </div>
      </div>
    </div>
  );
}