// @/app/fullstack/Proyectos/page.jsx
'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/app/fullstack/components/layout/Header';

export default function ProyectosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#05070a] text-[#00f2ff] font-mono flex flex-col">
      <Header />
      
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Encabezado de la Base de Datos */}
        <div className="mb-10 flex justify-between items-end border-b border-[#00f2ff]/20 pb-4">
          <div>
            <button 
              onClick={() => router.back()}
              className="text-[10px] mb-2 flex items-center gap-2 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              RETURN_TO_OVERWATCH_INTERFACE
            </button>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Central_Project_Archive</h1>
          </div>
          <div className="text-right text-[10px] opacity-40">
            <p>TOTAL_RECORDS: [UNDEFINED]</p>
            <p>CLEARANCE_LEVEL: 4</p>
          </div>
        </div>

        {/* Grid de Proyectos Extendidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Aquí mapearemos un set de datos más grande o el mismo pero con más detalle */}
          <div className="border border-[#1a2a35] bg-[#0a1114] p-6 h-48 flex flex-col justify-between group hover:border-[#00f2ff]/50 transition-colors">
            <span className="text-[8px] opacity-30 tracking-[0.5em]">DATA_BLOCK_01</span>
            <p className="text-lg font-bold">AWAITING_NEW_INPUT...</p>
            <div className="h-[1px] bg-[#00f2ff]/10 w-full group-hover:bg-[#00f2ff]/40 transition-colors" />
          </div>
        </div>
      </main>

      {/* Footer minimalista para el Archivo */}
      <footer className="h-8 bg-black/40 border-t border-[#1a2a35] flex items-center px-10 text-[7px] tracking-widest opacity-30">
        CITADEL_DATABASE_ACCESS_LOGGED // IP_TRACED
      </footer>
    </div>
  );
}