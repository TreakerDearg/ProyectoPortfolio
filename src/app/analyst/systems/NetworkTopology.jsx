"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Styles-C/networkTopology.module.css";

export const NetworkTopology = ({ nodes, connections, viewport, onViewportClick }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 200, height: 150 });
  const scale = 0.1;

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setCanvasSize({ width: clientWidth, height: clientHeight });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvasSize.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasSize.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvasSize.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvasSize.width, i);
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
        const viewportWidth = (window.innerWidth / viewport.scale) * scale;
        const viewportHeight = (window.innerHeight / viewport.scale) * scale;
        const viewportX = (-viewport.x * scale);
        const viewportY = (-viewport.y * scale);

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        
        // Clamp viewport rectangle to canvas bounds
        const clampedX = Math.max(0, Math.min(viewportX, canvasSize.width - viewportWidth));
        const clampedY = Math.max(0, Math.min(viewportY, canvasSize.height - viewportHeight));
        const clampedWidth = Math.min(viewportWidth, canvasSize.width - clampedX);
        const clampedHeight = Math.min(viewportHeight, canvasSize.height - clampedY);
        
        ctx.strokeRect(clampedX, clampedY, clampedWidth, clampedHeight);
        ctx.setLineDash([]);
      }
    };

    draw();
  }, [nodes, viewport, canvasSize]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    onViewportClick?.({ x, y });
  };

  return (
    <div className={styles.topologyContainer} ref={containerRef}>
      <div className={styles.topologyHeader}>
        <span className={styles.topologyTitle}>TOPOLOGY</span>
      </div>
      <canvas
        ref={canvasRef}
        className={styles.topologyCanvas}
        style={{ width: '100%', height: '100%' }}
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
