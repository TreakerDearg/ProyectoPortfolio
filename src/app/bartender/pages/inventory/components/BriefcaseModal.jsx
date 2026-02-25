'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, Beaker, ScrollText, ClipboardList, 
  Lock, AlertTriangle, Fingerprint, ShieldCheck,
  FileSearch, ChevronRight, Share2, Printer
} from 'lucide-react';
import { REAL_RECIPES } from '../data/RecipesReal'; 
import styles from '../../../styles/inventory-styles/briefcase.module.css';

/**
 * BRIEFCASE MODAL V8.2 - D6 SPECIAL OPERATIONS
 * Versión con navegación móvil mejorada (iconos + texto)
 */
export const BriefcaseModal = ({ folder, drinks = [], isUnlocked, onClose }) => {
  const [activeTab, setActiveTab] = useState('INTELLIGENCE'); // 'EVIDENCE' o 'INTELLIGENCE'

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const hasDrinks = drinks && drinks.length > 0;
  
  const drink = useMemo(() => {
    if (hasDrinks) return drinks[0];
    return { 
      name: "RESTRICTED_PROTOCOL", 
      desc: "CRITICAL: Physical file missing or incinerated during Station 4 purge. Attempting to recover data from secondary D6 buffers...",
      id: "ERR_404",
      toxicity: 99,
      ingredients: ["REDACTED", "REDACTED", "REDACTED"],
      flavor: "UNKNOWN",
      alcohol: "N/A",
      image: null
    };
  }, [hasDrinks, drinks]);

  const realRecipe = REAL_RECIPES[drink.id];

  const containerVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.9, rotateX: -15 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      transition: { type: "spring", damping: 25, stiffness: 120 }
    },
    exit: { y: 150, opacity: 0, scale: 0.8, rotateX: 20, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      <div 
        className={`${styles.modalOverlay} ${isUnlocked ? styles.unlockedTheme : ''}`} 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Expediente D6"
      >
        <div className={`${styles.ambientGlow} ${isUnlocked ? styles.glowGreen : styles.glowAmber}`} />

        <motion.div 
          className={styles.documentFolder}
          onClick={(e) => e.stopPropagation()}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* HEADER TÉCNICO */}
          <div className={styles.folderHeader}>
            <div className={styles.topBar}>
              <div className={styles.systemInfo}>
                <ShieldCheck size={14} className={styles.pulseIcon} />
                <span>D6_SECURE_ENCLAVE // {folder.id || 'NODE_UNKNOWN'}</span>
              </div>
              <div className={styles.windowControls}>
                <button 
                  onClick={() => window.print()} 
                  className={styles.iconBtn} 
                  title="Print Dossier"
                  aria-label="Imprimir expediente"
                >
                  <Printer size={16} />
                </button>
                <button 
                  className={styles.iconBtn} 
                  title="Share Link"
                  aria-label="Compartir enlace"
                >
                  <Share2 size={16} />
                </button>
                <button 
                  className={styles.closeBtn} 
                  onClick={onClose}
                  aria-label="Cerrar"
                >
                  <X size={22} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.mainExpediente}>
            {/* LOMO Y CLIPS */}
            <div className={styles.folderSpine} />
            <div className={styles.tabEar}>{folder.category || 'DATA'}</div>

            <div className={styles.gridContainer}>
              
              {/* PANEL EVIDENCIA (IZQUIERDA) */}
              <section 
                className={`${styles.evidencePanel} ${activeTab === 'EVIDENCE' ? styles.tabActive : ''}`}
                aria-hidden={activeTab !== 'EVIDENCE'}
              >
                <div className={styles.paperInner}>
                  <div className={styles.photoContainer}>
                    <div className={styles.tape} />
                    <div className={styles.tape} style={{ bottom: '-5px', right: '10px', transform: 'rotate(45deg)' }} />
                    
                    {drink.image ? (
                      <div className={styles.imageWrapper}>
                        <img 
                          src={drink.image} 
                          alt={`Fotografía de ${drink.name}`} 
                          className={styles.subjectImage}
                          loading="lazy"
                        />
                        <div className={styles.imageOverlay} />
                      </div>
                    ) : (
                      <div className={styles.placeholderVisual}>
                        <Fingerprint size={80} strokeWidth={1} />
                        <p>CORRUPTED_VISUAL_STREAM</p>
                      </div>
                    )}
                    <div className={styles.handwrittenID}>SUBJ_LOG: {drink.id}</div>
                  </div>

                  {/* RECETA ANTIGUA */}
                  <div className={styles.ancientRecipeArea}>
                    {isUnlocked && realRecipe ? (
                      <motion.div 
                        className={styles.realPaper}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <h4 className={styles.paperTitle}>
                          <ClipboardList size={16} /> ANALOG_INSTRUCTIONS
                        </h4>
                        <div className={styles.recipeScroll}>
                          <ul className={styles.ingList}>
                            {realRecipe.ingredients?.map((ing, i) => (
                              <li key={i}>{ing}</li>
                            ))}
                          </ul>
                          <p className={styles.instructionsText}>{realRecipe.instructions}</p>
                        </div>
                        <div className={styles.bottomStamp}>VERIFIED_BY_POLIS</div>
                      </motion.div>
                    ) : (
                      <div className={styles.lockedIntel}>
                        <Lock size={32} />
                        <p>ENCRYPTION_LAYER_02_ACTIVE</p>
                        <div className={styles.progressMini} />
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* PANEL INTELIGENCIA (DERECHA) */}
              <section 
                className={`${styles.dataPanel} ${activeTab === 'INTELLIGENCE' ? styles.tabActive : ''}`}
                aria-hidden={activeTab !== 'INTELLIGENCE'}
              >
                <div className={styles.dossierContent}>
                  <div className={styles.headerInfo}>
                    <div className={styles.classification}>UNCLASSIFIED_STATION_RECORD</div>
                    <h2 className={styles.drinkTitle}>{drink.name?.replace(/_/g, ' ')}</h2>
                    <div className={styles.tagCloud}>
                      <span className={styles.flavorTag}>{drink.flavor}</span>
                      <span className={styles.alcoholTag}>{drink.alcohol} ABV</span>
                    </div>
                  </div>

                  <div className={styles.infoBlock}>
                    <h3><FileSearch size={16} /> LOG_SUMMARY</h3>
                    <p className={styles.descText}>
                      {isUnlocked ? drink.desc : drink.desc.substring(0, 50) + " [REDACTED] ".repeat(5)}
                    </p>
                  </div>

                  <div className={styles.infoBlock}>
                    <h3><Beaker size={16} /> CHEMICAL_ANALYSIS</h3>
                    <div className={styles.chemicalGrid}>
                      {drink.ingredients?.map((ing, i) => (
                        <div key={i} className={styles.chemItem}>
                          <ChevronRight size={10} /> {isUnlocked ? ing : "••••••••"}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TOXICIDAD */}
                  <div className={styles.toxicityScanner}>
                    <div className={styles.scannerHeader}>
                      <span>RAD_TOXICITY_SCAN</span>
                      <span className={drink.toxicity > 50 ? styles.highRisk : ''}>{drink.toxicity}%</span>
                    </div>
                    <div className={styles.barContainer}>
                      <motion.div 
                        className={styles.barFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${drink.toxicity}%` }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        style={{ 
                          backgroundColor: drink.toxicity > 40 ? 'var(--hazard-red)' : '#00ff66'
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.actionArea}>
                    <div className={styles.officialStamps}>
                      <div className={styles.circularStamp}>D6_APPROVED</div>
                      {drink.toxicity > 60 && <div className={styles.warningStamp}>BIO_HAZARD</div>}
                    </div>
                    
                    <button 
                      className={styles.dispenseButton}
                      disabled={!isUnlocked}
                      onClick={() => alert("PREPARING_RATION...")}
                      aria-label="Preparar ración"
                    >
                      <Zap size={20} />
                      <div className={styles.btnLabel}>
                        <span className={styles.btnMain}>PREPARE_RATION</span>
                        <span className={styles.btnSub}>Execute D6-Protocol</span>
                      </div>
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* NAVEGACIÓN MÓVIL MEJORADA (con iconos) */}
            <div className={styles.mobileNav}>
              <button 
                className={activeTab === 'EVIDENCE' ? styles.active : ''} 
                onClick={() => setActiveTab('EVIDENCE')}
                aria-pressed={activeTab === 'EVIDENCE'}
              >
                <Fingerprint size={18} />
                <span>EVIDENCE</span>
              </button>
              <button 
                className={activeTab === 'INTELLIGENCE' ? styles.active : ''} 
                onClick={() => setActiveTab('INTELLIGENCE')}
                aria-pressed={activeTab === 'INTELLIGENCE'}
              >
                <FileSearch size={18} />
                <span>INTEL</span>
              </button>
            </div>
          </div>

          {/* OVERLAYS ESTÉTICOS */}
          <div className={styles.folderGrain} />
          <div className={styles.dirtOverlays} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};