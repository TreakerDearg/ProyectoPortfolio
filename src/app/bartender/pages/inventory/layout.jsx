'use client';
import React from 'react';
import styles from '../../styles/inventory-styles/metro-layout.module.css';
import { IndustrialFan } from './components/decos/IndustrialFan';
import { PowerCables } from './components/decos/PowerCables';
import { BunkerHeader } from './components/layout/BunkerHeader';
import { BunkerFooter } from './components/layout/BunkerFooter';

export default function MetroLayout({ children }) {
  const leftVents = Array.from({ length: 12 });
  const rightVents = Array.from({ length: 6 });
  const rivets = Array.from({ length: 5 });
  const dustMotes = Array.from({ length: 15 }); // Partículas de polvo

  return (
    <div className={styles.bunkerContainer}>
      {/* 1. CAPAS ATMOSFÉRICAS Y FX */}
      <div className={styles.vignetteOverlay} />
      <div className={styles.grainEffect} /> 
      
      {/* Sistema de Polvo Cayendo (Motes) */}
      <div className={styles.dustChamber}>
        {dustMotes.map((_, i) => (
          <div key={`dust-${i}`} className={styles.dustParticle} />
        ))}
      </div>
      
      {/* Maquinaria Pesada en el fondo */}
      <div className={styles.backgroundMachinery}>
        <div className={styles.fanPlacement}>
           <IndustrialFan size="normal" />
        </div>
        <PowerCables />
      </div>

      {/* 2. ESTRUCTURA DE SOPORTE (HARDWARE) */}
      <div className={styles.metalFrame}>
        
        <BunkerHeader />

        <div className={styles.mainOperationalArea}>
          
          {/* PANEL IZQUIERDO */}
          <aside className={`${styles.hardwareSidePanel} ${styles.responsiveHide}`}>
            <div className={styles.panelContent}>
              <div className={styles.ventilationGrill}>
                {leftVents.map((_, i) => (
                  <div key={`v-l-${i}`} className={styles.ventHole} />
                ))}
              </div>
              <div className={styles.brandContainer}>
                <p className={styles.verticalBrand}>METRO_INDUSTRIES_D6</p>
              </div>
              <div className={styles.rivetColumn}>
                {rivets.map((_, i) => (
                  <div key={`r-l-${i}`} className={styles.rivetSmall} />
                ))}
              </div>
            </div>
            <div className={styles.panelShadowEdge} />
          </aside>

          {/* ÁREA CENTRAL (CRT MONITOR) */}
          <main className={styles.monitorEnclosure}>
            <div className={styles.crtContainer}>
              <div className={styles.crtBezel}>
                <div className={styles.crtGlassEffect}>
                  <div className={styles.scanlineOverlay} />
                  <div className={styles.staticFlicker} />
                </div>
                
                <div className={styles.contentScroll}>
                  <div className={styles.innerLayoutPadding}>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* PANEL DERECHO */}
          <aside className={`${styles.sensorSidePanel} ${styles.responsiveHide}`}>
            <div className={styles.panelShadowEdgeRight} />
            <div className={styles.panelContent}>
              <div className={styles.rivetColumn}>
                {rivets.map((_, i) => (
                  <div key={`r-r-${i}`} className={styles.rivetSmall} />
                ))}
              </div>
              <div className={styles.brandContainer}>
                <p className={`${styles.verticalBrand} ${styles.brandRight}`}>
                  COM_UNIT_V.2
                </p>
              </div>
              <div className={styles.ventilationGrill}>
                {rightVents.map((_, i) => (
                  <div key={`v-r-${i}`} className={`${styles.ventHole} ${styles.ventHoleSmall}`} />
                ))}
              </div>
            </div>
          </aside>
          
        </div>

        <BunkerFooter />
      </div>
    </div>
  );
}