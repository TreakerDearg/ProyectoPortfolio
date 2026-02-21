'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../../styles/terminalPopup.css';

const MESSAGES = [
  "ENCRYPTED_LINK_ESTABLISHED",
  "NEURAL_SYNC_OPTIMIZED",
  "UPLINK_STATUS: STABLE",
  "DECRYPTING_PACKET_STREAM",
  "LATENCY_CORRECTED: 12ms",
  "TRACE_CLEANUP_IN_PROGRESS"
];

export const TerminalPopup = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const triggerMessage = () => {
      setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setTimeout(() => setMsg(""), 5000);
    };

    const interval = setInterval(triggerMessage, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-2 mt-4 min-h-[60px]"> {/* Contenedor para evitar saltos de layout */}
      <AnimatePresence mode="wait">
        {msg && (
          <motion.div
            key={msg}
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10 }}
            className="terminal-popup-container flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="diag-led animate-pulse" />
                <span className="text-[7px] font-mono text-purple-400/70 tracking-[0.2em] uppercase">
                  Diagnostic_Feed
                </span>
              </div>
              <span className="text-[6px] font-mono text-slate-600">ID: {Math.floor(Math.random() * 9000)}</span>
            </div>

            <span className="text-[9px] font-mono text-sky-400 tracking-wider font-bold text-glitch-active truncate">
              {msg}
            </span>

            {/* Decoración de carga inferior */}
            <div className="w-full h-[1px] bg-white/5 overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="w-full h-full bg-purple-500/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};