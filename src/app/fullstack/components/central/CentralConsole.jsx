// @/app/fullstack/components/central/CentralConsole.jsx
import styles from '@/app/fullstack/styles/CentralContainer.module.css';
import { StatusDisplay } from '@/app/fullstack/components/central/overwatch-status/StatusDisplay';
import { TerminalInput } from '@/app/fullstack/components/central/terminal/TerminalInput';
import { FrequencyGraph } from '@/app/fullstack/components/central/visualizer/FrequencyGraph';

export const CentralConsole = () => {
  return (
    <div className={`${styles.combineFrame} w-full h-full flex flex-col`}>
      <div className={styles.scanlineOverlay} />
      <div className={styles.corePulse} />

      {/* Header Estilo Overwatch */}
      <div className="bg-[#0a1114] border-b border-[#1a2a35] px-6 py-2 flex justify-between items-center z-10">
        <span className={`${styles.combineCyan} text-[9px] tracking-[0.5em] font-bold`}>
          CIVIL_PROTECTION_OS
        </span>
        <div className="size-2 bg-[#00f2ff] rounded-full shadow-[0_0_8px_#00f2ff]" />
      </div>

      {/* Pantalla Principal */}
      <div className="flex-1 p-8 relative z-10 flex flex-col">
        <StatusDisplay />
        
        {/* Área Visualizer: El corazón de la consola */}
        <div className="flex-1 flex flex-col justify-center items-center my-4 bg-black/40 border-x border-[#1a2a35] relative">
          {/* Fondo decorativo sutil (ID de Ciudad) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[120px] font-black text-[#00f2ff]/5 tracking-tighter select-none">C17</span>
          </div>
          
          <div className="w-full max-w-md z-10">
            <FrequencyGraph />
          </div>
        </div>

        <TerminalInput />
      </div>

      {/* Decoración de pie de consola */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#1a2a35] to-transparent w-full" />
    </div>
  );
};