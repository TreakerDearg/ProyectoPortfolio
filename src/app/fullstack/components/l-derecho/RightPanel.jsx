// @/app/fullstack/components/l-derecho/RightPanel.jsx
import styles from '@/app/fullstack/styles/LeftPanel.module.css';
import { BiometricStats } from './neural-link/BiometricStats';
import { ArchiveButton } from './navigation/ArchiveButton';

export const RightPanel = () => {
  return (
    <aside className={styles.rightFrame}>
      <div className={styles.neuralGrid} />
      
      {/* SECCIÓN 1: BIOMETRÍA DEL ADMINISTRADOR */}
      <div className={styles.sectionHeader}>
        <span>NEURAL_LINK_ESTABLISHED</span>
        <div className="size-1.5 bg-[#00f2ff] rounded-full animate-ping" />
      </div>
      
      <div className="p-4 flex-1">
        <BiometricStats />
        
        {/* Espacio para Broadcasts o Notificaciones */}
        <div className="mt-10 border-t border-white/5 pt-4">
          <p className="text-[7px] text-white/20 uppercase mb-2">Overwatch_Broadcast:</p>
          <div className="bg-black/40 p-3 italic text-[9px] text-[#00f2ff]/70 border-l border-[#00f2ff]">
            "Attention protection teams: Status reminder. Collaboration with anti-citizens is a capital violation."
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: NAVEGACIÓN A ARCHIVO (PIE DEL PANEL) */}
      <div className="p-4 border-t border-[#1a2a35] bg-[#0a1114]">
        <ArchiveButton />
        <div className="mt-3 flex justify-center opacity-20">
          <span className="text-[7px] tracking-[0.5em]">SYSTEM_V.17</span>
        </div>
      </div>
    </aside>
  );
};