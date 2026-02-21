export const INITIAL_NODES = [
  { 
    id: 1, 
    name: "SISTEMA_CORE", 
    x: 150, 
    y: 150, 
    color: "#3b82f6", // Sky Blue
    type: "infrastructure",
    path: "/projects/core-system",
    metrics: { load: "24%", uptime: "99.9%" }
  },
  { 
    id: 2, 
    name: "DATABASE_MAIN", 
    x: 600, 
    y: 120, 
    color: "#10b981", // Emerald
    type: "storage",
    path: "/projects/db-vault",
    metrics: { load: "67%", uptime: "98.2%" }
  },
  { 
    id: 3, 
    name: "SECURITY_FIREWALL", 
    x: 350, 
    y: 80, 
    color: "#f43f5e", // Rose (Red)
    type: "security",
    path: "/projects/firewall-protocol",
    metrics: { load: "12%", threats: "0" }
  },
  { 
    id: 4, 
    name: "NEURAL_ENGINE", 
    x: 850, 
    y: 250, 
    color: "#a855f7", // Purple
    type: "ai",
    path: "/projects/neural-net",
    metrics: { load: "88%", precision: "94.2%" }
  },
  { 
    id: 5, 
    name: "AUTH_SERVICE", 
    x: 120, 
    y: 400, 
    color: "#f59e0b", // Amber
    type: "security",
    path: "/projects/auth-gateway",
    metrics: { load: "45%", latency: "14ms" }
  },
  { 
    id: 6, 
    name: "FRONTEND_UI", 
    x: 420, 
    y: 320, 
    color: "#06b6d4", // Cyan
    type: "interface",
    path: "/projects/ui-nexus",
    metrics: { load: "31%", fps: "144" }
  },
];