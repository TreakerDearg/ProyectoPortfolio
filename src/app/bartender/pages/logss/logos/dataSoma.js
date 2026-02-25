// dataSoma.js
import { 
  Activity, Droplet, Zap, Waves, FlaskConical, 
  ShieldAlert, Radio, Biohazard, Droplets, 
  Coffee, Wine, GlassWater, Beer, Cherry, 
  Citrus, Leaf, Skull, Ghost, 
} from 'lucide-react';

export const SOMA_APPS = [
  // ========== TRAGOS EXISTENTES MEJORADOS ==========
  { 
    id: 'gel-01', 
    title: 'STRUCTURAL_GEL', 
    size: 'large',
    icon: Droplet,
    color: '#76b5b5',
    status: 'OPTIMAL',
    corruption: 0.12,
    tag: "BIO-REPAIR",
    node: "UPSILON-01",
    security_clearance: "LEVEL_1",
    content: "Sustancia fundamental para la preservación de la vida artificial. Viscosidad optimizada para integración orgánica. Registrando trazas de carbón activado en el flujo principal.",
    recipe: {
      base: "Mezcal Espadín (ahumado natural)",
      modifiers: ["Blueberry Shrub (fermento de arándanos)", "Crème de Violette", "Lime Juice (clarified)"],
      additives: ["Activated Charcoal powder (0.5g)", "Gum Arabic syrup (textura sedosa)"],
      flavour_profile: "Smoky / Floral / Bio-sintético",
      glassware: "Vaso de precipitados 250ml",
      method: "Agitar con nitrógeno para textura aterciopelada"
    }
  },
  { 
    id: 'upsilon-02', 
    title: 'UPSILON_DRAIN', 
    size: 'normal', 
    icon: FlaskConical,
    color: '#ff4444',
    status: 'CRITICAL',
    corruption: 0.88,
    tag: "HAZARD-L5",
    node: "STORAGE-B",
    security_clearance: "LEVEL_4",
    content: "AVISO: Fuga de refrigerante criogénico detectada. Los niveles de absenta superan los protocolos de estabilidad neuronal.",
    recipe: {
      base: "Absinthe 65% (La Fée Parisienne)",
      modifiers: ["Peychaud's Bitters", "Tónica glacial (Schweppes)"],
      additives: ["Cubos de hielo de eucalipto", "Aceite esencial de menta (nebulizado)"],
      flavour_profile: "Medicinal / Criogénico / Anisado",
      glassware: "Tubo de ensayo de borosilicato",
      method: "Vertido directo sobre hielo seco (efecto humeante)"
    }
  },
  { 
    id: 'neural-03', 
    title: 'NEURAL_LINK', 
    size: 'normal', 
    icon: Activity,
    color: '#00ff00',
    status: 'CONNECTED',
    corruption: 0.35,
    tag: "SYNAPTIC",
    node: "THETA-COMM",
    security_clearance: "LEVEL_2",
    content: "Estableciendo conexión sináptica. El perfil botánico de la ginebra actúa como catalizador para la transferencia de datos.",
    recipe: {
      base: "Ginebra London Dry (Hendrick's)",
      modifiers: ["Vermut seco infusionado con albahaca", "Licor de flor de saúco"],
      additives: ["Esferificaciones de lima", "Aceite de oliva en gotas (garnish)"],
      flavour_profile: "Eléctrico / Botánico / Cítrico",
      glassware: "Copa Nick & Nora",
      method: "Refrigerar con agitación quirúrgica"
    }
  },
  { 
    id: 'abyssal-04', 
    title: 'ABYSSAL_TRACE', 
    size: 'normal', 
    icon: Waves,
    color: '#1e3a8a',
    status: 'STABLE',
    corruption: 0.05,
    tag: "DEEP-SEA",
    node: "PHI-CORE",
    security_clearance: "LEVEL_3",
    content: "Sedimentos recolectados a 4000m. Sabor umami puro extraído de algas bioluminiscentes.",
    recipe: {
      base: "Vodka infusionado con kombu (24h)",
      modifiers: ["Solución salina al 3% (agua de mar filtrada)", "Cordial de tomate amarillo"],
      additives: ["Polvo de concha de ostra (tostado)", "Tinta de calamar (decoración)"],
      flavour_profile: "Salino / Umami / Oceánico",
      glassware: "Vidrio soplado con textura irregular",
      method: "Filtración en frío por gravedad"
    }
  },
  { 
    id: 'wau-05', 
    title: 'WAU_OVERRIDE', 
    size: 'large', 
    icon: ShieldAlert,
    color: '#facc15',
    status: 'LOCKED',
    corruption: 0.99,
    tag: "CORE-VIRUS",
    node: "ALPHA-SITE",
    security_clearance: "LEVEL_5",
    content: "PROTOCOLO DE EMERGENCIA: Archivo secuestrado por la Unidad Warden Alpha. Peligro de mutación.",
    recipe: {
      base: "Bourbon (Woodford Reserve) ahumado con madera de roble",
      modifiers: ["Reducción de vino tinto (Cabernet)", "Amaro Lucano (toque herbal)"],
      additives: ["Virutas de roble quemado (infusión)", "Spray de angostura"],
      flavour_profile: "Metálico / Intenso / Terminal",
      glassware: "Cáliz de acero oxidado",
      method: "Flameado con madera de enebro en mesa"
    }
  },
  { 
    id: 'omega-06', 
    title: 'OMEGA_POINT', 
    size: 'normal', 
    icon: Zap,
    color: '#ffffff',
    status: 'STABLE',
    corruption: 0.20,
    tag: "ARK-LOAD",
    node: "LAUNCH-DOME",
    security_clearance: "LEVEL_1",
    content: "Carga final del sistema. Un cóctel diseñado para la fase de digitalización hacia el ARCA.",
    recipe: {
      base: "Sake Junmai Daiginjo (Dassai 23)",
      modifiers: ["Licor de flor de saúco (St‑Germain)", "Champagne Brut Nature"],
      additives: ["Polvo de oro comestible", "Nebulizador de limoncello"],
      flavour_profile: "Floral / Efervescente / Etéreo",
      glassware: "Flauta de cristal minimalista",
      method: "Construcción en capas en copa fría"
    }
  },
  { 
    id: 'curie-07', 
    title: 'MS_CURIE_FUEL', 
    size: 'normal', 
    icon: Radio,
    color: '#84cc16',
    status: 'LEAKING',
    corruption: 0.55,
    tag: "NUCLEAR",
    node: "MS-CURIE",
    security_clearance: "LEVEL_3",
    content: "Combustible extraído del reactor del MS Curie. Alta radiación de sabor cítrico.",
    recipe: {
      base: "Ron blanco overproof (Wray & Nephew)",
      modifiers: ["Oleo saccharum de pomelo", "Falernum (licor de especias)"],
      additives: ["Amargos de naranja fluorescentes (con riboflavina)", "Ralladura de lima flambeada"],
      flavour_profile: "Nuclear / Cítrico / Potente",
      glassware: "Taza de cerámica amarilla (símbolo radiactivo)",
      method: "Swizzle con hielo picado"
    }
  },
  {
    id: 'exp-01',
    title: 'VOID_COCKTAIL',
    tag: 'CLASSIFIED',
    node: 'STATION_PHI',
    color: '#a855f7',
    content: 'Mezcla experimental hallada en laboratorios de aguas profundas. Inestable.',
    corruption: 0.1,
    status: 'STABLE',
    security_clearance: 'LEVEL_5',
    icon: Biohazard,
    isArchiveOnly: true,
    recipe: {
      base: "Shōchū infusionado con moras (Iichiko)",
      modifiers: ["Agua abisal (solución salina 2%)", "Té de butterfly pea (efecto bioluminiscente)"],
      additives: ["Reducción de saúco (WAU Serum)", "Hielo de carbón activado"],
      flavour_profile: "Vacío / Ácido / Salino",
      glassware: "Copa esférica flotante",
      method: "Mezclado en cámara de presión (isi whipper)"
    }
  },
  {
    id: 'exp-02',
    title: 'UPSILON_DRAFT',
    tag: 'LEGACY',
    node: 'STATION_UPSILON',
    color: '#d97706',
    content: 'Ración estándar para trabajadores. Contiene sedantes leves y nutrientes esenciales.',
    corruption: 0.85,
    status: 'DATA_LOSS',
    security_clearance: 'LEVEL_4',
    icon: Droplets,
    isArchiveOnly: true,
    recipe: {
      base: "Alcohol neutro de grano (Everclear diluido)",
      modifiers: ["Candy popping (sabor fresa)", "Té rooibos (agua oxidada)"],
      additives: ["Jarabe de nutrientes A‑12 (multivitamínico)"],
      flavour_profile: "Industrial / Dulce / Terroso",
      glassware: "Taza de hojalata estándar",
      method: "Filtrar dos veces antes de consumir"
    }
  },

  // ========== NUEVOS TRAGOS DULCES (con Baileys y licores) ==========
  {
    id: 'sweet-01',
    title: 'NEURAL_CREAM',
    size: 'normal',
    icon: Coffee,
    color: '#8b5a2b',
    status: 'OPTIMAL',
    corruption: 0.08,
    tag: 'SYNAPTIC',
    node: 'THETA-LAB',
    security_clearance: 'LEVEL_2',
    content: 'Crema neural estabilizada con cafeína sintética. Flujo de datos potenciado por lípidos modificados.',
    recipe: {
      base: "Baileys Original Irish Cream",
      modifiers: ["Kahlúa (licor de café)", "Jarabe de avellana (Monin)"],
      additives: ["Espresso frío (doble)", "Crema batida nitrogenada"],
      flavour_profile: "Cremoso / Café / Avellana",
      glassware: "Vaso de tubo (Collins) con base magnética",
      method: "Verter sobre hielo, finalizar con crema batida y polvo de cacao"
    }
  },
  {
    id: 'sweet-02',
    title: 'CHOCOLATE_SOMA',
    size: 'normal',
    icon: Droplet,
    color: '#5d3a1a',
    status: 'STABLE',
    corruption: 0.15,
    tag: 'BIO-REPAIR',
    node: 'STORAGE-C',
    security_clearance: 'LEVEL_1',
    content: 'Matriz de chocolate termoestable. Utilizada para reparar conexiones neuronales dañadas.',
    recipe: {
      base: "Baileys Chocolate Luxe",
      modifiers: ["Crème de Cacao oscuro", "Licor de avellana (Frangelico)"],
      additives: ["Leche evaporada", "Virutas de chocolate negro (85%)"],
      flavour_profile: "Chocolate intenso / Avellana / Aterciopelado",
      glassware: "Vaso bajo (Old Fashioned) con borde de cacao",
      method: "Agitar con hielo, colar, decorar con virutas"
    }
  },
  {
    id: 'sweet-03',
    title: 'BERRY_CORE',
    size: 'normal',
    icon: Cherry,
    color: '#c44569',
    status: 'OPTIMAL',
    corruption: 0.10,
    tag: 'CORE-VIRUS',
    node: 'ALPHA-CORE',
    security_clearance: 'LEVEL_3',
    content: 'Núcleo de bayas sintéticas. Alta concentración de antioxidantes y trazas de sedantes.',
    recipe: {
      base: "Baileys Strawberries & Cream",
      modifiers: ["Puré de frambuesa", "Licor de mora (Crème de Mûre)"],
      additives: ["Jugo de limón fresco", "Clara de huevo pasteurizada (espuma)"],
      flavour_profile: "Frutos rojos / Cremoso / Cítrico suave",
      glassware: "Copa de balón (Balloon glass)",
      method: "Agitado en seco, luego con hielo, colado doble"
    }
  },
  {
    id: 'sweet-04',
    title: 'VANILLA_PROTOCOL',
    size: 'normal',
    icon: Ghost,
    color: '#f3e5ab',
    status: 'CONNECTED',
    corruption: 0.05,
    tag: 'ARK-LOAD',
    node: 'LAUNCH-DOME',
    security_clearance: 'LEVEL_1',
    content: 'Protocolo de vainilla para la digitalización de recuerdos. Sabor evocado de la infancia.',
    recipe: {
      base: "Baileys Vanilla Cinnamon",
      modifiers: ["Licor de vainilla (Giffard)", "Ron blanco especiado"],
      additives: ["Leche de almendras", "Canela en rama (garnish)"],
      flavour_profile: "Vainilla / Especiado / Suave",
      glassware: "Taza de laboratorio (beaker) con asa",
      method: "Construcción directa en vaso con hielo, remover"
    }
  },

  // ========== AMARGOS ==========
  {
    id: 'bitter-01',
    title: 'AMARO_ABYSS',
    size: 'normal',
    icon: Skull,
    color: '#2c3e50',
    status: 'STABLE',
    corruption: 0.40,
    tag: 'DEEP-SEA',
    node: 'PHI-CORE',
    security_clearance: 'LEVEL_3',
    content: 'Extracto de hierbas abisales. Su amargor imita la presión de las fosas oceánicas.',
    recipe: {
      base: "Amaro Montenegro",
      modifiers: ["Fernet Branca", "Campari"],
      additives: ["Jarabe de jengibre", "Naranja amarga (corteza)"],
      flavour_profile: "Herbal / Amargo / Complejo",
      glassware: "Vaso rústico de roca",
      method: "Refrigerar con hielo grande, twist de naranja"
    }
  },
  {
    id: 'bitter-02',
    title: 'WAU_BITTER',
    size: 'normal',
    icon: Biohazard,
    color: '#4a2511',
    status: 'CRITICAL',
    corruption: 0.75,
    tag: 'HAZARD-L5',
    node: 'ALPHA-SITE',
    security_clearance: 'LEVEL_5',
    content: 'Cóctel de advertencia: activa protocolos de defensa. No recomendado para humanos sin modificar.',
    recipe: {
      base: "Averna (amaro siciliano)",
      modifiers: ["Cynar (alcachofa)", "Bitters de angostura (sobredosis)"],
      additives: ["Humo de madera de mezquite", "Sal ahumada (escamas)"],
      flavour_profile: "Amargo extremo / Ahumado / Herbal",
      glassware: "Cráneo de vidrio (edición limitada)",
      method: "Enfriado en barril de roble mini, servir con piedra de hielo ahumado"
    }
  },

  // ========== SIN ALCOHOL ==========
  {
    id: 'zero-01',
    title: 'ZERO_POINT',
    size: 'normal',
    icon: GlassWater,
    color: '#b0e0e6',
    status: 'OPTIMAL',
    corruption: 0.0,
    tag: 'CLASSIFIED',
    node: 'STATION_PHI',
    security_clearance: 'LEVEL_1',
    content: 'Punto cero de conciencia. Bebida no alcohólica utilizada en sesiones de calibración neuronal.',
    recipe: {
      base: "Té de rooibos (fermentado frío)",
      modifiers: ["Jugo de pomelo rosado", "Jarabe de maracuyá"],
      additives: ["Agua tónica sin azúcar", "Albahaca fresca"],
      flavour_profile: "Cítrico / Refrescante / Floral",
      glassware: "Copa de tubo alta",
      method: "Construir en vaso con hielo, decorar con rodaja de pomelo"
    }
  },
  {
    id: 'zero-02',
    title: 'HYDRATION_MATRIX',
    size: 'normal',
    icon: Leaf,
    color: '#88b04b',
    status: 'CONNECTED',
    corruption: 0.02,
    tag: 'BIO-REPAIR',
    node: 'UPSILON-01',
    security_clearance: 'LEVEL_1',
    content: 'Matriz de hidratación con electrolitos sintéticos. Mantiene estables las conexiones sinápticas.',
    recipe: {
      base: "Agua de coco (joven)",
      modifiers: ["Puré de pepino", "Jugo de lima"],
      additives: ["Aloe vera (trozos)", "Menta y hierbabuena (maceradas)"],
      flavour_profile: "Fresco / Vegetal / Hidratante",
      glassware: "Matraz Erlenmeyer 500ml",
      method: "Agitar suavemente con hielo, servir sin colar"
    }
  }
];