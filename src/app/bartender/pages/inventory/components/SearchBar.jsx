'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, X, Activity, Globe, 
  ShieldCheck, Filter
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
  const [mounted, setMounted] = useState(false);

  const categories = [
    'ALL', 'MILITARY', 'ENGINEERING', 
    'BIOMEDICAL', 'INTEL', 'COMMERCE', 'LOGISTICS'
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cerrar modal y cambiar categoría
  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
    setIsFilterOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className={`${styles.masterWrapper} ${isMobile ? styles.mobileMaster : ''}`}>
      <div className={`
        ${styles.searchContainer} 
        ${isFocused ? styles.focused : ''} 
        ${isUnlocked ? styles.unlockedBorder : ''}
      `}>
        
        {/* INDICADOR DE SEGURIDAD RED */}
        <div className={styles.connectionStatus}>
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

        {/* INPUT DE BÚSQUEDA */}
        <div className={styles.searchInterface}>
          <div className={styles.inputWrapper}>
            <Search 
              size={18} 
              className={`${styles.searchIcon} ${isFocused ? styles.iconActive : ''}`} 
            />
            <input 
              type="text" 
              placeholder={isMobile ? "BUSCAR..." : "ANALIZANDO_BANCO_DATOS..."} 
              value={searchTerm}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* SELECTOR PDA MÓVIL */}
        {isMobile && (
          <button 
            type="button"
            className={`${styles.mobileFilterToggle} ${activeCategory !== 'ALL' ? styles.filterActive : ''}`}
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter size={16} />
            <span className={styles.catIndicator}>{activeCategory.slice(0, 3)}</span>
          </button>
        )}

        {/* TELEMETRÍA DE BÚSQUEDA (Desktop) */}
        {!isMobile && (
          <div className={styles.metaData}>
            <div className={styles.dataBit}>
              <Activity size={12} className={styles.pulseIcon} />
              <span>SYNC_{searchTerm.length.toString().padStart(2, '0')}</span>
            </div>
          </div>
        )}
      </div>

      {/* BARRA DE FILTROS HORIZONTAL (Desktop) */}
      {!isMobile && (
        <div className={styles.filterBar}>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
            >
              <div className={styles.btnGlow} />
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* MODAL PDA OVERLAY (Móvil) */}
      {isMobile && isFilterOpen && (
        <div className={styles.mobileModalOverlay} onClick={() => setIsFilterOpen(false)}>
          <div className={styles.mobileModalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>[ SECTOR_SELECTOR ]</div>
              <button 
                className={styles.closeBtn} 
                onClick={() => setIsFilterOpen(false)}
              >
                <X size={20} />
              </button>
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
            
            <div className={styles.modalFooter}>
              <span>STATUS: ESPERANDO_SELECCIÓN_SECTOR</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};