'use client';
import styles from '../../../../styles/inventory-styles/decos-styles/power-cables.module.css';

export const PowerCables = () => (
  <div className={styles.cableContainer}>
    {/* El SVG ahora usa 100% de ancho para adaptarse al header */}
    <svg width="100%" height="150" viewBox="0 0 1000 200" preserveAspectRatio="none" className={styles.svgCable}>
      <defs>
        <filter id="cableGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        
        {/* Gradiente para cables desgastados */}
        <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#111" />
          <stop offset="50%" stopColor="#222" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
      </defs>

      {/* Cable Principal Pesado */}
      <path 
        d="M0,20 C150,180 350,180 500,80 S850,180 1000,40" 
        className={`${styles.cablePath} ${styles.heavy}`}
      />
      
      {/* Cable de Datos (Trenzado sutil) */}
      <path 
        d="M0,50 C200,190 400,190 600,60 S900,160 1000,80" 
        className={`${styles.cablePath} ${styles.medium}`}
      />
      
      {/* Cable Dañado (Expuesto) */}
      <path 
        d="M0,10 C250,150 450,150 700,40 S950,130 1000,30" 
        className={`${styles.cablePath} ${styles.damaged}`}
      />
    </svg>

    {/* Emiisor de chispas posicionado dinámicamente */}
    <div className={styles.sparkSystem}>
      <div className={styles.sparkEmitter}>
        <div className={styles.spark} />
        <div className={styles.arcFlash} />
        <div className={styles.smokeParticle} />
      </div>
    </div>
  </div>
);