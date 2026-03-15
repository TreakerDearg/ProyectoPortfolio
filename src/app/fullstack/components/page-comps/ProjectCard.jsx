"use client";
import React, { useState } from "react";
import { StatusLed } from "../deco-layout/StatusLed";
import styles from "../../styles/page-comp-styles/ProjectCard.module.css";

export const ProjectCard = ({
  name,
  status,
  description,
  techStack,
  progress,
  gameReference,
  condition = "clean", // "clean", "worn", "cracked"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Determinar clase de condición
  const conditionClass = styles[condition] || styles.clean;
  // Determinar clase de color según el juego
  const colorClass = styles[gameReference?.toLowerCase()] || styles.default;

  return (
    <div className={`${styles.card} ${conditionClass} ${colorClass}`}>
      {/* Tornillos decorativos */}
      <div className={styles.screwTL} />
      <div className={styles.screwTR} />
      <div className={styles.screwBL} />
      <div className={styles.screwBR} />

      {/* Etiqueta frontal del cartucho */}
      <div className={styles.labelArea}>
        <div className={styles.label}>
          <span className={styles.projectName}>{name}</span>
          <StatusLed status={status} size="xs" className={styles.led} />
        </div>
        <div className={styles.cartridgeTexture} />
      </div>

      {/* Contenido principal */}
      <div className={styles.cardBody}>
        <p className={styles.description}>{description}</p>
        <div className={styles.progressContainer}>
          <span className={styles.progressLabel}>PROGRESS</span>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressValue}>{progress}%</span>
        </div>
        <button className={styles.briefcaseBtn} onClick={() => setIsOpen(!isOpen)}>
          <span>📁 BRIEFCASE</span>
        </button>
      </div>

      {/* Briefcase desplegable */}
      {isOpen && (
        <div className={styles.briefcase}>
          <div className={styles.briefcaseHeader}>
            <span>PROJECT DOSSIER</span>
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>×</button>
          </div>
          <div className={styles.briefcaseContent}>
            <p><strong>Game:</strong> {gameReference}</p>
            <p><strong>Tech Stack:</strong></p>
            <div className={styles.techStack}>
              {techStack.map((tech, i) => (
                <span key={i} className={styles.techBadge}>{tech}</span>
              ))}
            </div>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Progress:</strong> {progress}%</p>
            <p><strong>Description:</strong> {description}</p>
          </div>
        </div>
      )}
    </div>
  );
};