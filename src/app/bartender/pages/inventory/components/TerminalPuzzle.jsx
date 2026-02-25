'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Unlock, Zap, Terminal as TermIcon, 
  Activity, RefreshCw, ShieldAlert, 
  Power, ChevronRight
} from 'lucide-react';

// Importación de estilos con prefijo para evitar colisiones
import tStyles from '../../../styles/inventory-styles/terminal-puzzle.module.css';
import nStyles from '../../../styles/inventory-styles/puzzlenode.module.css';

export const TerminalPuzzle = ({ onUnlock, isUnlocked }) => {
  // --- SEGURIDAD DE RENDERIZADO (SSR) ---
  const [mounted, setMounted] = useState(false);
  
  // --- ESTADOS DE INTERFAZ ---
  const [view, setView] = useState('KEYPAD'); 
  const [accessCode, setAccessCode] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  
  // Estado de los nodos (Iniciado como null para evitar discrepancias de hidratación)
  const [nodes, setNodes] = useState([]);

  // 1. Efecto de Montaje y Generación de Nodos
  useEffect(() => {
    setMounted(true);
    // Generamos los ángulos solo en el cliente para evitar errores de hidratación
    const initialNodes = [
      { rot: 90 }, { rot: 45 }, { rot: 270 },
      { rot: 180 }, { rot: 90 }, { rot: 0 },
      { rot: 270 }, { rot: 45 }, { rot: 90 }
    ];
    setNodes(initialNodes);

    const timer = setTimeout(() => setBootSequence(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 2. Lógica de Victoria
  const triggerSuccess = useCallback(() => {
    setIsDecoding(true);
    // Delay táctico para inmersión
    setTimeout(() => {
      if (onUnlock) onUnlock(true);
      setIsDecoding(false);
    }, 1200);
  }, [onUnlock]);

  // 3. Interacción con Nodos
  const rotateNode = (index) => {
    if (isUnlocked || isDecoding || bootSequence) return;
    
    setNodes(prev => {
      const newNodes = [...prev];
      newNodes[index] = { ...newNodes[index], rot: (newNodes[index].rot + 90) % 360 };
      
      // Verificación de victoria (todos a 0, 180 o 360 grados)
      const allAligned = newNodes.every(n => n.rot % 180 === 0);
      if (allAligned) {
        // Usamos una micro-tarea para no bloquear el renderizado actual
        setTimeout(triggerSuccess, 100);
      }
      return newNodes;
    });
  };

  const handleHashSubmit = (e) => {
    e.preventDefault();
    if (isDecoding || isUnlocked) return;

    // Código maestro de D6
    if (accessCode.toUpperCase() === 'D6_RECIPES') {
      triggerSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setAccessCode('');
    }
  };

  // Prevenir renderizado en servidor para evitar ReferenceError de APIs de navegador
  if (!mounted) return null;

  return (
    <div className={`${tStyles.container} ${isUnlocked ? tStyles.unlocked : ''}`}>
      <div className={tStyles.monitor}>
        {/* EFECTOS VISUALES CRT */}
        <div className={tStyles.scanlines} />
        <div className={tStyles.crtGlow} />
        
        {/* HEADER */}
        <header className={tStyles.header}>
          <div className={tStyles.brand}>
            <TermIcon size={12} className={tStyles.iconAmber} />
            <span>OS_METRO_V4.2</span>
          </div>
          <div className={tStyles.stats}>
            <Activity size={12} className={tStyles.pulse} />
            <span className={tStyles.statusText}>LINK_LIVE</span>
          </div>
        </header>

        {/* NAVEGACIÓN TÁCTICA */}
        <nav className={tStyles.tabs}>
          <button 
            onClick={() => setView('KEYPAD')}
            className={view === 'KEYPAD' ? tStyles.activeTab : tStyles.tab}
            disabled={isUnlocked || isDecoding}
          >
            HASH_KEY
          </button>
          <button 
            onClick={() => setView('BYPASS')}
            className={view === 'BYPASS' ? tStyles.activeTab : tStyles.tab}
            disabled={isUnlocked || isDecoding}
          >
            CIRCUIT
          </button>
        </nav>

        {/* PANTALLA PRINCIPAL */}
        <div className={tStyles.screenArea}>
          <AnimatePresence mode="wait">
            {bootSequence ? (
              <motion.div 
                key="boot" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className={tStyles.centered}
              >
                <RefreshCw className={tStyles.spin} size={24} />
                <p className={tStyles.loadingText}>BOOTING_MODULES...</p>
              </motion.div>
            ) : isUnlocked ? (
              <motion.div 
                key="win" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={tStyles.centered}
              >
                <div className={tStyles.successIcon}><Unlock size={32} /></div>
                <h3 className={tStyles.successTitle}>AUTH_GRANTED</h3>
                <div className={tStyles.separator} />
                <p className={tStyles.successSub}>SECURE_FILES_AVAILABLE</p>
              </motion.div>
            ) : view === 'KEYPAD' ? (
              <motion.div 
                key="hash" 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 10 }}
                className={tStyles.formContainer}
              >
                <div className={tStyles.instruction}>ENTER_ENCRYPTION_HASH</div>
                <form onSubmit={handleHashSubmit} className={tStyles.form}>
                  <div className={tStyles.inputWrapper}>
                    <ChevronRight size={16} className={tStyles.prompt} />
                    <input 
                      type="text" 
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="********"
                      className={tStyles.terminalInput}
                      autoFocus
                      disabled={isDecoding}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className={tStyles.authBtn}
                    disabled={!accessCode || isDecoding}
                  >
                    {isDecoding ? 'DECODING...' : 'RUN_DECRYPT'}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* GRID DE NODOS */
              <motion.div 
                key="nodes" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className={nStyles.gridContainer}
              >
                <div className={nStyles.nodeGrid}>
                  {nodes.map((node, i) => (
                    <button
                      key={`node-${i}`}
                      className={`
                        ${nStyles.nodeBtn} 
                        ${node.rot % 180 === 0 ? nStyles.aligned : ''}
                      `}
                      onClick={() => rotateNode(i)}
                      style={{ transform: `rotate(${node.rot}deg)` }}
                    >
                      <div className={nStyles.circuitLine} />
                      <div className={nStyles.nodeCore} />
                    </button>
                  ))}
                </div>
                
                <div className={nStyles.telemetry}>
                  <div className={nStyles.integrityRow}>
                    <span className={nStyles.label}>SIGNAL:</span>
                    <div className={nStyles.barBackground}>
                      <motion.div 
                        className={nStyles.barFill}
                        animate={{ width: `${(nodes.filter(n => n.rot % 180 === 0).length / 9) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* STATUS BAR */}
        <footer className={tStyles.footer}>
          <div className={tStyles.statusGroup}>
            <Power size={10} />
            <span>CPU_LOAD: {isDecoding ? '92%' : '18%'}</span>
          </div>
          <div className={tStyles.statusGroup}>
            <span className={isUnlocked ? tStyles.textSuccess : tStyles.textLocked}>
              {isUnlocked ? 'DECRYPTED' : 'ENCRYPTED'}
            </span>
          </div>
        </footer>

        {/* OVERLAY DE ERROR GLITCH */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={tStyles.glitchOverlay}
            >
              <div className={tStyles.errorContent}>
                <ShieldAlert size={30} />
                <span>HASH_MISMATCH</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};