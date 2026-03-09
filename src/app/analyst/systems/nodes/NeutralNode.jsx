"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Styles-C/nodes/neutralNode.module.css";

export function NeutralNode({
  node,
  handleDrag = () => {},
  isSelected,
  isHovered,
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={(e, info) => handleDrag(node.id, info.delta)}
      style={{
        x: node.x,
        y: node.y,
        position: "absolute",
        zIndex: isSelected ? 100 : 10,
      }}
    >
      <div
        className={`${styles.neutralContainer} ${
          isSelected ? styles.selected : ""
        }`}
      >
        <div className={styles.terminalHeader}>
          <span className={styles.nodeId}>
            USR_{node.id?.split("-")[1] || "RT"}
          </span>
        </div>
        <div className={styles.content}>
          <span className={styles.nodeName}>{node.name}</span>
        </div>

        {/* Botón de conexión */}
        {node.path && (
          <div className={styles.connectButtonContainer}>
            <button
              className={styles.connectButton}
              onClick={() => window.open(node.path, "_blank")}
            >
              CONECTAR
            </button>
          </div>
        )}

        {/* Tooltip interno */}
        {node.tooltip && (
          <div className={styles.tooltip}>
            <span>{node.tooltip}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}