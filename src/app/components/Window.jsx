"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Minus, Square, X } from "lucide-react";
import styles from "../styles/HomeStyles/Window.module.css";

export default function Window({
  title,
  children,
  initialX = 50,
  initialY = 50,
  initialWidth = 600,
  initialHeight = 400,
  minimized = false,
  maximized = false,
  zIndex = 1,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
}) {
  const [isMinimized, setIsMinimized] = useState(minimized);
  const [isMaximized, setIsMaximized] = useState(maximized);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const windowRef = useRef(null);
  const titleBarRef = useRef(null);

  // Sincronizar con props
  useEffect(() => {
    setIsMinimized(minimized);
  }, [minimized]);

  useEffect(() => {
    setIsMaximized(maximized);
  }, [maximized]);

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  // Iniciar arrastre (ratón)
  const handleMouseDown = useCallback((e) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    if (onFocus) onFocus();
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, [isMaximized, onFocus]);

  // Iniciar arrastre (táctil)
  const handleTouchStart = useCallback((e) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    if (onFocus) onFocus();
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect && touch) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  }, [isMaximized, onFocus]);

  // Movimiento (ratón)
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();

    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;

    const windowWidth = windowRef.current?.offsetWidth || initialWidth;
    const windowHeight = windowRef.current?.offsetHeight || initialHeight;
    newX = Math.max(0, Math.min(newX, window.innerWidth - windowWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - windowHeight));

    setPosition({ x: newX, y: newY });

    if (windowRef.current) {
      windowRef.current.style.left = `${newX}px`;
      windowRef.current.style.top = `${newY}px`;
    }
  }, [isDragging, dragOffset, initialWidth, initialHeight]);

  // Movimiento (táctil)
  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;

    let newX = touch.clientX - dragOffset.x;
    let newY = touch.clientY - dragOffset.y;

    const windowWidth = windowRef.current?.offsetWidth || initialWidth;
    const windowHeight = windowRef.current?.offsetHeight || initialHeight;
    newX = Math.max(0, Math.min(newX, window.innerWidth - windowWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - windowHeight));

    setPosition({ x: newX, y: newY });

    if (windowRef.current) {
      windowRef.current.style.left = `${newX}px`;
      windowRef.current.style.top = `${newY}px`;
    }
  }, [isDragging, dragOffset, initialWidth, initialHeight]);

  // Finalizar arrastre
  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (onPositionChange) {
        onPositionChange(position.x, position.y);
      }
    }
  }, [isDragging, onPositionChange, position]);

  // Registrar eventos globales
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMoveWrapper = (e) => handleMouseMove(e);
    const handleTouchMoveWrapper = (e) => handleTouchMove(e);
    const handleDragEndWrapper = () => handleDragEnd();

    window.addEventListener('mousemove', handleMouseMoveWrapper);
    window.addEventListener('mouseup', handleDragEndWrapper);
    window.addEventListener('touchmove', handleTouchMoveWrapper, { passive: false });
    window.addEventListener('touchend', handleDragEndWrapper);
    window.addEventListener('touchcancel', handleDragEndWrapper);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWrapper);
      window.removeEventListener('mouseup', handleDragEndWrapper);
      window.removeEventListener('touchmove', handleTouchMoveWrapper);
      window.removeEventListener('touchend', handleDragEndWrapper);
      window.removeEventListener('touchcancel', handleDragEndWrapper);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  // Manejadores de botones
  const handleMinimizeClick = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
    if (onMinimize) onMinimize();
  };

  const handleMaximizeClick = (e) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize();
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    if (onClose) onClose();
  };

  const handleTitleDoubleClick = () => {
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize();
  };

  return (
    <div
      ref={windowRef}
      className={`${styles.window} ${isMaximized ? styles.maximized : ""} ${isDragging ? styles.dragging : ""}`}
      style={{
        zIndex,
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : initialWidth,
        height: isMaximized ? '100%' : (isMinimized ? 'auto' : initialHeight),
        position: 'absolute',
      }}
      onClick={() => onFocus && onFocus()}
    >
      {/* Barra de título arrastrable */}
      <div
        ref={titleBarRef}
        className={styles.titleBar}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={handleTitleDoubleClick}
      >
        <span className={styles.title}>{title}</span>
        <div className={styles.buttons}>
          <button
            onClick={handleMinimizeClick}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className={styles.button}
            title="Minimizar"
          >
            <Minus size={12} />
          </button>
          <button
            onClick={handleMaximizeClick}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className={styles.button}
            title="Maximizar"
          >
            <Square size={10} />
          </button>
          <button
            onClick={handleCloseClick}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className={`${styles.button} ${styles.close}`}
            title="Cerrar"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Contenido de la ventana (solo si no está minimizada) */}
      {!isMinimized && (
        <div className={styles.content} style={{ height: isMaximized ? 'calc(100% - 30px)' : 'auto' }}>
          {children}
        </div>
      )}
    </div>
  );
}