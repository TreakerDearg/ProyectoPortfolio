"use client";
import React from "react";

import HudCorner from "../components/decorations/HudCorner";
import HudDivider from "../components/decorations/HudDivider";
import StatusLed from "../components/decorations/Statusled";

import ResourceMonitor from "../components/decorations/ResourceMonitor";
import TrafficGraph from "../components/decorations/TrafficGraph";
import SocialLinks from "../components/decorations/SocialLinks";

import styles from "../styles/F-styles/footer.module.css";

export default function ArasakaFooter() {
  return (
    <footer className={styles.footerContainer}>

      <HudCorner position="cornerLeft" />
      <HudCorner position="cornerRight" />

      <div className={styles.footerContent}>

        {/* LEFT */}
        <div className={styles.footerLeft}>

          <StatusLed status="online" />



          <ResourceMonitor />

        </div>

        <HudDivider />

        {/* CENTER (SOCIAL LINKS) */}
        <div className={styles.footerCenter}>
          <SocialLinks />
        </div>

        <HudDivider />

        {/* RIGHT */}
        <div className={styles.footerRight}>

          <TrafficGraph />



        </div>

      </div>

    </footer>
  );
}