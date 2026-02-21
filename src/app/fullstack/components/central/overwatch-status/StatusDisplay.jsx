// @/app/fullstack/components/central/overwatch-status/StatusDisplay.jsx
import styles from '@/app/fullstack/styles/CentralContainer.module.css';

export const StatusDisplay = () => (
  <div className="flex justify-between items-start mb-6 font-mono">
    <div className="space-y-1">
      <h2 className={`${styles.combineCyan} text-xs font-bold tracking-widest`}>
        TERMINAL_AUTHORITY: OVERWATCH
      </h2>
      <div className="flex gap-2 items-center">
        <span className="text-[9px] text-white/40">NODE_STABILITY:</span>
        <span className="text-[9px] text-[#00f2ff] animate-pulse">98.4%</span>
      </div>
    </div>
    
    <div className="text-right">
      <div className="bg-[#00f2ff]/10 border border-[#00f2ff]/30 px-2 py-1">
        <span className="text-[8px] text-[#00f2ff] font-bold">UNREST_LEVEL: NONE</span>
      </div>
      <p className="text-[7px] text-white/20 mt-1">SOCIO-STABILITY_STATUS: PRESERVED</p>
    </div>
  </div>
);