"use client";
import React, { useRef, useEffect } from "react";
import styles from "../styles/Styles-C/networkTopology.module.css";

export const NetworkTopology = ({ nodes, connections, viewport, onViewportClick }) => {
  const canvasRef = useRef(null);
  const scale = 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = 200 * dpr;
    canvas.height = 150 * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, 200, 150);

      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.fillRect(0, 0, 200, 150);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 200; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 150);
        ctx.stroke();
      }
      for (let i = 0; i < 150; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(200, i);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(168, 85, 247, 0.3)";
      ctx.lineWidth = 1;
      nodes.forEach(node => {
        if (!node.connections) return;
        node.connections.forEach(targetId => {
          const target = nodes.find(n => n.id === targetId);
          if (target) {
            ctx.beginPath();
            ctx.moveTo(node.x * scale, node.y * scale);
            ctx.lineTo(target.x * scale, target.y * scale);
            ctx.stroke();
          }
        });
      });

      nodes.forEach(node => {
        const x = node.x * scale;
        const y = node.y * scale;
        
        let color = "#3b82f6";
        if (node.company?.toLowerCase() === "arasaka") color = "#ef4444";
        else if (node.company?.toLowerCase() === "militech") color = "#22c55e";
        else if (node.company?.toLowerCase() === "kangtao") color = "#a855f7";

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = color + "40";
        ctx.fill();
      });

      if (viewport) {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(
          (-viewport.x * scale),
          (-viewport.y * scale),
          (window.innerWidth / viewport.scale) * scale,
          (window.innerHeight / viewport.scale) * scale
        );
        ctx.setLineDash([]);
      }
    };

    draw();
  }, [nodes, viewport]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    onViewportClick?.({ x, y });
  };

  return (
    <div className={styles.topologyContainer}>
      <div className={styles.topologyHeader}>
        <span className={styles.topologyTitle}>TOPOLOGY</span>
      </div>
      <canvas
        ref={canvasRef}
        className={styles.topologyCanvas}
        onClick={handleClick}
      />
      <div className={styles.topologyLegend}>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: "#ef4444" }} />
          <span>Arasaka</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: "#22c55e" }} />
          <span>Militech</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: "#a855f7" }} />
          <span>KangTao</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: "#3b82f6" }} />
          <span>Neutral</span>
        </div>
      </div>
    </div>
  );
};
