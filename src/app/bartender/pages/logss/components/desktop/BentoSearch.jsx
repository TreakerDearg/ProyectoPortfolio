"use client";

import styles from "../../../../styles/logs-styles/desktop/bento-search.module.css";

export default function BentoSearch({
  query,
  onChange,
  placeholder = "SEARCH_NODE / TAG / SIGNAL...",
}) {
  return (
    <div className={styles.searchWrapper}>

      <span className={styles.label}>
        FIND.exe
      </span>

      <input
        className={styles.input}
        value={query}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* CURSOR FX */}
      <div className={styles.cursor} />

    </div>
  );
}