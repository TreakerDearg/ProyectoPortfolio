'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink } from 'lucide-react'; // Importamos iconos
import { ResourceMonitor } from '../ui/decorations/Footer-D/ResourceMonitor';
import { TrafficGraph } from '../ui/decorations/Footer-D/TrafficGraph';
import { CoreBattery } from '../ui/decorations/Footer-D/CoreBattery';
import styles from '@/app/analyst/styles/footer.module.css';

export const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.topDataLine} />

      {/* SECCIÓN IZQUIERDA */}
      <div className="flex items-center h-full">
        <div className={styles.sectionCell}>
          <div className="flex flex-col gap-0.5">
            <span className={styles.labelTech}>Uplink_Status</span>
            <div className="flex gap-2 items-center">
              <div className={styles.statusDotLarge} />
              <span className={styles.statusValue}>ENCRYPTED_LINK_ACTIVE</span>
            </div>
          </div>
        </div>
        
        <div className={styles.sectionCell}>
          <div className="flex flex-col gap-1 mr-8">
            <span className={styles.labelTech}>Traffic_Flux</span>
            <TrafficGraph /> 
          </div>
          <div className="flex flex-col gap-1">
            <span className={styles.labelTech}>System_Resources</span>
            <ResourceMonitor />
          </div>
        </div>
      </div>

      {/* SECCIÓN CENTRAL: Hardware ID */}
      <div className="hidden xl:flex flex-col items-center justify-center px-4 border-x border-white/5 h-full bg-black/20">
        <span className={styles.mainframeId}>CORE_SYSTEM_OS_V.4.0.1</span>
        <div className={styles.bracketDecoration}>
           <div className={styles.dot} />
           <div className={styles.line} />
           <div className={styles.dot} />
        </div>
      </div>

      {/* SECCIÓN DERECHA: Social Nodes, Telemetría y Tiempo */}
      <div className="flex items-center h-full">
        
        {/* NUEVOS SOCIAL NODES */}
        <div className={styles.socialCell}>
          <span className={styles.labelTech + " mb-2"}>Dev_Access</span>
          <div className="flex gap-4">
            <motion.a 
              href="https://github.com/TreakerDearg" 
              target="_blank"
              whileHover={{ scale: 1.1, color: '#fff' }}
              className={styles.socialLink}
              title="GitHub_Repository"
            >
              <Github size={14} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/leandro-ferreira-3a205326b/" 
              target="_blank"
              whileHover={{ scale: 1.1, color: '#0ea5e9' }}
              className={styles.socialLink}
              title="LinkedIn_Profile"
            >
              <Linkedin size={14} />
            </motion.a>
          </div>
        </div>

        <div className="hidden lg:flex px-6 flex-col items-end border-l border-white/5">
          <span className={styles.labelTech + " text-sky-500"}>Geo_Position</span>
          <span className={styles.geoValue}>27.36°S // 55.89°W</span>
        </div>
        
        <div className={styles.sectionCell}>
            <CoreBattery />
        </div>

        <div className={styles.timeBlock}>
          <div className={styles.timeGlow} />
          <div className="flex flex-col items-end leading-none relative z-10 mr-4">
            <span className={styles.labelTech + " text-sky-400 mb-1"}>Sync_Time</span>
            <span className={styles.timeValue}>{time}</span>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className={styles.timeSpinner}
          >
            <div className={styles.spinnerCore} />
          </motion.div>
        </div>
      </div>
    </footer>
  );
};