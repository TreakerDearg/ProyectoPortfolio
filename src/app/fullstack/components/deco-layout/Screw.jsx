"use client";
import React, { useMemo } from 'react';
import styles from '../../styles/deco-layout/screw.module.css';
import clsx from 'clsx';

export const Screw = ({ 
  className, 
  type = 'cross', // cross | hex | slot | torx | square | rivet
  size = 'md',    // xs | sm | md | lg | xl
  rotation,
  condition = 'auto', 
  wearLevel = 0.2 // 0 a 1: determina qué tan "barrido" está el tornillo
}) => {
  
  // Lógica de estado procedimental avanzada
  const appearance = useMemo(() => {
    if (condition !== 'auto') return { status: condition, damage: wearLevel };
    
    const rng = Math.random();
    let status = 'clean';
    let damage = Math.random() * wearLevel;

    if (rng < 0.15) status = 'rusted';     // Oxidado
    else if (rng < 0.25) status = 'grimy'; // Lleno de grasa/aceite negro
    else if (rng < 0.30) status = 'stripped'; // Cabeza barrida/dañada

    return { status, damage };
  }, [condition, wearLevel]);

  // Rotación persistente
  const finalRotation = useMemo(() => 
    rotation ?? Math.floor(Math.random() * 360), 
    [rotation]
  );

  return (
    <div 
      className={clsx(
        styles.screwWrapper, 
        styles[size], 
        styles[appearance.status],
        className
      )}
      data-type={type}
    >
      <div className={styles.indentation}>
        {/* Sombra de oclusión ambiental (suciedad en los bordes) */}
        <div className={styles.ambientOcclusion} />

        <div 
          className={clsx(styles.screwHead, styles[type])} 
          style={{ transform: `rotate(${finalRotation}deg)` }}
        >
          {/* Renderizado dinámico según el tipo de puerto de herramienta */}
          {type !== 'rivet' && (
            <div className={clsx(
              styles.toolSocket,
              appearance.status === 'stripped' && styles.deformed
            )}>
              {type === 'hex' && <div className={styles.hexShape} />}
              {type === 'square' && <div className={styles.squareShape} />}
              {type === 'torx' && <div className={styles.torxShape} />}
              {type === 'slot' && <div className={styles.slotLine} />}
              {type === 'cross' && (
                <>
                  <div className={styles.slotLine} />
                  <div className={clsx(styles.slotLine, styles.vertical)} />
                </>
              )}
            </div>
          )}

          {/* CAPAS DE MATERIAL DE POST-PROCESADO */}
          <div className={styles.metalTexture} />
          
          {/* Manchas de óxido o grasa según estado */}
          {['rusted', 'grimy'].includes(appearance.status) && (
            <div className={styles.materialOverlay}>
              <div className={styles.stainPatch} />
            </div>
          )}

          {/* Reflejo Ámbar (Efecto Pip-Boy) */}
          <div className={styles.amberReflection} />
          
          {/* Brillo especular metálico */}
          <div className={styles.specularHighlight} />
        </div>
      </div>

      {/* Micro-etiqueta técnica (solo visible en tamaños grandes) */}
      {(size === 'lg' || size === 'xl') && (
        <span className={styles.screwLabel}>RBCO-88</span>
      )}
    </div>
  );
};