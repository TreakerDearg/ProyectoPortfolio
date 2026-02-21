// @/app/fullstack/components/central/profile/StaticImage.jsx
import styles from '@/app/fullstack/styles/CentralContainer.module.css';

export const StaticImage = ({ name }) => (
  <div className="relative w-32 h-32 border border-[#00f2ff]/30 bg-black overflow-hidden group">
    {/* Capa de ruido/estática */}
    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUqWMrBK/giphy.gif')] bg-cover mix-blend-screen" />
    
    {/* Placeholder de Silueta */}
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="material-symbols-outlined text-6xl text-[#00f2ff]/20">person</span>
    </div>

    {/* Línea de escaneo vertical */}
    <div className="absolute inset-0 w-full h-[2px] bg-[#00f2ff]/50 shadow-[0_0_10px_#00f2ff] animate-[scan_2s_linear_infinite]" />

    {/* Texto de identificación superpuesto */}
    <div className="absolute bottom-0 left-0 w-full bg-[#00f2ff]/10 p-1">
      <p className="text-[7px] text-[#00f2ff] font-mono text-center tracking-tighter">SUBJ_IMG_CAPTURED</p>
    </div>

    <style jsx>{`
      @keyframes scan {
        0% { top: -10%; }
        100% { top: 110%; }
      }
    `}</style>
  </div>
);