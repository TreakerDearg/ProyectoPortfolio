import styles from '../../styles/deco-layout/ventilation.module.css';
import clsx from 'clsx';

export const Ventilation = ({ 
  count = 12, 
  orientation = 'horizontal', 
  size = 'md', 
  label = 'AIR_INTAKE', 
  className = '' 
}) => {
  const containerClasses = clsx(
    styles.unitContainer, 
    styles[orientation], 
    styles[size], 
    className
  );

  return (
    <div className={containerClasses}>
      <div className={styles.grill}>
        {/* Capa de profundidad: oscuridad total en el fondo */}
        <div className={styles.internalShadow} />
        
        {/* Mapeo de lamas con sutil variación de brillo */}
        {[...Array(count)].map((_, i) => (
          <div key={i} className={styles.slat}>
            <div className={styles.slatHighlight} />
            <div className={styles.slatShadow} />
          </div>
        ))}
      </div>
      
      {label && (
        <div className={styles.labelContainer}>
          <span className={styles.intakeLabel}>{label}</span>
          <div className={styles.labelDivider} />
          <span className={styles.serialNumber}>MOD_{String(count).padStart(2,'0')}</span>
        </div>
      )}
    </div>
  );
};