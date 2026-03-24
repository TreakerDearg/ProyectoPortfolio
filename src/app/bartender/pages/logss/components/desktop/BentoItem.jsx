"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import styles from "../../../../styles/logs-styles/desktop/soma-bento.module.css";

export default function BentoItem({ app, onOpen, onSelect, isActive }) {
  const Icon = app.icon;
  const ref = useRef(null);

  /* =========================
     HELPERS
  ========================= */
  const corruption = app.corruption;

  const stateClass =
    corruption > 0.7
      ? styles.critical
      : corruption > 0.4
      ? styles.warning
      : styles.stable;

  /* =========================
     SPAWN POSITION
  ========================= */
  const getSpawn = () => {
    if (!ref.current) return { x: 120, y: 80 };

    const rect = ref.current.getBoundingClientRect();

    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  /* =========================
     EVENTS
  ========================= */
  const handleClick = () => {
    onSelect?.(app.id);
  };

  const handleDoubleClick = () => {
    onOpen?.(app, getSpawn());
  };

  const handleTouch = () => {
    // 👉 mobile = abrir directo
    onOpen?.(app, getSpawn());
  };

  /* =========================
     MOTION
  ========================= */
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.96 },
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <motion.div
      ref={ref}
      layout
      className={`
        ${styles.item}
        ${styles[app.size] || ""}
        ${stateClass}
        ${isActive ? styles.active : ""}
      `}
      {...motionProps}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouch}
    >

      {/* =========================
         HEADER
      ========================= */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <Icon size={12} style={{ color: app.color }} />
          <span className={styles.title}>{app.title}</span>
        </div>

        <span className={styles.tag}>{app.tag}</span>
      </div>

      {/* =========================
         BODY
      ========================= */}
      <div className={styles.body}>
        <p className={styles.content}>
          {app.content}
        </p>

        <div className={styles.meta}>
          <span>{app.node}</span>
          <span>{app.security_clearance}</span>
        </div>
      </div>

      {/* =========================
         FOOTER
      ========================= */}
      <div className={styles.footer}>
        <span className={styles.status}>
          {app.status}
        </span>

        <div className={styles.corruptionWrapper}>
          <div className={styles.corruptionBar}>
            <motion.div
              className={styles.corruptionFill}
              initial={false}
              animate={{ width: `${corruption * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <span className={styles.corruptionText}>
            {(corruption * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* =========================
         CRITICAL OVERLAY
      ========================= */}
      {corruption > 0.7 && (
        <div className={styles.dangerOverlay}>
          SIGNAL LOSS
        </div>
      )}

      {/* =========================
         MOBILE QUICK VIEW (CSS driven)
      ========================= */}
      <div className={styles.mobileOverlay}>
        <Icon size={16} style={{ color: app.color }} />
        <span>{app.title}</span>
      </div>

      {/* =========================
         FX
      ========================= */}
      <div
        className={styles.glow}
        style={{ backgroundColor: app.color }}
      />

      <div className={styles.scanline} />
      <div className={styles.noise} />

    </motion.div>
  );
}