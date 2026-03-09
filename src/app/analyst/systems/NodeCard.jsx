"use client";
import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useAnalysis } from "../context/AnalysisContext";

import ArasakaNode from "./nodes/ArasakaNode";
import MilitechNode from "./nodes/MilitechNode";
import KangTaoNode from "./nodes/KangTaoNode";
import {NeutralNode} from "./nodes/NeutralNode";

import styles from "../styles/Styles-C/nodeCard.module.css";

export const NodeCard = ({
  node,
  handleDrag = () => {},
  isSelected,
  isSystemAlert,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setSelectedNode } = useAnalysis();

  // Selecciona el componente correcto según la compañía
  const BrandSkin = useMemo(() => {
    switch ((node.company || "").toLowerCase()) {
      case "arasaka":
        return ArasakaNode;
      case "militech":
        return MilitechNode;
      case "kang_tao":
        return KangTaoNode;
      case "neutral":
        return NeutralNode;
      default:
        return NeutralNode;
    }
  }, [node.company]);

  // Función interna para drag
  const onDragInternal = useCallback(
    (e, info) => handleDrag(node.id, info.delta),
    [node.id, handleDrag]
  );

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={onDragInternal}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(node);
      }}
      style={{
        x: node.x,
        y: node.y,
        position: "absolute",
        zIndex: isSelected ? 100 : 20,
        cursor: isHovered ? "grab" : "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={node.tooltip || ""}
      className={`${styles.nodeWrapper} ${
        isSelected ? styles.wrapperSelected : ""
      }`}
    >
      {/* Componente de marca */}
      <BrandSkin
        node={node}
        isSelected={isSelected}
        isHovered={isHovered}
        isSystemAlert={isSystemAlert}
        handleDrag={handleDrag} // <-- seguro para NeutralNode
      />

      {/* Glow de selección */}
      {isSelected && (
        <motion.div
          layoutId="selectionGlow"
          className={styles.selectionGlow}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            boxShadow: `0 0 20px ${node.color || "var(--primary-glow)"}`,
            borderColor: node.color || "var(--primary)",
          }}
        />
      )}
    </motion.div>
  );
};
