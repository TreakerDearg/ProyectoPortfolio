'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, X, Activity, Database, 
  Globe, ShieldCheck, Filter, ChevronDown
} from 'lucide-react';
import styles from '../../../styles/inventory-styles/SearchBar.module.css';

export const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  isUnlocked, 
  activeCategory, 
  setActiveCategory, 
  isMobile 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  
  const categories = ['ALL', 'MILITARY', 'ENGINEERING', 'BIOMEDICAL', 'INTEL', 'COMMERCE', 'LOGISTICS'];

  // Cerrar modal con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFilterOpen) {
        setIsFilterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFilterOpen]);

  // Limpiar input
  const handleClear = () => {
    setSearchTerm('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
    setIsFilterOpen(false);
  };

  return (
    <div className={`${styles.masterWrapper} ${isMobile ? styles.mobileMaster : ''}`}>
      <div className={`
        ${styles.searchContainer} 
        ${isFocused ? styles.focused : ''} 
        ${isUnlocked ? styles.unlockedBorder : ''}
      `}>
        
        {/* LADO IZQUIERDO: Estado de Conexión */}
        <div className={styles.connectionStatus} aria-label="Connection status">
          {isUnlocked ? (
            <Globe size={isMobile ? 14 : 16} className={styles.globeIcon} />
          ) : (
            <ShieldCheck size={isMobile ? 14 : 16} className={styles.shieldIcon} />
          )}
          {!isMobile && (
            <span className={isUnlocked ? styles.onlineText : styles.offlineText}>
              {isUnlocked ? 'D6_NET_LINKED' : 'SECURED_LOCAL'}
            </span>
          )}
        </div>

        {/* CENTRO: Entrada de Datos */}
        <div className={styles.searchInterface}>
          <div className={styles.inputWrapper}>
            <Search 
              size={18} 
              className={`${styles.searchIcon} ${isFocused ? styles.iconActive : ''}`} 
              aria-hidden="true"
            />
            <input 
              ref={inputRef}
              type="text" 
              placeholder={isMobile ? "SEARCH..." : "ANALYZING_DATABANK..."} 
              value={searchTerm}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
              className={styles.searchInput}
              aria-label="Search query"
            />
            {searchTerm && (
              <button 
                className={styles.clearButton} 
                onClick={handleClear}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* BOTÓN FILTRO (Solo Móvil) */}
        {isMobile && (
          <button 
            className={`${styles.mobileFilterToggle} ${activeCategory !== 'ALL' ? styles.filterActive : ''}`}
            onClick={() => setIsFilterOpen(true)}
            aria-label="Open filter menu"
            aria-expanded={isFilterOpen}
          >
            <Filter size={16} />
            <span className={styles.catIndicator}>{activeCategory.slice(0, 3)}</span>
          </button>
        )}

        {/* METADATA (Solo Desktop) */}
        {!isMobile && (
          <div className={styles.metaData} aria-label="Search metadata">
            <div className={styles.dataBit}>
              <Activity size={12} className={styles.pulseIcon} />
              <span>SYNC_{searchTerm.length.toString().padStart(2, '0')}</span>
            </div>
          </div>
        )}
      </div>

      {/* FILTROS DESKTOP (Horizontal) */}
      {!isMobile && (
        <div className={styles.filterBar} role="tablist" aria-label="Categories">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* MODAL DE FILTRADO MÓVIL (PDA Overlay) */}
      {isMobile && isFilterOpen && (
        <div 
          className={styles.mobileModalOverlay} 
          onClick={() => setIsFilterOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Category selector"
        >
          <div 
            className={styles.mobileModalContent} 
            onClick={e => e.stopPropagation()}
            ref={modalRef}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>[ SECTOR_SELECTOR ]</div>
              <button onClick={() => setIsFilterOpen(false)} aria-label="Close"><X size={20} /></button>
            </div>
            <div className={styles.modalGrid}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`${styles.modalOption} ${activeCategory === cat ? styles.optionActive : ''}`}
                >
                  <div className={styles.optionDot} />
                  {cat}
                </button>
              ))}
            </div>
            <div className={styles.modalFooter}>SELECT_TARGET_SECTOR_TO_SCAN</div>
          </div>
        </div>
      )}
    </div>
  );
};