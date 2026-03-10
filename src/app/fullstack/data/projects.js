export const SYSTEM_DATA = {
  /* =========================
     PLAYER CORE PROFILE
  ========================= */
  player: {
    id: "usr_01",
    name: "LEANDRO_FERREIRA",
    alias: "TREAKER_DEARG",
    rank: "SR_ARCHITECT",
    level: 24,
    exp: "12.4K",
    class: "FULLSTACK_V2",
    status: "ONLINE",
    specialization: "INTERFACE_SYSTEMS",
    location: "ARG_NODE_01",
    avatar_id: "AV_TYPE_AMBER"
  },

  /* =========================
     GLOBAL CORE STATS
  ========================= */
  core_stats: [
    { id: 'js', name: 'JS_CORE', val: 82, color: "#00ff9d", icon: "Code2" },
    { id: 'react', name: 'REACT_OS', val: 95, color: "#00ff9d", icon: "Atom" },
    { id: 'node', name: 'NODE_BACK', val: 78, color: "#ff00ff", icon: "Server" },
    { id: 'py', name: 'PY_SYSTEM', val: 45, color: "#ff9d00", icon: "Terminal" }
  ],

  /* =========================
     SYSTEM MODULES
  ========================= */
  modules: [
    { id: "mod_next", name: "NEXT.JS_14", status: "OK", version: "14.2.0", load: "0.2ms" },
    { id: "mod_react", name: "REACT_V18", status: "OK", version: "18.3.1", load: "0.1ms" },
    { id: "mod_python", name: "PYTHON_3.X", status: "OK", version: "3.11.4", load: "1.4ms" },
    { id: "mod_mongo", name: "MONGODB_CORE", status: "STANDBY", version: "7.0", load: "---" }
  ],

  /* =========================
     PROJECT DATABASE
  ========================= */
  projects: [
    {
      id: "p1",
      title: "KIOSCO_ALPASO",
      type: "DEPLOYMENT",
      status: "COMPLETED",
      xp: 1200,
      difficulty: "B-RANK",
      progress: 100,
      tech: ["Next.js", "Tailwind", "MongoDB", "Vercel"],
      description: "Terminal de ventas optimizada para entornos de alta rotación con gestión de inventario persistente.",
      repository: "github.com/TreakerDearg/KioscoAlpaso",
      deploy: "https://kiosco-alpaso.vercel.app",
      
      // Datos extra para el Diagnostic Panel
      diagnostics: {
        sync_rate: "99.8%",
        core_temp: "32°C",
        load_time: "0.6s",
        uptime: "99.9%"
      },

      // Stats específicas del proyecto
      stats: [
        { name: "DATABASE_EFF", val: 94 },
        { name: "UI_STABILITY", val: 88 },
        { name: "AUTH_PROTOCOLS", val: 100 }
      ],

      // Timeline de desarrollo (para un feed de actividad)
      logs: [
        "INIT: KERNEL_START",
        "SYNC: MONGODB_ATLAS_CONNECTED",
        "BUILD: DEPLOYMENT_SUCCESS_VERCEL"
      ]
    },
    {
      id: "p2",
      title: "PORTFOLIO_OS",
      type: "SYSTEM_CORE",
      status: "ACTIVE",
      xp: 2500,
      difficulty: "S-RANK",
      progress: 75,
      tech: ["React", "Framer Motion", "Three.js", "Tailwind"],
      description: "Interfaz de usuario modular simulando un kernel de sistema operativo de vanguardia con estética CRT.",
      repository: "PRIVATE_ENCRYPTED",
      deploy: "INTERNAL_DEV",

      diagnostics: {
        sync_rate: "98.2%",
        core_temp: "41°C",
        load_time: "0.4s",
        uptime: "---"
      },

      stats: [
        { name: "ANIMATION_ENGINE", val: 96 },
        { name: "SHADER_PROCESS", val: 70 },
        { name: "DOM_OPTIMIZATION", val: 92 }
      ],

      logs: [
        "PATCH: NEURAL_INTERFACE_V2",
        "UI: CRT_SCANLINE_FILTER_ACTIVE",
        "DEV: COMPONENT_MODULARIZATION"
      ]
    },
    {
      id: "p3",
      title: "NEURAL_LINK_UI",
      type: "UI_GEN",
      status: "LOCKED",
      xp: 5000,
      difficulty: "GOD-MODE",
      progress: 0,
      tech: ["Rust", "Wasm", "WebGL"],
      description: "Módulo experimental de procesamiento visual de baja latencia para interfaces neuronales.",
      repository: "CLASSIFIED",
      deploy: "UNKNOWN",

      diagnostics: {
        sync_rate: "NULL",
        core_temp: "OFFLINE",
        load_time: "INF",
        uptime: "0.0%"
      },

      stats: [
        { name: "AI_LOGIC", val: 0 },
        { name: "WASM_THREADS", val: 0 }
      ],

      logs: [
        "WARN: ACCESS_DENIED",
        "ERR: INSUFFICIENT_RANK"
      ]
    }
  ]
};