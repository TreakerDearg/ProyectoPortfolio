'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic'; // Importante para sub-componentes pesados
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Unlock, Zap, Activity, RefreshCw, 
  ShieldAlert, Power, ChevronRight,
  Terminal as TerminalIcon // Renombramos el icono para evitar conflictos
} from 'lucide-react';

import tStyles from '../../../styles/inventory-styles/terminal-puzzle.module.css';
import nStyles from '../../../styles/inventory-styles/puzzlenode.module.css';

export const TerminalPuzzle = ({ onUnlock, isUnlocked }) => {
  // --- PASO 1: Bloqueo de SSR ---
  const [isClient, setIsClient] = useState(false);
  const [view, setView] = useState('KEYPAD'); 
  const [accessCode, setAccessCode] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    // Marcamos que ya estamos en el navegador
    setIsClient(true);
    
    // Inicializamos datos que dependen de lógica aleatoria solo en el cliente
    setNodes([
      { rot: 90 }, { rot: 45 }, { rot: 270 },
      { rot: 180 }, { rot: 90 }, { rot: 0 },
      { rot: 270 }, { rot: 45 }, { rot: 90 }
    ]);

    const timer = setTimeout(() => setBootSequence(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // --- PASO 2: Lógica Blindada ---
  const triggerSuccess = useCallback(() => {
    setIsDecoding(true);
    setTimeout(() => {
      if (onUnlock) onUnlock(true);
      setIsDecoding(false);
    }, 1000);
  }, [onUnlock]);

  const rotateNode = (index) => {
    if (isUnlocked || isDecoding || bootSequence) return;
    
    const newNodes = [...nodes];
    newNodes[index].rot = (newNodes[index].rot + 90) % 360;
    setNodes(newNodes);

    if (newNodes.every(n => n.rot % 180 === 0)) {
      triggerSuccess();
    }
  };

  const handleHashSubmit = (e) => {
    e.preventDefault();
    if (accessCode.toUpperCase() === 'D6_RECIPES') {
      triggerSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setAccessCode('');
    }
  };

  // --- PASO 3: Renderizado Condicional ---
  // Si no es el cliente, no renderizamos NADA para evitar el ReferenceError
  if (!isClient) return null;

  return (
    <div className={`${tStyles.container} ${isUnlocked ? tStyles.unlocked : ''}`}>
      <div className={tStyles.monitor}>
        <div className={tStyles.scanlines} />
        
        <header className={tStyles.header}>
          <div className={tStyles.brand}>D6_TERMINAL_UNIT</div>
          <div className={tStyles.stats}>
            <Activity size={12} className={tStyles.pulse} />
            <span>IO_ACTIVE</span>
          </div>
        </header>

        <nav className={tStyles.tabs}>
          <button 
            type="button"
            onClick={() => setView('KEYPAD')}
            className={view === 'KEYPAD' ? tStyles.activeTab : ''}
            disabled={isUnlocked || isDecoding}
          >
            <TerminalIcon size={14} /> <span>AUTH</span>
          </button>
          <button 
            type="button"
            onClick={() => setView('BYPASS')}
            className={view === 'BYPASS' ? tStyles.activeTab : ''}
            disabled={isUnlocked || isDecoding}
          >
            <Zap size={14} /> <span>LINK</span>
          </button>
        </nav>

        <div className={tStyles.screenArea}>
          <AnimatePresence mode="wait">
            {bootSequence ? (
              <motion.div key="boot" exit={{ opacity: 0 }} className={tStyles.centered}>
                <RefreshCw className={tStyles.spin} size={30} />
                <p>LOADING_MODULES...</p>
              </motion.div>
            ) : isUnlocked ? (
              <motion.div key="win" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={tStyles.centered}>
                <Unlock size={40} className={tStyles.glowIcon} />
                <h2 className={tStyles.successText}>ACCESS_GRANTED</h2>
              </motion.div>
            ) : view === 'KEYPAD' ? (
              <motion.div key="hash" className={tStyles.hashView}>
                <form onSubmit={handleHashSubmit} className={tStyles.hashForm}>
                  <label>ENTER_HASH_SEQUENCE</label>
                  <div className={tStyles.inputGroup}>
                    <ChevronRight className={tStyles.cursor} />
                    <input 
                      type="text" 
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="D6_XXXX"
                      autoFocus
                    />
                  </div>
                  <button type="submit" className={tStyles.submitBtn}>DECODE</button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="nodes" className={nStyles.grid}>
                {nodes.map((node, i) => (
                  <button
                    key={`node-${i}`}
                    className={`${nStyles.node} ${node.rot % 180 === 0 ? nStyles.active : ''}`}
                    onClick={() => rotateNode(i)}
                    style={{ transform: `rotate(${node.rot}deg)` }}
                  >
                    <div className={nStyles.wire} />
                    <div className={nStyles.core} />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className={tStyles.footer}>
          <span>STATUS: {isUnlocked ? 'BYPASSED' : 'LOCKED'}</span>
          <Power size={12} />
        </footer>
      </div>
    </div>
  );
};