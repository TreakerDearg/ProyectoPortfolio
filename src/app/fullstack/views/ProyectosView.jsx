"use client";
import { motion } from "framer-motion";
import styles from "../styles/views/Proyectos.module.css";

const PROJECTS = [
  { addr: "0xFD001A", title: "NEON_OS", status: "[STABLE_BUILD]", desc: "Sustrato de interfaz para portfolio-os. Visualización de telemetría de kernel a través de buffers dinámicos.", tags: ["REACT", "FRAMER"] },
  { addr: "0xBF992X", title: "VOID_VAULT", status: "[ENCRYPTED]", desc: "Repositorio de fragmentos de seguridad. Los módulos de autenticación operan sobre KioscoAlpaso.", tags: ["NEXT_JS", "MONGO"] },
  { addr: "0xEE4411", title: "GRID_DRIVE", status: "[ACTIVE]", desc: "Fragmento de motor espacial. Renderizado de shaders para interfaces tácticas y sistemas industriales.", tags: ["WEBGL", "GLSL"] },
];

export default function ProyectosView() {
  return (
    <div className={styles.proyectosContainer}>
      <header className={styles.viewHeader}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.mainTitle}>DEGRADED_MODULES</h1>
          <p className={styles.warningText}>CRITICAL_WARNING: HARDWARE DEGRADATION DETECTED. PROJECT_LEAK IN PROGRESS.</p>
        </div>
      </header>

      <div className={styles.gridContainer}>
        {PROJECTS.map((proj, i) => (
          <motion.div 
            key={proj.addr}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={styles.projectCard}
          >
            <div className={styles.cardHeader}>
              <span className={styles.addr}>ADDR: {proj.addr}</span>
              <span className={styles.status}>{proj.status}</span>
            </div>
            
            <h2 className={styles.projTitle}>{proj.title}</h2>
            <p className={styles.projDesc}>{proj.desc}</p>
            
            <div className={styles.cardFooter}>
              <div className={styles.tagGroup}>
                {proj.tags.map(tag => <span key={tag} className={styles.tag}>[{tag}]</span>)}
              </div>
              <div className={styles.loadingBar} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}