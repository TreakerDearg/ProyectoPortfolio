'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Skull, RefreshCw, FileX, FileCheck, FileWarning, 
  Database, Zap, AlertTriangle, ShieldAlert, Lock 
} from 'lucide-react';
import '../../styles/corpWarFeed.css';

const CORPORATIONS = ['MILITECH.com', 'KANG_TAO.os', 'BIOTECHNICA.bio', 'KIROSHI.opt', 'PETROCHEM.hft', 'NETWATCH.gov'];
const VECTORS = ['ICE_BREACH', 'DATA_SIPHON', 'NEURAL_BURN', 'DAEMON_INJ', 'SYNAPSE_MELT'];
const FILE_TYPES = ['USR_DATA.db', 'AUTH_KEY.secure', 'CORE_LOG.txt', 'ENCRYPT_NAV.sys', 'CORP_INTEL.pdf', 'BIO_SIG.raw'];

const generateAttack = (id) => ({
  id,
  corp: CORPORATIONS[Math.floor(Math.random() * CORPORATIONS.length)],
  vector: VECTORS[Math.floor(Math.random() * VECTORS.length)],
  status: Math.random() > 0.6 ? 'COMPROMISED' : 'DEFLECTING',
});

const generateFile = (id) => {
  const states = ['STOLEN', 'RECOVERED', 'CORRUPTED', 'DELETED', 'ENCRYPTED'];
  return {
    id,
    name: FILE_TYPES[Math.floor(Math.random() * FILE_TYPES.length)],
    state: states[Math.floor(Math.random() * states.length)],
    size: (Math.random() * 50).toFixed(1) + 'MB'
  };
};

