// src/app/analyst/layout/UI/decorations/DataStream.jsx
import { motion } from 'framer-motion';

export const DataStream = () => (
  <div className="absolute right-2 top-0 bottom-0 w-[1px] bg-white/5 overflow-hidden pointer-events-none">
    <motion.div
      animate={{ y: ["0%", "100%"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="h-20 w-full bg-gradient-to-b from-transparent via-purple-500/40 to-transparent"
    />
  </div>
);