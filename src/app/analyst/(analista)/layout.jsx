"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AnalysisProvider, useAnalysis } from "../context/AnalysisContext";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { SidebarLeft } from "../layout/SidebarLeft";
import { SidebarRight } from "../layout/SidebarRight";
import { MainSystem } from "../layout/MainSystem";
import "../styles/HomeCSS/layout.css";

const useResponsiveLayout = () => {
  const [screen, setScreen] = useState("desktop");

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 768) setScreen("mobile");
      else if (width < 1280) setScreen("tablet");
      else setScreen("desktop");
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return screen;
};

const LayoutContent = ({ children }) => {
  const { activeView, leftCollapsed, rightCollapsed } = useAnalysis();
  const screen = useResponsiveLayout();

  /**
   * DEFINICIÓN DE ANCHOS CONSTANTES
   * Centralizamos aquí los valores para que SidebarRight y el Layout coincidan siempre.
   */
  const dims = useMemo(() => {
    if (screen === "mobile") return { left: "0px", right: "0px" };
    
    const l = leftCollapsed ? "50px" : "280px";
    
    if (screen === "tablet") return { left: l, right: "0px" };
    
    const r = rightCollapsed ? "50px" : "300px";
    return { left: l, right: r };
  }, [leftCollapsed, rightCollapsed, screen]);

  return (
    <div className="analyst-terminal-root isolate h-[100dvh] w-full flex flex-col overflow-hidden bg-[#070709] selection:bg-sky-500/30 text-slate-300">
      <Header />

      <div
        className="flex-1 grid layout-grid border-y border-white/5 overflow-hidden transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ 
          gridTemplateColumns: `${dims.left} 1fr ${dims.right}`,
          willChange: "grid-template-columns" 
        }}
      >
        {/* SIDEBAR IZQUIERDO: Contenedor con overflow controlado */}
        <aside className="relative h-full overflow-visible border-r border-white/5 z-20">
          <div className="absolute inset-0 w-full h-full">
            <SidebarLeft />
          </div>
        </aside>

        {/* NÚCLEO CENTRAL: El área que nunca debe romperse */}
        <main className="relative flex flex-col min-w-0 h-full overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0a0a0f] to-[#070709] z-10">
          
          {/* BARRA DE ESTADO SUPERIOR (FIJA) */}
          <div className="shrink-0 flex items-center justify-between px-4 py-2 text-[10px] font-mono border-b border-white/5 bg-black/40 backdrop-blur-md">
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>STATUS: <strong className="text-emerald-400">STABLE_NODE</strong></span>
              </div>
              <span className="text-white/10">|</span>
              <div className="flex items-center gap-2">
                <span className="opacity-50 text-[8px]">VIEW:</span>
                <strong className="text-sky-400 tracking-widest">{activeView?.toUpperCase() || "ROOT"}</strong>
              </div>
            </div>
            <div className="hidden lg:block text-white/20 uppercase tracking-[0.2em] font-black">
              Arasaka_Os_v9.4.1
            </div>
          </div>

          {/* ÁREA DE CONTENIDO DINÁMICO */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-arasaka">
            <MainSystem>
              <section className="p-4 lg:p-8 w-full max-w-7xl mx-auto">
                {children}
              </section>
            </MainSystem>
          </div>
        </main>

        {/* SIDEBAR DERECHO: Solo existe en Desktop/Wide Tablet */}
        <aside className="relative h-full overflow-visible border-l border-white/5 z-20">
          <div className="absolute inset-0 w-full h-full">
             <SidebarRight />
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default function AnalistaLayout({ children }) {
  return (
    <AnalysisProvider>
      <LayoutContent>{children}</LayoutContent>
    </AnalysisProvider>
  );
}