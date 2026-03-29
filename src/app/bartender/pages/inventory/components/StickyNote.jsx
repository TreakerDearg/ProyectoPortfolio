"use client";

import { StickyNote as StickyNoteIcon } from "lucide-react";
import styles from "../../../styles/inventory-styles/sticky-note.module.css";

export default function StickyNote({ 
  note, 
  color = "yellow", 
  size = "sm",
  variant = "default" // default, torn, burnt, folded, wet
}) {
  return (
    <div className={`${styles.stickyNote} ${styles[color]} ${styles[size]} ${styles[variant]}`}>
      <div className={styles.iconWrapper}>
        <StickyNoteIcon size={size === "sm" ? 14 : 18} />
      </div>
      <div className={styles.content}>
        {note}
      </div>
      <div className={styles.tear} />
      {variant === "burnt" && <div className={styles.burnMark} />}
      {variant === "wet" && <div className={styles.waterMark} />}
    </div>
  );
}