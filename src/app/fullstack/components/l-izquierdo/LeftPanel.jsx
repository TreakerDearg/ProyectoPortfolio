// @/app/fullstack/components/l-izquierdo/LeftPanel.jsx
import styles from '@/app/fullstack/styles/LeftPanel.module.css';
import { projects } from './projectsData';
import { ProjectCard } from './list/ProjectCard';

export const LeftPanel = ({ onSelectProject, selectedId }) => {
  return (
    <aside className={styles.asideFrame}>
      <div className={`${styles.bolt} ${styles.topL}`} />
      <div className={`${styles.bolt} ${styles.botL}`} />
      
      <div className={styles.headerTitle}>
        <div className="flex items-center gap-2">
          <div className="w-1 h-3 bg-[#00f2ff] animate-pulse" />
          <span>Overwatch_Database</span>
        </div>
        <p className="text-[7px] text-white/20 mt-1 tracking-tighter uppercase">
          Sector_17 // Citizen_Registry
        </p>
      </div>
      
      <div className={styles.contentArea}>
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onSelect={() => onSelectProject(project)}
            isActive={selectedId === project.id}
          />
        ))}
      </div>

      <div className="p-3 border-t border-[#1a2a35] bg-[#05070a]">
        <div className="flex justify-between items-center text-[7px] font-mono">
          <span className="text-[#00f2ff]/40">SCAN_LEVEL: 105%</span>
          <span className="text-[#00f2ff] animate-pulse">MONITORING...</span>
        </div>
      </div>
    </aside>
  );
};