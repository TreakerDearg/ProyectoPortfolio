'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  Eye, Lock, Unlock, FileText, Radiation, Skull,
  Search, AlertTriangle, Paperclip, ClipboardList, Droplet, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../../styles/inventory-styles/inventory-item.module.css';

/**
 * InventoryItem - Versión mejorada: carpeta Manila/Win95 con daños procedimentales
 * y múltiples sticky notes. Inspirado en la saga Metro.
 */
export const InventoryItem = ({ folderData, isGlobalUnlocked, onOpen }) => {
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

  // --- NÚCLEO DE GENERACIÓN FÍSICA EXPANDIDA ---
  const dna = useMemo(() => {
    // Hash numérico a partir del ID (consistente)
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // 1. Configuración base de la carpeta
    const folderHues = [
      '#e3c18b', // Manila clásico
      '#d4b483', // Manila envejecido
      '#c2a679', // Manila húmedo
      '#bda06d'  // Manila sucio
    ];
    const baseColor = folderHues[hash % folderHues.length];

    // 2. Tipo y nivel de daño (puede venir de folderData o generarse)
    const damageTypes = ['none', 'burned', 'coffee', 'blood'];
    const damageType = propDamageType || damageTypes[hash % damageTypes.length];
    const damageLevel = propDamageLevel !== undefined ? propDamageLevel : (hash % 4); // 0-3

    // 3. Hojas internas: cantidad y visibilidad
    const paperCount = (hash % 6) + 3; // entre 3 y 8 hojas
    // Algunas hojas sobresalen ligeramente para simular volumen
    const sheetsProtrusion = Array.from({ length: paperCount }, (_, i) => ({
      offsetX: (hash % 5) - 2 + i * 0.5,
      offsetY: -i * 1.5,
      rotate: (i % 2 === 0 ? 0.3 : -0.3) * (hash % 3),
      // Algunas hojas tienen color amarillento (simulando papel viejo)
      color: i % 3 === 0 ? '#f5e6c4' : i % 3 === 1 ? '#e8d9b5' : '#fcf3e0',
      isDamaged: damageLevel > 1 && i % 2 === 0, // algunas hojas también dañadas
    }));

    // 4. Sticky notes (ahora pueden ser múltiples)
    const stickyNotes = [];
    if (stickyNote) {
      // Si hay stickyNote, creamos al menos una; si el hash lo permite, añadimos más
      const noteCount = (hash % 3) + 1; // 1 a 3 notas
      const colors = ['#feff9c', '#7afcff', '#ff7eb9', '#b8e994', '#f6d365'];
      for (let i = 0; i < noteCount; i++) {
        stickyNotes.push({
          content: i === 0 ? stickyNote : `Nota ${i+1}: ...`, // placeholder
          color: colors[(hash + i) % colors.length],
          top: `${-8 + (hash % 15) + i * 5}px`,
          left: i % 2 === 0 ? `${10 + (hash % 20)}px` : 'auto',
          right: i % 2 === 1 ? `${5 + (hash % 15)}px` : 'auto',
          rotate: `${(i % 2 === 0 ? 2 : -2) + (hash % 5) - 2}deg`,
          zIndex: 10 + i,
          tapeColor: i % 2 === 0 ? '#ffffff80' : '#cccccc80',
        });
      }
    }

    // 5. Manchas procedimentales (más variedad)
    const stains = [];
    const stainTypes = ['coffee', 'blood', 'burn', 'grease', 'mold', 'water'];
    const stainCount = damageLevel + 1; // mínimo 1, máximo 4
    for (let i = 0; i < stainCount; i++) {
      const type = stainTypes[(hash + i) % stainTypes.length];
      stains.push({
        type,
        x: (hash * (i+1)) % 80 + 10, // 10-90%
        y: (hash * (i+3)) % 70 + 15,  // 15-85%
        scale: 0.6 + ((hash + i) % 8) / 10,
        opacity: damageLevel > 1 ? 0.7 : 0.4,
        rotation: (hash % 360),
      });
    }

    // 6. Configuración del clip metálico
    const clipRusted = damageType === 'blood' || damageType === 'coffee' || damageLevel > 2;

    // 7. Elementos de daño extremo (bordes quemados, agujeros)
    const hasBurnEdges = damageType === 'burned' && damageLevel > 1;
    const hasHole = damageType === 'burned' && damageLevel === 3;

    return {
      baseColor,
      rotation: (hash % 10) - 5,
      damageType,
      damageLevel,
      sheets: sheetsProtrusion,
      stickyNotes,
      stains,
      clipRusted,
      hasBurnEdges,
      hasHole,
      securityIcon: securityLevel.includes('COSMIC') ? <Skull size={18}/> : <Radiation size={18}/>,
      win95Variant: hash % 3, // 0: clásico, 1: pixelado, 2: moderno retro
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
      {/* PESTAÑA SUPERIOR (archivador Win95) */}
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
        {/* LOMO REFORZADO */}
        <div className={styles.folderSpine} />

        {/* CLIP METÁLICO (puede estar oxidado) */}
        <div className={styles.paperClipArea}>
          <Paperclip className={dna.clipRusted ? styles.rustedClip : styles.silverClip} size={24} />
        </div>

        {/* CONTENEDOR DE HOJAS INTERNAS (con volumen) */}
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
                  // Si la hoja está dañada, puede tener bordes quemados
                  ...(sheet.isDamaged && { filter: 'sepia(0.3) brightness(0.8)' }),
                }}
              >
                {/* Solo la hoja superior muestra el contenido del dossier */}
                {isLast && (
                  <div className={styles.documentInterface}>
                    {/* MANCHAS PROCEDIMENTALES (se superponen en toda la carpeta) */}
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

                    {/* CABECERA WIN95 */}
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

                    {/* CUERPO DEL DOCUMENTO */}
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

                        {/* Marca de agua central */}
                        <div className={styles.watermarkContainer}>
                          {isLocked ? <Lock size={60} opacity={0.05} /> : <ClipboardList size={60} opacity={0.05} />}
                        </div>
                      </div>
                    </section>

                    {/* PIE CON ACCIONES */}
                    <footer className={styles.docFooter}>
                      <div className={styles.footerBorder} />
                      <div className={styles.actionSection}>
                        {isLocked ? (
                          <button
                            className={styles.retroButton}
                            onClick={(e) => { e.stopPropagation(); setIsLocked(false); }}
                          >
                            <Unlock size={14} />
                            <span>DECRYPT_FILE</span>
                          </button>
                        ) : (
                          <button
                            className={`${styles.retroButton} ${styles.primaryBtn}`}
                            onClick={() => onOpen(folderData)}
                          >
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

        {/* MÚLTIPLES STICKY NOTES (mejorados) */}
        <AnimatePresence>
          {dna.stickyNotes.map((note, idx) => (
            <motion.div
              key={idx}
              className={styles.stickyNoteContainer}
              initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: note.rotate }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.05, rotate: '0deg', transition: { duration: 0.1 } }}
              style={{
                top: note.top,
                left: note.left,
                right: note.right,
                backgroundColor: note.color,
                zIndex: note.zIndex,
                transformOrigin: 'top left',
              }}
            >
              <div className={styles.adhesiveTape} style={{ background: note.tapeColor }} />
              <div className={styles.stickyContent}>
                <pre className={styles.handwrittenNote}>{note.content}</pre>
              </div>
              <div className={styles.stickyShadow} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* DETALLES DE DAÑO EXTREMO */}
        {dna.hasBurnEdges && <div className={styles.burnEdges} />}
        {dna.hasHole && <div className={styles.burnHole} />}

        {/* CAPA DE TEXTURA (suciedad general) */}
        <div className={styles.textureOverlay} />

        {/* Si el nivel de daño es máximo, añadir salpicaduras de sangre o café extra */}
        {dna.damageLevel === 3 && dna.damageType === 'blood' && (
          <div className={styles.bloodSplatter} />
        )}
        {dna.damageLevel === 3 && dna.damageType === 'coffee' && (
          <div className={styles.coffeeRing} />
        )}
      </div>
    </motion.div>
  );
};