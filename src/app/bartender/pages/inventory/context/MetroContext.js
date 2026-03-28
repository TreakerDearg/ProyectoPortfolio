"use client";

import { createContext, useContext } from "react";

export const MetroContext = createContext(null);

export const useMetro = () => {
  const context = useContext(MetroContext);
  if (!context) throw new Error("Use metro debe ser usado con MetroProvider");
  return context;
};

export const MetroProvider = MetroContext.Provider;