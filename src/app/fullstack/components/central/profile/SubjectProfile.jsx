// @/app/fullstack/components/central/profile/SubjectProfile.jsx
import { StaticImage } from './StaticImage';
import styles from '@/app/fullstack/styles/CentralContainer.module.css';

export const SubjectProfile = ({ project }) => {
  if (!project) return null;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-6 items-start">
        {/* Lado Izquierdo: Visual */}
        <StaticImage name={project.name} />

        {/* Lado Derecho: Datos Críticos */}
        <div className="flex-1 space-y-3 font-mono">
          <div className="border-b border-[#00f2ff]/20 pb-2">
            <h3 className={`${styles.combineCyan} text-xl font-black tracking-tighter`}>
              {project.name}
            </h3>
            <span className="text-[9px] text-white/40 uppercase">Registration_ID: {project.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[7px] text-white/30 uppercase">Violation_History</p>
              <p className="text-[10px] text-red-400">Anti-Citizen Activity</p>
            </div>
            <div>
              <p className="text-[7px] text-white/30 uppercase">Social_Credit</p>
              <p className="text-[10px] text-[#00f2ff]">-450.00 (REJECTED)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Análisis de Comportamiento (Barras de carga) */}
      <div className="space-y-4 bg-black/40 p-4 border border-[#1a2a35]">
        <h4 className="text-[9px] text-[#00f2ff]/60 uppercase tracking-[0.2em]">Neural_Compliance_Analysis</h4>
        <div className="space-y-3">
          {[
            { label: "COGNITIVE_DISSIDENCE", val: "88%" },
            { label: "OVERWATCH_AWARENESS", val: "12%" }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[8px] text-white/40">
                <span>{stat.label}</span>
                <span>{stat.val}</span>
              </div>
              <div className="h-1 bg-white/5 w-full">
                <div 
                  className="h-full bg-[#00f2ff] shadow-[0_0_5px_#00f2ff]" 
                  style={{ width: stat.val }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};