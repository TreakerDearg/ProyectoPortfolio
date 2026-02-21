'use client'

import { useState, useEffect } from 'react'
import CoreVisualLayer from '@/components/core/CoreVisualLayer'
import SystemLayout from '@/components/core/SystemLayout'

export default function HomeLayout({ children }) {
  // 1. Usamos un estado de montaje para evitar discrepancias de hidratación
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    // 2. Aplicamos un fondo negro sólido inmediato para evitar el flash
    <div className="bg-[#020502] min-h-screen">
      <CoreVisualLayer>
        <SystemLayout variant="home">
          {/* 3. Solo renderizamos el contenido interactivo una vez montado, 
                 pero el Layout (la estructura) ya está ahí con su CSS */}
          <div className={!isMounted ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
            {children}
          </div>
        </SystemLayout>
      </CoreVisualLayer>
    </div>
  )
}