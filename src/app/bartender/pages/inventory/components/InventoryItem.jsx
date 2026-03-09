'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Eye, Lock, Unlock, FileText, Radiation, Skull,
  Paperclip, ClipboardList, Droplet, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../../styles/inventory-styles/inventory-item.module.css';

// Constantes fuera del componente para evitar recreaciones
const FOLDER_HUES = ['#e3c18b', '#d4b483', '#c2a679', '#bda06d'];
const DAMAGE_TYPES = ['none', 'burned', 'coffee', 'blood'];
const STAIN_TYPES = ['coffee', 'blood', 'burn', 'grease', 'mold', 'water'];
const STICKY_COLORS = ['#feff9c', '#7afcff', '#ff7eb9', '#b8e994', '#f6d365'];

// Detectar si una nota es pista (para hacerla más grande)
const isHintNote = (content) => {
  if (!content) return false;
  const upper = content.toUpperCase();
  return upper.includes('HINT') || upper.includes('MEMORY_FRAG') || upper.includes('PISTA');
};

// Nivel de desgaste aleatorio para notas (0 = nuevo, 1 = usado, 2 = viejo, 3 = roto)
const getWearLevel = (hash, index) => {
  return ((hash + index * 7) % 4); // 0-3
};

// Generar estilos de desgaste basados en nivel
const getWearStyles = (level) => {
  switch(level) {
    case 0: // nuevo
      return { filter: 'none', clipPath: 'none' };
    case 1: // usado (esquina doblada)
      return { clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)' };
    case 2: // viejo (bordes irregulares)
      return { 
        filter: 'sepia(0.3) brightness(0.95)',
        clipPath: 'polygon(5% 0, 95% 2%, 100% 8%, 98% 92%, 92% 98%, 3% 95%, 0% 90%, 2% 5%)'
      };
    case 3: // roto (agujero)
      return {
        filter: 'sepia(0.5) brightness(0.8)',
        '--hole': 'radial-gradient(circle at 70% 40%, rgba(0,0,0,0.3) 5px, transparent 10px)'
      };
    default: return {};
  }
};

