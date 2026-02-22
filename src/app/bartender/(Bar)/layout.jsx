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
      {/* Título de Fondo (Capa 0) */}
      <div className={styles.backgroundTitle}>METRO_MIX</div>

      {/* ESTRUCTURA DE FLUJO: 
          min-h-screen en el contenedor relativo asegura que el footer 
          se posicione al final del viewport o más abajo si hay mucho contenido.
      */}
      <div className="relative z-20 flex flex-col min-h-screen">
        
        <div className={styles.contentWrapper}>
          <Header />

          {/* MAIN: flex-grow permite que esta sección ocupe todo el espacio 
              sobrante, "anclando" el footer al fondo.
          */}
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-grow flex flex-col pt-4"
          >
            {children}
          </motion.main>

          <Footer />
        </div>
      </div>

      {/* Línea de acento fija */}
      <div className="fixed top-0 left-0 w-full h-1 bg-amber-600/30 z-[100]" />
    </div>
  );
}