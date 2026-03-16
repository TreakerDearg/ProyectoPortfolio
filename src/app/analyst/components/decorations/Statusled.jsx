"use client";
import React from "react";
import styles from "../../styles/F-styles/footer.module.css";

export default function StatusLed({ status = "online" }) {
  return (
    <span className={`${styles.statusLed} ${styles[status]}`} />
  );
}