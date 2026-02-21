// @/app/fullstack/components/layout/Footer.jsx
export const Footer = () => (
  <footer className="h-10 bg-[#1a1a17] border-t-2 border-[#3d3d38] flex items-center justify-between px-8 text-[9px] font-mono uppercase text-white/30 relative overflow-hidden">
    {/* Indicadores de Estado de Energía (HEV Suit style) */}
    <div className="flex gap-6 items-center">
      <div className="flex items-center gap-2">
        <div className="w-12 h-2 bg-black border border-[#3d3d38] p-[1px]">
          <div className="h-full bg-[#ff9d00] w-[85%]" />
        </div>
        <span className="text-[#ff9d00]">AUX_POWER</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-12 h-2 bg-black border border-[#3d3d38] p-[1px]">
          <div className="h-full bg-blue-500 w-[40%] animate-pulse" />
        </div>
        <span>OXYGEN_RESERVE</span>
      </div>
    </div>

    {/* Marca de seguridad */}
    <div className="flex items-center gap-4 italic tracking-widest">
      <span className="hidden md:inline">Gov_Classified_Access_Only</span>
      <div className="h-4 w-[1px] bg-white/10" />
      <span className="text-red-600 font-bold animate-pulse">Radiation_Low</span>
    </div>
  </footer>
);