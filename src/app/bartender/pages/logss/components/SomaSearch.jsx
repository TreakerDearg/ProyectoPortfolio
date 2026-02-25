'use client';
import React, { useState, useEffect } from 'react';
import { Search, Loader2, Database, AlertTriangle, Terminal, X, HardDrive } from 'lucide-react';
import styles from '../../../styles/logs-styles/SomaSearch.module.css';

export function SomaSearch({ onSearch, onClose }) {
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  // Debounce mejorado para simular red lenta de Pathos-II
  useEffect(() => {
    if (!query) {
      onSearch('');
      setProgress(0);
      return;
    }

    setIsScanning(true);
    let progressInterval;
    if (query) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev; // se queda en 90 hasta que termine
          return prev + 10;
        });
      }, 150);
    }

    const delayDebounceFn = setTimeout(() => {
      onSearch(query);
      setIsScanning(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 500); // resetea después
    }, 800);

    return () => {
      clearTimeout(delayDebounceFn);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [query, onSearch]);

  return (
    <div className={styles.windowFrame}>
      {/* BARRA DE TÍTULO WIN95 */}
      <div className={styles.titleBar}>
        <div className={styles.titleContent}>
          <div className={styles.iconContainer}>
            <Terminal size={12} />
          </div>
          <span className={styles.titleText}>NETWORK_FILE_FINDER.EXE</span>
        </div>
        <div className={styles.titleControls}>
          <button onClick={onClose} className={styles.closeBtn} title="Cerrar">
            <X size={10} strokeWidth={4} />
          </button>
        </div>
      </div>
      
      {/* CUERPO DE LA VENTANA */}
      <div className={styles.windowBody}>
        <div className={styles.topInfo}>
          <div className={styles.warningIndicator}>
            <AlertTriangle size={10} />
            <span>WAU_INTERFERENCE: MODERATE</span>
          </div>
          <span className={styles.nodeInfo}>NODE_UPSILON_04</span>
        </div>

        <div className={styles.inputSection}>
          <div className={styles.labelRow}>
            <Database size={10} />
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
                <Loader2 size={14} className={styles.spinner} />
              ) : (
                <Search size={14} className={styles.searchIcon} />
              )}
            </div>
          </div>

          {/* Barra de progreso estilo retro (opcional) */}
          {isScanning && (
            <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${progress}%` }}
              />
              <span className={styles.progressText}>{progress}%</span>
            </div>
          )}
        </div>

        {/* BARRA DE ESTADO INFERIOR */}
        <div className={styles.statusBar}>
          <div className={styles.statusField}>
            <HardDrive size={8} />
            <span className={isScanning ? styles.scanningText : ''}>
              {isScanning ? 'INDEXING_DATA...' : 'SYSTEM_READY'}
            </span>
          </div>
          <div className={styles.statusField}>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </div>
      </div>
    </div>
  );
}