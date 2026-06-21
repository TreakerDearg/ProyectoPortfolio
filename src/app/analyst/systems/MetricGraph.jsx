"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Styles-C/metricGraph.module.css";

export const MetricGraph = ({ 
  data = [], 
  color = "#a855f7", 
  height = 60, 
  width = 200,
  label = "METRIC",
  unit = "%" 
}) => {
  const canvasRef = useRef(null);
  const [animatedData, setAnimatedData] = useState(data);

  useEffect(() => {
    setAnimatedData(data);
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw data line
      if (animatedData.length > 1) {
        const stepX = width / (animatedData.length - 1);
        
        // Create gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, color + "40");
        gradient.addColorStop(1, color + "00");

        ctx.beginPath();
        ctx.moveTo(0, height - (animatedData[0] / 100) * height);
        
        for (let i = 1; i < animatedData.length; i++) {
          const x = i * stepX;
          const y = height - (animatedData[i] / 100) * height;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw line
        ctx.beginPath();
        ctx.moveTo(0, height - (animatedData[0] / 100) * height);
        
        for (let i = 1; i < animatedData.length; i++) {
          const x = i * stepX;
          const y = height - (animatedData[i] / 100) * height;
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw current value indicator
      if (animatedData.length > 0) {
        const currentValue = animatedData[animatedData.length - 1];
        const lastX = width;
        const lastY = height - (currentValue / 100) * height;
        
        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(lastX, lastY, 8, 0, Math.PI * 2);
        ctx.strokeStyle = color + "60";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    draw();
  }, [animatedData, width, height, color]);

  return (
    <div className={styles.metricGraphContainer}>
      <div className={styles.metricHeader}>
        <span className={styles.metricLabel}>{label}</span>
        <span className={styles.metricValue}>
          {animatedData.length > 0 ? animatedData[animatedData.length - 1] : 0}{unit}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className={styles.metricCanvas}
        style={{ width, height }}
      />
    </div>
  );
};
