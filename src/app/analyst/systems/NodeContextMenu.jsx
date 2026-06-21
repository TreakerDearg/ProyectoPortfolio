"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Trash2, Copy, Eye, EyeOff, Lock, Unlock, Shield } from "lucide-react";
import styles from "../styles/Styles-C/nodeContextMenu.module.css";

export const NodeContextMenu = ({ node, position, onClose, onAction }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAction = (action) => {
    onAction?.(action, node);
    onClose();
  };

  const menuItems = [
    { icon: Link2, label: "Connect", action: "connect" },
    { icon: Copy, label: "Duplicate", action: "duplicate" },
    { icon: Eye, label: "View Details", action: "view" },
    { icon: Shield, label: "Security Info", action: "security" },
    { icon: Lock, label: "Lock Node", action: "lock" },
    { icon: Unlock, label: "Unlock Node", action: "unlock" },
    { icon: EyeOff, label: "Hide Node", action: "hide" },
    { icon: Trash2, label: "Delete", action: "delete", danger: true },
  ];

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          ref={menuRef}
          className={styles.contextMenu}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <div className={styles.menuHeader}>
            <span className={styles.nodeName}>{node.name}</span>
            <span className={styles.nodeId}>{node.id}</span>
          </div>
          <div className={styles.menuItems}>
            {menuItems.map((item) => (
              <button
                key={item.action}
                className={`${styles.menuItem} ${item.danger ? styles.danger : ""}`}
                onClick={() => handleAction(item.action)}
              >
                <item.icon size={14} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
