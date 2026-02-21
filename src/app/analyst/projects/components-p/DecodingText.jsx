"use client";
import React, { useState, useEffect } from 'react';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%&$#@!*";

export const DecodingText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const startDecoding = () => {
      interval = setInterval(() => {
        setDisplayText(prev => 
          text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
        iteration += 1 / 3;
      }, 30);
    };

    const timeout = setTimeout(startDecoding, delay);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return (
    <span style={{ fontFamily: 'var(--font-mono)', position: 'relative' }}>
      {displayText}
      {!isDone && <span className="animate-pulse">_</span>}
    </span>
  );
};