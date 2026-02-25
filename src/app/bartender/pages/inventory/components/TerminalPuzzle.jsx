'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Unlock, Zap, Terminal as TermIcon, 
  Activity, RefreshCw, ShieldAlert, 
  Power, ChevronRight, RotateCw
} from 'lucide-react';

import tStyles from '../../../styles/inventory-styles/terminal-puzzle.module.css';
import nStyles from '../../../styles/inventory-styles/puzzlenode.module.css';

export const TerminalPuzzle = ({ onUnlock, isUnlocked }) => {
  const [view, setView] = useState('KEYPAD'); 
  const [accessCode, setAccessCode] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  
  // --- LÓGICA DEL PUZZLE LIGHTS OUT (3x3) ---
  const createEmptyGrid = () => Array(9).fill(false); // false = apagado
  const [nodes, setNodes] = useState(createEmptyGrid);

  // Genera un tablero aleatorio pero resoluble (partiendo de todo apagado y aplicando toggles aleatorios)
  const generateSolvablePuzzle = useCallback(() => {
    let newGrid = createEmptyGrid();
    const steps = Math.floor(Math.random() * 15) + 10; // entre 10 y 25 toggles
    for (let i = 0; i < steps; i++) {
      const idx = Math.floor(Math.random() * 9);
      newGrid = toggleLights(newGrid, idx);
    }
    return newGrid;
  }, []);

  // Función pura que alterna un LED y sus vecinos
  const toggleLights = (grid, index) => {
    const newGrid = [...grid];
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Alternar el propio
    newGrid[index] = !newGrid[index];

    // Vecinos: arriba
    if (row > 0) newGrid[index - 3] = !newGrid[index - 3];
    // Abajo
    if (row < 2) newGrid[index + 3] = !newGrid[index + 3];
    // Izquierda
    if (col > 0) newGrid[index - 1] = !newGrid[index - 1];
    // Derecha
    if (col < 2) newGrid[index + 1] = !newGrid[index + 1];

    return newGrid;
  };

  // Inicializar con un puzzle resoluble
  useEffect(() => {
    setNodes(generateSolvablePuzzle());
  }, [generateSolvablePuzzle]);

  // Simulación de arranque inicial
  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const triggerSuccess = useCallback(() => {
    setIsDecoding(true);
    setTimeout(() => {
      onUnlock(true);
      setIsDecoding(false);
    }, 1000);
  }, [onUnlock]);

  // Manejar clic en un nodo
  const handleNodeClick = (index) => {
    if (isUnlocked || isDecoding || bootSequence) return;
    setNodes(prev => toggleLights(prev, index));
  };

  // Verificar si todos los LEDs están apagados
  useEffect(() => {
    if (isUnlocked || isDecoding || bootSequence) return;
    if (nodes.every(v => v === false)) {
      triggerSuccess();
    }
  }, [nodes, isUnlocked, isDecoding, bootSequence, triggerSuccess]);

  // Reiniciar puzzle con nueva configuración aleatoria resoluble
  const shuffleNodes = () => {
    if (isUnlocked || isDecoding) return;
    setNodes(generateSolvablePuzzle());
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

  // Calcular cuántos LEDs están apagados (para la barra de progreso)
  const offCount = nodes.filter(v => !v).length;

  return (
    <div className={`${tStyles.container} ${isUnlocked ? tStyles.unlocked : ''}`}>
      <div className={tStyles.monitor}>
        <div className={tStyles.scanlines} />
        
        <header className={tStyles.header}>
          <div className={tStyles.brand}>D6_SYSTEM_OS_V4.2</div>
          <div className={tStyles.stats}>
            <Activity size={12} className={tStyles.pulse} />
            <span>LINK_ESTABLISHED</span>
          </div>
        </header>

        <nav className={tStyles.tabs}>
          <button 
            onClick={() => setView('KEYPAD')}
            className={view === 'KEYPAD' ? tStyles.activeTab : ''}
            disabled={isUnlocked || isDecoding}
          >
            <TermIcon size={14} /> <span>HASH_AUTH</span>
          </button>
          <button 
            onClick={() => setView('BYPASS')}
            className={view === 'BYPASS' ? tStyles.activeTab : ''}
            disabled={isUnlocked || isDecoding}
          >
            <Zap size={14} /> <span>BYPASS_LINK</span>
          </button>
        </nav>

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

                <div className={tStyles.hintBox}>
                  <span role="img" aria-label="pista">📌</span> 
                  <span>CLUE: Check sticky notes (posits) on folders</span>
                </div>

                <form onSubmit={handleHashSubmit} className={tStyles.hashForm}>
                  <label>AUTHORIZATION_KEY:</label>
                  <div className={tStyles.inputGroup}>
                    <ChevronRight className={tStyles.cursor} />
                    <input 
                      type="text" 
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="D6_RECIPES"
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
              /* MÓDULO DE NODOS (LIGHTS OUT) */
              <motion.div 
                key="nodes" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className={`${nStyles.gridWrapper} ${nodes.every(v => !v) ? nStyles.success : ''}`}
              >
                <div className={nStyles.grid}>
                  {nodes.map((isOn, i) => (
                    <motion.button
                      key={`node-${i}`}
                      className={`${nStyles.node} ${isOn ? nStyles.active : ''}`}
                      onClick={() => handleNodeClick(i)}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Núcleo LED */}
                      <div className={nStyles.core}>
                        <div className={nStyles.innerGlow} />
                      </div>

                      {/* Tornillos decorativos */}
                      <div className={nStyles.screwHead} />
                    </motion.button>
                  ))}
                </div>
                
                {/* Panel de estado con progreso y botón de reinicio */}
                <div className={nStyles.status}>
                  <div className={nStyles.stabilityBar}>
                    <div 
                      className={nStyles.stabilityProgress} 
                      style={{ width: `${(offCount / 9) * 100}%` }}
                    />
                  </div>
                  <div className={nStyles.statusRow}>
                    <div className={nStyles.statusLabel}>
                      <Power size={12} /> 
                      <span>OFF: {offCount}/9</span>
                    </div>
                    <button 
                      className={nStyles.shuffleBtn}
                      onClick={shuffleNodes}
                      disabled={isUnlocked || isDecoding}
                      title="Reiniciar puzzle"
                    >
                      <RotateCw size={14} />
                    </button>
                  </div>
                  <div className={nStyles.objective}>
                    <span>🎯 OBJECTIVE: Turn off all LEDs</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className={tStyles.footer}>
          <div className={tStyles.log}>OS_LOAD: {isDecoding ? '98%' : '14%'}</div>
          <div className={tStyles.log}>CORE: {isUnlocked ? 'BYPASSED' : 'LOCKED'}</div>
        </footer>

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