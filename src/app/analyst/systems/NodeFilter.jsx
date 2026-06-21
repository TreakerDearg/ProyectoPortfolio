"use client";
import React, { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import styles from "../styles/Styles-C/nodeFilter.module.css";

export const NodeFilter = ({ nodes, onFilter, onGroup }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    company: "all",
    securityLevel: "all",
    status: "all"
  });
  const [groupBy, setGroupBy] = useState("none");

  const companies = ["all", "arasaka", "militech", "kangtao", "neutral"];
  const securityLevels = ["all", "alpha", "class_a", "class_s", "normal"];
  const statuses = ["all", "active", "inactive", "critical"];
  const groupOptions = ["none", "company", "securityLevel", "status"];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const handleGroupChange = (value) => {
    setGroupBy(value);
    onGroup?.(value);
  };

  const clearFilters = () => {
    const clearedFilters = {
      company: "all",
      securityLevel: "all",
      status: "all"
    };
    setFilters(clearedFilters);
    setGroupBy("none");
    onFilter?.(clearedFilters);
    onGroup?.("none");
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== "all").length + (groupBy !== "none" ? 1 : 0);

  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterToggle} ${activeFilterCount > 0 ? styles.hasActive : ""}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Filter size={14} />
        <span>Filter</span>
        {activeFilterCount > 0 && <span className={styles.badge}>{activeFilterCount}</span>}
        <ChevronDown size={14} className={isExpanded ? styles.rotated : ""} />
      </button>

      {isExpanded && (
        <div className={styles.filterPanel}>
          <div className={styles.filterHeader}>
            <span className={styles.filterTitle}>Node Filters</span>
            {activeFilterCount > 0 && (
              <button className={styles.clearBtn} onClick={clearFilters}>
                <X size={12} />
                Clear
              </button>
            )}
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Company</label>
            <select
              className={styles.filterSelect}
              value={filters.company}
              onChange={(e) => handleFilterChange("company", e.target.value)}
            >
              {companies.map(c => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Security Level</label>
            <select
              className={styles.filterSelect}
              value={filters.securityLevel}
              onChange={(e) => handleFilterChange("securityLevel", e.target.value)}
            >
              {securityLevels.map(l => (
                <option key={l} value={l}>
                  {l.replace("_", " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Status</label>
            <select
              className={styles.filterSelect}
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              {statuses.map(s => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Group By</label>
            <select
              className={styles.filterSelect}
              value={groupBy}
              onChange={(e) => handleGroupChange(e.target.value)}
            >
              {groupOptions.map(g => (
                <option key={g} value={g}>
                  {g.replace(/([A-Z])/g, " $1").trim().toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterStats}>
            <span className={styles.statLabel}>Visible:</span>
            <span className={styles.statValue}>
              {nodes.filter(n => {
                if (filters.company !== "all" && n.company?.toLowerCase() !== filters.company) return false;
                if (filters.securityLevel !== "all" && n.securityLevel?.toLowerCase() !== filters.securityLevel) return false;
                if (filters.status !== "all" && n.status?.toLowerCase() !== filters.status) return false;
                return true;
              }).length} / {nodes.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
