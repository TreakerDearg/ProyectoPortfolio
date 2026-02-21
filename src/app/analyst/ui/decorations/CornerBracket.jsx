// src/app/analyst/layout/UI/decorations/CornerBracket.jsx
export const CornerBracket = ({ position = "top-left" }) => {
  const posClasses = {
    "top-left": "top-0 left-0 border-t-2 border-l-2",
    "top-right": "top-0 right-0 border-t-2 border-r-2",
    "bottom-left": "bottom-0 left-0 border-b-2 border-l-2",
    "bottom-right": "bottom-0 right-0 border-b-2 border-r-2",
  };

  return (
    <div className={`absolute w-4 h-4 border-purple-500/40 ${posClasses[position]} pointer-events-none z-20`} />
  );
};