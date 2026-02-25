'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Unlock, Zap, Terminal as TermIcon, 
  Activity, RefreshCw, ShieldAlert, 
  Power, ChevronRight
} from 'lucide-react';

import tStyles from '../../../styles/inventory-styles/terminal-puzzle.module.css';
import nStyles from '../../../styles/inventory-styles/puzzlenode.module.css';

export const TerminalPuzzle = ({ onUnlock, isUnlocked }) => {
  const [view, setView] = useState('KEYPAD'); 
  const [accessCode, setAccessCode] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  
  // Estado inicial de los nodos (ángulos aleatorios para el puzzle)
  const [nodes, setNodes] = useState([
    { rot: 90 }, { rot: 45 }, { rot: 270 },
    { rot: 180 }, { rot: 90 }, { rot: 0 },
    { rot: 270 }, { rot: 45 }, { rot: 90 }
  ]);

  // Simulación de arranque inicial
  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const triggerSuccess = useCallback(() => {
    setIsDecoding(true);
    // Pequeño delay para que el usuario vea la conexión final
    setTimeout(() => {
      onUnlock(true);
      setIsDecoding(false);
    }, 1000);
  }, [onUnlock]);

  const rotateNode = (index) => {
    if (isUnlocked || isDecoding || bootSequence) return;
    
    const newNodes = [...nodes];
    newNodes[index].rot = (newNodes[index].rot + 90) % 360;
    setNodes(newNodes);

    // Condición de victoria: todos alineados horizontal o verticalmente
    if (newNodes.every(n => n.rot % 180 === 0)) {
      triggerSuccess();
    }
  };

  const handleHashSubmit = (e) => {
    e.preventDefault();
    if (isDecoding || isUnlocked) return;

    if (accessCode.toUpperCase() === 'D6_RECIPES') {
      triggerSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setAccessCode('');
    }
  };

  return (
    <div className={`${tStyles.container} ${isUnlocked ? tStyles.unlocked : ''}`}>
      <div className={tStyles.monitor}>
        {/* Efecto visual de líneas de escaneo CRT */}
        <div className={tStyles.scanlines} />
        
        {/* Cabecera del Sistema */}
        <header className={tStyles.header}>
          <div className={tStyles.brand}>D6_SYSTEM_OS_V4.2</div>
          <div className={tStyles.stats}>
            <Activity size={12} className={tStyles.pulse} />
            <span>LINK_ESTABLISHED</span>
          </div>
        </header>

        {/* Selector de Módulo */}
        <nav className={tStyles.tabs}>
          <button 
            type="button"
            onClick={() => setView('KEYPAD')}
            className={view === 'KEYPAD' ? tStyles.activeTab : ''}
            disabled={isUnlocked || isDecoding}
          >
            <TermIcon size={14} /> <span>HASH_AUTH</span>
          </button>
          <button 
            type="button"
            onClick={() => setView('BYPASS')}
            className={view === 'BYPASS' ? tStyles.activeTab : ''}
            disabled={isUnlocked || isDecoding}
          >
            <Zap size={14} /> <span>BYPASS_LINK</span>
          </button>
        </nav>

        {/* Área Principal de Pantalla */}
        <div className={tStyles.screenArea}>
          <AnimatePresence mode="wait">
            {bootSequence ? (
              <motion.div key="boot" exit={{ opacity: 0 }} className={tStyles.centered}>
                <RefreshCw className={tStyles.spin} size={30} />
                <p>SYNCING_CIRCUITS...</p>
              </motion.div>
            ) : isUnlocked ? (
              <motion.div 
                key="win" 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className={tStyles.centered}
              >
                <div className={tStyles.successRing}><Unlock size={40} /></div>
                <h2 className={tStyles.glowText}>ACCESS_GRANTED</h2>
                <small className={tStyles.blink}>CORE_DECRYPTED_SUCCESSFULLY</small>
              </motion.div>
            ) : view === 'KEYPAD' ? (
              <motion.div 
                key="hash" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className={tStyles.hashView}
              >
                <div className={tStyles.alertBox}>
                  <ShieldAlert size={16} /> <span>SECURE_HASH_REQUIRED</span>
                </div>
                <form onSubmit={handleHashSubmit} className={tStyles.hashForm}>
                  <label>AUTHORIZATION_KEY:</label>
                  <div className={tStyles.inputGroup}>
                    <ChevronRight className={tStyles.cursor} />
                    <input 
                      type="text" 
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="KEY_ID"
                      autoFocus
                      disabled={isDecoding}
                    />
                  </div>
                  <button type="submit" className={tStyles.submitBtn} disabled={!accessCode || isDecoding}>
                    {isDecoding ? 'DECRYPTING...' : 'CONFIRM_AUTHORIZATION'}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* MÓDULO DE NODOS (BYPASS) */
              <motion.div 
                key="nodes" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className={nStyles.gridWrapper}
              >
                <div className={nStyles.grid}>
                  {nodes.map((node, i) => (
                    <button
                      key={`node-${i}`}
                      type="button"
                      className={`
                        ${nStyles.node} 
                        ${node.rot % 180 === 0 ? nStyles.active : ''}
                      `}
                      onClick={() => rotateNode(i)}
                      style={{ transform: `rotate(${node.rot}deg)` }}
                    >
                      {/* Línea de energía con flujo animado */}
                      <div className={nStyles.wire}>
                        <div className={nStyles.energyFlow} />
                      </div>
                      
                      {/* Núcleo del nodo */}
                      <div className={nStyles.core}>
                        <div className={nStyles.innerGlow} />
                      </div>

                      {/* Detalle de hardware: Tornillos */}
                      <div className={nStyles.screwHead} />
                    </button>
                  ))}
                </div>
                
                {/* Indicadores de Estabilidad */}
                <div className={nStyles.status}>
                  <div className={nStyles.stabilityBar}>
                    <div 
                      className={nStyles.stabilityProgress} 
                      style={{ width: `${(nodes.filter(n => n.rot % 180 === 0).length / 9) * 100}%` }}
                    />
                  </div>
                  <div className={nStyles.statusLabel}>
                    <Power size={12} /> 
                    <span>SIGNAL_INTEGRITY: {nodes.filter(n => n.rot % 180 === 0).length}/9</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer con Telemetría */}
        <footer className={tStyles.footer}>
          <div className={tStyles.log}>OS_LOAD: {isDecoding ? '98%' : '14%'}</div>
          <div className={tStyles.log}>CORE: {isUnlocked ? 'BYPASSED' : 'LOCKED'}</div>
        </footer>

        {/* Overlay de Error con efecto Glitch */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className={tStyles.errorGlitch}
            >
              <div className={tStyles.errorBox}>
                <ShieldAlert size={24} />
                <span>ACCESS_DENIED: INVALID_HASH</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};