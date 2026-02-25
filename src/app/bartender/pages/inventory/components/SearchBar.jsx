'use client';
import React, { useState } from 'react';
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
  const categories = ['ALL', 'MILITARY', 'ENGINEERING', 'BIOMEDICAL', 'INTEL', 'COMMERCE', 'LOGISTICS'];

  // Función para cerrar modal y cambiar categoría
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

        {/* CENTRO: Entrada de Datos */}
        <div className={styles.searchInterface}>
          <div className={styles.inputWrapper}>
            <Search 
              size={18} 
              className={`${styles.searchIcon} ${isFocused ? styles.iconActive : ''}`} 
            />
            <input 
              type="text" 
              placeholder={isMobile ? "SEARCH..." : "ANALYZING_DATABANK..."} 
              value={searchTerm}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* BOTÓN FILTRO (Solo Móvil) */}
        {isMobile && (
          <button 
            className={`${styles.mobileFilterToggle} ${activeCategory !== 'ALL' ? styles.filterActive : ''}`}
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter size={16} />
            <span className={styles.catIndicator}>{activeCategory.slice(0, 3)}</span>
          </button>
        )}

        {/* METADATA (Solo Desktop) */}
        {!isMobile && (
          <div className={styles.metaData}>
            <div className={styles.dataBit}>
              <Activity size={12} className={styles.pulseIcon} />
              <span>SYNC_{searchTerm.length.toString().padStart(2, '0')}</span>
            </div>
          </div>
        )}
      </div>

      {/* FILTROS DESKTOP (Horizontal) */}
      {!isMobile && (
        <div className={styles.filterBar}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* MODAL DE FILTRADO MÓVIL (PDA Overlay) */}
      {isMobile && isFilterOpen && (
        <div className={styles.mobileModalOverlay} onClick={() => setIsFilterOpen(false)}>
          <div className={styles.mobileModalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>[ SECTOR_SELECTOR ]</div>
              <button onClick={() => setIsFilterOpen(false)}><X size={20} /></button>
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