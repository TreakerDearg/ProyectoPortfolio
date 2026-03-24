"use client";

import { useState, useRef, useCallback, useMemo } from "react";

import BentoGrid from "../desktop/BentoGrid";
import Window from "./Window";
import ComputerTab from "../desktop/ComputerTab";
import Taskbar from "./Taskbar";
import BootSequence from "./BootSequence";

import { useIsMobile } from "../hooks/useIsMobile";

import styles from "../../../../styles/logs-styles/system/window-manager.module.css";

export default function WindowManager() {

  const [windows, setWindows] = useState([]);
  const [booting, setBooting] = useState(true);

  const zIndexRef = useRef(100);
  const isMobile = useIsMobile();

  /* =========================
     CORE UPDATE
  ========================= */
  const updateWindow = useCallback((id, patch) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, ...(typeof patch === "function" ? patch(w) : patch) }
          : w
      )
    );
  }, []);

  /* =========================
     ACTIVE WINDOW (REAL)
  ========================= */
  const activeWindow = useMemo(() => {
    if (windows.length === 0) return null;
    return windows.reduce((top, w) => (w.z > top.z ? w : top), windows[0]);
  }, [windows]);

  /* =========================
     FOCUS
  ========================= */
  const bringToFront = useCallback((id) => {
    updateWindow(id, { z: ++zIndexRef.current });
  }, [updateWindow]);

  /* =========================
     OPEN
  ========================= */
  const openWindow = useCallback((app, spawn = { x: 120, y: 80 }) => {

    setWindows(prev => {
      const existing = prev.find(w => w.app.id === app.id);

      if (existing) {
        return prev.map(w =>
          w.id === existing.id
            ? { ...w, z: ++zIndexRef.current, minimized: false }
            : w
        );
      }

      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          app,
          z: ++zIndexRef.current,
          minimized: false,
          position: spawn,
        }
      ];
    });

  }, []);

  /* =========================
     CLOSE
  ========================= */
  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  /* =========================
     MINIMIZE
  ========================= */
  const toggleMinimize = useCallback((id) => {
    updateWindow(id, w => ({
      minimized: !w.minimized,
    }));
  }, [updateWindow]);

  /* =========================
     MOVE
  ========================= */
  const moveWindow = useCallback((id, pos) => {
    updateWindow(id, { position: pos });
  }, [updateWindow]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div className={styles.manager}>

      {/* =========================
          BOOT (bloquea UI)
      ========================= */}
      {booting && (
        <div className={styles.bootLayer}>
          <BootSequence onFinish={() => setBooting(false)} />
        </div>
      )}

      {/* =========================
          DESKTOP
      ========================= */}
      <div className={styles.desktop}>
        <BentoGrid onOpen={openWindow} />
      </div>

      {/* =========================
          WINDOWS
      ========================= */}
      <div className={styles.windowsLayer}>
        {windows.map(win => {

          if (win.minimized) return null;

          const isActive = activeWindow?.id === win.id;

          const commonProps = {
            key: win.id,
            data: win,
            isActive, // 🔥 NUEVO
            onClose: () => closeWindow(win.id),
            onFocus: () => bringToFront(win.id),
            onMinimize: () => toggleMinimize(win.id),
          };

          return isMobile ? (
            <Window {...commonProps} />
          ) : (
            <ComputerTab
              {...commonProps}
              onDragEnd={(id, pos) => moveWindow(id, pos)}
            />
          );
        })}
      </div>

      {/* =========================
          TASKBAR
      ========================= */}
      <div className={styles.taskbarLayer}>
        <Taskbar
          windows={windows}
          activeId={activeWindow?.id} // 🔥 IMPORTANTE
          onToggleMinimize={toggleMinimize}
          onFocus={bringToFront}
        />
      </div>

    </div>
  );
}