// @/app/fullstack/page.jsx
"use client";
import { useState, useEffect } from 'react';

// Datos de proyectos
import { projects } from '@/app/fullstack/components/l-izquierdo/projectsData';

// Estructura Layout
import { Header } from '@/app/fullstack/components/layout/Header';
import { Footer } from '@/app/fullstack/components/layout/Footer';

// Paneles y Consola Central
import { LeftPanel } from '@/app/fullstack/components/l-izquierdo/LeftPanel';
import { RightPanel } from '@/app/fullstack/components/l-derecho/RightPanel';
import { CentralConsole } from '@/app/fullstack/components/central/CentralConsole';

// Componentes de Contenido Central
import { SubjectProfile } from '@/app/fullstack/components/central/profile/SubjectProfile';
import { TerminalInput } from '@/app/fullstack/components/central/terminal/TerminalInput';
import { StatusDisplay } from '@/app/fullstack/components/central/overwatch-status/StatusDisplay';
import { FrequencyGraph } from '@/app/fullstack/components/central/visualizer/FrequencyGraph';

export default function RetroPage() {
  const [mounted, setMounted] = useState(false);
  // Estado global para el sujeto (proyecto) bajo vigilancia
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#05070a] min-h-screen" />;

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#05070a] selection:bg-[#00f2ff] selection:text-black overflow-hidden">
      <Header />

      {/* GRID PRINCIPAL: Arquitectura Combine de 3 Columnas */}
      <main className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        
        {/* PANEL IZQUIERDO: Base de Datos de Ciudadanos (Proyectos) */}
        <div className="col-span-3 border-r border-[#1a2a35]">
          <LeftPanel onSelectProject={setSelectedProject} selectedId={selectedProject?.id} />
        </div>

        {/* PANEL CENTRAL: Consola de Overwatch / Escáner de Sujeto */}
        <div className="col-span-6 p-4 bg-[#0a0f12] relative">
          <CentralConsole>
            <div className="flex flex-col h-full space-y-6">
              {/* Información de estado de la terminal */}
              <StatusDisplay />

              {/* Visualización detallada del proyecto seleccionado */}
              <div className="flex-1 overflow-y-auto custom-scrollbar-combine pr-2">
                <SubjectProfile project={selectedProject} />
              </div>

              {/* Visualizador de frecuencia y entrada de comandos */}
              <div className="pt-4 border-t border-[#1a2a35] space-y-4">
                <FrequencyGraph />
                <TerminalInput />
              </div>
            </div>
          </CentralConsole>
        </div>

        {/* PANEL DERECHO: Telemetría Neural / Link de Ciudadela */}
        <div className="col-span-3 border-l border-[#1a2a35]">
          <RightPanel>
            <div className="flex flex-col gap-6 p-2">
               {/* Aquí irán los subcomponentes del panel derecho que diseñaremos */}
               <div className="bg-black/40 p-4 border border-[#00f2ff]/10">
                 <span className="text-[8px] text-[#00f2ff]/40 uppercase tracking-[0.2em] block mb-4">Neural_Link_Status</span>
                 <div className="space-y-2">
                    <div className="h-1 bg-[#00f2ff]/20 w-full" />
                    <div className="h-1 bg-[#00f2ff]/20 w-3/4" />
                    <div className="h-1 bg-[#00f2ff]/20 w-1/2" />
                 </div>
               </div>
            </div>
          </RightPanel>
        </div>

      </main>

      <Footer />

      {/* Estilos Globales de Scrollbar para estética Combine */}
      <style jsx global>{`
        .custom-scrollbar-combine::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar-combine::-webkit-scrollbar-track {
          background: rgba(0, 242, 255, 0.02);
        }
        .custom-scrollbar-combine::-webkit-scrollbar-thumb {
          background: rgba(0, 242, 255, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar-combine::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 242, 255, 0.4);
        }
      `}</style>
    </div>
  );
}