export const CorpWarFeed = () => {
  const [attacks, setAttacks] = useState([]);
  const [files, setFiles] = useState([]);
  const [isBreached, setIsBreached] = useState(false);
  const [isBooting, setIsBooting] = useState(false);

  useEffect(() => {
    // Carga inicial más densa para evitar espacios vacíos
    setAttacks(Array.from({ length: 12 }, (_, i) => generateAttack(Date.now() + i)));
    setFiles(Array.from({ length: 10 }, (_, i) => generateFile(Date.now() + i + 100)));

    const interval = setInterval(() => {
      if (!isBreached && !isBooting) {
        setAttacks(prev => [generateAttack(Date.now()), ...prev].slice(0, 12));
        if(Math.random() > 0.4) {
          setFiles(prev => [generateFile(Date.now() + 50), ...prev].slice(0, 10));
        }
      }
    }, 2500);

    const breachTrigger = setInterval(() => {
      if (Math.random() > 0.7) { 
        setIsBreached(true);
        setTimeout(() => {
          setIsBreached(false);
          setIsBooting(true);
          setTimeout(() => {
            setIsBooting(false);
            setAttacks(Array.from({ length: 8 }, (_, i) => generateAttack(Date.now() + i)));
            setFiles(prev => prev.map(f => ({...f, state: 'CORRUPTED'})));
          }, 3500);
        }, 4500);
      }
    }, 30000);

    return () => { clearInterval(interval); clearInterval(breachTrigger); };
  }, [isBreached, isBooting]);

  const getFileIcon = (state) => {
    switch(state) {
      case 'STOLEN': return <ShieldAlert size={10} className="text-red-500" />;
      case 'ENCRYPTED': return <Lock size={10} className="text-amber-500" />;
      case 'RECOVERED': return <FileCheck size={10} className="text-emerald-500" />;
      case 'DELETED': return <FileX size={10} className="text-slate-700" />;
      default: return <FileWarning size={10} className="text-red-400" />;
    }
  };

  return (
    <div className={`corp-war-container relative overflow-hidden flex flex-col h-full bg-black border border-white/5
      ${isBreached ? 'is-hacked' : ''} ${isBooting ? 'system-blackout' : ''}`}>
      
    <AnimatePresence>
  {(isBreached || isBooting) && (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="emergency-overlay"
    >
      {/* Efecto de escaneo opcional solo en Breach */}
      {isBreached && <div className="scanner-line" />}

      <div className="status-container">
        {isBreached ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.05, 1], opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="flex-center-col"
          >
            <Skull size={80} className="icon-breach" />
            <h2 className="status-text breach-text">Breach_Detected</h2>
            <div className="status-bar breach-bar" />
          </motion.div>
        ) : (
          <div className="flex-center-col">
            <div className="reboot-wrapper">
              <div className="reboot-spiral-container">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="spiral-ring" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="relative z-10"
              >
                <RefreshCw className="icon-restore" size={40} />
              </motion.div>
            </div>
            <span className="status-text restore-text">System_Restore_Active</span>
          </div>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* HEADER */}
      <div className="flex items-center justify-between p-3 border-b border-white/10 bg-zinc-950/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <Zap size={12} className="text-amber-500" />
          <span className="text-[10px] font-black tracking-widest text-slate-300">LIVE_WAR_FEED</span>
        </div>
        <div className={`text-[8px] font-mono px-2 py-0.5 border ${isBreached ? 'border-red-500 text-red-500' : 'border-emerald-500/30 text-emerald-500/50'}`}>
          {isBreached ? 'CRITICAL_FAIL' : 'SECURE_NODE'}
        </div>
      </div>

      {/* BODY: DISTRIBUCIÓN MEJORADA */}
      <div className={`flex flex-col flex-1 min-h-0 transition-all duration-500 ${isBreached ? 'blur-sm scale-95' : ''}`}>
        
        {/* PANEL SUPERIOR: ATAQUES (Flex-1 para llenar el espacio) */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="grid grid-cols-12 px-4 py-1.5 bg-white/[0.03] border-b border-white/5">
            <span className="col-span-8 text-[7px] uppercase font-black text-slate-500">Threat_Origin_Node</span>
            <span className="col-span-4 text-[7px] uppercase font-black text-slate-500 text-right">Vector_Status</span>
          </div>
          <div className="flex-1 overflow-y-auto cyber-scrollbar px-1">
            {attacks.map((attack) => (
              <div key={attack.id} className="grid grid-cols-12 px-3 py-2 border-b border-white/[0.03] items-center">
                <div className="col-span-8 flex flex-col">
                  <span className="text-[10px] font-mono text-slate-200 tracking-tighter truncate">{attack.corp}</span>
                  <span className="text-[6px] font-mono text-slate-500 uppercase">{attack.vector}</span>
                </div>
                <span className={`col-span-4 text-[8px] text-right font-bold ${attack.status === 'COMPROMISED' ? 'text-red-500 animate-pulse' : 'text-emerald-500/70'}`}>
                  {attack.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL INFERIOR: ARCHIVOS (Altura controlada para evitar vacíos) */}
        <div className="h-56 flex flex-col bg-black/60 border-t border-white/10">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-white/5">
            <div className="flex items-center gap-2">
                <Database size={10} className="text-slate-400" />
                <span className="text-[9px] font-black text-slate-300 tracking-widest uppercase">File_System_Integrity</span>
            </div>
            <span className="text-[7px] font-mono text-slate-500">ROOT//SEC_B</span>
          </div>
          
          <div className="flex-1 overflow-y-auto cyber-scrollbar">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between px-4 py-2 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.state)}
                  <div className="flex flex-col">
                    <span className={`text-[9px] font-mono ${file.state === 'CORRUPTED' || file.state === 'DELETED' ? 'text-slate-600 line-through' : 'text-slate-400'}`}>
                      {file.name}
                    </span>
                    <span className="text-[6px] text-slate-600">{file.size}</span>
                  </div>
                </div>
                <div className={`text-[7px] font-black px-1.5 py-0.5 rounded-sm ${
                  file.state === 'RECOVERED' ? 'bg-emerald-500/10 text-emerald-500' : 
                  file.state === 'STOLEN' || file.state === 'DELETED' ? 'bg-red-500/10 text-red-500' : 
                  'bg-slate-800 text-slate-400'
                }`}>
                  {file.state}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BARRA DE ESTADO INFERIOR (Nuevo) */}
      <div className="p-1.5 bg-zinc-950 border-t border-white/5 flex justify-between items-center px-4">
        <span className="text-[6px] font-mono text-slate-600 uppercase">Uplink: Active</span>
        <div className="flex gap-2">
            <div className="w-8 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                <motion.div animate={{ x: [-32, 32] }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-full bg-emerald-500" />
            </div>
        </div>
      </div>
    </div>
  );
};