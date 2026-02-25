'use client';
import React, { useMemo } from 'react';
import styles from '../../styles/inventory-styles/metro-layout.module.css';

// Componentes de Hardware
import { IndustrialFan } from './components/decos/IndustrialFan';
import { PowerCables } from './components/decos/PowerCables';
import { BunkerHeader } from './components/layout/BunkerHeader';
import { BunkerFooter } from './components/layout/BunkerFooter';

export default function MetroLayout({ children }) {
  // Generamos elementos decorativos de forma estática para evitar re-renders innecesarios
  const leftVents = useMemo(() => Array.from({ length: 14 }), []);
  const rightVents = useMemo(() => Array.from({ length: 8 }), []);
  const rivets = useMemo(() => Array.from({ length: 6 }), []);
  const dustParticles = useMemo(() => Array.from({ length: 20 }), []);

  return (
    <div className={styles.bunkerContainer}>
      {/* --- CAPA 0: ATMÓSFERA PROFUNDA --- */}
      <div className={styles.vignetteOverlay} />
      <div className={styles.grainEffect} />
      <div className={styles.emergencyFlicker} />

      {/* --- CAPA 1: ELEMENTOS DE FONDO (MACHINERY) --- */}
      <div className={styles.backgroundEnvironment}>
        <div className={styles.dustChamber}>
          {dustParticles.map((_, i) => (
            <div 
              key={`dust-${i}`} 
              className={styles.dustParticle} 
              style={{
                '--delay': `${Math.random() * 5}s`,
                '--left': `${Math.random() * 100}%`,
                '--size': `${Math.random() * 3 + 1}px`
              }}
            />
          ))}
        </div>
        
        <div className={styles.heavyMachinery}>
          <div className={styles.fanPlacement}>
             <IndustrialFan size="normal" />
          </div>
          <div className={styles.secondaryFan}>
             <IndustrialFan size="small" />
          </div>
          <PowerCables />
        </div>
      </div>

      {/* --- CAPA 2: ESTRUCTURA METÁLICA (EL CHASIS) --- */}
      <div className={styles.metalFrameChassis}>
        
        <BunkerHeader />

        <div className={styles.mainOperationalArea}>
          
          {/* PANEL IZQUIERDO: VENTILACIÓN Y MARCA */}
          <aside className={`${styles.hardwareSidePanel} ${styles.panelLeft}`}>
            <div className={styles.panelInner}>
              <div className={styles.ventilationSystem}>
                {leftVents.map((_, i) => (
                  <div key={`v-l-${i}`} className={styles.ventHole} />
                ))}
              </div>
              <div className={styles.verticalTextContainer}>
                <span className={styles.serialNumber}>MOD_D6_88-04</span>
                <p className={styles.verticalBrand}>METRO_INDUSTRIES_ARCHIVE</p>
              </div>
              <div className={styles.rivetLine}>
                {rivets.map((_, i) => (
                  <div key={`r-l-${i}`} className={styles.rivetHex} />
                ))}
              </div>
            </div>
            <div className={styles.panelEdgeShadow} />
          </aside>

          {/* ÁREA CENTRAL: EL MONITOR CRT */}
          <main className={styles.monitorSlot}>
            <div className={styles.crtHousing}>
              <div className={styles.bezelOuter}>
                <div className={styles.bezelInner}>
                  {/* El "Vidrio" del monitor */}
                  <div className={styles.screenGlass}>
                    <div className={styles.scanlineOverlay} />
                    <div className={styles.staticNoise} />
                    <div className={styles.screenReflection} />
                    
                    {/* Contenido Real */}
                    <div className={styles.viewport}>
                      <div className={styles.contentWrapper}>
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tornillos del monitor */}
              <div className={`${styles.screw} ${styles.tl}`} />
              <div className={`${styles.screw} ${styles.tr}`} />
              <div className={`${styles.screw} ${styles.bl}`} />
              <div className={`${styles.screw} ${styles.br}`} />
            </div>
          </main>

          {/* PANEL DERECHO: SENSORES Y COMUNICACIÓN */}
          <aside className={`${styles.hardwareSidePanel} ${styles.panelRight}`}>
            <div className={styles.panelEdgeShadowRight} />
            <div className={styles.panelInner}>
              <div className={styles.rivetLine}>
                {rivets.map((_, i) => (
                  <div key={`r-r-${i}`} className={styles.rivetHex} />
                ))}
              </div>
              <div className={styles.commsDisplay}>
                <div className={styles.ledIndicator} />
                <p className={styles.verticalBrand}>TERMINAL_V.2033.6</p>
              </div>
              <div className={styles.ventilationSystem}>
                {rightVents.map((_, i) => (
                  <div key={`v-r-${i}`} className={`${styles.ventHole} ${styles.ventHoleSmall}`} />
                ))}
              </div>
            </div>
          </aside>
          
        </div>

        <BunkerFooter />
      </div>

      {/* --- CAPA 3: POST-PROCESS (FRONT) --- */}
      <div className={styles.screenDirt} />
    </div>
  );
}