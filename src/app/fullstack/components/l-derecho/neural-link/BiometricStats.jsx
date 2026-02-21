// @/app/fullstack/components/l-derecho/neural-link/BiometricStats.jsx
export const BiometricStats = () => {
  const skills = [
    { name: "NEURAL_NODE_JS", level: "92%" },
    { name: "REACT_CORE_LINK", level: "85%" },
    { name: "DATABASE_PENETRATION", level: "70%" }
  ];

  return (
    <div className="space-y-4">
      {skills.map((skill, i) => (
        <div key={i} className="group">
          <div className="flex justify-between text-[8px] mb-1">
            <span className="text-white/60 group-hover:text-[#00f2ff] transition-colors">{skill.name}</span>
            <span className="text-[#00f2ff]">{skill.level}</span>
          </div>
          <div className="h-[2px] bg-white/5 w-full relative">
            <div 
              className="h-full bg-[#00f2ff] shadow-[0_0_8px_rgba(0,242,255,0.6)]" 
              style={{ width: skill.level }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};