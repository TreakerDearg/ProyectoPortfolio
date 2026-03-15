"use client";
import React from "react";
import { StatusLed } from "../deco-layout/StatusLed";
import { Screw } from "../deco-layout/Screw"; 
import styles from "../../styles/page-comp-styles/ViewSelector.module.css";

export const ViewSelector = ({ views, activeView, onViewChange }) => {
  return (
    <div className={styles.selectorContainer}>
      {/* Tornillos decorativos en las esquinas */}
      <Screw size="xxs" type="flat" className={styles.screwTL} rotation={0} />
      <Screw size="xxs" type="flat" className={styles.screwTR} rotation={90} />
      <Screw size="xxs" type="flat" className={styles.screwBL} rotation={180} />
      <Screw size="xxs" type="flat" className={styles.screwBR} rotation={270} />

      <div className={styles.selectorPanel}>
        {views.map((view, index) => (
          <React.Fragment key={view.id}>
            <button
              className={`${styles.viewTab} ${activeView === view.id ? styles.activeTab : ''}`}
              onClick={() => onViewChange(view.id)}
            >
              <div className={styles.tabContent}>
                {view.icon && <view.icon size={12} className={styles.tabIcon} />}
                <span className={styles.tabLabel}>{view.label}</span>
                {view.led && (
                  <StatusLed
                    status={view.ledStatus || "idle"}
                    size="xxs"
                    className={styles.tabLed}
                  />
                )}
              </div>
              {/* Borde inferior con LED integrado (solo visible en activa) */}
              {activeView === view.id && <div className={styles.activeIndicator} />}
            </button>
            {index < views.length - 1 && <div className={styles.tabDivider} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};