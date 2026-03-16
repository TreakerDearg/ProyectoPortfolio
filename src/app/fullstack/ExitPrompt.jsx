"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./styles/exitPrompt.module.css";

import { Terminal, ShieldAlert, Database, Cpu } from "lucide-react";

export default function ExitPrompt({ onCancel }) {

  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    setMounted(true);

    const handleKey = (e) => {

      if (e.key === "Escape") onCancel();

      if (e.key.toLowerCase() === "y") handleConfirm();

      if (e.key.toLowerCase() === "n") onCancel();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);

  }, [onCancel]);



  const handleConfirm = () => {

    router.push("/");

  };


  if (!mounted) return null;


  return createPortal(

    <div
      className={styles.falloutOverlay}
      onMouseDown={(e) =>
        e.target === e.currentTarget && onCancel()
      }
    >

      <motion.div
        initial={{ opacity: 0, scale: .85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: .85 }}
        transition={{ duration: .25 }}
        className={styles.pipTerminal}
      >

        {/* =========================
           TERMINAL HEADER
        ========================= */}

        <div className={styles.terminalHeader}>

          <div className={styles.headerLeft}>
            <Terminal size={14} />
            <span>VAULT_TERMINAL_PROTOCOL</span>
          </div>

          <div className={styles.headerRight}>
            <Cpu size={12}/>
            <span>SYS_NODE_07</span>
          </div>

        </div>



        {/* =========================
           TERMINAL BODY
        ========================= */}

        <div className={styles.terminalBody}>

          <div className={styles.commandLine}>
            {">"} RUN EXIT_SEQUENCE.EXE
          </div>

          <div className={styles.warningBlock}>

            <ShieldAlert size={18} />

            <div>

              <p className={styles.warningTitle}>
                CONFIRM TERMINAL DISCONNECT
              </p>

              <p className={styles.warningSub}>
                ALL ACTIVE PROCESSES WILL BE TERMINATED
              </p>

            </div>

          </div>


          {/* =========================
              COMMAND OPTIONS
          ========================= */}

          <div className={styles.actionGrid}>

            <button
              onClick={handleConfirm}
              className={styles.confirmBtn}
            >

              <span className={styles.btnKey}>
                [Y]
              </span>

              EXECUTE_EXIT

            </button>


            <button
              onClick={onCancel}
              className={styles.cancelBtn}
            >

              <span className={styles.btnKey}>
                [N]
              </span>

              CANCEL_OPERATION

            </button>

          </div>


          {/* TERMINAL CURSOR */}

          <div className={styles.cursorLine}>
            {">"} WAITING_FOR_INPUT_
          </div>

        </div>



        {/* =========================
           TERMINAL FOOTER
        ========================= */}

        <div className={styles.terminalFooter}>

          <div className={styles.footerLeft}>
            <Database size={11} />
            <span>SESSION_ID: 0x8892_ADMIN</span>
          </div>

          <div className={styles.footerRight}>

            <span>STATUS: READY</span>

            <span className={styles.statusDot} />

          </div>

        </div>


      </motion.div>

    </div>,

    document.body

  );
}