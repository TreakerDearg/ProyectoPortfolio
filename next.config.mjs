/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activa el compilador de React para optimizar memorización (useMemo/useCallback) automáticamente
  experimental: {
    reactCompiler: true,
  },

  // Ignora errores de linting durante el build para evitar que fallos estéticos detengan el despliegue
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optimización de imágenes (útil si vas a cargar posters o texturas del Metro)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite imágenes de cualquier origen seguro
      },
    ],
  },

  // Asegura que las librerías de iconos no inflen el bundle final
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
};

export default nextConfig;