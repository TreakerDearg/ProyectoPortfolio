'use client';
import styles from '../../../../styles/inventory-styles/decos-styles/industrial-fan.module.css';

export const IndustrialFan = ({ size = "normal" }) => (
  <div className={`${styles.fanContainer} ${styles[size]}`}>
    <div className={styles.fanHousing}>
      
      {/* Resplandor radiactivo/industrial de fondo */}
      <div className={styles.fanBacklight} />

      {/* Contenedor de aspas con animación de rotación */}
      <div className={styles.fanBladeContainer}>
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className={styles.blade} 
            style={{ transform: `rotate(${i * 90}deg)` }} 
          >
            <div className={styles.bladeScratches} />
          </div>
        ))}
        
        {/* Hub central con perno de latón */}
        <div className={styles.fanHub}>
          <div className={styles.hubBolt} />
        </div>
      </div>

      {/* Rejilla protectora de acero (Grill) */}
      <div className={styles.fanGrill}>
        <div className={styles.grillCircle} />
        <div className={styles.grillCircleSmall} />
        <div className={styles.grillCross}>
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className={styles.grillBar} 
              style={{ transform: `rotate(${i * 45}deg)` }} 
            />
          ))}
        </div>
      </div>

      {/* Capa de suciedad y oclusión */}
      <div className={styles.fanGrimyGlass} />
      <div className={styles.fanShadowOverlay} />
    </div>

    {/* Etiqueta técnica (Ocultable en tamaños mini) */}
    <div className={styles.fanID}>
      <span className={styles.unitType}>VENT_UNIT</span>
      <span className={styles.unitStatus}>V4-D6 [NOMINAL]</span>
    </div>
  </div>
);