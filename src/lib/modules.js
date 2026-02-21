// src/lib/modules.js

export const modules = [
  {
    id: 'fullstack',
    icon: 'code',
    title: '[FULLSTACK_DEV]',
    lines: [
      '$ stack --view',
      '> React / TypeScript / Node.js',
      '> AWS / Docker / PostgreSQL',
    ],
    footer: 'STABILITY: 98.4%',
    href: '/fullstack', // ✅ app/fullstack/page.jsx
  },
  {
    id: 'bartender',
    icon: 'local_bar',
    title: '[NEON_BARTENDER]',
    lines: [
      '$ drink --craft',
      '> Mixology / Hospitality / UX',
      '> Atmosphere / Social Dynamics',
    ],
    footer: 'VIBE: OPTIMIZED',
    href: '/bartender', // ✅ app/bartender/page.jsx
  },
  {
    id: 'analyst',
    icon: 'query_stats',
    title: '[SYSTEM_ANALYST]',
    lines: [
      '$ analyze --deep',
      '> Data Science / Python / SQL',
      '> Strategy / Business Logic',
    ],
    footer: 'PRECISION: 100%',
    href: '/analyst', // ✅ app/analyst/page.jsx
  },
]
