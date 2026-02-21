// src/app/analyst/(analista)/layout.jsx
"use client";
import React from 'react';
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

import { SidebarLeft } from "../layout/SidebarLeft";
import { SidebarRight } from "../layout/SidebarRight"; 
import { MainSystem } from "../layout/MainSystem";
import { AnalysisProvider } from "../context/AnalysisContext";

import "../styles/HomeCSS/layout.css";

export default function AnalistaLayout({ children }) {
  return (
    <AnalysisProvider>
      {/* Añadimos 'isolate' para crear un nuevo contexto de apilamiento
        y forzamos estilos que anulen el globals.css 
      */}
      <div className="analyst-terminal-root isolate min-h-screen w-full flex flex-col bg-[#0a0a0c] text-slate-300 font-mono overflow-hidden shadow-2xl">
        
        {/* Este estilo inyectado solo actuará cuando este layout esté montado */}
        <style jsx global>{`
          html, body {
            background-color: #0a0a0c !important; /* Sobreescribe el #020502 del globals */
            color: #cbd5e1 !important;           /* Sobreescribe el verde terminal */
            text-shadow: none !important;        /* Quita el text-shadow-retro */
          }
        `}</style>

        <Header />
        <div className="flex flex-1 overflow-hidden relative">
          <SidebarLeft />
          <MainSystem>{children}</MainSystem>
          <SidebarRight />
        </div>
        <Footer />
      </div>
    </AnalysisProvider>
  );
}