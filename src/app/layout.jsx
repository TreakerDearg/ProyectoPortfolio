// src/app/layout.jsx
import { SystemProvider } from '../hooks/useSystemContext'
import '../styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      {/* 'antialiased' ayuda a que las fuentes Aldrich y JetBrains se vean nítidas.
         'selection' personaliza el resaltado de texto global.
      */}
      <body className="bg-[#020502] antialiased selection:bg-[#00f2ff]/30 selection:text-[#00f2ff]">
        <SystemProvider>
          {children}
        </SystemProvider>
      </body>
    </html>
  )
}