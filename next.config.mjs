/** @type {import('next').NextConfig} */
const nextConfig = {
  // En Next.js 15+/16, el compilador ya no es experimental
  reactCompiler: true,

  // Configuración de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  /* Nota: ESLint ya no se configura aquí en las versiones más nuevas. 
     Se recomienda usar el archivo .eslintrc o configurarlo vía CLI. */
};

export default nextConfig;