'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/logs-styles/soma-page.module.css';
import { Menu, Wifi, Volume2, Battery, Activity } from 'lucide-react';

export function Taskbar({
  appsData,
  openApps,
  minimizedApps,
  focusedApp,
  isSidebarOpen,
  onToggleSidebar,
  onToggleApp,
  onRestoreApp,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <footer className={styles.taskbar}>
      <button
        className={`${styles.startButton} ${isSidebarOpen ? styles.taskItemActive : ''}`}
        onClick={onToggleSidebar}
        title="Abrir menú"
      >
        <Menu size={16} />
        <span className={styles.startText}>MENU</span>
      </button>

      <div className={styles.taskItemsContainer}>
        {appsData.map(app => {
          if (openApps.includes(app.id) && !minimizedApps.includes(app.id)) {
            return (
              <button
                key={app.id}
                onClick={() => onToggleApp(app.id)}
                className={`${styles.taskItem} ${focusedApp === app.id ? styles.taskItemActive : ''}`}
                title={app.title}
              >
                <app.icon size={12} style={{ color: app.color }} />
                <span className={styles.taskItemLabel}>{app.title}</span>
              </button>
            );
          } else if (minimizedApps.includes(app.id)) {
            return (
              <button
                key={`min-${app.id}`}
                onClick={() => onRestoreApp(app.id)}
                className={`${styles.taskItem} ${styles.taskItemMinimized}`}
                title={app.title}
              >
                <app.icon size={12} style={{ color: app.color }} />
                <span className={styles.taskItemLabel}>{app.title}</span>
              </button>
            );
          }
          return null;
        })}
      </div>

      <div className={styles.systemTray}>
        <Wifi size={12} className={styles.trayIcon} />
        <Volume2 size={12} className={styles.trayIcon} />
        <Battery size={12} className={styles.trayIcon} />
        <div className={styles.trayDivider} />
        <Activity size={12} className={styles.pulseIcon} />
        <span className={styles.clock}>{timeString}</span>
      </div>
    </footer>
  );
}