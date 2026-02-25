/** @type {import('next').NextConfig} */
const nextConfig = {
  // El compilador de React 19 es clave para tus puzzles de inventario
  experimental: {
    reactCompiler: true,
  },

  // Mantenemos esto para que el build no se detenga por avisos menores
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configuración de imágenes para tus texturas de búnker y posters
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  /* ELIMINADO: modularizeImports. 
     Next.js 15/16 y Lucide-React ya optimizan esto de forma nativa. 
     Forzar la ruta 'dist/esm/icons' rompe el build en versiones nuevas.
  */
};

export default nextConfig;