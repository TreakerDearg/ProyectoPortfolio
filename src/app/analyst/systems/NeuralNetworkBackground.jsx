"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Styles-C/neuralNetworkBackground.module.css";

export const NeuralNetworkBackground = ({ children, company = "neutral" }) => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate neural network nodes
    const generateNodes = () => {
      const nodeCount = 50;
      const newNodes = [];
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          pulse: Math.random() * Math.PI * 2,
        });
      }
      return newNodes;
    };

    const initialNodes = generateNodes();
    setNodes(initialNodes);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      initialNodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Update pulse
        node.pulse += 0.05;

        // Draw node
        const pulseSize = Math.sin(node.pulse) * 0.5 + 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2);

        // Color based on company
        let color;
        switch (company.toLowerCase()) {
          case "arasaka":
            color = `rgba(220, 38, 38, ${0.3 + Math.sin(node.pulse) * 0.2})`;
            break;
          case "militech":
            color = `rgba(34, 197, 94, ${0.3 + Math.sin(node.pulse) * 0.2})`;
            break;
          case "kang_tao":
            color = `rgba(168, 85, 247, ${0.3 + Math.sin(node.pulse) * 0.2})`;
            break;
          default:
            color = `rgba(56, 189, 248, ${0.3 + Math.sin(node.pulse) * 0.2})`;
        }

        ctx.fillStyle = color;
        ctx.fill();

        // Draw connections
        initialNodes.forEach((otherNode, j) => {
          if (i === j) return;
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const opacity = (1 - distance / 150) * 0.2;
            ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [company]);

  return (
    <div className={styles.neuralNetworkContainer}>
      <canvas ref={canvasRef} className={styles.neuralCanvas} />
      <div className={styles.neuralOverlay}>{children}</div>
    </div>
  );
};
