// context/SystemContext.jsx
"use client";
import { createContext, useContext, useState, useCallback } from "react";

const SystemContext = createContext();

export function SystemProvider({ children }) {
  const [booted, setBooted] = useState(false);

  const resetBoot = useCallback(() => {
    setBooted(false);
  }, []);

  const value = {
    booted,
    setBooted,
    resetBoot,
  };

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystem must be used within a SystemProvider");
  }
  return context;
}