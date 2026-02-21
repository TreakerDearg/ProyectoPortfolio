"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Binary, Zap } from 'lucide-react';
import '@/app/analyst/styles/D-side/inProcessProjects.css';

export const InProcessProjects = () => {
  const [projects, setProjects] = useState([
    { id: 'PRJ-7721', name: 'Neural_Link_Beta', progress: 65, type: 'CORE' },
    { id: 'PRJ-4090', name: 'Ghost_Protocol', progress: 12, type: 'SEC' },
    { id: 'PRJ-1080', name: 'Uplink_Buffer_X', progress: 89, type: 'NET' },
  ]);

  const [bitCounter, setBitCounter] = useState('0x0000');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProjects(prev => prev.map(p => ({
        ...p,
        progress: p.progress >= 100 ? 0 : Math.min(100, p.progress + Math.random() * 2)
      })));
      setBitCounter(`0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0')}`);
    }, 3000);
    return () => clearInterval(progressInterval);
  }, []);

  const totalSegments = 18;

  return (
    <div className="in-process-root data-build-screen rounded-xl p-4 overflow-hidden group shadow-2xl relative mb-4">
      {/* Capas decorativas con pointer-events-none para no bloquear clics */}
      <div className="bit-grid-overlay pointer-events-none" />
      <div className="build-glimmer pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10 border-b border-sky-500/20 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-sky-500/10 border border-sky-500/20 rounded-md">
            <Cpu size={14} className="text-sky-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em] font-mono leading-none">
              Build_Sequencer
            </span>
            <span className="text-[7px] text-sky-700 font-mono mt-1">STREAM_ID: {bitCounter}</span>
          </div>
        </div>
        <Binary size={12} className="text-sky-500/20" />
      </div>
      
      {/* Lista de Proyectos */}
      <div className="space-y-5 relative z-10">
        {projects.map((proj) => (
          <div key={proj.id} className="flex flex-col gap-2 group/item">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[7px] font-mono text-sky-500/60 uppercase">Thread_{proj.type}</span>
                <span className="text-[10px] font-mono text-white tracking-tighter uppercase font-bold group-hover/item:text-sky-300 transition-colors">
                  {proj.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-sky-400 font-black tabular-nums">
                {proj.progress.toFixed(1)}%
              </span>
            </div>

            {/* Barra Segmentada */}
            <div className="progress-segment-container flex gap-[2px] h-1.5">
              {[...Array(totalSegments)].map((_, i) => {
                const isActive = (i / totalSegments) * 100 < proj.progress;
                return (
                  <div
                    key={i}
                    className={`progress-segment flex-1 rounded-[1px] transition-all duration-700 ${
                      isActive 
                        ? 'active bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]' 
                        : 'bg-white/5'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Mini Visualizador de Flujo */}
      <div className="mt-5 pt-3 border-t border-sky-500/10 relative z-10 flex items-end gap-1 h-8 px-1">
          {[...Array(20)].map((_, i) => (
              <motion.div 
                  key={i}
                  animate={{ height: [4, Math.random() * 16 + 4, 4] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.05 }}
                  className="flex-1 bg-sky-500/20 rounded-t-[1px]"
              />
          ))}
      </div>

      {/* Footer del Componente */}
      <div className="mt-3 flex justify-between items-center relative z-10 opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1">
          <Database size={10} className="text-sky-400" />
          <span className="text-[7px] font-mono text-sky-400 uppercase font-bold tracking-tighter">Sync_Stable</span>
        </div>
        <span className="text-[7px] font-mono text-slate-500 italic">v2.0.48_BETA</span>
      </div>
    </div>
  );
};