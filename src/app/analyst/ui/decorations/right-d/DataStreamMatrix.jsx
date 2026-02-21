'use client';
import { motion } from 'framer-motion';

export const DataStreamMatrix = () => {
  return (
    <div className="flex gap-1 h-12 w-full justify-around opacity-20 overflow-hidden px-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col gap-1">
          {[...Array(6)].map((_, j) => (
            <motion.span
              key={j}
              animate={{ 
                opacity: [0.1, 1, 0.1],
                color: ['#38bdf8', '#818cf8', '#38bdf8'] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: (i * j) * 0.1 
              }}
              className="text-[6px] font-mono leading-none"
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};