"use client";
import React, { useState, useEffect } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Cpu, Globe, Shield, Zap, Terminal as TermIcon, 
  BarChart3, FolderGit2, ExternalLink, Box,
  Activity, Database, Wifi, Lock, AlertOctagon
} from 'lucide-react';

import { SystemCircularNode } from '@/app/analyst/ui/decorations/right-d/SystemCircularNode';
import { SignalInterference } from '@/app/analyst/ui/decorations/right-d/SignalInterference';
import { InProcessProjects } from '@/app/analyst/ui/decorations/right-d/InProcessProjects';
import { DeletedProjects } from '@/app/analyst/ui/decorations/right-d/DeletedProjects';

import '../styles/sidebarRight.css';

const SecurityBadge = ({ level = "OPTIMAL", isOverclocked }) => (
  <div className={`flex items-center gap-3 px-4 py-2 border rounded-lg backdrop-blur-xl transition-all duration-500 ${
    isOverclocked || level === "CRITICAL" 
      ? "bg-red-500/10 border-red-500/40 status-critical-glitch" 
      : "bg-emerald-500/5 border-emerald-500/20"
  }`}>
    {isOverclocked || level === "CRITICAL" ? <Shield size={14} className="text-red-500" /> : <Lock size={14} className="text-emerald-500" />}
    <div className="flex flex-col">
        <span className="text-[7px] font-mono uppercase leading-none opacity-40">Auth_Protocol</span>
        <span className={`text-[10px] font-black tracking-tighter font-mono ${
          isOverclocked || level === "CRITICAL" ? "text-red-500" : "text-emerald-400"
        }`}>{isOverclocked ? "OVERLOAD" : level}_SEC</span>
    </div>
  </div>
);

const TelemetryGrid = ({ isOverclocked }) => (
  <div className={`grid grid-cols-2 gap-2 p-3 bg-black/40 border rounded-xl relative overflow-hidden transition-all duration-300 ${
    isOverclocked ? 'border-red-500/40 bg-red-950/5' : 'border-white/5'
  }`}>
    <div className={`absolute top-0 right-0 p-1 opacity-10 ${isOverclocked ? 'text-red-500' : ''}`}><BarChart3 size={30} /></div>
    {[
      { label: 'Global_Traffic', val: isOverclocked ? '999.9 TB/s' : '8.4 TB/s', icon: <Globe size={10}/>, color: isOverclocked ? 'text-red-400' : 'text-sky-400' },
      { label: 'Core_Load', val: isOverclocked ? 'ERR_MAX%' : '42.1%', icon: <Cpu size={10}/>, color: isOverclocked ? 'text-red-500 animate-pulse' : 'text-purple-400' },
      { label: 'Data_Clusters', val: isOverclocked ? 'NULL' : '1288', icon: <Box size={10}/>, color: 'text-amber-400' },
      { label: 'Sync_Latency', val: isOverclocked ? '> 0.1ms' : '12ms', icon: <Activity size={10}/>, color: 'text-emerald-400' }
    ].map((item, i) => (
      <div key={i} className="flex flex-col border-l border-white/10 pl-3 py-1 hover:bg-white/5 transition-colors relative z-10">
        <div className="flex items-center gap-1 mb-1">
            <span className="text-slate-500">{item.icon}</span>
            <span className="text-[7px] uppercase text-slate-500 font-bold font-mono">{item.label}</span>
        </div>
        <span className={`text-[11px] font-mono font-black ${item.color}`}>{item.val}</span>
      </div>
    ))}
  </div>
);

