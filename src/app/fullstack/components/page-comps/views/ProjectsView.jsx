"use client";
import React from "react";
import { ProjectCard } from "../ProjectCard";
import { projectsData } from "../../../data/projects";
import styles from "../../../styles/view-styles/ProjectsView.module.css";

export const ProjectsView = () => {
  return (
    <div className={styles.viewContainer}>
      <div className={styles.contentHeader}>
        <h1 className={styles.mainTitle}>PROYECTOS</h1>
        <div className={styles.titleUnderline} />
      </div>
      <div className={styles.projectsGrid}>
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.name}
            status={project.status}
            description={project.description}
            techStack={project.techStack}
            progress={project.progress}
            gameReference={project.gameReference}
          />
        ))}
      </div>
      {/* Pequeño indicador decorativo de fin de lista (opcional) */}
      <div className={styles.endMarker}>▼ FIN DE TRANSMISIÓN ▼</div>
    </div>
  );
};