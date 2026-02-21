// src/app/analyst/layout/UI/decorations/ScanningLine.jsx
import { motion } from 'framer-motion';

export const ScanningLine = () => (
  <motion.div
    initial={{ translateY: "-100%" }}
    animate={{ translateY: "1000%" }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent z-[100] pointer-events-none"
  />
);