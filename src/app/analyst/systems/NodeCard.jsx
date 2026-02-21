"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ExternalLink, Database } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import styles from '@/app/analyst/styles/Styles-C/nodeCard.module.css';

const DataBrief = ({ node, onNavigate }) => (
  <div className={styles.dataBrief}>
    <div className={styles.briefDivider} />
    <button 
      onPointerDown={(e) => e.stopPropagation()} // Evita que el drag inicie al tocar el botón
      onClick={(e) => {
        e.stopPropagation();
        onNavigate(node.path);
      }}
      className={styles.accessBtn}
    >
      <span className={styles.btnText}>OPEN_PROJECT</span>
      <ExternalLink size={10} />
    </button>
  </div>
);

export const NodeCard = ({ node, handleDrag }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setSelectedNode, selectedNode, setIsAnalyzing } = useAnalysis();
  const router = useRouter();

  const isSelected = selectedNode?.id === node.id;

  const handleQuickNavigate = (path) => {
    setIsAnalyzing(true);
    setTimeout(() => router.push(path), 800);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      // Sincronización con el Contexto usando el desplazamiento delta
      onDrag={(e, info) => {
        handleDrag(node.id, info.delta);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(node);
      }}
      // Usamos x/y para transformaciones de GPU suaves
      style={{ 
        x: node.x, 
        y: node.y, 
        position: 'absolute',
        top: 0,
        left: 0
      }}
      animate={{ 
        scale: isSelected ? 1.1 : 1,
        zIndex: isSelected || isHovered ? 100 : 10
      }}
      whileDrag={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.nodeWrapper}
    >
      <div className={styles.nodeContainer}>
        {isSelected && <div className={styles.selectionScanner} />}

        <div 
          className={`${styles.nodeOrb} ${isSelected ? styles.selectedOrb : ''}`}
          style={{ '--node-color': node.color }}
        >
          <div className={styles.innerBrackets} />
          <div className={styles.coreContainer}>
            <div className={styles.core} style={{ backgroundColor: node.color }} />
            <div className={styles.corePulse} style={{ backgroundColor: node.color }} />
          </div>
        </div>
        
        <div className={`${styles.nodeLabel} ${isSelected ? styles.selectedLabel : ''}`}>
          <span className={styles.labelPrefix}>ID_</span>
          {node.name}
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 10 }}
              className={styles.infoTooltip}
            >
              <div className={styles.tooltipHeader}>
                <Database size={12} className="text-slate-500" />
                <span className={styles.protocolText}>SIGNAL_0x{node.id}</span>
                <div className={styles.activeLed} />
              </div>
              
              <div className={styles.tooltipBody}>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>LOAD:</span>
                  <span className={styles.dataValue}>{node.metrics?.load || '24%'}</span>
                </div>
              </div>

              <DataBrief node={node} onNavigate={handleQuickNavigate} />

              <div className={styles.loadingTrack}>
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className={styles.loadingFill}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};