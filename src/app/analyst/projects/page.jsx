"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/projects';
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { DecodingText } from './components-p/DecodingText';
import { TerminalLogger } from './components-p/TerminalLogger';
import { DataNodeStatus } from './components-p/DataNodeStatus'; // Nuevo
import styles from '@/app/analyst/styles/Projects.module.css';

export default function ProjectsPage() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className={`${styles.localScope} ${styles.mainWrapper}`}>
      <div className={styles.combatOverlay} />
      <div className={styles.analogOverlays}><div className={styles.grain} /><div className={styles.scanlines} /></div>

      <Header />
      <TerminalLogger />

      <main className={styles.viewport}>
        <div className={styles.gridOverlay} />
        
        <section className={styles.content}>
          <header className={styles.sectionHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.breadcrumb}>
                <span className={styles.alertText}>[ MODE: ACTIVE_DATABASE_STRIKE ]</span>
              </div>
              <h1 className={styles.mainTitle}>
                <DecodingText text="CORE_DATA_REPOSITORIES" delay={300} />
              </h1>
            </div>
          </header>

          <div className={styles.bentoGrid}>
            {PROJECTS_DATA.map((project, index) => (
              <motion.article
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`${styles.card} ${styles[project.size]} ${hoveredId === project.id ? styles.activeCard : ''}`}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
              >
                {/* FRAME PRINCIPAL */}
                <div className={styles.cardFrame}>
                  <div className={styles.cardBg} style={{ backgroundImage: `url(${project.image})` }} />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cutCorner} />
                </div>

                <div className={styles.cardUI}>
                  <div className={styles.cardHeader}>
                    <div className={styles.nodeTag}>NODE::{project.id}</div>
                    
                    {/* USO DE ANIMATEPRESENCE PARA SUB-ELEMENTOS */}
                    <AnimatePresence>
                      {hoveredId === project.id && <DataNodeStatus />}
                    </AnimatePresence>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.protocol}>&gt; {project.category}</div>
                    <h3 className={styles.projectTitle}>
                       <DecodingText text={project.title} active={hoveredId === project.id} />
                    </h3>
                    <p className={styles.projectDesc}>{project.description}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.techStack}>
                      {project.tech.map(t => <span key={t} className={styles.techTag}>#{t}</span>)}
                    </div>
                    <motion.button className={styles.actionBtn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                      RUN_FETCH
                    </motion.button>
                  </div>
                </div>

                {/* CAPA DE RUIDO REACTIVA */}
                <AnimatePresence>
                  {hoveredId === project.id && (
                    <motion.div 
                      key="noise"
                      className={styles.noiseOverlay}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.15 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}