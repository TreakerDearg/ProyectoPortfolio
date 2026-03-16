"use client";

import { useState } from "react";
import {
  Home,
  Code,
  Coffee,
  BarChart,
  Settings,
  Activity,
} from "lucide-react";
import styles from "../../styles/kernelStyles/kernelSidebar.module.css";

const modules = [
  { id: "home", label: "HOME", icon: Home, description: "Dashboard" },
  { id: "developer", label: "DEV", icon: Code, description: "Development" },
  { id: "bartender", label: "BAR", icon: Coffee, description: "Mixology" },
  { id: "analyst", label: "ANA", icon: BarChart, description: "Analytics" },
  { id: "system", label: "SYS", icon: Settings, description: "System" },
];

export default function KernelSidebar() {
  const [active, setActive] = useState("home");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <Activity size={14} className={styles.titleIcon} />
          <span className={styles.titleText}>Modules</span>
        </div>
        <div className={styles.content}>
          <nav className={styles.nav}>
            {modules.map((mod) => {
              const Icon = mod.icon;
              const isActive = active === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActive(mod.id)}
                  className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                  title={mod.description}
                >
                  <Icon className={styles.navIcon} size={24} />
                  <span className={styles.navLabel}>{mod.label}</span>
                </button>
              );
            })}
          </nav>
          <div className={styles.status}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>System online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}