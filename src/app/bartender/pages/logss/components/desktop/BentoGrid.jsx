"use client";

import React, { useState, useMemo, useCallback } from "react";

import { SOMA_APPS } from "../../logos/dataSoma";
import BentoItem from "./BentoItem";
import BentoSearch from "./BentoSearch";

import styles from "../../../../styles/logs-styles/desktop/bento-grid.module.css";

export default function BentoGrid({ onOpen }) {

  /* =========================
     STATE
  ========================= */
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [tagFilter, setTagFilter] = useState("ALL");
  const [activeId, setActiveId] = useState(null);

  /* =========================
     TAGS
  ========================= */
  const tags = useMemo(() => {
    const allTags = SOMA_APPS.map(a => a.tag);
    return ["ALL", ...new Set(allTags)];
  }, []);

  /* =========================
     FILTER ENGINE
  ========================= */
  const filteredApps = useMemo(() => {
    let apps = [...SOMA_APPS];

    if (query.trim()) {
      const q = query.toLowerCase();

      apps = apps.filter(app =>
        app.title.toLowerCase().includes(q) ||
        app.tag?.toLowerCase().includes(q) ||
        app.node?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "ALL") {
      apps = apps.filter(app => app.status === statusFilter);
    }

    if (tagFilter !== "ALL") {
      apps = apps.filter(app => app.tag === tagFilter);
    }

    return apps.sort((a, b) => b.corruption - a.corruption);
  }, [query, statusFilter, tagFilter]);

  /* =========================
     HANDLERS
  ========================= */
  const handleSelect = useCallback((id) => {
    setActiveId(prev => (prev === id ? null : id));
  }, []);

  const handleOpen = useCallback((app, pos) => {
    onOpen?.(app, pos);
  }, [onOpen]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div className={styles.wrapper}>

      {/* =========================
         TOP BAR
      ========================= */}
      <div className={styles.topBar}>

        <div className={styles.systemLabel}>
          SOMA_MODULE_EXPLORER.exe
        </div>

        <BentoSearch
          query={query}
          onChange={setQuery}
        />

      </div>

      {/* =========================
         FILTERS
      ========================= */}
      <div className={styles.filtersWrapper}>

        <div className={styles.filterGroup}>
          {["ALL", "STABLE", "CONNECTED", "CRITICAL", "OPTIMAL"].map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${
                statusFilter === f ? styles.active : ""
              }`}
              onClick={() => setStatusFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={styles.filterGroup}>
          {tags.map((tag) => (
            <button
              key={tag}
              className={`${styles.filterBtnAlt} ${
                tagFilter === tag ? styles.activeAlt : ""
              }`}
              onClick={() => setTagFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

      </div>

      {/* =========================
         GRID
      ========================= */}
      <div className={styles.grid}>

        {filteredApps.map((app) => (
          <BentoItem
            key={app.id}
            app={app}
            onOpen={handleOpen}
            onSelect={handleSelect}
            isActive={activeId === app.id}
          />
        ))}

      </div>

      {/* =========================
         EMPTY STATE
      ========================= */}
      {filteredApps.length === 0 && (
        <div className={styles.empty}>
          <span>NO SIGNAL FOUND</span>
        </div>
      )}

    </div>
  );
}