export const InventoryItem = React.memo(({ folderData, isGlobalUnlocked, onOpen }) => {
  const {
    id, title, category, isLocked: initialLocked,
    securityLevel, stickyNote, fileSize, sector,
    lastAccessed, revisionCount, damageType: propDamageType, damageLevel: propDamageLevel
  } = folderData;

  const [isLocked, setIsLocked] = useState(initialLocked);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isGlobalUnlocked) setIsLocked(false);
  }, [isGlobalUnlocked]);

  // Manejadores memoizados
  const handleUnlock = useCallback((e) => {
    e.stopPropagation();
    setIsLocked(false);
  }, []);

  const handleOpen = useCallback(() => {
    onOpen(folderData);
  }, [onOpen, folderData]);

  // --- NÚCLEO DE GENERACIÓN FÍSICA EXPANDIDA ---
  const dna = useMemo(() => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseColor = FOLDER_HUES[hash % FOLDER_HUES.length];
    const damageType = propDamageType || DAMAGE_TYPES[hash % DAMAGE_TYPES.length];
    const damageLevel = propDamageLevel !== undefined ? propDamageLevel : (hash % 4);

    const paperCount = (hash % 6) + 3;
    const sheets = Array.from({ length: paperCount }, (_, i) => ({
      offsetX: (hash % 5) - 2 + i * 0.5,
      offsetY: -i * 1.5,
      rotate: (i % 2 === 0 ? 0.3 : -0.3) * (hash % 3),
      color: i % 3 === 0 ? '#f5e6c4' : i % 3 === 1 ? '#e8d9b5' : '#fcf3e0',
      isDamaged: damageLevel > 1 && i % 2 === 0,
    }));

    // Sticky notes mejoradas con desgaste
    const stickyNotes = [];
    if (stickyNote) {
      const noteCount = (hash % 3) + 1;
      for (let i = 0; i < noteCount; i++) {
        const content = i === 0 ? stickyNote : `Nota ${i+1}: ...`;
        const wearLevel = getWearLevel(hash, i);
        const isHint = isHintNote(content);
        stickyNotes.push({
          content,
          color: STICKY_COLORS[(hash + i) % STICKY_COLORS.length],
          top: `${-8 + (hash % 15) + i * 5}px`,
          left: i % 2 === 0 ? `${10 + (hash % 20)}px` : 'auto',
          right: i % 2 === 1 ? `${5 + (hash % 15)}px` : 'auto',
          rotate: `${(i % 2 === 0 ? 2 : -2) + (hash % 5) - 2}deg`,
          zIndex: 10 + i,
          tapeColor: i % 2 === 0 ? '#ffffff80' : '#cccccc80',
          wearLevel,
          isHint,
          // Si es pista, aumentar tamaño
          scale: isHint ? 1.2 : 1,
        });
      }
    }

    const stains = [];
    const stainCount = damageLevel + 1;
    for (let i = 0; i < stainCount; i++) {
      const type = STAIN_TYPES[(hash + i) % STAIN_TYPES.length];
      stains.push({
        type,
        x: (hash * (i+1)) % 80 + 10,
        y: (hash * (i+3)) % 70 + 15,
        scale: 0.6 + ((hash + i) % 8) / 10,
        opacity: damageLevel > 1 ? 0.7 : 0.4,
        rotation: (hash % 360),
      });
    }

    const clipRusted = damageType === 'blood' || damageType === 'coffee' || damageLevel > 2;
    const hasBurnEdges = damageType === 'burned' && damageLevel > 1;
    const hasHole = damageType === 'burned' && damageLevel === 3;

    return {
      baseColor,
      rotation: (hash % 10) - 5,
      damageType,
      damageLevel,
      sheets,
      stickyNotes,
      stains,
      clipRusted,
      hasBurnEdges,
      hasHole,
      securityIcon: securityLevel?.includes('COSMIC') ? <Skull size={18}/> : <Radiation size={18}/>,
      win95Variant: hash % 3,
    };
  }, [id, securityLevel, stickyNote, propDamageType, propDamageLevel]);

  return (
    <motion.div
      className={styles.dossierWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--folder-rot': `${dna.rotation}deg` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      {/* PESTAÑA SUPERIOR */}
      <div
        className={`${styles.dossierTab} ${dna.win95Variant === 1 ? styles.pixelatedTab : ''}`}
        style={{ backgroundColor: dna.baseColor }}
      >
        <div className={styles.tabContent}>
          <FileText size={12} className={styles.tabIcon} />
          <span className={styles.tabLabel}>DOC_{id.slice(0,8)}</span>
        </div>
      </div>

      {/* CUERPO DE LA CARPETA */}
      <div
        className={`${styles.manilaBody} ${dna.damageType !== 'none' ? styles[`damage-${dna.damageType}`] : ''}`}
        style={{ backgroundColor: dna.baseColor }}
      >
        <div className={styles.folderSpine} />
        <div className={styles.paperClipArea}>
          <Paperclip className={dna.clipRusted ? styles.rustedClip : styles.silverClip} size={24} />
        </div>

        <div className={styles.internalSheetsContainer}>
          {dna.sheets.map((sheet, index) => {
            const isLast = index === dna.sheets.length - 1;
            return (
              <div
                key={index}
                className={`${styles.innerSheet} ${isLast ? styles.topSheet : ''} ${sheet.isDamaged ? styles.damagedSheet : ''}`}
                style={{
                  '--sheet-idx': index,
                  backgroundColor: sheet.color,
                  transform: `translate(${sheet.offsetX}px, ${sheet.offsetY}px) rotate(${sheet.rotate}deg)`,
                  zIndex: index,
                  ...(sheet.isDamaged && { filter: 'sepia(0.3) brightness(0.8)' }),
                }}
              >
                {isLast && (
                  <div className={styles.documentInterface}>
                    {dna.stains.map((stain, idx) => (
                      <div
                        key={idx}
                        className={`${styles.stain} ${styles[`stain-${stain.type}`]}`}
                        style={{
                          left: `${stain.x}%`,
                          top: `${stain.y}%`,
                          transform: `scale(${stain.scale}) rotate(${stain.rotation}deg)`,
                          opacity: stain.opacity,
                        }}
                      />
                    ))}

                    <header className={styles.docHeader}>
                      <div className={styles.win95TitleBar}>
                        <div className={styles.win95Icons}>
                          <div className={styles.winSquare} />
                          <div className={styles.winSquare} />
                        </div>
                        <span className={styles.headerTitle}>DOSSIER_VIEWER.EXE</span>
                      </div>
                      <div className={styles.stampContainer}>
                        <div className={styles.officialStamp}>
                          <span className={styles.stampMain}>{securityLevel}</span>
                          <span className={styles.stampSub}>D6_SECURITY_FORCE</span>
                          {dna.securityIcon}
                        </div>
                      </div>
                    </header>

                    <section className={styles.docBody}>
                      <div className={styles.metaGrid}>
                        <div className={styles.metaItem}><strong>REF:</strong> {id.toUpperCase()}</div>
                        <div className={styles.metaItem}><strong>SCT:</strong> {sector || 'REDACTED'}</div>
                        <div className={styles.metaItem}><strong>SZ:</strong> {fileSize || '3.4KB'}</div>
                        <div className={styles.metaItem}><strong>REV:</strong> {revisionCount || '01'}</div>
                      </div>
                      <div className={styles.contentArea}>
                        <h2 className={styles.fileSubject}>
                          {isLocked ? "█ █ █ █ █ █ █ █ █ █" : title.replace(/_/g, ' ')}
                        </h2>
                        <div className={styles.skeletonParagraph}>
                          <div className={styles.skeletonLine} style={{ width: '100%' }} />
                          <div className={styles.skeletonLine} style={{ width: '95%' }} />
                          <div className={styles.skeletonLine} style={{ width: '40%' }} />
                        </div>
                        <div className={styles.watermarkContainer}>
                          {isLocked ? <Lock size={60} opacity={0.05} /> : <ClipboardList size={60} opacity={0.05} />}
                        </div>
                      </div>
                    </section>

                    <footer className={styles.docFooter}>
                      <div className={styles.footerBorder} />
                      <div className={styles.actionSection}>
                        {isLocked ? (
                          <button className={styles.retroButton} onClick={handleUnlock}>
                            <Unlock size={14} />
                            <span>DECRYPT_FILE</span>
                          </button>
                        ) : (
                          <button className={`${styles.retroButton} ${styles.primaryBtn}`} onClick={handleOpen}>
                            <Eye size={14} />
                            <span>OPEN_ARCHIVE</span>
                          </button>
                        )}
                        <div className={styles.lastUpdated}>
                          LAST_ACCESS: {lastAccessed || '2033-05-12'}
                        </div>
                      </div>
                    </footer>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* STICKY NOTES MEJORADAS */}
        <AnimatePresence>
          {dna.stickyNotes.map((note, idx) => {
            const wearStyles = getWearStyles(note.wearLevel);
            return (
              <motion.div
                key={idx}
                className={`
                  ${styles.stickyNoteContainer} 
                  ${note.wearLevel === 3 ? styles.tornNote : ''}
                  ${note.isHint ? styles.hintNote : ''}
                `}
                initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: note.scale, 
                  rotate: note.rotate,
                  ...wearStyles 
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ scale: note.scale * 1.05, rotate: '0deg', transition: { duration: 0.1 } }}
                style={{
                  top: note.top,
                  left: note.left,
                  right: note.right,
                  backgroundColor: note.color,
                  zIndex: note.zIndex,
                  transformOrigin: 'top left',
                  ...(note.wearLevel === 3 && { backgroundImage: 'var(--hole)' }),
                }}
              >
                <div className={styles.adhesiveTape} style={{ background: note.tapeColor }} />
                <div className={styles.stickyContent}>
                  <pre className={styles.handwrittenNote}>{note.content}</pre>
                </div>
                <div className={styles.stickyShadow} />
                {note.wearLevel > 1 && <div className={styles.wearOverlay} />}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {dna.hasBurnEdges && <div className={styles.burnEdges} />}
        {dna.hasHole && <div className={styles.burnHole} />}
        <div className={styles.textureOverlay} />
        {dna.damageLevel === 3 && dna.damageType === 'blood' && <div className={styles.bloodSplatter} />}
        {dna.damageLevel === 3 && dna.damageType === 'coffee' && <div className={styles.coffeeRing} />}
      </div>
    </motion.div>
  );
});

InventoryItem.displayName = 'InventoryItem';