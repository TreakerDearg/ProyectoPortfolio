"use client";
import React from "react";
import styles from "../../styles/F-styles/trafficGraph.module.css";

export default function TrafficGraph() {

  const data = [2,6,4,8,3,5,7];

  return (
    <div className={styles.graph}>

      {data.map((value,index)=>(
        <span
          key={index}
          className={styles.bar}
          style={{height:`${value*3}px`}}
        />
      ))}

    </div>
  );
}