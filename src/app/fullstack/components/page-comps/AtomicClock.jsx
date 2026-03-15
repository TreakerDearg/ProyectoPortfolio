"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/page-comp-styles/AtomicClock.module.css";

export const AtomicClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n) => n.toString().padStart(2, '0');

  return (
    <div className={styles.clock}>
      <span className={styles.time}>
        {format(time.getHours())}:{format(time.getMinutes())}:{format(time.getSeconds())}
      </span>
      <span className={styles.date}>
        {time.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
      </span>
    </div>
  );
};