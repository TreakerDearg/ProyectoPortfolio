"use client";
import { useRef, useCallback } from "react";
import styles from "../../styles/HomeStyles/home.module.css";

export default function DesktopIcon({  isSelected, onSelect, onDoubleClick, children }) {
  const touchTimeout = useRef(null);
  const lastTouch = useRef(0);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    const now = Date.now();
    const timeSince = now - lastTouch.current;
    if (timeSince < 300 && timeSince > 0) {
      // Doble toque
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
      onDoubleClick();
      lastTouch.current = 0;
    } else {
      // Toque simple: esperar un poco para ver si viene otro
      lastTouch.current = now;
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
      touchTimeout.current = setTimeout(() => {
        onSelect();
        touchTimeout.current = null;
      }, 250);
    }
  }, [onSelect, onDoubleClick]);

  const handleClick = useCallback(() => {
    // En ratón, el clic simple selecciona y doble clic abre
    // No hacemos nada aquí porque el doble clic se maneja por separado
  }, []);

  return (
    <div
      className={`${styles.desktopIcon} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}