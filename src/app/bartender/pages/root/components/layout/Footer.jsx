// components/layout/Footer.jsx
"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="mt-6 grid grid-cols-3 items-center text-[9px] uppercase tracking-widest font-bold border-t border-emerald-900/50 pt-4">
      {/* Sección 1: Logs */}
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500 animate-ping rounded-full" />
          Neural Link Active
        </p>
        <p className="opacity-40 font-normal italic">Subsystem_Check: [OK]</p>
      </div>

      {/* Sección 2: Branding/Ubicación */}
      <div className="text-center opacity-70 border-x border-emerald-900/30 px-4">
        RUBICON 3 // NORTHERN BOREALIS // ALT 4,200m
      </div>

      {/* Sección 3: Clock y Estado */}
      <div className="flex justify-end gap-6 items-center">
        <div className="text-right">
          <p className="opacity-40">Loadout Weight</p>
          <p>64,300 KG</p>
        </div>
        <div className="h-10 w-px bg-emerald-900/50" />
        <div className="text-xl italic font-black">2026.FEB</div>
      </div>
    </footer>
  );
}