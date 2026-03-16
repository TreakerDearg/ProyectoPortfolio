"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/HomeStyles/systemTerminal.module.css";

const bootLogs = [
  "PortfolioOS v1.0 (build 2600)",
  "Checking hardware abstraction layer...",
  "CPU: Intel 80386 @ 33MHz",
  "Memory: 64MB RAM detected",
  "Initializing UI engine...",
  "Mounting virtual filesystem...",
  "Establishing secure connection...",
  "Loading user profile...",
  "System ready."
];

export default function SystemTerminal() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [bootComplete, setBootComplete] = useState(false);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, bootLogs[i]]);
      i++;
      if (i >= bootLogs.length) {
        clearInterval(interval);
        setBootComplete(true);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Comandos disponibles
  const commands = {
    help: () => [
      "Available commands:",
      "  help        → list commands",
      "  clear       → clear terminal",
      "  roles       → show system roles",
      "  whoami      → show current user",
      "  uptime      → system uptime",
      "  open <app>  → open module (dev/bartender/analyst)",
      "  theme       → switch theme (neon/win95)",
      "  date        → show current date/time",
      "  echo <text> → repeat text",
    ],
    clear: () => {
      setLogs([]);
      return "";
    },
    roles: () => "Available roles: Developer | Bartender | Analyst",
    whoami: () => "root@portfolio_os",
    uptime: () => `Uptime: ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
    date: () => new Date().toLocaleString(),
    echo: (args) => args.join(" "),
    theme: (args) => {
      const theme = args[0];
      if (theme === "neon" || theme === "win95") {
        document.documentElement.setAttribute("data-theme", theme);
        return `Theme changed to ${theme}`;
      }
      return "Usage: theme <neon|win95>";
    },
    open: (args) => {
      const app = args[0];
      if (!app) return "Usage: open <developer|bartender|analyst>";
      const routes = {
        developer: "/fullstack",
        bartender: "/bartender",
        analyst: "/analyst",
      };
      if (routes[app]) {
        router.push(routes[app]);
        return `Opening ${app} module...`;
      }
      return "Unknown module";
    },
  };

  // Ejecutar comando
  const executeCommand = useCallback((cmd) => {
    const parts = cmd.trim().split(" ");
    const base = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (base === "") return "";

    if (commands[base]) {
      return commands[base](args);
    }
    return `Command not found: ${base}. Type 'help' for available commands.`;
  }, []);

  // Manejar teclas
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const command = input.trim();
      if (!command) return;

      const output = executeCommand(command);
      setLogs(prev => [
        ...prev,
        `root@portfolio_os:~$ ${command}`,
        ...(Array.isArray(output) ? output : [output]),
      ]);
      setHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex] || "");
      } else {
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Autocompletado simple
      const partial = input.toLowerCase();
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setLogs(prev => [...prev, `Possible commands: ${matches.join(", ")}`]);
      }
    }
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBody}>
        {logs.map((log, i) => (
          <div key={i} className={styles.terminalLine}>
            {log}
          </div>
        ))}

        <div className={styles.inputLine}>
          <span className={styles.prompt}>root@portfolio_os:~$</span>
          <input
            ref={inputRef}
            className={styles.terminalInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
          />
          <span className={styles.cursor} />
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}