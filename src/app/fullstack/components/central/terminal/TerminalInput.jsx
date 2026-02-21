// @/app/fullstack/components/central/terminal/TerminalInput.jsx
import { useState } from 'react';
import styles from '@/app/fullstack/styles/CentralContainer.module.css' ;

export const TerminalInput = () => {
  const [input, setInput] = useState('');

  return (
    <div className="flex-1 flex flex-col justify-end font-mono pb-4">
      <div className="space-y-2 mb-4 overflow-hidden opacity-60">
        <p className="text-[10px] text-[#00f2ff]/50 leading-tight">
          {">"} CITADEL_CORE_CONNECTED...
        </p>
        <p className="text-[10px] text-[#00f2ff]/50 leading-tight">
          {">"} LOCAL_NETWORK_SCAN_COMPLETE. NO_MALIGNANT_SIGNALS.
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-[#00f2ff]/20 pt-4">
        <span className={`${styles.combineCyan} text-sm font-bold`}>λ</span>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="DISPATCH_COMMAND..."
          className="bg-transparent border-none outline-none flex-1 text-[#00f2ff] text-xs placeholder:text-[#00f2ff]/20"
          autoFocus
        />
      </div>
    </div>
  );
};