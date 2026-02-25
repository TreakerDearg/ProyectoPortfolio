/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- ESTÉTICA METRO / D6 (Industrial & Radiactivo) ---
        metro: {
          amber: "#ffb300",     // El clásico ámbar de los medidores de gas
          green: "#00ff66",     // Verde filtro de visión nocturna
          radiation: "#d4ff00", // Amarillo verdoso tóxico
          rust: "#4a3b2a",      // Metal oxidado
          dark: "#050505",      // Oscuridad del túnel
        },
        // --- ESTÉTICA CORPO / CYBERPUNK (Limpio & Sintético) ---
        corpo: {
          cyan: '#00f2ff',
          red: '#ff3c3c',
          blue: '#2f81f7',
          surface: '#0d1116',
          border: '#30363d',
        },
        // --- ARMORED CORE (Militarista & HUD Técnico) ---
        ac: {
          hazard: '#ff4400',    // Alerta de misil / Energía crítica
          ui: '#8fa8cc',        // Texto técnico azulado de cabina
          frame: '#161b22',     // Gris de fuselaje de mecha
        }
      },
      
      fontFamily: {
        // Aldrich para títulos estilo Armored Core / Robótica
        aldrich: ['Aldrich', 'sans-serif'],
        // VT323 o Share Tech Mono para el sentimiento de terminal vieja de Metro
        terminal: ['VT323', 'monospace'],
        // JetBrains para ese look corpo de alta tecnología
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
        display: ["Space Grotesk", "sans-serif"],
      },

      animation: {
        'flicker': 'flicker 0.15s infinite',
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite',
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '33%': { opacity: '0.92' },
          '66%': { opacity: '0.98' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },

      backgroundImage: {
        // Rejilla de píxeles CRT
        'crt-grid': "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
        // Radar de Armored Core
        'radar-radial': "radial-gradient(circle, rgba(47, 129, 247, 0.15) 0%, transparent 70%)",
      },

      boxShadow: {
        // Brillo de neón corpo
        'neon-cyan': '0 0 10px rgba(0, 242, 255, 0.5), 0 0 20px rgba(0, 242, 255, 0.2)',
        'neon-amber': '0 0 10px rgba(255, 179, 0, 0.5), 0 0 20px rgba(255, 179, 0, 0.2)',
        // Sombra interna de monitor CRT
        'crt-inner': 'inset 0 0 80px rgba(0,0,0,0.9)',
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // Plugin utilitario para efectos de texto retro
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-glow': {
          'text-shadow': '0 0 5px currentColor, 0 0 10px currentColor',
        },
        '.text-shadow-none': {
          'text-shadow': 'none',
        }
      })
    }
  ],
}