"use client";
import React from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { Share2, Activity, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../styles/Styles-C/AnalyticFlow.module.css';

const AnalyticFlow = () => {
  const { activeStreams = [] } = useAnalysis();

  return (
    <div className={styles.flowContainer}>
      {/* HEADER DE MÓDULO ARASAKA */}
      <div className={styles.moduleHeader}>
        <div className={styles.titleGroup}>
          <Share2 size={14} className="text-red-600" />
          <span className={styles.titleText}>NEURAL_TRAFFIC_MONITOR</span>
        </div>
        <span className={styles.streamCount}>
          ACTIVE_CHANNELS: {activeStreams.length < 10 ? `0${activeStreams.length}` : activeStreams.length}
        </span>
      </div>

      {/* GRID DE STREAMS */}
      <div className={styles.streamList}>
        {activeStreams.map((stream, idx) => (
          <motion.div 
            key={stream.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={styles.streamCard}
          >
            <div className={styles.cardHeader}>
              <div className="flex items-center gap-3">
                <span className={styles.streamId}>{stream.id}</span>
                <span className="text-[8px] opacity-20">//</span>
                <span className="text-[8px] opacity-40 font-bold">TYPE: {stream.type || 'DATA_SYNC'}</span>
              </div>
              <div className={styles.statusBadge}>
                <div className={styles.statusDot} style={{ 
                  backgroundColor: stream.status === 'HIGH_TRAFFIC' ? '#ef4444' : '#10b981',
                  boxShadow: stream.status === 'HIGH_TRAFFIC' ? '0 0 8px #ef4444' : '0 0 8px #10b981'
                }} />
                <span className={styles.statusLabel}>{stream.status}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className={styles.transferLine}>
                <div className={styles.nodeBox}>
                  <div className={styles.nodeLabel}>SOURCE_NODE</div>
                  <div className={styles.nodeName}>{stream.source}</div>
                </div>

                <div className={styles.pathTrack}>
                  <motion.div 
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ 
                      duration: stream.load > 70 ? 0.6 : 1.5, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className={styles.dataParticle}
                  />
                  {/* Partícula secundaria para streams pesados */}
                  {stream.load > 60 && (
                     <motion.div 
                     animate={{ left: ['0%', '100%'] }}
                     transition={{ 
                       duration: 0.8, 
                       delay: 0.4,
                       repeat: Infinity, 
                       ease: "linear" 
                     }}
                     className={styles.dataParticle}
                     style={{ opacity: 0.4 }}
                   />
                  )}
                </div>

                <div className={styles.nodeBox} style={{ textAlign: 'right' }}>
                  <div className={styles.nodeLabel}>TARGET_EXIT</div>
                  <div className={styles.nodeName}>{stream.target}</div>
                </div>
              </div>

              {/* MÉTRICA DE CARGA TÁCTICA */}
              <div className={styles.loadSection}>
                <div className={styles.loadHeader}>
                  <span className={styles.loadLabel}>BW_LOAD</span>
                  <span className={styles.loadValue}>{stream.load}%</span>
                </div>
                <div className={styles.loadBar}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stream.load}%` }}
                    className={styles.loadFill}
                  />
                </div>
              </div>
            </div>
            
            {/* Decoración técnica de esquina */}
            <div className={styles.cardGreeble} />
          </motion.div>
        ))}
        
        {/* Placeholder si no hay streams */}
        {activeStreams.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 opacity-20 grayscale">
            <Shield size={40} strokeWidth={1} />
            <span className="text-[10px] mt-4 tracking-widest">NO_ACTIVE_TRAFFIC_DETECTED</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticFlow;