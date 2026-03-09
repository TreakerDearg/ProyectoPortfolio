"use client";
import { useState, useEffect } from "react";
import { MapPin, Compass, TrendingUp, TrendingDown } from "lucide-react";
import styles from "../../../../../styles/root-styles/layout/Footer.module.css";

export default function Location() {
  const [altitude, setAltitude] = useState(4200);
  const [heading, setHeading] = useState(105);
  const [trend, setTrend] = useState("stable");

  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude(prev => {
        const diff = Math.floor(Math.random() * 11) - 5;
        const next = prev + diff;
        setTrend(next > prev ? "up" : next < prev ? "down" : "stable");
        return next;
      });
      setHeading(prev => (prev + (Math.floor(Math.random() * 5) - 2) + 360) % 360);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.location}>
      <div className={styles.locationPrimary}>
        <span className={styles.sector}>RUBICON_3</span>
        <span className={styles.grid}>GRID: 23-45-78</span>
      </div>

      <div className={styles.altitudeBlock}>
        <span className={styles.altValue}>{altitude}M</span>
        {trend === "up" && <TrendingUp size={10} className={styles.trendUp} />}
        {trend === "down" && <TrendingDown size={10} className={styles.trendDown} />}
      </div>

      <div className={styles.headingBlock}>
        <Compass size={12} className={styles.compassIcon} />
        <span className={styles.headingValue}>{heading.toString().padStart(3, '0')}°</span>
      </div>
    </div>
  );
}