"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; 
import { 
  Activity, ShieldCheck, Clock, Github, Linkedin, Radio
} from "lucide-react";
import styles from '../styles/layout/retroFooter.module.css';

export default function RetroFooter() {
  const [time, setTime] = useState('00:00:00');
  const [ping, setPing] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
      setPing(Math.floor(Math.random() * (32 - 20) + 20)); 
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={styles.footerContainer}>
      {/* EFECTO DE LUZ AMBIENTAL INFERIOR */}
      <div className={styles.glowEdge} />

      {/* BLOQUE IZQUIERDO: RED Y PROTOCOLO */}
      <div className="flex items-center gap-6 z-10">
        <div className={styles.statusBox}>
          <Radio size={12} className="text-[#00ff9d] animate-pulse" />
          <span className={styles.statusText}>SIGNAL: OPTIMAL</span>
        </div>
        
        <div className="flex flex-col">
          <span className={styles.tinyLabel}>LATENCY_OSC</span>
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-[#00ff9d]" />
            <span className="text-[12px] font-mono font-bold">{ping}ms</span>
            {/* Pequeño monitor de ondas */}
            <div className={styles.waveMonitor}>
               <motion.div 
                 animate={{ x: [-20, 20] }}
                 transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                 className={styles.waveLine} 
               />
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE CENTRAL: ACCESO EXTERNO (Cartuchos Sociales) */}
      <div className="flex gap-4 z-10">
        <a href="https://github.com/TreakerDearg" target="_blank" className={styles.socialTab}>
          <Github size={14} />
          <span>SRV_GH_01</span>
        </a>
        <a href="https://www.linkedin.com/in/leandro-ferreira-3a205326b/" target="_blank" className={styles.socialTab}>
          <Linkedin size={14} />
          <span>SRV_LI_02</span>
        </a>
      </div>

      {/* BLOQUE DERECHO: SISTEMA Y SEGURIDAD */}
      <div className="flex items-center gap-6 z-10">
        <div className={styles.systemClock}>
          <Clock size={12} />
          <span className="tracking-[0.2em]">{time}</span>
        </div>

        <div className="flex items-center gap-3 bg-[#00ff9d]/5 px-3 py-1 border border-[#00ff9d]/20">
          <div className="flex flex-col items-center">
             <span className={styles.tinyLabel}>CPU_USE</span>
             <div className={styles.loadBarContainer}>
                <motion.div 
                  className={styles.loadBarFill}
                  animate={{ width: ["10%", "60%", "25%"] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />
             </div>
          </div>
          <div className="relative group">
             <ShieldCheck size={16} className="text-[#00ff9d]" />
             <div className={styles.secureGlow} />
          </div>
        </div>
      </div>

      {/* CÓDIGO DE IDENTIFICACIÓN DE FONDO */}
      <div className={styles.authTag}>
        SEC_AUTH: L_FERREIRA // UNIT_ID: 882-X-TERM // BIOS_VER: 2.1.0
      </div>
    </footer>
  );
}