"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Speaker,
  AlertTriangle,
  Settings,
  Terminal,
} from "lucide-react";
import styles from "../../styles/boot.module.css";

// Logo ASCII
const asciiLogo = `
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║         P O R T F O L I O            ║
    ║              O S                     ║
    ║                                      ║
    ║         Versión 1.0                  ║
    ║                                      ║
    ╚══════════════════════════════════════╝
  `;

// Genera la secuencia de boot con estilo Windows 95 y velocidad variable
const generateBootSequence = (speedFactor = 1.0) => {
  const delayFactor = 1.5 * speedFactor;

  const post = [
    { type: "logo", text: asciiLogo, beep: false },
    { type: "bios", text: "Award Modular BIOS v4.51PG", delay: Math.floor(100 * delayFactor), beep: true },
    { type: "bios", text: "Copyright (C) 1984-95, Award Software, Inc.", delay: Math.floor(100 * delayFactor), beep: true },
    { type: "cpu", icon: Cpu, text: `CPU: ${['Intel 486DX2', 'AMD 5x86', 'Cyrix 6x86'][Math.floor(Math.random() * 3)]} @ ${(Math.random() * 2 + 2).toFixed(1)}MHz`, delay: Math.floor(200 * delayFactor), beep: true },
    { type: "bios", text: "Memory Test: 640K OK", delay: Math.floor(150 * delayFactor), beep: true },
    { type: "bios", text: `Extended Memory: ${Math.floor(Math.random() * 8 + 8)}MB OK`, delay: Math.floor(150 * delayFactor), beep: true },
    { type: "bios", text: "Detecting IDE drives...", delay: Math.floor(800 * delayFactor), beep: true },
    { type: "drive", icon: HardDrive, text: `Primary Master: ${['ST31276A', 'WDAC23200', 'Quantum Fireball'][Math.floor(Math.random() * 3)]}`, delay: Math.floor(200 * delayFactor), beep: true },
    { type: "drive", text: "Primary Slave: None", delay: Math.floor(100 * delayFactor), beep: true },
    { type: "drive", text: "Secondary Master: ATAPI CD-ROM", delay: Math.floor(100 * delayFactor), beep: true },
    { type: "drive", text: "Secondary Slave: None", delay: Math.floor(100 * delayFactor), beep: true },
  ];

  const dos = [
    { type: "dos", text: "Reading boot sector...", delay: Math.floor(200 * delayFactor), beep: "disk" },
    { type: "dos", text: "Loading IO.SYS...", delay: Math.floor(300 * delayFactor), beep: "disk" },
    { type: "dos", text: "Loading MSDOS.SYS...", delay: Math.floor(300 * delayFactor), beep: "disk" },
    { type: "dos", text: "HIMEM.SYS is testing extended memory...", delay: Math.floor(300 * delayFactor), beep: "disk" },
    { type: "dos", text: "EMM386 installed.", delay: Math.floor(200 * delayFactor), beep: "disk" },
    { type: "dos", text: "Processing CONFIG.SYS...", delay: Math.floor(150 * delayFactor), beep: "disk" },
    { type: "dos", text: "  DEVICE=C:\\WINDOWS\\HIMEM.SYS", delay: Math.floor(100 * delayFactor), beep: "disk" },
    { type: "dos", text: "  DEVICE=C:\\WINDOWS\\EMM386.EXE NOEMS", delay: Math.floor(100 * delayFactor), beep: "disk" },
    { type: "dos", text: "  DOS=HIGH,UMB", delay: Math.floor(100 * delayFactor), beep: "disk" },
    { type: "dos", text: "Processing AUTOEXEC.BAT...", delay: Math.floor(200 * delayFactor), beep: "disk" },
    { type: "dos", text: "  MSCDEX.EXE /D:MSCD001 /L:D", delay: Math.floor(150 * delayFactor), beep: "disk" },
    { type: "dos", text: "  SET TEMP=C:\\TEMP", delay: Math.floor(100 * delayFactor), beep: "disk" },
    { type: "dos", text: "  PROMPT $P$G", delay: Math.floor(100 * delayFactor), beep: "disk" },
  ];

  const win95Start = [
    { type: "win95", text: "Starting Windows 95...", delay: Math.floor(400 * delayFactor), beep: true },
    { type: "win95", text: "Loading USER.EXE...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "win95", text: "Loading GDI.EXE...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "win95", text: "Loading KRNL386.EXE...", delay: Math.floor(200 * delayFactor), beep: true },
  ];

  const vxd = [
    { type: "vxd", text: "Loading VMM32.VXD...", delay: Math.floor(300 * delayFactor), beep: true },
    { type: "vxd", text: "Loading VNETSUP.VXD...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "vxd", text: "Loading VSHARE.VXD...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "vxd", text: "Loading VPOWERD.VXD...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "vxd", text: "Loading NDIS.VXD...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "vxd", text: "Loading IFSMGR.VXD...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "vxd", text: "Loading IOS.VXD...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "vxd", text: "Loading VFAT.VXD...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "vxd", text: "Loading VCACHE.VXD...", delay: Math.floor(200 * delayFactor), beep: true },
  ];

  const pnp = [
    { type: "pnp", text: "Detecting Plug and Play devices...", delay: Math.floor(400 * delayFactor), beep: true },
    { type: "pnp", text: "  Mouse: Microsoft PS/2 Mouse detected", icon: Cpu, delay: Math.floor(200 * delayFactor), beep: true },
    { type: "pnp", text: "  Keyboard: PC/AT Enhanced Keyboard", icon: Cpu, delay: Math.floor(150 * delayFactor), beep: true },
    { type: "pnp", text: "  Network: Realtek RTL8029 Ethernet", icon: Network, delay: Math.floor(200 * delayFactor), beep: true },
    { type: "pnp", text: "  Sound: Sound Blaster 16 (IRQ 5, DMA 1)", icon: Speaker, delay: Math.floor(200 * delayFactor), beep: true },
  ];

  const final = [
    { type: "service", text: "Initializing system services...", delay: Math.floor(200 * delayFactor), beep: true },
    { type: "service", text: "  Loading PROJECTS.SYS...", delay: Math.floor(150 * delayFactor), beep: true },
    { type: "service", text: "  Loading SKILLS.DLL...", delay: Math.floor(150 * delayFactor), beep: true },
    { type: "service", text: "  Loading CONTACT.EXE...", delay: Math.floor(150 * delayFactor), beep: true },
    { type: "service", text: "  Loading ABOUT.TXT...", delay: Math.floor(150 * delayFactor), beep: true },
    { type: "service", text: "  Shell: Explorer.exe loaded", delay: Math.floor(150 * delayFactor), beep: true },
    { type: "service", text: `  Network: DHCP assigned 192.168.0.${Math.floor(Math.random() * 254 + 1)}`, delay: Math.floor(150 * delayFactor), beep: true },
    { type: "service", text: "  Gateway: 192.168.0.1", delay: Math.floor(100 * delayFactor), beep: true },
    { type: "service", text: "  Display: 640x480 16 colors", delay: Math.floor(150 * delayFactor), beep: true },
    { type: "ready", text: "PortfolioOS ready. ✓", delay: Math.floor(100 * delayFactor), beep: true },
    { type: "prompt", text: "_", delay: Math.floor(100 * delayFactor), beep: false },
  ];

  return [...post, ...dos, ...win95Start, ...vxd, ...pnp, ...final];
};

const errorTypes = [
  { type: "error", icon: AlertTriangle, text: "Windows protection error. You need to restart your computer.", beep: "error" },
  { type: "error", icon: AlertTriangle, text: "Memory parity error. System halted.", beep: "error" },
  { type: "error", icon: AlertTriangle, text: "CMOS checksum error. Press F1 to continue.", beep: "error" },
  { type: "error", icon: AlertTriangle, text: "Non-system disk or disk error. Replace and press any key.", beep: "error" },
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [bootStarted, setBootStarted] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [phase, setPhase] = useState("post");
  const [memoryCount, setMemoryCount] = useState(0);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [commandMode, setCommandMode] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [showBiosMessage, setShowBiosMessage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [diskLed, setDiskLed] = useState(false);
  const [biosSetup, setBiosSetup] = useState(false);
  const [biosCursor, setBiosCursor] = useState(0);

  const terminalRef = useRef(null);
  const timeoutsRef = useRef([]);
  const audioCtxRef = useRef(null);
  const inputRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const setTimeoutSafe = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const speedFactor = useRef(Math.random() * 0.8 + 0.6);
  const [bootLines] = useState(() => generateBootSequence(speedFactor.current));

  const playBeep = useCallback((type = "default") => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;

      const play = () => {
        if (type === "disk") {
          const bufferSize = 4096;
          const noiseNode = ctx.createScriptProcessor(bufferSize, 1, 1);
          noiseNode.onaudioprocess = (e) => {
            const output = e.outputBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
              output[i] = (Math.random() * 2 - 1) * 0.02;
            }
          };
          noiseNode.connect(ctx.destination);
          setTimeout(() => noiseNode.disconnect(), 50);
          return;
        } else if (type === "startup") {
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = "sine";
          osc1.frequency.setValueAtTime(440, ctx.currentTime);
          gain1.gain.setValueAtTime(0.1, ctx.currentTime);
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.start();
          osc1.stop(ctx.currentTime + 0.2);
          setTimeout(() => {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(880, ctx.currentTime);
            gain2.gain.setValueAtTime(0.1, ctx.currentTime);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start();
            osc2.stop(ctx.currentTime + 0.3);
          }, 200);
          return;
        }

        let freq1 = 880, freq2 = 440;
        if (type === "bios") {
          freq1 = 660; freq2 = 330;
        } else if (type === "error") {
          freq1 = 1200; freq2 = 600;
        }

        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "square";
        osc1.frequency.setValueAtTime(freq1, ctx.currentTime);
        gain1.gain.setValueAtTime(0.08, ctx.currentTime);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(freq2, ctx.currentTime);
        gain2.gain.setValueAtTime(0.04, ctx.currentTime);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.1);
        osc2.stop(ctx.currentTime + 0.1);
      };

      if (ctx.state === "suspended") {
        ctx.resume().then(play);
      } else {
        play();
      }
    } catch (e) {
      console.log("Web Audio API error:", e);
    }
  }, []);

  // LED de disco
  useEffect(() => {
    if (bootStarted && !bootComplete && !errorOccurred) {
      const interval = setInterval(() => {
        setDiskLed((prev) => !prev);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [bootStarted, bootComplete, errorOccurred]);

  // Beep por línea
  useEffect(() => {
    if (visibleLines.length > 0 && bootStarted) {
      const lastLine = visibleLines[visibleLines.length - 1];
      if (lastLine.beep) {
        if (lastLine.beep === "disk") playBeep("disk");
        else if (lastLine.type === "bios") playBeep("bios");
        else if (lastLine.type === "error") playBeep("error");
        else playBeep("default");
      }
    }
  }, [visibleLines, bootStarted, playBeep]);

  // Sonido de startup al finalizar
  useEffect(() => {
    if (bootComplete && !errorOccurred && bootStarted) {
      playBeep("startup");
    }
  }, [bootComplete, errorOccurred, bootStarted, playBeep]);

  // Glitch aleatorio
  useEffect(() => {
    if (bootStarted && !bootComplete && !errorOccurred) {
      const glitchInterval = setInterval(() => {
        if (Math.random() < 0.1) {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 100);
          if (Math.random() < 0.3) {
            setVisibleLines((prev) => [
              ...prev,
              { type: "glitch", text: "Lo@ding VFAT.VXD...", beep: false },
            ]);
          }
        }
      }, 3000);
      return () => clearInterval(glitchInterval);
    }
  }, [bootStarted, bootComplete, errorOccurred]);

  // Contador de memoria
  useEffect(() => {
    if (phase === "post" && bootStarted) {
      const interval = setInterval(() => {
        setMemoryCount((prev) => {
          if (prev >= 640) {
            clearInterval(interval);
            return 640;
          }
          return prev + 64;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [phase, bootStarted]);

  // Barra de progreso
  useEffect(() => {
    if (phase === "win95" && bootStarted) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setPhase("vxd");
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [phase, bootStarted]);

  // Secuencia principal
  useEffect(() => {
    if (!bootStarted || errorOccurred) return;

    clearAllTimeouts();

    let sequence = [];
    let nextPhase = phase;

    switch (phase) {
      case "post":
        sequence = bootLines.filter(
          (l) => l.type === "logo" || l.type === "bios" || l.type === "cpu" || l.type === "drive"
        );
        nextPhase = "dos";
        break;
      case "dos":
        sequence = bootLines.filter((l) => l.type === "dos");
        nextPhase = "win95";
        break;
      case "win95":
        sequence = [];
        nextPhase = "win95";
        break;
      case "vxd":
        sequence = bootLines.filter((l) => l.type === "vxd");
        nextPhase = "pnp";
        break;
      case "pnp":
        sequence = bootLines.filter((l) => l.type === "pnp");
        nextPhase = "final";
        break;
      case "final":
        sequence = bootLines.filter((l) => l.type === "service" || l.type === "ready" || l.type === "prompt");
        setBootComplete(true);
        break;
      default:
        break;
    }

    if (sequence.length > 0 && phase !== "win95") {
      let totalDelay = 0;
      sequence.forEach((line) => {
        const delay = line.delay || 200;
        setTimeoutSafe(() => {
          setVisibleLines((prev) => [...prev, line]);
        }, totalDelay);
        totalDelay += delay;
      });
      if (phase !== "final") {
        setTimeoutSafe(() => setPhase(nextPhase), totalDelay + 500);
      }
    }
  }, [phase, errorOccurred, bootLines, bootStarted]);

  // Error aleatorio
  useEffect(() => {
    if (bootStarted && !errorOccurred && (phase === "vxd" || phase === "dos")) {
      const random = Math.random();
      if (random < 0.05) {
        const error = errorTypes[Math.floor(Math.random() * errorTypes.length)];
        setErrorOccurred(true);
        setPhase("error");
        setVisibleLines((prev) => [...prev, error]);
        if (error.text.includes("CMOS")) {
          setShowBiosMessage(true);
        }
      }
    }
  }, [phase, bootStarted, errorOccurred]);

  // Scroll automático
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (visibleLines.length > 40) {
      setVisibleLines((prev) => prev.slice(-40));
    }
  }, [visibleLines]);

  // Easter egg F8
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F8" && bootStarted && !bootComplete && !errorOccurred) {
        e.preventDefault();
        setVisibleLines((prev) => [
          ...prev,
          { type: "menu", text: "Windows 95 Startup Menu", delay: 0, beep: false },
          { type: "menu", text: "  1. Normal", delay: 0, beep: false },
          { type: "menu", text: "  2. Logged (BOOTLOG.TXT)", delay: 0, beep: false },
          { type: "menu", text: "  3. Safe Mode", delay: 0, beep: false },
          { type: "menu", text: "  4. Step-by-step confirmation", delay: 0, beep: false },
        ]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bootStarted, bootComplete, errorOccurred]);

  // Modo comando al finalizar
  useEffect(() => {
    if (bootComplete && !errorOccurred) {
      setCommandMode(true);
      if (!isMobile && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [bootComplete, errorOccurred, isMobile]);

  // Manejador global de teclado para comandos
  useEffect(() => {
    if (!bootComplete || errorOccurred || isMobile || biosSetup) return;
    const handleGlobalKeyDown = (e) => {
      if (!commandMode) return;
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setCommandInput((prev) => prev + e.key);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        setCommandInput((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = commandInput.trim().toLowerCase();
        handleCommand(cmd);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [bootComplete, errorOccurred, commandMode, commandInput, isMobile, biosSetup]);

  const handleCommand = (cmd) => {
    if (cmd === "start") {
      onComplete();
    } else if (cmd === "bios") {
      setBiosSetup(true);
      setVisibleLines((prev) => [
        ...prev,
        { type: "bios", text: "Phoenix BIOS Setup Utility", beep: true },
        { type: "bios", text: "-------------------------", beep: false },
        { type: "bios", text: "Standard CMOS Setup", beep: false },
        { type: "bios", text: "Advanced BIOS Features", beep: false },
        { type: "bios", text: "Power Management", beep: false },
        { type: "bios", text: "Exit Without Saving", beep: false },
        { type: "bios", text: "Use ↑ ↓ to select, Enter to choose", beep: false },
      ]);
    } else if (cmd === "help") {
      setVisibleLines((prev) => [
        ...prev,
        { type: "info", text: "Available commands:", beep: false },
        { type: "info", text: "start      - Boot to system", beep: false },
        { type: "info", text: "bios       - Enter BIOS setup", beep: false },
        { type: "info", text: "help       - Show this help", beep: false },
        { type: "info", text: "ver        - Show version", beep: false },
        { type: "info", text: "dir        - List directory", beep: false },
        { type: "info", text: "cls        - Clear screen", beep: false },
        { type: "info", text: "about      - About PortfolioOS", beep: false },
      ]);
    } else if (cmd === "ver") {
      setVisibleLines((prev) => [...prev, { type: "info", text: "PortfolioOS [Version 1.0]", beep: false }]);
    } else if (cmd === "dir") {
      setVisibleLines((prev) => [
        ...prev,
        { type: "info", text: " Volume in drive C is PORTFOLIO", beep: false },
        { type: "info", text: " Directory of C:\\", beep: false },
        { type: "info", text: "", beep: false },
        { type: "info", text: "PROJECTS   <DIR>         01-01-95   1:00p", beep: false },
        { type: "info", text: "SKILLS     <DIR>         01-01-95   1:00p", beep: false },
        { type: "info", text: "CONTACT    EXE        1024 01-01-95   1:00p", beep: false },
        { type: "info", text: "README     TXT        2048 01-01-95   1:00p", beep: false },
        { type: "info", text: "               4 file(s)      3072 bytes", beep: false },
      ]);
    } else if (cmd === "cls") {
      setVisibleLines([]);
    } else if (cmd === "about") {
      setVisibleLines((prev) => [
        ...prev,
        { type: "info", text: "PortfolioOS - A retro-themed operating system", beep: false },
        { type: "info", text: "Created with Next.js and Framer Motion", beep: false },
        { type: "info", text: "Inspired by Windows 95 and DOS", beep: false },
      ]);
    } else if (cmd === "doom") {
      setVisibleLines((prev) => [
        ...prev,
        { type: "info", text: "Starting DOOM.EXE...", beep: true },
        { type: "info", text: "Error: Not enough conventional memory", beep: false },
      ]);
    } else if (cmd) {
      setVisibleLines((prev) => [
        ...prev,
        { type: "error", text: `Command not found: ${cmd}`, beep: "error" },
      ]);
    }
    setCommandInput("");
  };

  const handleMobileKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(commandInput.trim().toLowerCase());
    }
  };

  // BIOS setup navegación
  useEffect(() => {
    if (biosSetup) {
      const handleBiosKey = (e) => {
        if (e.key === "ArrowUp") {
          setBiosCursor((prev) => (prev > 0 ? prev - 1 : 3));
        } else if (e.key === "ArrowDown") {
          setBiosCursor((prev) => (prev < 3 ? prev + 1 : 0));
        } else if (e.key === "Enter") {
          setVisibleLines((prev) => [
            ...prev,
            { type: "bios", text: `Selected option ${biosCursor + 1}`, beep: true },
          ]);
          setBiosSetup(false);
        }
      };
      window.addEventListener("keydown", handleBiosKey);
      return () => window.removeEventListener("keydown", handleBiosKey);
    }
  }, [biosSetup, biosCursor]);

  const lineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };

  if (!bootStarted) {
    return (
      <div className={styles.bootScreen} onClick={() => setBootStarted(true)} onKeyDown={() => setBootStarted(true)} tabIndex={0}>
        <div className={styles.bootTerminal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <pre className={styles.asciiLogo}>{asciiLogo}</pre>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <span className={styles.prompt}>Press any key to boot...</span>
            <span className={styles.cursorBlock} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.bootScreen} ${glitch ? styles.glitch : ""}`}>
      {/* LED de disco */}
      <div className={styles.diskLed}>
        <span className={diskLed ? styles.diskLedActive : ""}>●</span> HDD
      </div>

      {/* Input oculto para desktop */}
      {!isMobile && commandMode && !biosSetup && (
        <input
          ref={inputRef}
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          onKeyDown={handleMobileKeyDown}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        />
      )}

      <div ref={terminalRef} className={styles.bootTerminal}>
        <AnimatePresence mode="popLayout">
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`${styles.bootLine} ${line.type === "error" ? styles.panic : ""}`}
            >
              {line.icon && <line.icon className={styles.lineIcon} />}
              {line.type === "logo" ? (
                <pre className={styles.asciiLogo}>{line.text}</pre>
              ) : (
                <span>{line.text}</span>
              )}
            </motion.div>
          ))}

          {/* Contador de memoria */}
          {phase === "post" && memoryCount < 640 && (
            <motion.div
              key="memory-count"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className={styles.bootLine}
            >
              <MemoryStick className={styles.lineIcon} />
              <span>Memory Test: {memoryCount}K</span>
            </motion.div>
          )}

          {/* Barra de progreso */}
          {phase === "win95" && (
            <>
              <motion.div
                key="win95-start"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={styles.bootLine}
              >
                <span>Starting Windows 95...</span>
              </motion.div>
              <motion.div
                key="progress-bar"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={styles.bootLine}
              >
                <span>[</span>
                <span className={styles.progressBar}>
                  {"■".repeat(Math.floor(progress / 10))}
                  {"□".repeat(10 - Math.floor(progress / 10))}
                </span>
                <span>] {progress}%</span>
              </motion.div>
            </>
          )}

          {/* Prompt de comandos */}
          {bootComplete && !errorOccurred && !biosSetup && (
            <>
              <motion.div
                key="command-prompt"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={styles.bootLine}
              >
                <span className={styles.prompt}>C:\&gt;</span>
                <span className={styles.commandInput}>{commandInput}</span>
                <span className={styles.cursorBlock} />
              </motion.div>
              <motion.div
                key="commands-hint"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={styles.bootLine}
                style={{ fontSize: "0.9rem", opacity: 0.7 }}
              >
                <Terminal className={styles.lineIcon} size={16} />
                <span>Type 'help' for commands</span>
              </motion.div>
            </>
          )}

          {/* BIOS setup interactivo */}
          {biosSetup && (
            <>
              <motion.div
                key="bios-setup"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={styles.bootLine}
              >
                <Settings className={styles.lineIcon} />
                <span>Phoenix BIOS Setup Utility</span>
              </motion.div>
              {["Standard CMOS Setup", "Advanced BIOS Features", "Power Management", "Exit Without Saving"].map(
                (opt, idx) => (
                  <motion.div
                    key={`bios-opt-${idx}`}
                    variants={lineVariants}
                    className={styles.bootLine}
                    style={{ marginLeft: '20px', color: biosCursor === idx ? '#00ff00' : '#ffffff' }}
                  >
                    <span>{biosCursor === idx ? '→' : ' '} {opt}</span>
                  </motion.div>
                )
              )}
            </>
          )}

          {/* Mensaje de BIOS */}
          {showBiosMessage && (
            <motion.div
              key="bios-message"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className={`${styles.bootLine} ${styles.biosMessage}`}
            >
              <Settings className={styles.lineIcon} />
              <span>Press F1 to continue...</span>
            </motion.div>
          )}

          {/* Error */}
          {errorOccurred && (
            <motion.div
              key="error"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className={`${styles.bootLine} ${styles.panic}`}
            >
              <AlertTriangle className={styles.lineIcon} />
              <span>System halted. Press reset or wait for reboot...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input móvil */}
        {isMobile && commandMode && !biosSetup && (
          <div className={styles.mobileInputContainer}>
            <span className={styles.prompt}>C:\&gt;</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleMobileKeyDown}
              className={styles.mobileInput}
              autoFocus
              placeholder="help"
            />
          </div>
        )}
      </div>
    </div>
  );
}