"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import BackToHome from "../../../../components/salida/BackToHome";

import FooterStatus from "../footer-comps/FooterStatus";
import FooterNode from "../footer-comps/FooterNode";
import FooterDecor from "../footer-comps/FooterDecor";

import styles from "../../../../styles/logs-styles/layout/soma-footer.module.css";

export default function Footer({ activeWindow }) {

  /* =========================
     SYSTEM STATE
  ========================= */
  const status = activeWindow?.app?.status || "CONNECTED";
  const node = activeWindow?.app?.node || "ARK-01";

  /* =========================
     CLOCK (REAL TIME)
  ========================= */
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     RENDER
  ========================= */
  return (
    <motion.footer
      className={styles.footer}
      data-state={status}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* FX LAYER */}
      <div className={styles.fxLayer}>
        <FooterDecor />
      </div>

      {/* CONTENT */}
      <div className={styles.inner}>

        {/* LEFT */}
        <div className={styles.left}>

          <BackToHome size="sm" variant="soma" />

          <div className={styles.systemTag}>
            <span>SYS</span>
            <span className={styles.dot} />
            <span>{status}</span>
          </div>

        </div>

        {/* CENTER */}
        <div className={styles.center}>
          <FooterStatus status={status} />
        </div>

        {/* RIGHT */}
        <div className={styles.right}>

          <FooterNode node={node} status={status} />

          <div className={styles.clock}>
            {time}
          </div>

        </div>

      </div>
    </motion.footer>
  );
}