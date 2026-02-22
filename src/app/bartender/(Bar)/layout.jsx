'use client';

import React from 'react';
import styles from '../styles/bartender.module.css';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { motion } from 'framer-motion';
import '../styles/metro-globals.css';

export default function BartenderLayout({ children }) {
  return (
    <div className={styles.baseContainer}>
      {/* 1. Capa de Fondo Estática */}
      <div className={styles.backgroundTitle} aria-hidden="true">
        METRO_MIX
      </div>

      {/* 2. Estructura de Interfaz Principal */}
      <div className="relative z-20 flex flex-col min-h-screen">
        
        {/* Contenedor con padding responsivo para no asfixiar el contenido */}
        <div className="flex flex-col flex-grow w-full max-w-[1920px] mx-auto px-4 md:px-8">
          
          <Header />

          {/* MAIN: 
              - pt-2 para reducir el gap con el header.
              - flex-grow para empujar el footer.
              - overflow-visible para que las sombras y hovers de las cards no se corten.
          */}
          <motion.main 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-grow flex flex-col pt-2 pb-12"
          >
            {children}
          </motion.main>

          <Footer />
        </div>
      </div>

      {/* 3. Elementos de Inmersión (Fijos) */}
      {/* Línea de escaneo superior */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent z-[100]" />
      
      {/* Overlay sutil de ruido/vignette (Opcional, añade textura de terminal) */}
      <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}