"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import styles from "../styles/floatingPanel.module.css";

export default function FloatingPanel({
  title,
  icon,
  children,
  position = "bottom-right",
  defaultOpen = true,
  width = "300px",
  maxHeight = "400px"
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMinimized, setIsMinimized] = useState(false);

  const positionStyles = {
    "bottom-right": {
      position: "fixed",
      bottom: "20px",
      right: "20px"
    },
    "top-right": {
      position: "fixed",
      top: "80px",
      right: "20px"
    },
    "bottom-left": {
      position: "fixed",
      bottom: "20px",
      left: "80px"
    },
    "top-left": {
      position: "fixed",
      top: "80px",
      left: "80px"
    }
  };

  const currentStyle = positionStyles[position] || positionStyles["bottom-right"];

  return (
    <motion.div
      className={styles.panelContainer}
      style={{
        ...currentStyle,
        width: isMinimized ? "auto" : width,
        maxHeight: isMinimized ? "auto" : maxHeight
      }}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Header */}
      <div className={styles.panelHeader}>
        <div className={styles.headerLeft}>
          {icon && <span className={styles.headerIcon}>{icon}</span>}
          <span className={styles.headerTitle}>{title}</span>
        </div>
        <div className={styles.headerRight}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className={styles.iconButton}
            aria-label={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className={styles.iconButton}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {!isMinimized && (
          <motion.div
            className={styles.panelContent}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
