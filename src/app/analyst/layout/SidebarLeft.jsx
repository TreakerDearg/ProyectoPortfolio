"use client";
import React from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { motion } from 'framer-motion';
import { Network, Database, Workflow, ShieldAlert } from 'lucide-react'; 
import { TerminalPopup } from '../ui/decorations/TerminalPopup';
import { ArasakaNetStatus } from '../ui/decorations/ArasakaNetStatus';
// Importamos el nuevo componente de la Guerra Corporativa
import { CorpWarFeed } from '../ui/decorations/CorpWarFeed';
import '../styles/sidebarLeft.css';

export const SidebarLeft = () => {
  const { activeView, setActiveView } = useAnalysis();

  const menuItems = [
    { id: 'Network_Map', label: 'NETWORK', ext: 'SYS', Icon: Network, color: 'var(--cyber-blue)' },
    { id: 'Security_Logs', label: 'LOGS', ext: 'DB', Icon: ShieldAlert, color: 'var(--cyber-purple)' },
    { id: 'Analytic_Flow', label: 'FLOW', ext: 'EXE', Icon: Workflow, color: '#eab308' },
    { id: 'System_Root', label: 'ROOT', ext: 'CFG', Icon: Database, color: '#64748b' },
  ];

  return (
    <aside className="w-64 sidebar-cyber h-full z-40 relative flex flex-col">
      <div className="bg-scan-grid" />
      
      {/* HEADER TÉCNICO */}
      <div className="mb-10 mt-6 px-4 relative z-10 flex-shrink-0">
        <h2 className="text-xl font-black italic tracking-tighter text-white/90 leading-none">
          ANALYST<span className="text-purple-600">.v2</span>
        </h2>
        <div className="flex items-center gap-2 mt-2 opacity-70">
          <div className="status-dot animate-pulse" />
          <span className="text-[7px] font-mono text-emerald-500 tracking-[0.3em] uppercase">Uplink_Active</span>
        </div>
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="nav-container-fixed px-2 relative z-10 space-y-2 flex-shrink-0">
        {menuItems.map((item) => {
          const isActive = activeView === item.id;
          const IconComponent = item.Icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`nav-item-cyber group ${isActive ? 'active' : ''}`}
            >
              {isActive && <div className="active-glow" />}
              
              <div className="nav-icon-wrapper">
                <IconComponent 
                   size={18} 
                   strokeWidth={2.5} 
                   style={{ color: isActive ? item.color : 'inherit' }}
                   className="transition-all duration-300 group-hover:scale-110"
                />
              </div>
              
              <div className="flex flex-col items-start overflow-hidden">
                <span className={`nav-label-text transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {item.label}
                </span>
                <span className="text-[6px] font-mono opacity-40 tracking-widest uppercase">.{item.ext}</span>
              </div>

              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="ml-auto w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* TERMINAL POPUP */}
      <div className="relative z-10 flex-shrink-0">
        <TerminalPopup />
      </div>

      {/* ARASAKA METRICS */}
      <div className="relative z-10 flex-shrink-0">
        <ArasakaNetStatus />
      </div>

      {/* TABLA DE GUERRA CORPORATIVA (Ocupa el espacio restante dinámicamente) */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col pb-2">
        <CorpWarFeed />
      </div>

      {/* FOOTER DE ACTIVIDAD */}
      <div className="mt-auto p-4 relative z-10 flex-shrink-0">
         <div className="sidebar-separator" />
         <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 bg-black/20 p-2 rounded border border-white/5">
            <span className="tracking-tighter">MEM_LOAD</span>
            <span className="text-sky-400 font-bold">42.08%</span>
         </div>
      </div>
    </aside>
  );
};