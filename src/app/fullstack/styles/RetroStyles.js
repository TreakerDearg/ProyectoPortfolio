// src/app/fullstack/styles/RetroStyles.js
export const RetroGlobalStyles = () => (
  <style jsx global>{`
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes flicker {
      0% { opacity: 0.1; }
      100% { opacity: 0.15; }
    }
    @keyframes scanline-move {
      0% { transform: translateY(0%); }
      100% { transform: translateY(100%); }
    }

    .animate-spin-slow { animation: spin-slow 8s linear infinite; }
    .text-glow { text-shadow: 0 0 10px rgba(0, 255, 136, 0.6); }
    .text-glow-amber { text-shadow: 0 0 12px rgba(255, 176, 0, 0.4); }

    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #00ff88; border-radius: 10px; }

    .custom-scrollbar-amber::-webkit-scrollbar { width: 3px; }
    .custom-scrollbar-amber::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
    .custom-scrollbar-amber::-webkit-scrollbar-thumb { background: #ffb000; border-radius: 10px; }

    .retro-container::after {
      content: "";
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(18, 16, 16, 0.05);
      z-index: 100;
      pointer-events: none;
      animation: flicker 0.15s infinite;
    }

    .scanline-effect {
      width: 100%;
      height: 100px;
      z-index: 60;
      background: linear-gradient(0deg, transparent 0%, rgba(0, 255, 136, 0.05) 50%, transparent 100%);
      opacity: 0.1;
      position: absolute;
      bottom: 100%;
      animation: scanline-move 10s linear infinite;
    }
  `}</style>
);