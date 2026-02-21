/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Combined Colors
      colors: {
        // Corporate / System Colors
        primary: "#2F81F7",
        accent: "#8B5CF6",
        "background-dark": "#0d1116",
        "border-dark": "#30363d",
        "surface-dark": "#161b22",
        "text-muted": "#8fa8cc",
        
        // Combine / Cyberpunk Colors
        combine: {
          cyan: '#00f2ff',
          red: '#ff3c3c',
          bg: '#05070a',
          border: '#1a2a35',
        }
      },
      
      // Combined Typography
      fontFamily: {
        aldrich: ['Aldrich', 'sans-serif'],
        display: ["Space Grotesk", "sans-serif"],
        // Merged mono: JetBrains for code, IBM for system feel
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },

      // Combined Animations & Effects
      animation: {
        'flicker': 'flicker 0.15s infinite',
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '33%': { opacity: '0.98' },
          '66%': { opacity: '0.95' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      backgroundImage: {
        'terminal-grid': "radial-gradient(#30363d 1px, transparent 1px)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}