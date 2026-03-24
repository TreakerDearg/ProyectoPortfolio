"use client";

import styles from "../../../../styles/logs-styles/layout/footer/footer-node.module.css";

export default function FooterNode() {
  return (
    <div className={styles.node}>

      {/* ICON / SIGNAL */}
      <div className={styles.signal}>
        <span className={styles.ping} />
      </div>

      {/* DATA */}
      <div className={styles.info}>
        <span className={styles.label}>NODE</span>
        <span className={styles.value}>ARK-01</span>
      </div>

      {/* STATUS */}
      <div className={styles.status}>
        <span>LINK</span>
        <span className={styles.linkDot} />
      </div>

    </div>
  );
}