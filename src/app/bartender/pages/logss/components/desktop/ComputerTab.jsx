"use client";

import { motion } from "framer-motion";
import { X, Minus, Square, Menu } from "lucide-react";
import { usePortal } from "../hooks/usePortal";

import styles from "../../../../styles/logs-styles/desktop/computer-tab.module.css";

export default function ComputerTab({
  data,
  isActive,
  onClose,
  onFocus,
  onMinimize,
  onDragEnd,
}) {
  const portal = usePortal();

  const { id, app, z, position } = data;
  const Icon = app.icon;

  /* =========================
     SAFE POSITION
  ========================= */
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const safeX =
    typeof window !== "undefined"
      ? clamp(position?.x ?? 120, 0, window.innerWidth - 460)
      : 120;

  const safeY =
    typeof window !== "undefined"
      ? clamp(position?.y ?? 80, 0, window.innerHeight - 300)
      : 80;

  /* =========================
     STATE STYLE
  ========================= */
  const corruptionPercent = (app.corruption * 100).toFixed(0);

  const getStateClass = () => {
    if (app.corruption > 0.7) return styles.critical;
    if (app.corruption > 0.4) return styles.warning;
    return styles.stable;
  };

  /* =========================
     DRAG CONTROL
  ========================= */
  const handleDragEnd = (e, info) => {
    onDragEnd?.(id, {
      x: safeX + info.offset.x,
      y: safeY + info.offset.y,
    });
  };

  /* =========================
     STOP PROPAGATION (ANTI-DRAG)
  ========================= */
  const stopDrag = (e) => {
    e.stopPropagation();
  };

  /* =========================
     RENDER
  ========================= */
  return portal(
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onMouseDown={() => onFocus(id)}
      onDragEnd={handleDragEnd}
      style={{
        zIndex: z,
        position: "absolute",
      }}
      className={`
        ${styles.window}
        ${getStateClass()}
        ${isActive ? styles.active : styles.inactive}
      `}
      initial={{
        opacity: 0,
        scale: 0.92,
        x: safeX,
        y: safeY,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{ duration: 0.16 }}
    >
      {/* =====================
          FRAME
      ===================== */}
      <div className={styles.frame}>

        {/* =====================
            TITLE BAR
        ===================== */}
        <div className={styles.titleBar}>

          <div className={styles.left}>
            <Menu size={11} />
            <Icon size={12} style={{ color: app.color }} />
            <span className={styles.title}>
              {app.title}
            </span>
          </div>

          <div className={styles.actions} onMouseDown={stopDrag}>
            <button onClick={() => onMinimize(id)}>
              <Minus size={10} />
            </button>

            <button>
              <Square size={9} />
            </button>

            <button onClick={() => onClose(id)}>
              <X size={10} />
            </button>
          </div>

        </div>

        {/* =====================
            MENU BAR
        ===================== */}
        <div className={styles.menuBar} onMouseDown={stopDrag}>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>System</span>
          <span>Help</span>
        </div>

        {/* =====================
            BODY
        ===================== */}
        <div className={styles.body} onMouseDown={stopDrag}>

          {/* SIDEBAR */}
          <div className={styles.sidebar}>

            <div className={styles.sidebarSection}>
              <span className={styles.label}>STATUS</span>
              <strong style={{ color: app.color }}>
                {app.status}
              </strong>
            </div>

            <div className={styles.sidebarSection}>
              <span className={styles.label}>CORRUPTION</span>

              <div className={styles.progress}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${corruptionPercent}%`,
                    background: app.color,
                  }}
                />
              </div>

              <span className={styles.percent}>
                {corruptionPercent}%
              </span>
            </div>

          </div>

          {/* MAIN */}
          <div className={styles.main}>

            <div className={styles.panel}>
              <div className={styles.panelTitle}>SYSTEM INFO</div>

              <div className={styles.grid}>
                <span>NODE</span>
                <span>{app.node}</span>

                <span>CLEARANCE</span>
                <span>{app.security_clearance}</span>

                <span>TAG</span>
                <span>{app.tag}</span>
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panelTitle}>COMPOSITION</div>

              <div className={styles.block}>
                <strong>BASE</strong>
                <span>{app.recipe.base}</span>
              </div>

              <div className={styles.block}>
                <strong>MODIFIERS</strong>
                {app.recipe.modifiers.map((m, i) => (
                  <span key={i}>▸ {m}</span>
                ))}
              </div>

              <div className={styles.block}>
                <strong>ADDITIVES</strong>
                {app.recipe.additives.map((a, i) => (
                  <span key={i}>▸ {a}</span>
                ))}
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panelTitle}>PROFILE DATA</div>

              <div className={styles.grid}>
                <span>FLAVOUR</span>
                <span>{app.recipe.flavour_profile}</span>

                <span>GLASS</span>
                <span>{app.recipe.glassware}</span>

                <span>METHOD</span>
                <span>{app.recipe.method}</span>
              </div>
            </div>

          </div>

        </div>

        {/* =====================
            STATUS BAR
        ===================== */}
        <div className={styles.statusBar} onMouseDown={stopDrag}>
          <span>READY</span>
          <span>{app.node}</span>
          <span>{corruptionPercent}%</span>
        </div>

      </div>

      {/* =====================
          FX
      ===================== */}
      <div
        className={styles.glow}
        style={{ backgroundColor: app.color }}
      />
      <div className={styles.scanline} />
      <div className={styles.noise} />

    </motion.div>
  );
}