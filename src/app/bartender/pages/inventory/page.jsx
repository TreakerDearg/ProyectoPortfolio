/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { motion } from "framer-motion";
import { useMetro } from "./context/MetroContext";
import BriefcaseGrid from "./components/BriefcaseGrid";
import styles from "../../styles/inventory-styles/metro.module.css";

export default function InventoryPage() {
  const { allItems, system } = useMetro();

  // Contar documentos y bebidas
  const documentCount = allItems.filter(item => item.type === 'folder').length;
  const drinkCount = allItems.filter(item => item.type === 'drink').length;
  const totalCount = allItems.length;

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cabecera del inventario */}
      <div className={styles.pageHeader}>
        <div className={styles.titleSection}>
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            D6 ARCHIVE
          </motion.h1>
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {system?.os_version || "VOS-DARK-33"} // INVENTORY v1.0
          </motion.p>
        </div>
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span>📁 DOCUMENTS</span>
            <strong>{documentCount}</strong>
          </div>
          <div className={styles.stat}>
            <span>🍾 DRINKS</span>
            <strong>{drinkCount}</strong>
          </div>
          <div className={styles.stat}>
            <span>📦 TOTAL</span>
            <strong>{totalCount}</strong>
          </div>
          <div className={`${styles.status} ${system?.status === "CRITICAL_SYSTEM_DEGRADATION" ? styles.warning : ""}`}>
            <span className={styles.statusLight} />
            <span>SYSTEM: {system?.status === "CRITICAL_SYSTEM_DEGRADATION" ? "DEGRADED" : "ACTIVE"}</span>
          </div>
        </div>
      </div>

      {/* Grid de inventario */}
      <div className={styles.content}>
        <BriefcaseGrid />
      </div>
    </motion.div>
  );
}