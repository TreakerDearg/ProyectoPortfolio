// @/app/fullstack/components/l-izquierdo/list/ProjectCard.jsx
import styles from '@/app/fullstack/styles/LeftPanel.module.css';

export const ProjectCard = ({ project, onSelect, isActive }) => {
  const threatColors = {
    LOW: "text-blue-400 border-blue-900/30",
    MEDIUM: "text-yellow-500 border-yellow-900/30",
    HIGH: "text-red-500 border-red-900/30"
  };

  return (
    <div 
      onClick={onSelect}
      className={`
        relative mb-3 p-3 border cursor-pointer transition-all duration-200
        ${isActive ? 'bg-[#00f2ff]/10 border-[#00f2ff] scale-[1.02] z-20' : 'bg-black/40 border-white/5 hover:border-white/20'}
        ${threatColors[project.threatLevel]}
      `}
    >
      {/* Indicador de Selección Activa */}
      {isActive && (
        <div className="absolute left-0 top-0 h-full w-1 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
      )}

      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[7px] opacity-40 font-mono">SUBJECT_{project.id}</span>
          <h4 className={`text-[10px] font-bold tracking-widest uppercase mt-0.5 ${isActive ? 'text-white' : ''}`}>
            {project.name}
          </h4>
        </div>
        <div className={`text-[6px] border px-1 py-0.5 font-bold ${isActive ? 'bg-[#00f2ff] text-black' : 'opacity-60'}`}>
          {project.threatLevel}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-end">
        <div className="flex items-center gap-1.5">
          <div className={`size-1 rounded-full ${project.status === 'STABLE' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          <span className="text-[7px] opacity-50 uppercase tracking-tighter">Status: {project.status}</span>
        </div>
        
        {/* Botón de Link Externo (Solo visible o resaltado en hover/active) */}
        <a 
          href={project.url} 
          target="_blank" 
          onClick={(e) => e.stopPropagation()} // Evita que el clic en el link cambie el perfil
          className="material-symbols-outlined text-[12px] hover:text-white transition-colors"
        >
          terminal
        </a>
      </div>
    </div>
  );
};