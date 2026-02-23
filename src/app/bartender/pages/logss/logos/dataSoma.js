// dataSoma.js
import { 
  Activity, Droplet, Zap, Waves, FlaskConical, 
  ShieldAlert, Thermometer, Radio, Eye, Boxes,
  Biohazard, Beaker, Wine, Droplets, Terminal, Lock
} from 'lucide-react';

export const SOMA_APPS = [
  { 
    id: 'gel-01', 
    title: 'STRUCTURAL_GEL', 
    size: 'large',
    icon: Droplet,
    color: '#76b5b5', // Teal estándar SOMA
    status: 'OPTIMAL',
    corruption: 0.12,
    tag: "BIO-REPAIR",
    node: "UPSILON-01",
    security_clearance: "LEVEL_1",
    content: "Sustancia fundamental para la preservación de la vida artificial. Viscosidad optimizada para integración orgánica. Registrando trazas de carbón activado en el flujo principal.",
    recipe: {
      base: "Mezcal Espadín (Black Carbon Infusion)",
      modifiers: ["Blueberry Shrub", "Licor de Violetas", "Lime Juice (Clarified)"],
      additives: ["Activated Carbon", "Gum Arabic (Texture agent)"],
      flavour_profile: "Smoky / Bio-Synthetic / Floral",
      glassware: "Industrial Beaker 250ml",
      method: "Nitro-shaken for velvet mouthfeel"
    }
  },
  { 
    id: 'upsilon-02', 
    title: 'UPSILON_DRAIN', 
    size: 'normal', 
    icon: FlaskConical,
    color: '#ff4444', // Rojo alerta
    status: 'CRITICAL',
    corruption: 0.88,
    tag: "HAZARD-L5",
    node: "STORAGE-B",
    security_clearance: "LEVEL_4",
    content: "AVISO: Fuga de refrigerante criogénico detectada. Los niveles de absenta superan los protocolos de estabilidad neuronal.",
    recipe: {
      base: "Absinthe 60% (La Fée)",
      modifiers: ["Wild Herbal Bitter", "Glacial Tonic Water"],
      additives: ["Dry Ice Fog", "Eucalyptus Essence"],
      flavour_profile: "Medicinal / Cryogenic / Sharp",
      glassware: "Borosilicate Test Tube",
      method: "Direct pour over dry ice sub-base"
    }
  },
  { 
    id: 'neural-03', 
    title: 'NEURAL_LINK', 
    size: 'normal', 
    icon: Activity,
    color: '#00ff00', // Verde sináptico
    status: 'CONNECTED',
    corruption: 0.35,
    tag: "SYNAPTIC",
    node: "THETA-COMM",
    security_clearance: "LEVEL_2",
    content: "Estableciendo conexión sináptica. El perfil botánico de la ginebra actúa como catalizador para la transferencia de datos.",
    recipe: {
      base: "London Dry Gin (Electrolytic)",
      modifiers: ["Basil-infused Dry Vermouth"],
      additives: ["Citrus Spherification", "Olive Oil Drops"],
      flavour_profile: "Electric / Dry / Botanical",
      glassware: "Nick & Nora (Low Profile)",
      method: "Stirred with surgical precision"
    }
  },
  { 
    id: 'abyssal-04', 
    title: 'ABYSSAL_TRACE', 
    size: 'normal', 
    icon: Waves,
    color: '#1e3a8a', // Azul profundo
    status: 'STABLE',
    corruption: 0.05,
    tag: "DEEP-SEA",
    node: "PHI-CORE",
    security_clearance: "LEVEL_3",
    content: "Sedimentos recolectados a 4000m. Sabor umami puro extraído de algas bioluminiscentes.",
    recipe: {
      base: "Kombu-infused Vodka",
      modifiers: ["Filtered Sea Water", "Yellow Tomato Cordial"],
      additives: ["Hydrolyzed Oyster Dust", "Squid Ink Coral"],
      flavour_profile: "Brine / Umami / Oceanic",
      glassware: "Blown Glass (Irregular Texture)",
      method: "Cold gravity filtration"
    }
  },
  { 
    id: 'wau-05', 
    title: 'WAU_OVERRIDE', 
    size: 'large', 
    icon: ShieldAlert,
    color: '#facc15', // Amarillo advertencia
    status: 'LOCKED',
    corruption: 0.99,
    tag: "CORE-VIRUS",
    node: "ALPHA-SITE",
    security_clearance: "LEVEL_5",
    content: "PROTOCOLO DE EMERGENCIA: Archivo secuestrado por la Unidad Warden Alpha. Peligro de mutación.",
    recipe: {
      base: "Bourbon (Oak-Smoked)",
      modifiers: ["Cabernet Wine Reduction", "Iron-Infused Syrup"],
      additives: ["Magnesium Flame", "Burnt Oak Chips"],
      flavour_profile: "Metallic / Intense / Terminal",
      glassware: "Oxidized Steel Chalice",
      method: "Flash-smoked at table side"
    }
  },
  { 
    id: 'omega-06', 
    title: 'OMEGA_POINT', 
    size: 'normal', 
    icon: Zap,
    color: '#ffffff', // Blanco etéreo
    status: 'STABLE',
    corruption: 0.20,
    tag: "ARK-LOAD",
    node: "LAUNCH-DOME",
    security_clearance: "LEVEL_1",
    content: "Carga final del sistema. Un cóctel diseñado para la fase de digitalización hacia el ARCA.",
    recipe: {
      base: "Sake Junmai Daijinjo",
      modifiers: ["Elderflower Liqueur", "Brut Zero Champagne"],
      additives: ["Edible Gold Dust", "Lemongrass Mist"],
      flavour_profile: "Floral / Effervescent / Ethereal",
      glassware: "Minimalist Crystal Flute",
      method: "Layered build in chilled glass"
    }
  },
  { 
    id: 'curie-07', 
    title: 'MS_CURIE_FUEL', 
    size: 'normal', 
    icon: Radio,
    color: '#84cc16', // Lima radioactivo
    status: 'LEAKING',
    corruption: 0.55,
    tag: "NUCLEAR",
    node: "MS-CURIE",
    security_clearance: "LEVEL_3",
    content: "Combustible extraído del reactor del MS Curie. Alta radiación de sabor cítrico.",
    recipe: {
      base: "White Rum (Overproof)",
      modifiers: ["Grapefruit Oleo Saccharum", "Falernum"],
      additives: ["Glow-in-the-dark Bitters", "Lime Zest Sparks"],
      flavour_profile: "Nuclear / Citrus / Punchy",
      glassware: "Hazard-Yellow Ceramic Mug",
      method: "Swizzled with crushed ice"
    }
  },
  {
    id: 'exp-01',
    title: 'VOID_COCKTAIL',
    tag: 'CLASSIFIED',
    node: 'STATION_PHI',
    color: '#a855f7', // Púrpura vacío
    content: 'Mezcla experimental hallada en laboratorios de aguas profundas. Inestable.',
    corruption: 0.1,
    status: 'STABLE',
    security_clearance: 'LEVEL_5',
    icon: Biohazard,
    isArchiveOnly: true,
    recipe: {
      base: "Blackberry Infused Shōchū",
      modifiers: ["Abyssal Water (Saline)", "Bioluminescent Ink (Butterfly Pea)"],
      additives: ["WAU Serum (Elderberry reduction)"],
      flavour_profile: "Void / Tart / Salty",
      glassware: "Floating Sphere Glass",
      method: "Mixed under high pressure"
    }
  },
  {
    id: 'exp-02',
    title: 'UPSILON_DRAFT',
    tag: 'LEGACY',
    node: 'STATION_UPSILON',
    color: '#d97706', // Ámbar óxido
    content: 'Ración estándar para trabajadores. Contiene sedantes leves y nutrientes esenciales.',
    corruption: 0.85,
    status: 'DATA_LOSS',
    security_clearance: 'LEVEL_4',
    icon: Droplets,
    isArchiveOnly: true,
    recipe: {
      base: "Synthetic Ethanol (Neutral Grain Spirit)",
      modifiers: ["Glitch Particles (Popping Candy)", "Rusty Water (Rooibos Tea)"],
      additives: ["Nutrient Pack A-12"],
      flavour_profile: "Industrial / Sweet / Earthy",
      glassware: "Standard Issue Tin Cup",
      method: "Filter twice before consumption"
    }
  }   
];