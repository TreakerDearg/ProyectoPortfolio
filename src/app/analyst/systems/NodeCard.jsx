"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useAnalysis } from "../context/AnalysisContext";

import ArasakaNode from "./nodes/ArasakaNode";
import MilitechNode from "./nodes/MilitechNode";
import KangTaoNode from "./nodes/KangTaoNode";
import {NeutralNode} from "./nodes/NeutralNode";

import styles from "../styles/Styles-C/nodeCard.module.css";

const VIEWPORT_BOUNDS = {
  minX: 0,
  minY: 0,
  maxX: 4800,
  maxY: 4800
};

export const NodeCard = ({
  node,
  handleDrag = () => {},
  isSelected,
  isSystemAlert,
  onConnectionStart = () => {},
  onConnectionEnd = () => {},
  isConnecting = false,
  onContextMenu = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { setSelectedNode } = useAnalysis();
  
  const dragX = useMotionValue(node.x);
  const dragY = useMotionValue(node.y);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll during drag on mobile
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  }, [isMobile]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }, []);

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

  // Función interna para drag con bounds checking
  const onDragInternal = useCallback(
    (e, info) => {
      const newX = node.x + info.delta.x;
      const newY = node.y + info.delta.y;
      
      // Clamp to viewport bounds
      const clampedX = Math.max(VIEWPORT_BOUNDS.minX, Math.min(newX, VIEWPORT_BOUNDS.maxX));
      const clampedY = Math.max(VIEWPORT_BOUNDS.minY, Math.min(newY, VIEWPORT_BOUNDS.maxY));
      
      const clampedDelta = {
        x: clampedX - node.x,
        y: clampedY - node.y
      };
      
      handleDrag(node.id, clampedDelta);
    },
    [node.id, node.x, node.y, handleDrag]
  );

  // Connection handlers
  const handleMouseDown = useCallback((e) => {
    if (e.shiftKey) {
      onConnectionStart(node, e);
    }
  }, [node, onConnectionStart]);

  const handleMouseUp = useCallback(() => {
    if (isConnecting) {
      onConnectionEnd(node);
    }
  }, [isConnecting, onConnectionEnd, node]);

  return (
    <motion.div
      drag
      dragMomentum
      dragElastic={0.1}
      dragTransition={{ 
        power: 0.2,
        timeConstant: 200,
        bounceStiffness: 300,
        bounceDamping: 20
      }}
      onDrag={onDragInternal}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => onContextMenu(node, e)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(node);
      }}
      style={{
        x: node.x,
        y: node.y,
        position: "absolute",
        zIndex: isDragging ? 150 : (isSelected ? 100 : 20),
        cursor: isConnecting ? "crosshair" : (isHovered ? "grab" : "default"),
        width: isMobile ? "35vw" : "200px",
        height: isMobile ? "14vw" : "80px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={node.tooltip || ""}
      className={`${styles.nodeWrapper} ${
        isSelected ? styles.wrapperSelected : ""
      } ${isMobile ? styles.mobileNode : ""} ${
        isHovered ? styles.glitchHover : ""
      } ${isSelected ? styles.glitchSelected : ""} ${
        isConnecting ? styles.connectingMode : ""
      }`}
    >
      {/* Componente de marca */}
      <BrandSkin
        node={node}
        isSelected={isSelected}
        isHovered={isHovered}
        isSystemAlert={isSystemAlert}
        isMobile={isMobile}
        handleDrag={handleDrag}
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
