// @/app/fullstack/components/l-derecho/navigation/ArchiveButton.jsx
'use client';

import { useRouter } from 'next/navigation';
import styles from '@/app/fullstack/styles/LeftPanel.module.css';

export const ArchiveButton = () => {
  const router = useRouter();

  return (
    <div className="relative group">
      <div className="absolute -top-2 left-4 px-2 bg-[#05070a] z-10">
        <span className="text-[6px] text-[#00f2ff] font-bold tracking-[0.3em] uppercase">
          Database_Link
        </span>
      </div>

      <button 
        onClick={() => router.push('/fullstack/Proyectos')}
        className="
          w-full relative overflow-hidden
          bg-[#00f2ff]/5 border border-[#00f2ff]/30 
          p-4 py-6 transition-all duration-300
          hover:bg-[#00f2ff]/10 hover:border-[#00f2ff]
          group-active:scale-[0.98]
        "
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 90% 100%, 0 100%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f2ff]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex flex-col items-start text-left">
            <span className="text-[11px] text-[#00f2ff] font-black tracking-[0.2em]">
              OPEN_ARCHIVE_DATA
            </span>
            <span className="text-[8px] text-white/40 font-mono mt-1 uppercase">
              Redirecting to Sector_Archive
            </span>
          </div>

          <span className="material-symbols-outlined text-[#00f2ff] text-xl group-hover:rotate-90 transition-transform duration-500">
            database
          </span>
        </div>

        <div className="absolute -bottom-2 -right-1 opacity-5">
          <span className="text-5xl font-black text-[#00f2ff] select-none">λ</span>
        </div>
      </button>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};