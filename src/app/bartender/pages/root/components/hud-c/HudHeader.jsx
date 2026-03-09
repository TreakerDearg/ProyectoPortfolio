"use client";
import { motion } from "framer-motion";
import { Radio, BatteryCharging, Crosshair, Search, X } from "lucide-react";
import { useState } from "react";
import styles from "../../../../styles/root-styles/c-styles-comps/HudHeader.module.css";

export default function HudHeader({ onSearch, searchTerm = "" }) {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <header className={styles.hudHeader}>
      {/* Sección Izquierda: Identidad */}
      <div className={styles.brandSection}>
        <motion.div 
          animate={{ rotate: [0, 90, 0] }} 
          transition={{ duration: 4, repeat: Infinity }}
          className={styles.iconBox}
        >
          <Crosshair size={20} color="#ff3c00" />
        </motion.div>
        <div>
          <h1 className={styles.title}>RAVEN_SYSTEMS <span className={styles.version}>v4.0.9</span></h1>
          <div className={styles.subLine}>INTEGRATED COMBAT INTERFACE</div>
        </div>
      </div>

      {/* Sección Central: Buscador y escáner */}
      <div className={styles.centerSection}>
        <div className={styles.searchContainer}>
          <Search size={14} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="SEARCH UNIT DESIGNATION..."
            value={inputValue}
            onChange={handleChange}
            className={styles.searchInput}
          />
          {inputValue && (
            <button onClick={clearSearch} className={styles.clearButton}>
              <X size={14} />
            </button>
          )}
        </div>
        <div className={styles.scannerLine}>
          <motion.div 
            className={styles.scanningDot}
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Sección Derecha: Telemetría */}
      <div className={styles.hudStats}>
        <div className={styles.statItem}>
          <Radio size={14} className={styles.flickerIcon} />
          <span>COMMS: ONLINE</span>
        </div>
        <div className={styles.statItem}>
          <BatteryCharging size={14} />
          <span>EN: 100%</span>
        </div>
        <div className={styles.statusBadge}>
          AC_LINK_ESTABLISHED
        </div>
      </div>
    </header>
  );
}