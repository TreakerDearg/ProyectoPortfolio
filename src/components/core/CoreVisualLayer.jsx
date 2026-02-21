'use client'

// Ya no importamos el CSS aquí, se hace en el layout.js

export default function CoreVisualLayer({ children }) {
  return (
    // Añadimos inline style para el color de fondo como última red de seguridad
    <div 
      className="relative min-h-screen bg-black text-terminal-green font-mono overflow-hidden crt-container"
      style={{ backgroundColor: '#000' }} 
    >
      {/* Estas capas deben tener z-index alto en su CSS para no tapar los clicks */}
      <div className="crt-overlay pointer-events-none" />
      <div className="crt-scanline pointer-events-none" />
      <div className="system-grid pointer-events-none" />
      <div className="pointer-events-none fixed inset-0 system-vignette opacity-60" />

      {/* El contenido real */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}