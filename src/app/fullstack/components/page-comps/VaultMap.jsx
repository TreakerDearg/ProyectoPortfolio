"use client";
import React, { useState, useEffect } from "react";
import { Cpu, Server, Wifi, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { initialMap, generateTarget, mutateMap } from "../../data/mapConfig";
import styles from "../../styles/page-comp-styles/VaultMap.module.css";

export const VaultMap = () => {
  const [mapData, setMapData] = useState(initialMap);
  const [target, setTarget] = useState(() => generateTarget(initialMap));
  const [cursorPos, setCursorPos] = useState({ y: 1, x: 1 });
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(null);

  // Colocar cursor en la entrada
  useEffect(() => {
    for (let i = 0; i < mapData.length; i++) {
      for (let j = 0; j < mapData[i].length; j++) {
        if (mapData[i][j] === 4) {
          setCursorPos({ y: i, x: j });
          return;
        }
      }
    }
  }, [mapData]);

  // Control por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      let dy = 0, dx = 0;
      switch (e.key) {
        case 'ArrowUp': dy = -1; break;
        case 'ArrowDown': dy = 1; break;
        case 'ArrowLeft': dx = -1; break;
        case 'ArrowRight': dx = 1; break;
        default: return;
      }
      const ny = cursorPos.y + dy;
      const nx = cursorPos.x + dx;
      if (ny >= 0 && ny < 8 && nx >= 0 && nx < 8 && mapData[ny][nx] !== 1) {
        setCursorPos({ y: ny, x: nx });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cursorPos, mapData]);

  // Detectar llegada a la meta
  useEffect(() => {
    if (cursorPos.y === target.y && cursorPos.x === target.x) {
      const newCount = count + 1;
      if (newCount >= 3) {
        setMessage("SISTEMA COMPLETADO");
        setTimeout(() => setMessage(null), 2000);
        const newMap = mutateMap(initialMap);
        setMapData(newMap);
        setTarget(generateTarget(newMap));
        setCount(0);
      } else {
        setCount(newCount);
        const newMap = mutateMap(mapData);
        setMapData(newMap);
        setTarget(generateTarget(newMap));
      }
    }
  }, [cursorPos, target, count, mapData]);

  const getCellContent = (cell) => {
    switch (cell) {
      case 2: return <div className={styles.roomIcon}><Server size={12} /></div>;
      case 3: return <div className={styles.serverIcon}><Cpu size={12} /></div>;
      case 4: return <div className={styles.entranceIcon}><Wifi size={12} /></div>;
      default: return null;
    }
  };

  const getCellClass = (cell, y, x) => {
    let baseClass = styles.mapCell;
    switch (cell) {
      case 1: baseClass += ` ${styles.wall}`; break;
      case 2: baseClass += ` ${styles.room}`; break;
      case 3: baseClass += ` ${styles.server}`; break;
      case 4: baseClass += ` ${styles.entrance}`; break;
      default: baseClass += ` ${styles.empty}`;
    }
    if (cursorPos.y === y && cursorPos.x === x) baseClass += ` ${styles.cursor}`;
    if (target.y === y && target.x === x) baseClass += ` ${styles.target}`;
    return baseClass;
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapHeader}>
        <span>VAULT 42 - SECTOR MAP</span>
        <span className={styles.counter}>M: {count}/3</span>
      </div>
      <div className={styles.mapGrid}>
        {mapData.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} className={getCellClass(cell, i, j)}>
              {getCellContent(cell)}
            </div>
          ))
        )}
        {message && <div className={styles.message}>{message}</div>}
      </div>
      <div className={styles.controls}>
        <button onClick={() => setCursorPos({ y: cursorPos.y-1, x: cursorPos.x })} disabled={cursorPos.y === 0 || mapData[cursorPos.y-1][cursorPos.x] === 1}>
          <ArrowUp size={12} />
        </button>
        <button onClick={() => setCursorPos({ y: cursorPos.y+1, x: cursorPos.x })} disabled={cursorPos.y === 7 || mapData[cursorPos.y+1][cursorPos.x] === 1}>
          <ArrowDown size={12} />
        </button>
        <button onClick={() => setCursorPos({ y: cursorPos.y, x: cursorPos.x-1 })} disabled={cursorPos.x === 0 || mapData[cursorPos.y][cursorPos.x-1] === 1}>
          <ArrowLeft size={12} />
        </button>
        <button onClick={() => setCursorPos({ y: cursorPos.y, x: cursorPos.x+1 })} disabled={cursorPos.x === 7 || mapData[cursorPos.y][cursorPos.x+1] === 1}>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};