export const SidebarRight = () => {
  const { selectedNode, activeView } = useAnalysis();
  const router = useRouter();
  const [timestamp, setTimestamp] = useState("");
  const [isOverclocked, setIsOverclocked] = useState(false);

  const handleOverclock = () => {
    setIsOverclocked(true);
    setTimeout(() => setIsOverclocked(false), 5000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString('en-GB'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className={`w-96 sidebar-right-container flex flex-col h-full z-40 relative shadow-2xl overflow-hidden transition-all duration-700 ${
      isOverclocked ? 'overclock-active border-l-red-600/50 scale-[1.002]' : 'border-l-white/5'
    }`}>
      
      {/* CAPA DE ADVERTENCIA CRÍTICA */}
      <AnimatePresence>
        {isOverclocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] pointer-events-none flex flex-col items-center justify-center bg-red-950/10 backdrop-blur-[2px]"
          >
            <div className="warning-border-glitch absolute inset-0 border-4 border-red-600/20" />
            <motion.div 
              animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1], rotate: [-1, 1, -1] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              className="flex flex-col items-center bg-black/95 p-6 border-y border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.3)]"
            >
              <AlertOctagon size={32} className="text-red-600 mb-2 animate-bounce" />
              <span className="text-[12px] font-black font-mono text-red-500 uppercase tracking-[0.5em]">System_Meltdown</span>
              <span className="text-[8px] font-mono text-red-700 mt-2">THERMAL_THRESHOLD_EXCEEDED</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SignalInterference />
      <div className={`scanline-effect ${isOverclocked ? 'opacity-40 bg-red-500/10' : 'opacity-10'}`} />

      {/* HEADER */}
      <header className={`p-6 pb-4 relative z-20 shrink-0 backdrop-blur-md border-b transition-colors duration-500 ${
        isOverclocked ? 'bg-red-950/40 border-red-500/50' : 'bg-black/20 border-white/5'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg border shadow-inner transition-all duration-300 ${
              isOverclocked ? 'bg-red-600/20 border-red-600 animate-ping' : 'bg-sky-500/10 border-sky-500/20'
            }`}>
              <Wifi size={18} className={`${isOverclocked ? 'text-red-500' : 'text-sky-400'}`} />
            </div>
            <div>
                <h2 className={`text-[13px] font-black font-mono uppercase tracking-[0.25em] transition-colors ${isOverclocked ? 'text-red-500' : 'text-white'}`}>
                    {isOverclocked ? 'HARDWARE_FAIL' : 'Link_Inspector'}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isOverclocked ? 'bg-red-600' : 'bg-emerald-500'}`} />
                    <p className={`text-[8px] font-mono leading-none uppercase ${isOverclocked ? 'text-red-600' : 'text-emerald-500/60'}`}>
                      {isOverclocked ? 'CORE_OVERHEATED' : 'Connection_Stable'}
                    </p>
                </div>
            </div>
          </div>
          <div className={`text-right font-mono border-r-2 pr-3 transition-colors ${isOverclocked ? 'border-red-600 text-red-500' : 'border-sky-500 text-white'}`}>
              <p className="text-[11px] font-bold leading-none">{isOverclocked ? "XX:XX:XX" : timestamp}</p>
              <p className="text-[7px] text-slate-500 mt-1 uppercase tracking-widest opacity-50">Sys_Time</p>
          </div>
        </div>
        
        <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg border font-mono transition-all duration-300 ${
          isOverclocked ? 'bg-red-950/50 border-red-500/40 translate-x-1' : 'bg-sky-950/20 border-sky-500/10'
        }`}>
           <div className="flex items-center gap-2">
              <TermIcon size={14} className={isOverclocked ? 'text-red-500' : 'text-sky-500'} />
              <span className="text-[9px] text-slate-400 font-bold uppercase">Interface:</span>
           </div>
           <span className={`text-[10px] font-black uppercase tracking-tighter ${isOverclocked ? 'text-red-400 animate-pulse' : 'text-sky-400'}`}>
             {isOverclocked ? 'SYSTEM_BREACH_MODE' : (activeView || 'STANDBY')}
           </span>
        </div>
      </header>

      {/* CUERPO CON SCROLL */}
      <div className="flex-1 overflow-y-auto cyber-scrollbar relative z-20">
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-6 py-4 flex flex-col gap-6"
            >
              {/* NODE VISUALIZER */}
              <div className={`relative py-2 flex justify-center perspective-1000 shrink-0 transition-transform duration-100 ${isOverclocked ? 'scale-110' : ''}`}>
                  <div className={`absolute inset-0 blur-[60px] rounded-full transition-colors duration-500 ${
                    isOverclocked ? 'bg-red-600/30' : 'bg-sky-500/5'
                  }`} />
                  <motion.div 
                    animate={isOverclocked ? { 
                        rotateY: [0, 180, 360], 
                        scale: [1, 1.3, 1],
                        filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)'] 
                    } : { rotateY: [0, 10, 0] }} 
                    transition={{ repeat: Infinity, duration: isOverclocked ? 0.3 : 5, ease: "linear" }}
                  >
                      <SystemCircularNode />
                  </motion.div>
              </div>

              {/* IDENTITY CARD */}
              <div className={`p-5 border bg-black/60 rounded-2xl relative overflow-hidden transition-all duration-500 shrink-0 ${
                isOverclocked ? 'border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.2)] bg-red-950/10' : 'border-white/10'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg border transition-all ${
                    isOverclocked ? 'bg-red-500/20 border-red-500' : 'bg-sky-500/10 border-sky-500/30'
                  }`}>
                    <Database size={20} className={isOverclocked ? 'text-red-400' : 'text-sky-400'} />
                  </div>
                  <SecurityBadge level={selectedNode.id % 2 === 0 ? "CRITICAL" : "OPTIMAL"} isOverclocked={isOverclocked} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[8px] font-mono uppercase tracking-[0.3em]">
                     <span className={`w-8 h-[1px] ${isOverclocked ? 'bg-red-500' : 'bg-sky-500/30'}`} /> 
                     <span className={isOverclocked ? 'text-red-500 font-black' : 'text-sky-500/50'}>
                        {isOverclocked ? 'DATA_CORRUPTION_DETECTED' : 'Node_Registry'}
                     </span>
                  </div>
                  <h3 className={`text-2xl font-black italic tracking-tighter uppercase leading-tight py-2 break-all transition-all ${
                    isOverclocked ? 'text-red-500 scale-105 blur-[0.4px] line-through' : 'text-white node-id-glow'
                  }`}>
                    {selectedNode.name}
                  </h3>
                </div>
              </div>

              {/* BOTÓN OPEN VAULT */}
              <div className="shrink-0">
                <button 
                    onClick={() => router.push('/analyst/projects')}
                    className={`btn-open-vault w-full group relative flex items-center justify-between p-4 rounded-xl transition-all duration-300 border bg-black/40 ${
                      isOverclocked ? 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)] scale-95' : 'border-white/10'
                    }`}
                >
                    <div className="flex items-center gap-3 z-10">
                        <div className={`p-2 bg-black/60 rounded-lg border transition-colors ${
                            isOverclocked ? 'border-red-500 animate-pulse' : 'border-white/5 group-hover:border-sky-500/50'
                        }`}>
                            <FolderGit2 size={18} className={isOverclocked ? 'text-red-500' : 'text-white group-hover:text-sky-400'} />
                        </div>
                        <div className="flex flex-col items-start text-left">
                            <span className={`text-[12px] font-black uppercase tracking-widest leading-tight ${isOverclocked ? 'text-red-500' : 'text-white'}`}>
                                {isOverclocked ? 'VAULT_LOCKED' : 'Open_Vault'}
                            </span>
                            <span className={`text-[7px] font-mono transition-colors ${isOverclocked ? 'text-red-700' : 'text-slate-500 group-hover:text-sky-500/60'}`}>
                                {isOverclocked ? 'PROTOCOL_ERROR_0x44' : 'INTERNAL_DOCUMENTS'}
                            </span>
                        </div>
                    </div>
                    <div className={`z-10 p-1.5 rounded-full transition-all ${
                        isOverclocked ? 'bg-red-600 text-white' : 'bg-sky-500/10 group-hover:bg-sky-500 group-hover:text-black'
                    }`}>
                        <ExternalLink size={12} />
                    </div>
                    {isOverclocked && <div className="absolute inset-0 bg-red-600/5 animate-pulse" />}
                </button>
              </div>

              {/* TELEMETRY & PROJECT LISTS */}
              <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 px-1">
                      <Activity size={14} className={isOverclocked ? 'text-red-600 animate-bounce' : 'text-sky-500'} />
                      <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${isOverclocked ? 'text-red-500' : 'text-slate-400'}`}>
                        {isOverclocked ? 'CRITICAL_FAIL_DIAGNOSTIC' : 'Diagnostic_Stream'}
                      </span>
                  </div>
                  
                  <TelemetryGrid isOverclocked={isOverclocked} />
                  
                  <div className="space-y-4 pb-4">
                    {/* PASANDO PROPS A LOS MÓDULOS HIJOS */}
                    <InProcessProjects isOverclocked={isOverclocked} />
                    <DeletedProjects isOverclocked={isOverclocked} />
                  </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="idle" className="h-full flex flex-col justify-center items-center p-12 opacity-40">
              <SystemCircularNode />
              <p className="text-[10px] font-mono uppercase tracking-widest mt-8">Waiting_Selection</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <footer className={`p-5 pt-2 border-t bg-black/80 relative z-30 transition-all duration-500 shrink-0 ${
        isOverclocked ? 'border-red-600 bg-red-950/20' : 'border-white/5'
      }`}>
        <div className="grid grid-cols-3 gap-6">
            {[{l: 'CPU', i: <Cpu size={10}/>}, {l: 'MEM', i: <Database size={10}/>}, {l: 'NET', i: <Globe size={10}/>}].map((item, i) => (
            <div key={item.l} className="flex flex-col gap-2">
                <div className="flex justify-between items-center opacity-60">
                   <div className="flex items-center gap-1">
                      <span className={isOverclocked ? 'text-red-500' : 'text-sky-500'}>{item.i}</span>
                      <span className="text-[8px] font-mono text-white font-bold">{item.l}</span>
                   </div>
                   <span className={`text-[8px] font-mono ${isOverclocked ? 'text-red-500 font-black' : 'text-sky-400'}`}>
                     {isOverclocked ? '!!' : `7${i + 2}%`}
                   </span>
                </div>
                <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        animate={{ 
                            width: isOverclocked ? ["95%", "40%", "100%"] : ["40%", "90%", "65%"],
                            backgroundColor: isOverclocked ? ["#ef4444", "#ffffff", "#ef4444"] : "#0ea5e9"
                        }}
                        transition={{ duration: isOverclocked ? 0.15 : 4 + i, repeat: Infinity }}
                        className="h-full"
                    />
                </div>
            </div>
            ))}
        </div>
      </footer>

      {/* ACCIONES (OVERCLOCK BUTTON) */}
      <div className={`px-6 py-4 border-t relative z-30 shrink-0 transition-colors duration-500 ${
        isOverclocked ? 'bg-red-900/40 border-red-600' : 'bg-black/60 border-white/5'
      }`}>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 text-slate-400 font-mono text-[9px] font-bold uppercase hover:bg-white/10 hover:text-white rounded-lg transition-all group">
            <Shield size={12} className="group-hover:text-emerald-500" /> Secure
          </button>
          <button 
            onClick={handleOverclock}
            disabled={isOverclocked}
            className={`flex items-center justify-center gap-2 py-3 font-mono text-[9px] font-bold uppercase rounded-lg shadow-lg transition-all duration-500 ${
              isOverclocked 
                ? 'bg-red-600 text-white cursor-not-allowed' 
                : 'bg-purple-900/30 text-purple-300 border border-purple-500/30 hover:bg-purple-600 hover:text-white hover:border-transparent'
            }`}
          >
            <Zap size={12} className={isOverclocked ? 'animate-spin' : ''} /> 
            {isOverclocked ? 'MELTDOWN' : 'Overclock'}
          </button>
        </div>
      </div>
    </aside>
  );
};