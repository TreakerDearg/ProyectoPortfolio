// NoiseOverlay.jsx
import React from 'react';
import styles from '../../../styles/logs-styles/soma-page.module.css';

export const NoiseOverlay = ({
  intensity = 0.7,
  scanlineIntensity = 0.5,
  flickerSpeed = 'medium', // 'slow', 'medium', 'fast'
  color = 'monochrome',    // 'monochrome' o 'rgb'
}) => {
  // Mapeo de velocidad a duración de animación
  const flickerDuration =
    flickerSpeed === 'slow' ? '4s' : flickerSpeed === 'fast' ? '1s' : '2.4s';

  // Variables CSS para control dinámico (se usarán en el módulo CSS)
  const noiseStyle = {
    '--noise-intensity': intensity,
    '--scanline-intensity': scanlineIntensity,
    '--flicker-duration': flickerDuration,
  };

  return (
    <div className={styles.fxContainer} style={noiseStyle} aria-hidden="true">
      {/* Capa base: grano fino */}
      <div className={styles.grainLayer} />

      {/* Capa de scanlines con opacidad variable */}
      <div className={styles.scanlineLayer} />

      {/* Capa de parpadeo de voltaje (WAU interference) */}
      <div className={styles.voltageFlicker} />

      {/* Viñeteado de lente de terminal */}
      <div className={styles.vignette} />

      {/* Capas adicionales para mayor realismo (solo si color='rgb') */}
      {color === 'rgb' && (
        <>
          {/* Aberración cromática sutil */}
          <div className={styles.chromaticAberration} />
          {/* Ruido de color aleatorio */}
          <div className={styles.colorNoise} />
        </>
      )}

      {/* Efecto de "screen door" (muy sutil, siempre presente) */}
      <div className={styles.screenDoor} />
    </div>
  );
};

export default React.memo(NoiseOverlay);