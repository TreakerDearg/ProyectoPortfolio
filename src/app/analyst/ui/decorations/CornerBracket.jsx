// src/app/analyst/layout/UI/decorations/CornerBracket.jsx
import React from 'react';
import clsx from 'clsx';

export const CornerBracket = ({ position = "top-left", className = "" }) => {
  const posClasses = {
    "top-left": "top-0 left-0 border-t-2 border-l-2",
    "top-right": "top-0 right-0 border-t-2 border-r-2",
    "bottom-left": "bottom-0 left-0 border-b-2 border-l-2",
    "bottom-right": "bottom-0 right-0 border-b-2 border-r-2",
  };

  return (
    <div
      className={clsx(
        "absolute w-3 h-3 sm:w-4 sm:h-4 border-purple-500/40 pointer-events-none z-20",
        posClasses[position],
        className
      )}
      aria-hidden="true"
    />
  );
};