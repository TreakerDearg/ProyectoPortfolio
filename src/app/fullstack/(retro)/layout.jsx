// src/app/fullstack/layout.jsx

export const metadata = {
  title: "Combine Overwatch Terminal",
  description: "C17 Local Node Interface",
};

export default function FullstackLayout({ children }) {
  return (
    <>
      {/* Next.js inyectará estos links en el HEAD del Root Layout automáticamente */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Aldrich&family=JetBrains+Mono:wght@300;400;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

      {/* Usamos un contenedor en lugar de <body> */}
      <div className="bg-black antialiased overflow-hidden selection:bg-[#00f2ff]/30 selection:text-[#00f2ff] min-h-screen">
        
        {/* SVG Filter para efecto de grano/ruido */}
        <svg className="hidden">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        {/* Contenedor Maestro: Ocupa todo el viewport */}
        <div className="h-screen w-screen flex flex-col overflow-hidden relative font-mono text-[#00f2ff]/80">
          
          {/* Capa de atmósfera visual (Decoración) */}
          <div className="absolute inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-overlay" 
               style={{ filter: 'url(#noiseFilter)' }} />
          
          <div className="absolute inset-0 pointer-events-none z-[998] bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.4)_100%)]" />

          {/* Contenido Principal */}
          <main className="relative z-10 flex flex-col h-full w-full">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}