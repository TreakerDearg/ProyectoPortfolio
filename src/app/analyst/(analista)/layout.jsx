"use client";

import React from "react";
import { SystemProvider, useSystemState } from "../context/useSystemState"; 
import { AnalysisProvider } from "../context/AnalysisContext";

import ArasakaHeader from "../layout/ArasakaHeader";
import ArasakaFooter from "../layout/ArasakaFooter";
import ArasakaSidebarLeft from "../layout/ArasakaSidebarLeft";
import ArasakaSidebarRight from "../layout/ArasakaSidebarRight";

import "../styles/HomeCSS/layout.css";

// Componente interno para manejar la lógica de clases CSS sin romper el Provider
function ArasakaLayoutContent({ children }) {
  const { isSystemActive } = useSystemState();

  return (
    <div className={`arasaka-root-container ${!isSystemActive ? "system-offline" : ""}`}>
      <ArasakaHeader />

      <div className="arasaka-main-layout">
        <ArasakaSidebarLeft />
        <main className="arasaka-content-area">
          {children}
        </main>
        <ArasakaSidebarRight />
      </div>

      <ArasakaFooter />
      
      {/* Estilo rápido para el efecto de apagado */}
      <style jsx global>{`
        .system-offline {
          filter: grayscale(1) brightness(0.5) contrast(1.2);
          transition: all 0.8s ease;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

export default function ArasakaLayout({ children }) {
  return (
    <SystemProvider>
      <AnalysisProvider>
        <ArasakaLayoutContent>
          {children}
        </ArasakaLayoutContent>
      </AnalysisProvider>
    </SystemProvider>
  );
}