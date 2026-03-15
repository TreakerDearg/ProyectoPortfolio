export const netMessages = [
  // Fallout / Vault-Tec + fullstack
  { type: "TX", port: 443, message: "G.E.C.K. desplegado en producción" },
  { type: "RX", port: 80, message: "Vault 42: health check OK" },
  { type: "TX", port: 22, message: "FEV experimento: migración de DB" },
  { type: "RX", port: 53, message: "Pip-Boy: DNS resuelto" },
  { type: "TX", port: 8080, message: "RobCo terminal: backup de código" },
  { type: "RX", port: 3306, message: "Base de datos corrupta: rollback" },
  { type: "TX", port: 25, message: "Mensaje del Overseer: nuevo release" },
  { type: "RX", port: 110, message: "Solicitud de suministros: servidores" },
  { type: "TX", port: 21, message: "Transferencia de archivos: deploy" },
  { type: "RX", port: 69, message: "Actualización de firmware: parche de seguridad" },
  { type: "TX", port: 123, message: "Sincronización NTP con Vault-Tec" },
  { type: "RX", port: 161, message: "Alerta: intrusión en el servidor" },
  { type: "TX", port: 514, message: "Log: purga de logs completada" },
  { type: "RX", port: 636, message: "Conexión LDAP con enclave" },
  { type: "TX", port: 993, message: "Correo cifrado: credenciales" },
  { type: "RX", port: 995, message: "Mensaje de la Hermandad: nueva API" },

  // Metro + fullstack
  { type: "TX", port: 443, message: "Estación Polis: despliegue en producción" },
  { type: "RX", port: 80, message: "Túnel 12: error 404 detectado" },
  { type: "TX", port: 22, message: "Spartans: parche de seguridad SSH" },
  { type: "RX", port: 53, message: "Señal de la Biblioteca: DNS actualizado" },
  { type: "TX", port: 8080, message: "Filtros de aire: optimización de queries" },
  { type: "RX", port: 3306, message: "Mapa de túneles: cache invalidada" },
  { type: "TX", port: 25, message: "Llamada de auxilio: servidor caído" },
  { type: "RX", port: 110, message: "Comerciante: nuevos paquetes npm" },
  { type: "TX", port: 21, message: "Transmisión de los Rangers: deploy" },
  { type: "RX", port: 69, message: "Ruido anómalo: alta latencia" },

  // S.T.A.L.K.E.R. + fullstack
  { type: "TX", port: 123, message: "Anomalía eléctrica: picos de CPU" },
  { type: "RX", port: 161, message: "Mercenarios: petición de artefactos (PR)" },
  { type: "TX", port: 514, message: "Eco de emisora: '¡Stalker, revisa el log!'" },
  { type: "RX", port: 636, message: "Señal de fábrica: endpoint caído" },

  // Postapocalíptico + fullstack
  { type: "TX", port: 993, message: "Tormenta de polvo: DDoS detectado" },
  { type: "RX", port: 995, message: "Refugio subterráneo: backup exitoso" },
  { type: "TX", port: 443, message: "Mutación en cultivos: error en base de datos" },
  { type: "RX", port: 80, message: "Banda de saqueadores: intento de hackeo" },
  { type: "TX", port: 22, message: "Transmisión de radio: '¿Hay alguien ahí?' (ping)" },
  { type: "RX", port: 53, message: "Explosión en planta de energía: servidor caído" },
  { type: "TX", port: 8080, message: "Protocolo de emergencia: rollback" },
  { type: "RX", port: 3306, message: "Fallo en sistema de reciclaje: conexiones agotadas" },
  { type: "TX", port: 25, message: "Invasión de criaturas: alta carga" },
  { type: "RX", port: 110, message: "Suministros médicos robados: datos perdidos" },

  // Alertas del sistema (fullstack)
  { type: "TX", port: 21, message: "RADIACIÓN CRÍTICA: uso de CPU al 90%" },
  { type: "RX", port: 69, message: "Fallo en generador: servidor secundario activado" },
  { type: "TX", port: 123, message: "Reinicio del núcleo: deploy completado" },
  { type: "RX", port: 161, message: "Alarma de intrusión: múltiples intentos de login" },
  { type: "TX", port: 514, message: "Nivel de CO2: uso de memoria alto" },
  { type: "RX", port: 636, message: "Mantenimiento de filtros: limpieza de caché" },

  // Más variedad fullstack
  { type: "TX", port: 3000, message: "Frontend: build completado" },
  { type: "RX", port: 5000, message: "Backend: API respondiendo" },
  { type: "TX", port: 27017, message: "MongoDB: conexión establecida" },
  { type: "RX", port: 6379, message: "Redis: cache hit" },
  { type: "TX", port: 9200, message: "Elasticsearch: índice actualizado" },
  { type: "RX", port: 9090, message: "Prometheus: métricas recopiladas" },
  { type: "TX", port: 8081, message: "Docker: contenedor reiniciado" },
  { type: "RX", port: 5432, message: "PostgreSQL: consulta lenta" },
];

export const generateTrafficData = () => {
  return Array.from({ length: 8 }, () => Math.floor(Math.random() * 9) + 1);
};