export default function AnalistaPage() {
  return (
    <div className="p-4 sm:p-6 max-w-full overflow-x-hidden">
      <div className="border border-blue-500/30 bg-blue-500/5 p-4 rounded-lg mb-4 sm:mb-6">
        <h2 className="text-blue-400 font-mono text-xs sm:text-sm"></h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Simulación de un Nodo de Trabajo */}
        <div className="group p-4 sm:p-6 border border-slate-800 bg-slate-900/50 rounded-xl hover:border-blue-500 transition-all w-full">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-mono text-slate-500"></span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 whitespace-nowrap"></span>
          </div>
          <h4 className="font-bold text-base sm:text-lg"></h4>
          <p className="text-sm text-slate-400 mt-2 break-words"></p>
        </div>
      </div>
    </div>
  );
}