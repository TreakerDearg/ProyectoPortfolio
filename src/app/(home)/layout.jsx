"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useSystem } from "../context/SystemContext";
import BootSequence from "../system/boot/BootSequence";
import KernelHeader from "../system/kernel/KernelHeader";
import KernelSidebar from "../system/kernel/KernelSidebar";
import KernelRightPanel from "../system/kernel/KernelRightPanel";
import KernelFooter from "../system/kernel/KernelFooter";
import styles from "../styles/kernelStyles/kernel.module.css";

export default function SystemLayout({ children }) {
  const { booted, setBooted } = useSystem();

  const handleReset = () => {
    if (process.env.NODE_ENV === 'development') {
      setBooted(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!booted ? (
        <BootSequence key="boot" onComplete={() => setBooted(true)} />
      ) : (
        <>
          {/* Contenedor principal animado */}
          <motion.div
            key="system"
            className={styles.osContainer}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Cabecera del sistema */}
            <KernelHeader />

            {/* Cuerpo principal: sidebar + contenido + panel derecho */}
            <div className={styles.osBody}>
              <KernelSidebar />
              <main className={styles.osScreen}>
                {children}
              </main>
              <KernelRightPanel />
            </div>

            {/* Pie de página */}
            <KernelFooter />
          </motion.div>

          {/* Botón de reinicio (solo desarrollo) - fuera del contenedor animado para evitar conflictos */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={handleReset}
              className={styles.devResetButton}
              title="Reiniciar boot (solo desarrollo)"
            >
              <span aria-hidden="true">↻</span> Reiniciar
            </button>
          )}
        </>
      )}
    </AnimatePresence>
  );
}