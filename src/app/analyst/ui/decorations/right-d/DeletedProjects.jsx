"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Hash, Database, AlertTriangle, Terminal, ShieldX } from 'lucide-react';
import styles from '../../../styles/D-side/deletedProjects.module.css';

export const DeletedProjects = () => {
  const [glitchIndex, setGlitchIndex] = useState(null);

  // Simulador de corrupción aleatoria para estética
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchIndex(Math.floor(Math.random() * 3));
      setTimeout(() => setGlitchIndex(null), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const deletedFiles = [
    { id: 'PRG-X01', name: 'Neural_Bridge_v1_Corrupt', date: '2025.11.21', size: '2.4MB', addr: '0x4F', status: 'PURGED' },
    { id: 'PRG-X42', name: 'Subject_K_Biometrics', date: '2026.02.12', size: '156KB', addr: '0x21', status: 'VOIDED' },
    { id: 'PRG-X99', name: 'Project_Overlord_Draft', date: '2026.02.18', size: '1.2MB', addr: '0x09', status: 'OVERWRITTEN' },
  ];

  return (
    <div className={styles.root}>
      {/* HEADER TÉCNICO */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.scannerLine} />
          <ShieldX size={14} className="text-red-500" />
          <div className={styles.textContainer}>
            <span className={styles.mainTitle}>ARASAKA_PURGE_ARCHIVE</span>
            <span className={styles.subTitle}>SECURE_ERASURE_PROTOCOL_v4.0</span>
          </div>
        </div>
        <div className={styles.statusBox}>
          <div className={styles.blinkDot} />
          <span className={styles.statusTag}>DATA_VOID</span>
        </div>
      </div>

      <div className={styles.fileList}>
        {deletedFiles.map((file, index) => (
          <motion.div 
            key={file.id} 
            className={`${styles.fileEntry} ${glitchIndex === index ? styles.glitchRow : ''}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.entryLeft}>
              <div className={styles.addressBox}>
                <span className={styles.address}>{file.addr}</span>
                <div className={styles.verticalLink} />
              </div>
              
              <div className={styles.contentInfo}>
                <div className="flex items-center gap-2">
                  <span className={styles.fileName}>
                    {glitchIndex === index ? "########_CORRUPT" : file.name}
                  </span>
                  {index % 2 === 0 && (
                    <AlertTriangle size={8} className={styles.alertIcon} />
                  )}
                </div>
                
                <div className={styles.fileMeta}>
                  <span className={styles.metaHash}><Hash size={6} /> {file.id}</span>
                  <span className={styles.metaDate}>{file.date}</span>
                  <div className={styles.statusBadge}>{file.status}</div>
                </div>
              </div>
            </div>

            <div className={styles.entryRight}>
              <span className={styles.fileSize}>{file.size}</span>
              <div className={styles.miniProgressTrack}>
                <motion.div 
                  className={styles.miniProgressFill} 
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MAPA DE INTEGRIDAD DE SECTORES */}
      <div className={styles.sectorFooter}>
        <div className={styles.sectorHeader}>
          <span className={styles.sectorTitle}>
            <Terminal size={10} className="mr-1" /> CORE_STORAGE_INTEGRITY
          </span>
          <span className={styles.defragText}>DEFRAG_REQUIRED [77%]</span>
        </div>
        
        <div className={styles.gridContainer}>
          <div className={styles.sectorGrid}>
            {[...Array(32)].map((_, i) => (
              <motion.div 
                key={i} 
                className={`${styles.sectorCell}`}
                animate={{ 
                  backgroundColor: i % 5 === 0 ? ["#ff000033", "#ff000000"] : "#111",
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
              />
            ))}
          </div>
          <div className={styles.gridOverlay}>0x00_VOID</div>
        </div>
      </div>
    </div>
  );
};