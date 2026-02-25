'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { ShieldAlert, AlertTriangle, Layers, Zap } from 'lucide-react';
import { InventoryItem } from './InventoryItem';
import styles from '../../../styles/inventory-styles/FileGrid.module.css';

export const FileGrid = ({ items, isUnlocked, onSelectItem }) => {
  const [isMounting, setIsMounting] = useState(false);

  useEffect(() => {
    setIsMounting(true);
    return () => setIsMounting(false);
  }, [items]);

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const category = item.category || 'UNCATEGORIZED';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [items]);

  const categories = Object.keys(groupedItems);

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.warningBox}>
          <AlertTriangle size={48} className={styles.warningIcon} />
          <div className={styles.emptyText}>
            <h3>[ ERROR: ARCHIVE_EMPTY ]</h3>
            <p>NO SE DETECTAN REGISTROS ACTIVOS EN ESTE SECTOR.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.gridContainer} ${isMounting ? styles.animateIn : ''}`}>
      {categories.map((cat) => (
        <section key={cat} className={styles.sectorSection}>
          <div className={styles.sectorHeader}>
            <div className={styles.sectorInfo}>
              <Layers size={16} className={styles.sectorIcon} />
              <h2 className={styles.sectorTitle}>SECTOR_{cat}</h2>
              <div className={styles.nodeBadge}>
                <Zap size={10} />
                <span>{groupedItems[cat].length} NODES</span>
              </div>
            </div>
            <div className={styles.sectorLine} />
          </div>

          {/* Contenedor estricto para evitar desbordamiento horizontal */}
          <div className={styles.gridWrapper}>
            <div className={styles.autoGrid}>
              {groupedItems[cat].map((folder, index) => {
                const isLocked = folder.isLocked && !isUnlocked;
                
                return (
                  <div 
                    key={folder.id} 
                    className={`${styles.folderEntry} ${isLocked ? styles.lockedEntry : styles.accessibleEntry}`}
                    onClick={() => !isLocked && onSelectItem(folder)}
                    style={{ '--delay': `${index * 0.04}s` }}
                  >
                    <div className={styles.entryMeta}>
                      <span className={styles.slotId}>#{folder.id.slice(0, 6)}</span>
                      <div className={styles.statusIndicator} />
                    </div>

                    <div className={styles.contentWrapper}>
                      <InventoryItem folderData={folder} />
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};