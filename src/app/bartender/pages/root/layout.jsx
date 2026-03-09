// components/ArmorLayout.jsx
"use client";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function ArmorLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-emerald-500 font-mono p-4 lg:p-8 flex flex-col overflow-hidden relative">
      
      {/* EFECTO DE SCANLINES (Overlay global) */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* MARCO MECÁNICO (LAYOUT) */}
      <div className="fixed inset-4 lg:inset-8 border border-emerald-500/20 pointer-events-none z-40">
        {/* Esquinas reforzadas */}
        <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-emerald-500" />
        <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-emerald-500" />
        
        {/* Adornos en los laterales */}
        <div className="absolute top-1/2 -left-1 w-1 h-24 bg-emerald-500/40 -translate-y-1/2" />
        <div className="absolute top-1/2 -right-1 w-1 h-24 bg-emerald-500/40 -translate-y-1/2" />
      </div>

      {/* CONTENIDO ESTRUCTURAL */}
      <Header />

      <main className="flex-grow relative border border-emerald-500/10 bg-emerald-950/10 backdrop-blur-[2px] shadow-[inset_0_0_100px_rgba(16,185,129,0.05)] overflow-y-auto custom-scrollbar">
        {/* Este es el viewport de la 'Page' */}
        {children}
      </main>

      <Footer />

      {/* Estilos para el scrollbar temático */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(16, 185, 129, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
}