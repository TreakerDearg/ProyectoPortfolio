"use client";

import { motion } from "framer-motion";
import {
  X,
  Minus,
  Square,
  Menu,
  Cpu,
  Shield,
  Activity,
  Database,
  FlaskConical,
  HardDrive,
  Wifi,
} from "lucide-react";

import styles from "../../../../styles/logs-styles/desktop/soma-window.module.css";

export default function Window({
  data,
  onClose,
  onFocus,
}) {
  const { id, app, z } = data;
  const Icon = app.icon;

  /* =========================
     MOBILE MODE (SIEMPRE)
  ========================= */

  return (
    <motion.div
      onClick={() => onFocus(id)}
      style={{
        zIndex: z,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      className={`${styles.window} ${styles.mobile}`}
      initial={{
        y: "100%",
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: "100%",
        opacity: 0,
      }}
      transition={{
        duration: 0.28,
        ease: "easeOut",
      }}
    >

      {/* =====================
          DRAG HANDLE (UX PRO)
      ===================== */}
      <div
        style={{
          width: "100%",
          height: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "grab",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "4px",
            borderRadius: "2px",
            background: "rgba(255,255,255,0.3)",
          }}
        />
      </div>

      {/* =====================
          TITLE BAR
      ===================== */}
      <div className={styles.titleBar}>

        <div className={styles.titleLeft}>
          <button className={styles.sysMenuBtn}>
            <Menu size={12} />
          </button>

          <Icon size={14} style={{ color: app.color }} />
          <span>{app.title}</span>
        </div>

        <div className={styles.titleRight}>
          <button onClick={() => onClose(id)} className={styles.closeBtn}>
            <X size={14} />
          </button>
        </div>

      </div>

      {/* =====================
          CONTENT
      ===================== */}
      <div className={styles.content}>

        {/* DESCRIPTION */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Activity size={12} />
            <span>DESCRIPCIÓN</span>
          </div>
          <p>{app.content}</p>
        </div>

        {/* METADATA */}
        <div className={styles.metadataList}>
          <div className={styles.metaItem}>
            <Cpu size={12} />
            <span><strong>Nodo:</strong> {app.node}</span>
          </div>

          <div className={styles.metaItem}>
            <Shield size={12} />
            <span><strong>Clearance:</strong> {app.security_clearance}</span>
          </div>

          <div className={styles.metaItem}>
            <Database size={12} />
            <span><strong>Estado:</strong> {app.status}</span>
          </div>

          <div className={styles.metaItem}>
            <HardDrive size={12} />
            <span><strong>Versión:</strong> 2.1.0</span>
          </div>

          <div className={styles.metaItem}>
            <Wifi size={12} />
            <span><strong>Señal:</strong> 87%</span>
          </div>
        </div>

        {/* CORRUPTION */}
        <div className={styles.corruptionBlock}>
          <span>CORRUPCIÓN</span>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${app.corruption * 100}%` }}
            />
          </div>

          <span className={styles.percent}>
            {(app.corruption * 100).toFixed(0)}%
          </span>
        </div>

        {/* RECIPE */}
        {app.recipe && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FlaskConical size={12} />
              <span>RECETA</span>
            </div>

            <div className={styles.recipeContainer}>

              <div className={styles.recipeItem}>
                <strong>BASE</strong>
                <p>{app.recipe.base}</p>
              </div>

              {app.recipe.modifiers && (
                <div className={styles.recipeItem}>
                  <strong>MODIFICADORES</strong>
                  <ul>
                    {app.recipe.modifiers.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {app.recipe.additives && (
                <div className={styles.recipeItem}>
                  <strong>ADITIVOS</strong>
                  <ul>
                    {app.recipe.additives.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.recipeItem}>
                <strong>PERFIL</strong>
                <p>{app.recipe.flavour_profile}</p>
              </div>

              <div className={styles.recipeItem}>
                <strong>MÉTODO</strong>
                <p>{app.recipe.method}</p>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* =====================
          STATUS BAR
      ===================== */}
      <div className={styles.statusBar}>
        <span>READY</span>
        <span>CPU {Math.floor(Math.random() * 30) + 10}%</span>
      </div>

      {/* FX */}
      <div className={styles.glow} style={{ backgroundColor: app.color }} />
      <div className={styles.scanline} />

    </motion.div>
  );
}