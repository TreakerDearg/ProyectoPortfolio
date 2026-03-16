"use client";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Window from "../components/Window";
import DesktopIcon from "../components/app-web/DesktopIcon";
// Iconos
import PcIcon from "../components/app-web/PcIcon";
import DocsIcon from "../components/app-web/DocsIcon";
import CalcIcon from "../components/app-web/CalcIcon";
import PaintIcon from "../components/app-web/PaintIcon";
import MusicIcon from "../components/app-web/MusicIcon";
import SettingsIcon from "../components/app-web/SettingsIcon";
import TerminalIcon from "../components/app-web/TerminalIcon";
import InternetIcon from "../components/app-web/InternetIcon";
import MailIcon from "../components/app-web/MailIcon";
import GamesIcon from "../components/app-web/GamesIcon";
import DeveloperIcon from "../components/app-web/DeveloperIcon";
import BartenderIcon from "../components/app-web/BartenderIcon";
import AnalystIcon from "../components/app-web/AnalystIcon";
// Contenidos de ventanas
import PcContent from "../components/app-web/PcContent";
import DocsContent from "../components/app-web/DocsContent";
import CalcContent from "../components/app-web/CalcContent";
import PaintContent from "../components/app-web/PaintContent";
import MusicContent from "../components/app-web/MusicContent";
import SettingsContent from "../components/app-web/SettingsContent";
import TerminalContent from "../components/app-web/TerminalContent";
import InternetContent from "../components/app-web/InternetContent";
import MailContent from "../components/app-web/MailContent";
import GamesContent from "../components/app-web/GamesContent";
import styles from "../styles/HomeStyles/home.module.css";

// Configuración de iconos
const desktopIcons = [
  { id: "pc", icon: PcIcon, content: PcContent, label: "Mi PC", module: false },
  { id: "docs", icon: DocsIcon, content: DocsContent, label: "Mis Documentos", module: false },
  { id: "calc", icon: CalcIcon, content: CalcContent, label: "Calculadora", module: false },
  { id: "paint", icon: PaintIcon, content: PaintContent, label: "Paint", module: false },
  { id: "music", icon: MusicIcon, content: MusicContent, label: "Reproductor", module: false },
  { id: "settings", icon: SettingsIcon, content: SettingsContent, label: "Configuración", module: false },
  { id: "terminal", icon: TerminalIcon, content: TerminalContent, label: "MS-DOS", module: false },
  { id: "internet", icon: InternetIcon, content: InternetContent, label: "Internet Explorer", module: false },
  { id: "mail", icon: MailIcon, content: MailContent, label: "Outlook Express", module: false },
  { id: "games", icon: GamesIcon, content: GamesContent, label: "Juegos", module: false },
  { id: "developer", icon: DeveloperIcon, content: null, label: "Developer", module: true, path: "/fullstack" },
  { id: "bartender", icon: BartenderIcon, content: null, label: "Bartender", module: true, path: "/bartender" },
  { id: "analyst", icon: AnalystIcon, content: null, label: "Analyst", module: true, path: "/analyst" },
];

// Función para calcular posición inicial en cascada
const getInitialPosition = (windows, containerRect, width = 500, height = 400) => {
  if (!containerRect) return { x: 50, y: 50 };
  const step = 30;
  const maxX = containerRect.width - width;
  const maxY = containerRect.height - height;

  for (let i = 0; i < 10; i++) {
    const x = 50 + (i % 4) * step;
    const y = 50 + Math.floor(i / 4) * step;
    if (x <= maxX && y <= maxY) {
      const overlapping = windows.some(w => !w.closed && Math.abs(w.x - x) < 50 && Math.abs(w.y - y) < 50);
      if (!overlapping) return { x, y };
    }
  }
  return { x: 50, y: 50 };
};

