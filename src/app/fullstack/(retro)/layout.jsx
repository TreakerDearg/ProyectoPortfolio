"use client";
import { AnimatePresence, motion } from "framer-motion";
import { SystemProvider, useSystem } from "../context/SystemContext";
import RetroHeader from "../layout/RetroHeader";
import RetroFooter from "../layout/RetroFooter";
import StatsPanel from "../layout/StatsPanel";
import MissionLogSidebar from "../layout/MissionLog";
import ProyectosView from "../views/ProyectosView";
import MissionHistoryView from "../views/MissionHistoryView";
import BootSequence from "../components/effects/BootSequence"; // Nueva importación

import styles from "../styles/layout/RetroLayout.module.css";
import "../styles/retro-effects.css";

export default function RetroLayout({ children }) {
  return (
    <SystemProvider>
      <LayoutContent>{children}</LayoutContent>
    </SystemProvider>
  );
}

function LayoutContent({ children }) {
  const { systemStatus, currentView, isBooting, setIsBooting } = useSystem();
  const isOff = systemStatus === "OFFLINE";

  // Si el sistema está en proceso de arranque, mostramos la secuencia táctica
  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  const isFullWidth = currentView === "GOTO_PROJ";
  const isDashboard = currentView === "MISSION_LOG";

  return (
    <div className={styles.outerChasis}>
      <div className={styles.monitorBezel}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isOff ? { scaleY: 0.002, opacity: 0 } : { scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`${styles.mainDisplay} crt-screen`}
        >
          <div className={styles.interfaceWrapper}>
            <RetroHeader />

            <div className={`flex-grow grid h-full overflow-hidden transition-all duration-700 ease-in-out ${
              isFullWidth ? "grid-cols-1" : isDashboard ? "grid-cols-12 gap-4" : "grid-cols-12"
            }`}>
              
              <AnimatePresence>
                {!isFullWidth && (
                  <motion.aside 
                    initial={{ x: -400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -400, opacity: 0 }}
                    className="col-span-3 border-r border-[#00ff9d11] bg-[#00ff9d03]"
                  >
                    <StatsPanel />
                  </motion.aside>
                )}
              </AnimatePresence>

              <main className={`
                ${isFullWidth ? "col-span-1" : isDashboard ? "col-span-9" : "col-span-6"} 
                h-full flex flex-col relative transition-all duration-700
              `}>
                <div className={styles.contentScroll}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentView}
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      className="h-full"
                    >
                      {currentView === "SYSTEM_INIT" && children}
                      {currentView === "GOTO_PROJ" && <ProyectosView />}
                      {currentView === "MISSION_LOG" && <MissionHistoryView />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </main>

              <AnimatePresence>
                {(!isFullWidth && !isDashboard) && (
                  <motion.aside 
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    className="col-span-3 border-l border-[#00ff9d11] bg-[#00000022]"
                  >
                    <MissionLogSidebar />
                  </motion.aside>
                )}
              </AnimatePresence>
            </div>

            <RetroFooter />
          </div>
        </motion.div>
      </div>
    </div>
  );
}