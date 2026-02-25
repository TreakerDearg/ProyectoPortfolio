'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Layers, Zap, RotateCw } from 'lucide-react';
import { InventoryItem } from './InventoryItem';
import styles from '../../../styles/inventory-styles/FileGrid.module.css';

export const FileGrid = ({ items, isUnlocked, onSelectItem, onResetSearch }) => {
  const [isMounting, setIsMounting] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setIsMounting(true);
    const timer = setTimeout(() => setIsMounting(false), 500);
    return () => clearTimeout(timer);
  }, [items]);

  // Agrupar items por categoría y ordenar categorías alfabéticamente
  const groupedItems = useMemo(() => {
    const groups = items.reduce((acc, item) => {
      const category = item.category || 'UNCATEGORIZED';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
    
    return Object.keys(groups)
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc, key) => {
        acc[key] = groups[key];
        return acc;
      }, {});
  }, [items]);

  const categories = Object.keys(groupedItems);

  const handleSelect = (folder) => {
    if (folder.isLocked && !isUnlocked) return;
    setSelectedId(folder.id);
    onSelectItem(folder);
  };

  // Variantes de animación para los sectores
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' }
    })
  };

  if (items.length === 0) {
    return (
      <motion.div 
        className={styles.emptyContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={styles.warningBox}>
          <AlertTriangle size={48} className={styles.warningIcon} />
          <div className={styles.emptyText}>
            <h3>[ ERROR: ARCHIVE_EMPTY ]</h3>
            <p>NO SE DETECTAN REGISTROS ACTIVOS EN ESTE SECTOR.</p>
            {onResetSearch && (
              <button 
                className={styles.resetButton}
                onClick={onResetSearch}
                aria-label="Reset search"
              >
                <RotateCw size={16} /> CLEAR FILTERS
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`${styles.gridContainer} ${isMounting ? styles.animateIn : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="popLayout">
        {categories.map((cat, idx) => (
          <motion.section
            key={cat}
            className={styles.sectorSection}
            custom={idx}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            <div className={styles.sectorHeader}>
              <div className={styles.sectorInfo}>
                <Layers size={16} className={styles.sectorIcon} />
                <h2 className={styles.sectorTitle}>SECTOR_{cat}</h2>
                <div className={styles.nodeBadge}>
                  <Zap size={10} />
                  <span>{groupedItems[cat].length} NODE{groupedItems[cat].length !== 1 ? 'S' : ''}</span>
                </div>
              </div>
              <div className={styles.sectorLine} />
            </div>

            <div className={styles.gridWrapper}>
              <div className={styles.autoGrid} role="grid" aria-label={`Archivos en sector ${cat}`}>
                {groupedItems[cat].map((folder, index) => {
                  const isLocked = folder.isLocked && !isUnlocked;
                  
                  return (
                    <motion.div
                      key={folder.id}
                      className={`${styles.folderEntry} ${isLocked ? styles.lockedEntry : styles.accessibleEntry}`}
                      onClick={() => handleSelect(folder)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                      whileHover={!isLocked ? { y: -5, transition: { duration: 0.2 } } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                      role="gridcell"
                      aria-label={`${folder.title}, ${isLocked ? 'bloqueado' : 'accesible'}`}
                    >
                      <div className={styles.entryMeta}>
                        <span className={styles.slotId}>#{folder.id.slice(0, 6)}</span>
                        <div className={styles.statusIndicator} />
                      </div>

                      <div className={styles.contentWrapper}>
                        <InventoryItem 
                          folderData={folder} 
                          isGlobalUnlocked={isUnlocked} 
                          onOpen={() => handleSelect(folder)}
                        />
                      </div>
                      
                      {isLocked && (
                        <div className={styles.lockShield}>
                          <ShieldAlert size={28} className={styles.lockIcon} />
                          <div className={styles.lockLabel}>
                            <span className={styles.lockText}>ENCRYPTED</span>
                          </div>
                        </div>
                      )}

                      {!isLocked && <div className={styles.entryScanline} />}
                      <div className={styles.frameCorners} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};