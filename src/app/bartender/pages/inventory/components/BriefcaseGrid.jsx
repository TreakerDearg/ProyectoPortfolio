"use client";

import { useContext, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Filter,
  FolderOpen,
  Package,
  ShoppingCart,
  Eye,
  Syringe,
  Gauge,
  Shield,
  Star,
  Heart,
  Lock,
  Zap,
  FileText,
} from "lucide-react";
import { MetroContext } from "../context/MetroContext";
import styles from "../../../styles/inventory-styles/briefcase-grid.module.css";
import BriefcaseItem from "./BriefcaseItem";

// Helper to extract category for filtering
const getItemCategory = (item) => {
  if (item.type === "drink") return item.itemCategory;
  if (item.type === "folder") return item.category;
  return "UNKNOWN";
};

// Helper to get display label (sin emojis)
const getCategoryLabel = (cat) => {
  const labels = {
    logistics: "Logistics",
    commerce: "Commerce",
    intel: "Intel",
    biomedical: "Biomedical",
    engineering: "Engineering",
    military: "Military",
    // Drink tags (por si se filtran por tag)
    PREMIUM: "Premium",
    MEDIC: "Medic",
    SECRET: "Secret",
    SCRAP: "Scrap",
    COMMON: "Common",
  };
  return labels[cat] || cat;
};

// Mapa de iconos por categoría
const getCategoryIcon = (cat) => {
  const icons = {
    logistics: Package,
    commerce: ShoppingCart,
    intel: Eye,
    biomedical: Syringe,
    engineering: Gauge,
    military: Shield,
    PREMIUM: Star,
    MEDIC: Heart,
    SECRET: Lock,
    SCRAP: Zap,
    COMMON: FileText,
  };
  const Icon = icons[cat];
  return Icon ? <Icon size={12} /> : <FileText size={12} />;
};

export default function BriefcaseGrid() {
  const { allItems, currentCategory, setCurrentCategory } = useContext(MetroContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    currentCategory === "all" ? "ALL" : currentCategory.toUpperCase()
  );

  // Update dropdown when sidebar category changes
  useEffect(() => {
    setSelectedCategory(currentCategory === "all" ? "ALL" : currentCategory.toUpperCase());
  }, [currentCategory]);

  // Get all unique categories from items
  const categories = useMemo(() => {
    const cats = new Set();
    allItems.forEach((item) => {
      const cat = getItemCategory(item);
      if (cat) cats.add(cat);
    });
    return Array.from(cats).sort();
  }, [allItems]);

  // Filter items based on search and selected category
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const name = (item.name || item.title || "").toLowerCase();
      const matchesSearch = name.includes(searchTerm.toLowerCase());

      const itemCat = getItemCategory(item);
      const matchesCategory = selectedCategory === "ALL" || itemCat === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allItems, searchTerm, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };

  return (
    <div className={styles.briefcase}>
      <div className={styles.filterBar}>
        {/* Barra de búsqueda */}
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="SEARCH DOCUMENTS OR DRINKS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className={styles.clearSearch}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filtro por categoría */}
        <div className={styles.categoryFilter}>
          <Filter size={16} className={styles.filterIcon} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="ALL">ALL CATEGORIES</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {getCategoryLabel(cat)}
              </option>
            ))}
          </select>
        </div>

        {/* Botón para limpiar filtros */}
        {filteredItems.length !== allItems.length && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("ALL");
              setCurrentCategory("all");
            }}
            className={styles.clearFilters}
          >
            CLEAR FILTERS
          </button>
        )}

        {/* Contador de elementos */}
        <div className={styles.itemCount}>
          {filteredItems.length} / {allItems.length} ITEMS
        </div>
      </div>

      {/* Grid de elementos */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={styles.grid}
      >
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, i) => (
              <BriefcaseItem key={item.id} item={item} index={i} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={styles.empty}
            >
              <FolderOpen size={48} strokeWidth={1} />
              <p>NO DOCUMENTS FOUND</p>
              <span>TRY ADJUSTING YOUR FILTERS</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}