"use client";

import { createContext, useContext, useMemo } from "react";

// Definimos la forma de nuestro contexto (opcional: con TypeScript esto sería un type/interface)
const DEFAULT_CONTEXT = {
  currentCategory: "all",
  setCurrentCategory: () => {},
  allItems: [],
  allDrinks: {},
  allFolders: [],
  system: { radiation_level: 0 },
  recipes: [],
};

export const MetroContext = createContext(DEFAULT_CONTEXT);

/**
 * Hook para usar el contexto Metro de forma segura
 */
export const useMetro = () => {
  const context = useContext(MetroContext);
  if (!context) throw new Error("useMetro debe usarse dentro de un MetroProvider");
  return context;
};

/**
 * MetroProvider avanzado
 * - Permite pasar valores parciales
 * - Combina con defaults
 */
export function MetroProvider({ children, value }) {
  // Memoizamos para evitar renders innecesarios
  const contextValue = useMemo(() => ({
    ...DEFAULT_CONTEXT,
    ...value,
  }), [value]);

  return (
    <MetroContext.Provider value={contextValue}>
      {children}
    </MetroContext.Provider>
  );
}