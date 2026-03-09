"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import DrinkCard from "./DrinkCard";
import { DRINKS } from "../../data/drinks";
import styles from "../../../../styles/root-styles/c-styles-comps/ModuleGrid.module.css";

export default function ModuleGrid({ onSelectDrink, filter = "ALL", searchTerm = "" }) {
  // Filtrado combinado: tipo + búsqueda textual
  const filteredDrinks = DRINKS.filter(drink => {
    const matchesType = filter === "ALL" || drink.type === filter;
    const matchesSearch = searchTerm === "" || 
      drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drink.origin.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className={styles.gridWrapper}>
      {/* Cabecera con contador dinámico */}
      <div className={styles.gridHeader}>
        <span className={styles.headerTitle}>UNIT REGISTRY</span>
        <span className={styles.headerCount}>
          {filteredDrinks.length} UNIT{filteredDrinks.length !== 1 ? 'S' : ''} ACTIVE
        </span>
      </div>

      {/* Contenedor scrolleable con grid responsivo */}
      <motion.div 
        className={styles.gridContainer}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredDrinks.map((drink) => (
            <motion.div
              key={drink.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <DrinkCard 
                drink={drink} 
                onClick={() => onSelectDrink(drink)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Estado vacío con mensaje detallado */}
        {filteredDrinks.length === 0 && (
          <motion.div 
            className={styles.noData}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertTriangle size={20} />
            <span>
              [!] NO_UNITS_DETECTED
              {filter !== "ALL" && ` | TYPE: ${filter}`}
              {searchTerm && ` | SEARCH: "${searchTerm}"`}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}