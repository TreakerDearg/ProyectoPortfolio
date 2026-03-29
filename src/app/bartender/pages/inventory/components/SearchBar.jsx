"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Briefcase, X, Scan } from "lucide-react";
import styles from "../../../styles/inventory-styles/search-bar.module.css";

export default function SearchBar({ category, query, setQuery }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className={`${styles.container} ${isFocused ? styles.focused : ""}`}>
      {/* Título del sistema */}
      <div className={styles.title}>
        <Briefcase size={16} className={styles.briefcaseIcon} />
        <h2>{category.toUpperCase()}_SYSTEM</h2>
        {query && (
          <motion.div
            className={styles.scanBadge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Scan size={12} />
            <span>SCAN</span>
          </motion.div>
        )}
      </div>

      {/* Área de búsqueda */}
      <div className={styles.searchWrapper}>
        <div className={styles.search}>
          <Search size={14} className={styles.icon} />
          <input
            className={styles.input}
            placeholder="SCAN RESOURCE..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={styles.clearButton}
                onClick={handleClear}
              >
                <X size={12} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Indicador de estado */}
        <div className={styles.statusContainer}>
          <div className={`${styles.statusLed} ${query ? styles.active : ""}`} />
          <span className={styles.statusText}>
            {query ? "SCANNING..." : "IDLE"}
          </span>
        </div>

        {/* Línea de escaneo animada */}
        {query && (
          <motion.div
            className={styles.scanlineOverlay}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5
            }}
          />
        )}
      </div>
    </div>
  );
}