"use client";
import React from "react";
import styles from "../../styles/F-styles/socialLinks.module.css";

import { Github, Linkedin } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className={styles.socialContainer}>

      <a
        href="https://github.com/"
        target="_blank"
        className={styles.socialLink}
      >
        <Github size={14} />
        <span>GITHUB</span>
      </a>

      <div className={styles.divider} />

      <a
        href="https://linkedin.com/"
        target="_blank"
        className={styles.socialLink}
      >
        <Linkedin size={14} />
        <span>LINKEDIN</span>
      </a>

    </div>
  );
}