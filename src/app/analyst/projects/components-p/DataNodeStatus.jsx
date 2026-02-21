// components-p/DataNodeStatus.jsx
import { motion } from 'framer-motion';
import styles from '@/app/analyst/styles/Proyectos-styles/DataNodeStatus.module.css';


export const DataNodeStatus = () => (
  <motion.div 
    initial={{ opacity: 0, scaleY: 0 }}
    animate={{ opacity: 1, scaleY: 1 }}
    exit={{ opacity: 0, scaleY: 0 }}
    className={styles.statusBars}
  >
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className={styles.bar}
        animate={{ height: ["20%", "80%", "40%", "100%", "20%"] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </motion.div>
);