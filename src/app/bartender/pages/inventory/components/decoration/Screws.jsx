"use client";
import styles from "../../../../styles/inventory-styles/metro-layout.module.css";

export default function Screws() {
  const positions = [
    "top-4 left-4",
    "top-4 right-4",
    "bottom-4 left-4",
    "bottom-4 right-4",
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <div key={i} className={`absolute ${pos} z-50`}>
          <div className={styles.screw} />
        </div>
      ))}
    </>
  );
}