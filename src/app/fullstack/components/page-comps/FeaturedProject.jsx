"use client";
import React from "react";
import { MapPin } from "lucide-react";
import { StatusLed } from "../deco-layout/StatusLed";
import styles from "../../styles/page-comp-styles/FeaturedProject.module.css";

export const FeaturedProject = ({ name, location, progress, status }) => {
  return (
    <div className={styles.featuredCard}>
      <div className={styles.header}>
        <MapPin size={12} className={styles.icon} />
        <span className={styles.location}>{location}</span>
        <StatusLed status={status} size="xxs" className={styles.led} />
      </div>
      <div className={styles.body}>
        <span className={styles.name}>{name}</span>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.progressText}>{progress}%</span>
      </div>
    </div>
  );
};