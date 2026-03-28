"use client";

import styles from "../../styles/inventory-styles/metro.module.css";
import BriefcaseGrid from "./components/BriefcaseGrid";

export default function InventoryPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BriefcaseGrid />
      </div>
    </div>
  );
}