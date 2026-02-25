'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, Beaker, ClipboardList, 
  Lock, ShieldCheck, FileSearch, 
  ChevronRight, Share2, Printer, Fingerprint
} from 'lucide-react';
import { REAL_RECIPES } from '../data/RecipesReal'; 
import styles from '../../../styles/inventory-styles/briefcase.module.css';

export const BriefcaseModal = ({ folder, drinks = [], isUnlocked, onClose }) => {
  const [activeTab, setActiveTab] = useState('INTELLIGENCE');
  const [mounted, setMounted] = useState(false);

  // --- ESCUDO DE MONTAJE Y BLOQUEO DE SCROLL ---
  useEffect(() => {
    setMounted(true);
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    // Cleanup: Restaura el scroll al desmontar
    return () => { 
      document.body.style.overflow = originalStyle; 
    };
  }, []);

  const hasDrinks = drinks && drinks.length > 0;
  
  // Memorización de datos del sujeto
  const drink = useMemo(() => {
    if (hasDrinks) return drinks[0];
    return { 
      name: "RESTRICTED_PROTOCOL", 
      desc: "CRITICAL: Physical file missing or incinerated during Station 4 purge.",
      id: "ERR_404",
      toxicity: 99,
      ingredients: ["REDACTED", "REDACTED", "REDACTED"],
      flavor: "UNKNOWN",
      alcohol: "N/A"
    };
  }, [hasDrinks, drinks]);

  const realRecipe = useMemo(() => REAL_RECIPES[drink.id] || null, [drink.id]);

  // Animaciones optimizadas
  const containerVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", damping: 20, stiffness: 100 }
    },
    exit: { y: 100, opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  // Evitar renderizado SSR para prevenir errores de hidratación con Framer Motion
  if (!mounted) return null;

  return (
    <div className={`${styles.modalOverlay} ${isUnlocked ? styles.unlockedTheme : ''}`} onClick={onClose}>
      
      {/* GLOW DINÁMICO SEGÚN ACCESO */}
      <div className={`${styles.ambientGlow} ${isUnlocked ? styles.glowGreen : styles.glowAmber}`} />

      <motion.div 
        className={styles.documentFolder}
        onClick={(e) => e.stopPropagation()}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* BARRA DE ESTADO SUPERIOR */}
        <div className={styles.folderHeader}>
          <div className={styles.topBar}>
            <div className={styles.systemInfo}>
              <ShieldCheck size={14} className={styles.pulseIcon} />
              <span>D6_ENCLAVE // {folder.id || 'NODE_ERR'}</span>
            </div>
            <div className={styles.windowControls}>
              <button onClick={() => window.print()} className={styles.iconBtn}><Printer size={16} /></button>
              <button className={styles.iconBtn}><Share2 size={16} /></button>
              <button className={styles.closeBtn} onClick={onClose}><X size={22} /></button>
            </div>
          </div>
        </div>

        <div className={styles.mainExpediente}>
          <div className={styles.folderSpine} />
          <div className={styles.tabEar}>{folder.category || 'DATA'}</div>

          <div className={styles.gridContainer}>
            
            {/* PANEL IZQUIERDO: EVIDENCIA ANALÓGICA */}
            <section className={`${styles.evidencePanel} ${activeTab === 'EVIDENCE' ? styles.tabActive : ''}`}>
              <div className={styles.paperInner}>
                <div className={styles.photoContainer}>
                  <div className={styles.tape} />
                  
                  {drink.image ? (
                    <div className={styles.imageWrapper}>
                      <img src={drink.image} alt={drink.name} className={styles.subjectImage} />
                      <div className={styles.imageOverlay} />
                    </div>
                  ) : (
                    <div className={styles.placeholderVisual}>
                      <Fingerprint size={60} strokeWidth={1} />
                      <p>NO_VISUAL_DATA</p>
                    </div>
                  )}
                  <div className={styles.handwrittenID}>LOG_{drink.id}</div>
                </div>

                <div className={styles.ancientRecipeArea}>
                  {isUnlocked && realRecipe ? (
                    <motion.div 
                      className={styles.realPaper}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h4 className={styles.paperTitle}><ClipboardList size={14} /> ANALOG_INSTRUCTIONS</h4>
                      <div className={styles.recipeScroll}>
                        <ul className={styles.ingList}>
                          {realRecipe.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                        <p className={styles.instructionsText}>{realRecipe.instructions}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className={styles.lockedIntel}>
                      <Lock size={24} />
                      <p>CIFRADO_NIVEL_2</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* PANEL DERECHO: DATOS DIGITALES D6 */}
            <section className={`${styles.dataPanel} ${activeTab === 'INTELLIGENCE' ? styles.tabActive : ''}`}>
              <div className={styles.dossierContent}>
                <div className={styles.headerInfo}>
                  <div className={styles.classification}>RESERVED_STATION_RECORD</div>
                  <h2 className={styles.drinkTitle}>{drink.name?.replace(/_/g, ' ')}</h2>
                  <div className={styles.tagCloud}>
                    <span className={styles.flavorTag}>{drink.flavor}</span>
                    <span className={styles.alcoholTag}>{drink.alcohol}% ABV</span>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <h3><FileSearch size={14} /> LOG_SUMMARY</h3>
                  <p className={styles.descText}>
                    {isUnlocked ? drink.desc : `${drink.desc.substring(0, 60)} [DATA_EXPUNGED]`}
                  </p>
                </div>

                <div className={styles.infoBlock}>
                  <h3><Beaker size={14} /> ANALYSIS</h3>
                  <div className={styles.chemicalGrid}>
                    {drink.ingredients?.map((ing, i) => (
                      <div key={i} className={styles.chemItem}>
                        <ChevronRight size={10} /> {isUnlocked ? ing : "••••••"}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.toxicityScanner}>
                  <div className={styles.scannerHeader}>
                    <span>TOXICITY_LEVEL</span>
                    <span className={drink.toxicity > 50 ? styles.highRisk : ''}>{drink.toxicity}%</span>
                  </div>
                  <div className={styles.barContainer}>
                    <motion.div 
                      className={styles.barFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${drink.toxicity}%` }}
                      style={{ 
                        backgroundColor: drink.toxicity > 60 ? '#ff3e3e' : '#22c55e'
                      }}
                    />
                  </div>
                </div>

                <div className={styles.actionArea}>
                  <button 
                    className={styles.dispenseButton}
                    disabled={!isUnlocked}
                    onClick={() => console.log("Protocolo de dispensación iniciado...")}
                  >
                    <Zap size={18} />
                    <div className={styles.btnLabel}>
                      <span className={styles.btnMain}>PREPARE_RATION</span>
                      <span className={styles.btnSub}>D6-Auth Required</span>
                    </div>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* TABS PARA MÓVIL */}
          <div className={styles.mobileNav}>
            <button 
              className={activeTab === 'EVIDENCE' ? styles.active : ''} 
              onClick={() => setActiveTab('EVIDENCE')}
            >EVIDENCE</button>
            <button 
              className={activeTab === 'INTELLIGENCE' ? styles.active : ''} 
              onClick={() => setActiveTab('INTELLIGENCE')}
            >INTEL</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};