export default function HomePage() {
  const router = useRouter();
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const desktopRef = useRef(null);
  const containerRectRef = useRef(null);

  // Actualizar el rectángulo del contenedor cuando cambie el tamaño
  useEffect(() => {
    const updateRect = () => {
      if (desktopRef.current) {
        const container = desktopRef.current.closest('.osScreen') || desktopRef.current.parentElement;
        if (container) {
          containerRectRef.current = container.getBoundingClientRect();
        }
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  // Cargar estado guardado (opcional)
  useEffect(() => {
    const saved = localStorage.getItem('windowsState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWindows(parsed.windows || []);
        setNextZIndex(parsed.nextZIndex || 10);
      } catch (e) {}
    }
  }, []);

  // Guardar estado al cambiar (opcional)
  useEffect(() => {
    localStorage.setItem('windowsState', JSON.stringify({ windows, nextZIndex }));
  }, [windows, nextZIndex]);

  // Deseleccionar al hacer clic en el escritorio
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (desktopRef.current && e.target === desktopRef.current) {
        setSelectedIcon(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Abrir ventana (o navegar si es módulo)
  const openWindow = useCallback((icon) => {
    if (icon.module) {
      router.push(icon.path);
      return;
    }

    setWindows(prev => {
      const existing = prev.find(w => w.id === icon.id && !w.closed);
      if (existing) {
        // Traer al frente
        setNextZIndex(z => z + 1);
        return prev.map(w =>
          w.id === icon.id ? { ...w, zIndex: nextZIndex + 1 } : w
        );
      } else {
        const lastPos = prev.find(w => w.id === icon.id && w.closed)?.lastPosition;
        const pos = lastPos || getInitialPosition(prev, containerRectRef.current);
        const newWindow = {
          id: icon.id,
          title: icon.label,
          content: icon.content,
          x: pos.x,
          y: pos.y,
          minimized: false,
          maximized: false,
          closed: false,
          zIndex: nextZIndex + 1,
          width: 500,
          height: 400,
          lastPosition: null,
        };
        setNextZIndex(z => z + 1);
        return [...prev, newWindow];
      }
    });
  }, [nextZIndex, router]);

  // Cerrar ventana, guardando su última posición
  const closeWindow = useCallback((id) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, closed: true, lastPosition: { x: w.x, y: w.y } }
          : w
      )
    );
  }, []);

  // Minimizar/Restaurar
  const minimizeWindow = useCallback((id) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, minimized: !w.minimized } : w))
    );
  }, []);

  // Maximizar/Restaurar
  const maximizeWindow = useCallback((id) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
  }, []);

  // Traer al frente
  const bringToFront = useCallback((id) => {
    setWindows(prev => {
      const newZ = nextZIndex + 1;
      setNextZIndex(newZ);
      return prev.map(w => (w.id === id ? { ...w, zIndex: newZ } : w));
    });
  }, [nextZIndex]);

  // Actualizar posición después de arrastrar
  const updatePosition = useCallback((id, x, y) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  // Manejar doble clic/tap en iconos
  const handleIconDoubleClick = useCallback((icon) => {
    openWindow(icon);
  }, [openWindow]);

  // Manejar selección de icono
  const handleIconSelect = useCallback((id) => {
    setSelectedIcon(id);
  }, []);

  // Renderizar iconos
  const renderedIcons = useMemo(() => {
    return desktopIcons.map((icon) => {
      const IconComponent = icon.icon;
      return (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          label={icon.label}
          isSelected={selectedIcon === icon.id}
          onSelect={() => handleIconSelect(icon.id)}
          onDoubleClick={() => handleIconDoubleClick(icon)}
        >
          <IconComponent />
        </DesktopIcon>
      );
    });
  }, [selectedIcon, handleIconSelect, handleIconDoubleClick]);

  // Renderizar ventanas
  const renderedWindows = useMemo(() => {
    return windows.map(
      (win) =>
        !win.closed && (
          <Window
            key={win.id}
            title={win.title}
            initialX={win.x}
            initialY={win.y}
            initialWidth={win.width}
            initialHeight={win.height}
            minimized={win.minimized}
            maximized={win.maximized}
            zIndex={win.zIndex}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onFocus={() => bringToFront(win.id)}
            onPositionChange={(x, y) => updatePosition(win.id, x, y)}
          >
            <win.content />
          </Window>
        )
    );
  }, [windows, closeWindow, minimizeWindow, maximizeWindow, bringToFront, updatePosition]);

  return (
    <div ref={desktopRef} className={styles.desktop}>
      <div className={styles.iconGrid}>{renderedIcons}</div>
      {renderedWindows}
    </div>
  );
}