/* ==========================================================
   CONFIGURACIÓN MAESTRA DE INFRAESTRUCTURA (NEURAL_NET_V3)
   ========================================================== */

export const INITIAL_NODES = [
  { 
    id: "node-core", 
    name: "SISTEMA_CORE", 
    company: "arasaka", // Rojo/Negro/Elite
    x: 150, y: 300, 
    color: "#ef4444", 
    type: "infrastructure",
    path: "/systems/core",
    connections: ["node-db", "node-auth", "node-firewall"],
    metrics: { load: 24, uptime: "99.9%", temp: "38°C", alerts: 2 }
  },
  { 
    id: "node-db", 
    name: "DATABASE_MAIN", 
    company: "kang_tao", // Ámbar/Tecnológico
    x: 600, y: 150, 
    color: "#f59e0b", 
    type: "database",
    path: "/archive/vault-01",
    connections: ["node-core", "node-neural", "node-neutral-01"],
    metrics: { load: 67, uptime: "98.2%", iops: "12.4k", queries_sec: "2.1k" }
  },
  { 
    id: "node-firewall", 
    name: "SEC_FIREWALL", 
    company: "militech", // Azul/Militar/Cuadrado
    x: 400, y: 100, 
    color: "#3b82f6", 
    type: "security",
    path: "/security/perimeter",
    connections: ["node-core"],
    metrics: { load: 12, threats_blocked: 1420, packets_sec: "450k", uptime: "99.7%" }
  },
  { 
    id: "node-neural", 
    name: "NEURAL_ENGINE", 
    company: "arasaka", 
    x: 850, y: 350, 
    color: "#ef4444", 
    type: "terminal",
    path: "/ai/neural-processor",
    connections: ["node-db", "node-ui"],
    metrics: { load: 88, precision: "94.2%", synaptic_speed: "1.2ms", ai_threads: 8 }
  },
  { 
    id: "node-auth", 
    name: "AUTH_SERVICE", 
    company: "militech", 
    x: 150, y: 500, 
    color: "#3b82f6", 
    type: "security",
    path: "/security/auth-gate",
    connections: ["node-core"],
    metrics: { load: 45, latency: "14ms", active_sessions: 842, failed_logins: 7 }
  },
  { 
    id: "node-ui", 
    name: "FRONTEND_UI", 
    company: "kang_tao", 
    x: 600, y: 550, 
    color: "#f59e0b", 
    type: "terminal",
    path: "/interface/main-hud",
    connections: ["node-neural"],
    metrics: { load: 31, fps: 144, user_count: 12, active_windows: 5 }
  },
  { 
    id: "node-neutral-01",
    name: "DATA_HUB_NEUTRAL", 
    company: "neutral", // Nodo neutro para interoperabilidad
    x: 750, y: 250,
    color: "#9ca3af", // Gris neutral
    type: "hub",
    path: "/neutral/data-hub",
    connections: ["node-db", "node-ui"],
    metrics: { load: 50, uptime: "99%", connected_nodes: 4 }
  },
  { 
    id: "node-surveillance", 
    name: "SURVEILLANCE_AI", 
    company: "kang_tao", 
    x: 950, y: 100,
    color: "#a855f7", 
    type: "security",
    path: "/ai/surveillance",
    connections: ["node-core", "node-neutral-01"],
    metrics: { load: 72, active_cams: 24, detected_threats: 3 }
  },
  { 
    id: "node-research", 
    name: "R&D_LAB", 
    company: "militech", 
    x: 300, y: 650,
    color: "#3b82f6", 
    type: "research",
    path: "/labs/rnd",
    connections: ["node-auth", "node-ui"],
    metrics: { load: 56, experiments_running: 6, alerts: 1 }
  }
];


/* --- FLUJOS DINÁMICOS (Referenciados por ID de Nodo) --- */
export const INITIAL_STREAMS = [
  { 
    id: 'STR-99', 
    source: 'node-core', // Referencia a INITIAL_NODES[0].id
    target: 'node-db',   // Referencia a INITIAL_NODES[1].id
    load: 45, 
    status: 'ACTIVE',
    type: 'sql_sync'
  },
  { 
    id: 'STR-102', 
    source: 'node-neural', 
    target: 'node-ui', 
    load: 82, 
    status: 'HIGH_TRAFFIC',
    type: 'neural_stream'
  },
  { 
    id: 'STR-205', 
    source: 'node-auth', 
    target: 'node-core', 
    load: 12, 
    status: 'STABLE',
    type: 'auth_validation'
  }
];

/* --- LOGS DE SEGURIDAD (Vinculados a Nodos) --- */
export const SECURITY_LOGS = [
  { 
    id: "L-101", 
    timestamp: "23:44:12", 
    event: "PACKET_INSPECTION", 
    origin: "node-firewall", // Vinculado al firewall
    status: "CLEAN", 
    level: "info" 
  },
  { 
    id: "L-102", 
    timestamp: "23:45:01", 
    event: "UNAUTHORIZED_PING", 
    origin: "EXTERNAL_WAN", 
    status: "BLOCKED", 
    level: "warning" 
  },
  { 
    id: "L-103", 
    timestamp: "23:48:33", 
    event: "SSL_HANDSHAKE", 
    origin: "node-core", 
    status: "SUCCESS", 
    level: "info" 
  },
  { 
    id: "L-104", 
    timestamp: "00:01:12", 
    event: "MEMORY_CORRUPTION_ATTEMPT", 
    origin: "node-db", 
    status: "REJECTED", 
    level: "critical" 
  }
];

/* --- ESTADO DEL KERNEL (Referencia Global de Performance) --- */
export const INITIAL_KERNEL_STATE = {
  version: "ARASAKA_OS_2.0.4-LTS",
  cpu: {
    cores: 16,
    baseLoad: 42.08, // El Contexto hará que esto fluctúe
    temp: "38°C",
    architecture: "X86_64_QUANTUM"
  },
  memory: {
    total: 512,
    used: 128,
    unit: "GB",
    type: "DDR6_ECC"
  },
  network: {
    bandwidth: "100 Gbps",
    active_connections: INITIAL_NODES.length, // Se autogestiona
    active_streams: INITIAL_STREAMS.length
  },
  uptime: "432:12:09",
  status: "NOMINAL",
  security_level: "MAXIMUM"
};