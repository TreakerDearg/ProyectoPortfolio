"use client";

import styles from "../../../../styles/inventory-styles/layout/footer.module.css";

export default function HardwareFooter() {
  return (
    <footer className={styles.footer}>

      {/* LEFT: BOTONES FÍSICOS */}
      <div className={styles.left}>
        <button className={`${styles.button} ${styles.danger}`} />
        <button className={`${styles.button} ${styles.neutral}`} />
      </div>

      {/* CENTER: PANEL INDUSTRIAL */}
      <div className={styles.center}>
        <div className={styles.barGroup}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.bar} />
          ))}
        </div>

        <span className={styles.label}>
          Heavy Duty Terminal // Prototype
        </span>
      </div>

      {/* RIGHT: LEDs DE ESTADO */}
      <div className={styles.right}>
        <div className={`${styles.led} ${styles.green}`} />
        <div className={`${styles.led} ${styles.amber}`} />
      </div>

    </footer>
  );
}