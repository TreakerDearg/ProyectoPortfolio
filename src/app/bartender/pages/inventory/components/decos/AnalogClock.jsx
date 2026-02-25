'use client';
import { useEffect, useState } from 'react';
import styles from '../../../../styles/inventory-styles/decos-styles/analog-clock.module.css';

export const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondsDeg = time.getSeconds() * 6;
  const minutesDeg = time.getMinutes() * 6 + time.getSeconds() * 0.1;

  return (
    <div className={styles.clockContainer}>
      <div className={styles.clockBody}>
        {/* Tornillería de montaje en el chasis */}
        <div className={styles.mountingScrew_1} />
        <div className={styles.mountingScrew_2} />
        
        {/* Esfera con textura de papel envejecido */}
        <div className={styles.clockFace}>
          <div className={styles.gaugeTicks} />
          
          {/* Marcas de cuadrante (12, 3, 6, 9) */}
          {[0, 90, 180, 270].map((deg) => (
            <div 
              key={deg} 
              className={styles.majorMark} 
              style={{ '--rotation': `${deg}deg` }} 
            />
          ))}

          {/* Aguja de Minutos (Grey Steel) */}
          <div 
            className={styles.handPivotMin} 
            style={{ transform: `rotate(${minutesDeg}deg)` }}
          >
            <div className={styles.minuteHand} />
          </div>

          {/* Aguja de Segundos (Industrial Red) */}
          <div 
            className={styles.handPivot} 
            style={{ transform: `rotate(${secondsDeg}deg)` }}
          >
            <div className={styles.needle} />
            <div className={styles.needleBase} />
          </div>

          {/* Eje de rotación de latón */}
          <div className={styles.centerBolt} />
        </div>

        {/* Protección de cristal con oclusión visual */}
        <div className={styles.glassCover}>
          <div className={styles.glassGlare} />
          <div className={styles.glassDust} />
          <div className={styles.vignette} />
        </div>

        {/* Etiqueta de inventario D6 */}
        <div className={styles.dataPlate}>
          <span className={styles.modelTag}>SEC_X10</span>
          <span className={styles.serialTag}>№ 8841-D6</span>
        </div>
      </div>
    </div>
  );
};