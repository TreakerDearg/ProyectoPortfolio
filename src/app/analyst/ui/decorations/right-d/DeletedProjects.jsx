"use client";
import React, { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, ShieldAlert, Terminal, Ghost } from 'lucide-react';
import '@/app/analyst/styles/D-side/deletedProjects.css';

export const DeletedProjects = ({ isOverclocked }) => {
  const deletedFiles = [
    { id: 'ERR-00X', name: 'System_Backup_2024', date: '01/01/26', size: '2.4GB' },
    { id: 'ERR-042', name: 'Encrypted_Logs_Root', date: '12/02/26', size: '156KB' },
    { id: 'ERR-099', name: 'User_Credentials_DB', date: '18/02/26', size: '1.2MB' },
  ];

  const [sectors, setSectors] = useState([]);
  
  useEffect(() => {
    setSectors(Array.from({ length: 32 }, () => Math.random() > 0.8));
  }, [isOverclocked]); // Se regenera al cambiar el estado para dar dinamismo

  return (
    <div className={`deleted-archives-root deleted-archives-screen rounded-xl p-4 overflow-hidden group shadow-2xl relative transition-all duration-300 ${
      isOverclocked ? 'system-fail-mode' : ''
    }`}>
      {/* CAPAS DE ERROR (Solo visibles en Overclock) */}
      {isOverclocked && <div className="error-glitch-overlay" />}
      <div className="data-grid-overlay pointer-events-none" />
      <div className={isOverclocked ? "critical-scan-bar" : "red-scan-bar"} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10 border-b border-red-500/30 pb-2">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 border rounded-md transition-colors ${
            isOverclocked ? 'bg-red-600/20 border-red-500 animate-bounce' : 'bg-red-500/10 border-red-500/20'
          }`}>
            {isOverclocked ? <ShieldAlert size={14} className="text-red-500" /> : <Trash2 size={14} className="text-red-500" />}
          </div>
          <div className="flex flex-col">
            <span className={`text-[11px] font-black uppercase tracking-[0.2em] font-mono leading-none ${
              isOverclocked ? 'text-white glitch-text' : 'text-red-500'
            }`}>
              {isOverclocked ? 'FATAL_CORE_ERROR' : 'Wiped_Archives'}
            </span>
            <span className="text-[7px] text-red-900 font-mono mt-1">
              {isOverclocked ? 'VOLTAGE_OVERLOAD: 12.8V' : 'FS_STATUS: IRRETRIEVABLE'}
            </span>
          </div>
        </div>
        <AlertTriangle size={12} className={`${isOverclocked ? 'text-white' : 'text-red-600'} animate-pulse`} />
      </div>
      
      {/* Tabla de Datos */}
      <div className="space-y-4 relative z-10 flex-1">
        <div className="grid grid-cols-4 text-[8px] font-mono text-slate-500 uppercase tracking-widest border-b border-white/5 pb-1">
          <span>REF_ID</span>
          <span className="col-span-2">TARGET_PATH</span>
          <span className="text-right">WEIGHT</span>
        </div>

        {deletedFiles.map((file) => (
          <div 
            key={file.id} 
            className={`grid grid-cols-4 items-center py-2 border-b border-white/5 last:border-0 transition-all ${
              isOverclocked ? 'opacity-40 blur-[0.5px]' : 'hover:bg-red-500/5'
            }`}
          >
            <span className="text-[10px] font-mono text-red-500/40 font-bold">{isOverclocked ? '0xERR' : file.id}</span>
            
            <div className="col-span-2 flex flex-col pl-1">
              <span className={`text-[11px] font-mono wiped-filename italic truncate pr-4 ${isOverclocked ? 'text-red-400' : ''}`}>
                {isOverclocked ? 'CORRUPTED_DATA_STR' : `${file.name}.raw`}
              </span>
              <span className="text-[7px] font-mono text-red-900/60 mt-1">
                {isOverclocked ? 'DELETION_IN_PROGRESS...' : `PURGED: ${file.date}`}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-slate-400 font-bold">{isOverclocked ? '---' : file.size}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Memory Sector Visualizer (Se vuelve loco en OC) */}
      <div className="mt-4 relative z-10">
        <div className="flex justify-between items-center mb-2">
            <span className="text-[8px] font-mono text-red-900 uppercase tracking-tighter flex items-center gap-1">
                <Terminal size={8} /> Sector_Map_0x4F
            </span>
            <span className={`text-[7px] font-mono ${isOverclocked ? 'text-red-500 animate-pulse' : 'text-red-500/30'}`}>
               {isOverclocked ? 'MEMORY_LEAK_DETECTED' : 'DEEP_RECOVERY_FAIL'}
            </span>
        </div>
        <div className={`memory-sectors-grid ${isOverclocked ? 'agitated-sectors' : ''}`}>
          {sectors.map((isCorrupt, i) => (
            <div 
              key={i} 
              className={`sector-block rounded-sm transition-all duration-75 ${
                isOverclocked ? (Math.random() > 0.5 ? 'bg-red-500' : 'bg-white/10') : (isCorrupt ? 'corrupt' : '')
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-red-500/10 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isOverclocked ? 'bg-white animate-ping' : 'bg-red-600 animate-pulse'}`} />
            <span className={`text-[8px] font-mono font-black uppercase ${isOverclocked ? 'text-red-400' : 'text-red-600'}`}>
              {isOverclocked ? 'HARDWARE_FAILURE_IMMINENT' : 'Critical_Loss_Alert'}
            </span>
        </div>
        <Ghost size={10} className={isOverclocked ? 'text-red-500 animate-bounce' : 'opacity-0'} />
      </div>
    </div>
  ); 
};