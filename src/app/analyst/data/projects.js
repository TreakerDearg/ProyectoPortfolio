// src/app/analyst/data/projects.js

export const PROJECTS_DATA = [
  {
    id: "DB-01",
    title: "SQL_OPTIMIZER_ENGINE",
    category: "PERFORMANCE",
    status: "ACTIVE",
    description: "Refactorización de índices B-Tree y optimización de planes de ejecución. Latencia reducida en un 80%.",
    tech: ["POSTGRES", "EXPLAIN"],
    size: "large", 
    efficiency: "99.1%",
    image: "/api/placeholder/800/400",
    protocol: "QUERY_PLAN_V4"
  },
  {
    id: "DB-06",
    title: "BACKUP_VAULT",
    category: "INTEGRITY",
    status: "ACTIVE",
    description: "Scripts de respaldo cold-storage con compresión LZ4 y cifrado AES-256 en reposo.",
    tech: ["BASH", "S3"],
    size: "small",
    efficiency: "100%",
    image: "/api/placeholder/400/200",
    protocol: "VAULT_SAFE"
  },
  {
    id: "DB-0",
    title: "ETL_PIPELINE",
    category: "ENGINEERING",
    status: "ACTIVE",
    description: "Automatización de flujos masivos con validación por hashes e integridad referencial garantizada.",
    tech: ["SNOWFLAKE", "AIRFLOW"],
    size: "medium",
    efficiency: "100%",
    image: "/api/placeholder/400/800",
    protocol: "PIPELINE_ALPHA"
  },
  {
    id: "DB-03",
    title: "NOSQL_SYNC",
    category: "DISTRIBUTED",
    status: "DEVELOPMENT",
    description: "Sincronización de clusters con consistencia eventual y replicación multizona activa.",
    tech: ["MONGO", "REDIS"],
    size: "medium",
    efficiency: "88.5%",
    image: "/api/placeholder/400/400",
    protocol: "CLUSTER_SYNC_03"
  },
  {
    id: "DB-04",
    title: "SCHEMA_CORE",
    category: "ARCHITECTURE",
    status: "ARCHIVED",
    description: "Diseño 3NF de alta disponibilidad. Documentación técnica de linaje y diagramas ERD.",
    tech: ["ORACLE", "PL_SQL"],
    size: "medium",
    efficiency: "95.0%",
    image: "/api/placeholder/400/400",
    protocol: "LEGACY_NORM"
  },
  // --- NUEVOS PROYECTOS TAMAÑO SMALL ---
  {
    id: "DB-05",
    title: "API_GATEWAY_LOG",
    category: "SECURITY",
    status: "ACTIVE",
    description: "Auditoría de acceso en tiempo real y denegación de inyecciones SQL sospechosas.",
    tech: ["REDIS", "WAF"],
    size: "small",
    efficiency: "99.9%",
    image: "/api/placeholder/400/200",
    protocol: "SHIELD_X"
  },

    {
    id: "DB-07",
    title: "API_GATEWAY_LOG",
    category: "SECURITY",
    status: "ACTIVE",
    description: "Auditoría de acceso en tiempo real y denegación de inyecciones SQL sospechosas.",
    tech: ["REDIS", "WAF"],
    size: "small",
    efficiency: "99.9%",
    image: "/api/placeholder/400/200",
    protocol: "SHIELD_X"
  },
];