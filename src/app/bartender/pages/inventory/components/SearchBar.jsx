"use client";

import { Search, Briefcase } from "lucide-react";
import styles from "../../../styles/inventory-styles/search-bar.module.css";

export default function SearchBar({ category, query, setQuery }) {
  return (
    <div className={styles.container}>

      {/* SISTEMA */}
      <div className={styles.title}>
        <Briefcase size={16} />
        <h2>{category.toUpperCase()}_SYSTEM</h2>
      </div>

      {/* SEARCH */}
      <div className={styles.search}>

        <Search size={14} className={styles.icon} />

        <input
          className={styles.input}
          placeholder="scan resource..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* animación scan */}
        {query && <div className={styles.scanline} />}

        {/* estado */}
        <span className={styles.status}>
          {query ? "SCANNING..." : "IDLE"}
        </span>

      </div>

    </div>
  );
}