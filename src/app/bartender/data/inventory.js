/* bartender/data/inventory.js */

export const INVENTORY_DATA = [
  // --- METRO SERIES (Color Sugerido: Metro Amber / Rust) ---
  { 
    id: 'metro-mush-01', 
    name: "Artyom's Reserve", 
    universe: 'metro',
    category: 'Distillate', 
    qty: 24, 
    unit: '750ml', 
    code: 'M-2033',
    flavorText: "BASE: Vodka de grano (Stolichnaya). INFUSIÓN: Champiñón deshidratado y carbón activado. NOTA: Sabor seco, terroso y altamente inflamable.",
    metadata: { sector: 'EXHIBITION', stability: 'STABLE', radiation: '0.04 mSv', lastCheck: '2026.02.21' },
    atomicSpecs: [
      { label: 'VDK', val: '40.0', desc: 'Stoli_Base', critical: false, type: 'drop' },
      { label: 'C-EXT', val: 'MED', desc: 'Carbon_Filter', critical: false, type: 'atom' },
      { label: 'POT', val: 'HIGH', desc: 'Combustion', critical: true, type: 'zap' }
    ]
  },
  { 
    id: 'metro-sweet-01', 
    name: "Hansa Cream", 
    universe: 'metro',
    category: 'Sweetener', 
    qty: 12, 
    unit: '500ml', 
    code: 'H-CRM',
    flavorText: "BASE: Baileys Irish Cream. MOD: Licor de avellana (Frangelico) y café de malta frío. NOTA: Dulce, denso, oculta el sabor del agua reciclada.",
    metadata: { sector: 'HANSA_HUB', stability: 'CRITICAL', radiation: '0.00 mSv', lastCheck: '2026.02.15' },
    atomicSpecs: [
      { label: 'BLY', val: '60%', desc: 'Baileys_Base', critical: false, type: 'drop' },
      { label: 'HAZ', val: '20%', desc: 'Frangelico_Mod', critical: false, type: 'drop' },
      { label: 'GLU', val: 'HIGH', desc: 'Glucose_Level', critical: false, type: 'atom' }
    ]
  },
  { 
    id: 'metro-fire-02', 
    name: "Red Line Fuel", 
    universe: 'metro',
    category: 'Modifier', 
    qty: 15, 
    unit: '500ml', 
    code: 'RL-FIRE',
    flavorText: "BASE: Vodka 60° (Absolut 100). MOD: Sirope de chile habanero y pimienta negra. NOTA: Un golpe de calor brutal para patrullas en superficie.",
    metadata: { sector: 'KUZNETSKY', stability: 'CRITICAL', radiation: '0.45 mSv', lastCheck: '2026.02.20' },
    atomicSpecs: [
      { label: 'VDK', val: '60.0', desc: 'Absolut_100', critical: true, type: 'drop' },
      { label: 'CAP', val: '9.5', desc: 'Capsaicin_Ext', critical: true, type: 'atom' },
      { label: 'FLM', val: 'MAX', desc: 'Ignition_Risk', critical: true, type: 'zap' }
    ]
  },

  // --- SOMA (Color Sugerido: WAU Blue / Cyan) ---
  { 
    id: 'soma-gel-01', 
    name: "Structure Gel (Blue)", 
    universe: 'soma',
    category: 'Distillate', 
    qty: 9, 
    unit: '700ml', 
    code: 'WAU-B',
    flavorText: "BASE: Bombay Sapphire Gin. MOD: Tónica, Blue Curaçao y un toque de licor de violetas. NOTA: Fluorescente bajo luz UV, sabor floral y eléctrico.",
    metadata: { sector: 'PATHOS-II', stability: 'DEGRADING', radiation: '0.00 mSv', lastCheck: '2026.02.21' },
    atomicSpecs: [
      { label: 'GIN', val: '47.0', desc: 'Bombay_Sapphire', critical: false, type: 'drop' },
      { label: 'BLU', val: '15.0', desc: 'Curacao_Agent', critical: false, type: 'atom' },
      { label: 'WAU', val: 'POS', desc: 'Neural_Link', critical: true, type: 'alert' }
    ]
  },
  { 
    id: 'soma-sweet-01', 
    name: "Lambda Velvet", 
    universe: 'soma',
    category: 'Additive', 
    qty: 6, 
    unit: '500ml', 
    code: 'L-VLT',
    flavorText: "BASE: Ron Captain Morgan Black. MOD: Baileys, licor de cacao oscuro y crema de coco. NOTA: Textura aceitosa que recuerda a los fluidos de la estación.",
    metadata: { sector: 'LAMBDA', stability: 'STABLE', radiation: '0.01 mSv', lastCheck: '2026.02.18' },
    atomicSpecs: [
      { label: 'RUM', val: '40%', desc: 'Morgan_Black', critical: false, type: 'drop' },
      { label: 'BLY', val: '30%', desc: 'Baileys_Ratio', critical: false, type: 'drop' },
      { label: 'VIS', val: 'HIGH', desc: 'Density_Index', critical: false, type: 'alert' }
    ]
  },
  { 
    id: 'soma-abyss-02', 
    name: "Abyssal Brine", 
    universe: 'soma',
    category: 'Diluent', 
    qty: 40, 
    unit: '1000ml', 
    code: 'TAU-9',
    flavorText: "BASE: Hendrick's Gin (infusión pepino). MOD: Agua tónica salina y esencia de eucalipto. NOTA: Frío extremo, deja un rastro metálico en el paladar.",
    metadata: { sector: 'TAU', stability: 'CRITICAL', radiation: '0.02 mSv', lastCheck: '2026.02.19' },
    atomicSpecs: [
      { label: 'GIN', val: ' Hendrick', desc: 'Hendricks_Base', critical: false, type: 'drop' },
      { label: 'EUC', val: '0.05', desc: 'Eucalyptus_Oil', critical: false, type: 'atom' }
    ]
  },

  // --- ARMORED CORE (Color Sugerido: Coral Red / Energy) ---
  { 
    id: 'ac-coral-01', 
    name: "Coral Nectar", 
    universe: 'ac',
    category: 'Distillate', 
    qty: 5, 
    unit: '200ml', 
    code: 'C4-621',
    flavorText: "BASE: Absenta Hapsburg (89.9°). MOD: Licor de granada y amargo de angostura. NOTA: Rojo intenso, induce estados de conciencia aumentada.",
    metadata: { sector: 'RUBICON', stability: 'VOLATILE', radiation: '12.4 mSv', lastCheck: '2026.02.21' },
    atomicSpecs: [
      { label: 'ABS', val: '89.9', desc: 'Hapsburg_Base', critical: true, type: 'skull' },
      { label: 'CRL', val: 'PURE', desc: 'Coral_Extract', critical: true, type: 'zap' },
      { label: 'SFT', val: 'ZERO', desc: 'Human_Tolerance', critical: true, type: 'alert' }
    ]
  },
  { 
    id: 'ac-sweet-01', 
    name: "Raven's Comfort", 
    universe: 'ac',
    category: 'Distillate', 
    qty: 14, 
    unit: '750ml', 
    code: 'R-CMF',
    flavorText: "BASE: Bourbon (Jim Beam). MOD: Kahlúa, Baileys y doble shot de espresso frío. NOTA: El desayuno de los mercenarios antes del despliegue.",
    metadata: { sector: 'BALAM_LOG', stability: 'STABLE', radiation: '0.00 mSv', lastCheck: '2026.02.20' },
    atomicSpecs: [
      { label: 'BRB', val: '45%', desc: 'Jim_Beam_Base', critical: false, type: 'drop' },
      { label: 'KHL', val: '25%', desc: 'Kahlua_Mix', critical: false, type: 'drop' },
      { label: 'CAF', val: 'MAX', desc: 'Caffeine_Hit', critical: true, type: 'zap' }
    ]
  },
  { 
    id: 'ac-mech-01', 
    name: "Balam Coolant", 
    universe: 'ac',
    category: 'Modifier', 
    qty: 62, 
    unit: '1500ml', 
    code: 'IND-B',
    flavorText: "BASE: Vodka Smirnoff. MOD: Blue Curaçao, licor de menta blanca y tónica. NOTA: Sabor a mentol industrial, excelente digestivo post-combate.",
    metadata: { sector: 'GRID_086', stability: 'CRITICAL', radiation: '0.10 mSv', lastCheck: '2026.02.18' },
    atomicSpecs: [
      { label: 'VDK', val: 'Smirn', desc: 'Smirnoff_Base', critical: false, type: 'drop' },
      { label: 'MNT', val: '12%', desc: 'Peppermint_Ext', critical: false, type: 'atom' },
      { label: 'FRZ', val: 'ICE', desc: 'Menthol_Effect', critical: false, type: 'alert' }
    ]
  }

/* bartender/data/inventory.js */

  // --- EXPANSIÓN METRO SERIES ---
,{ 
    id: 'metro-bitter-01', 
    name: "Library Dust", 
    universe: 'metro',
    category: 'Bitter', 
    qty: 18, 
    unit: '750ml', 
    code: 'LIB-D',
    flavorText: "BASE: Campari e infusión de té negro ahumado. MOD: Vermut rojo casero y esencia de papel viejo. NOTA: Amargura profunda, como el conocimiento perdido en la Gran Biblioteca.",
    metadata: { sector: 'POLIS', stability: 'DEGRADING', radiation: '0.01 mSv', lastCheck: '2026.02.21' },
    atomicSpecs: [
      { label: 'CMP', val: '35%', desc: 'Campari_Base', critical: false, type: 'drop' },
      { label: 'SMK', val: 'HIGH', desc: 'Smoked_Tea', critical: false, type: 'atom' },
      { label: 'TAN', val: 'MED', desc: 'Tannin_Level', critical: false, type: 'drop' }
    ]
  },
  { 
    id: 'metro-ghost-01', 
    name: "Dark One's Kiss", 
    universe: 'metro',
    category: 'Ghost', 
    qty: 7, 
    unit: '500ml', 
    code: 'D1-KSS',
    flavorText: "BASE: Everclear (95%) rectificado. MOD: Sirope de flor de saúco y jugo de lichi aclarado. NOTA: El alcohol es imperceptible. Induce alucinaciones auditivas de voces infantiles.",
    metadata: { sector: 'DEAD_CITY', stability: 'UNSTABLE', radiation: '0.88 mSv', lastCheck: '2026.02.21' },
    atomicSpecs: [
      { label: 'ALC', val: '95.0', desc: 'Pure_Ethanol', critical: true, type: 'skull' },
      { label: 'MSK', val: 'MAX', desc: 'Flavor_Masking', critical: false, type: 'atom' },
      { label: 'PSY', val: 'POS', desc: 'Neural_Effect', critical: true, type: 'zap' }
    ]
  },

  // --- EXPANSIÓN SOMA ---
  { 
    id: 'soma-cream-01', 
    name: "Cortex Slurry", 
    universe: 'soma',
    category: 'Creamy', 
    qty: 11, 
    unit: '600ml', 
    code: 'THETA-C',
    flavorText: "BASE: Licor de Amarula y Baileys. MOD: Puré de taro (malanga) púrpura y polvo de galleta Oreo. NOTA: Extremadamente denso y dulce. Parece un nutriente biotecnológico.",
    metadata: { sector: 'THETA', stability: 'STABLE', radiation: '0.00 mSv', lastCheck: '2026.02.20' },
    atomicSpecs: [
      { label: 'AMR', val: '50%', desc: 'Amarula_Base', critical: false, type: 'drop' },
      { label: 'LPD', val: 'HIGH', desc: 'Lipid_Content', critical: false, type: 'atom' },
      { label: 'SUG', val: '45g', desc: 'Glucose_Batch', critical: false, type: 'drop' }
    ]
  },
  { 
    id: 'soma-bitter-01', 
    name: "Upsilon Brine", 
    universe: 'soma',
    category: 'Bitter', 
    qty: 22, 
    unit: '750ml', 
    code: 'UPS-B',
    flavorText: "BASE: Mezcal (sabor ahumado industrial). MOD: Fernet Branca y esencia de algas marinas. NOTA: Amargo, salino y aceitoso. Sabe a la maquinaria oxidada bajo el mar.",
    metadata: { sector: 'UPSILON', stability: 'DEGRADING', radiation: '0.02 mSv', lastCheck: '2026.02.17' },
    atomicSpecs: [
      { label: 'MZC', val: '42.0', desc: 'Mezcal_Base', critical: false, type: 'drop' },
      { label: 'FRN', val: '30.0', desc: 'Fernet_Branca', critical: false, type: 'drop' },
      { label: 'SLT', val: 'HIGH', desc: 'Sodium_Level', critical: false, type: 'atom' }
    ]
  },

  // --- EXPANSIÓN ARMORED CORE ---
  { 
    id: 'ac-strong-01', 
    name: "Assault Armor", 
    universe: 'ac',
    category: 'Overdrive', 
    qty: 4, 
    unit: '250ml', 
    code: 'V.IV-R',
    flavorText: "BASE: Tequila Sierra Spiced. MOD: Licor de canela (Fireball) y Red Bull concentrado. NOTA: Diseñado para detener paros cardíacos en pilotos de la escala Vesper.",
    metadata: { sector: 'ARQUEBUS', stability: 'VOLATILE', radiation: '2.40 mSv', lastCheck: '2026.02.21' },
    atomicSpecs: [
      { label: 'TQL', val: '50.0', desc: 'Sierra_Base', critical: false, type: 'drop' },
      { label: 'CIN', val: 'MAX', desc: 'Cinnamon_Heat', critical: true, type: 'zap' },
      { label: 'ADR', val: 'POS', desc: 'Adrenaline_Sync', critical: true, type: 'zap' }
    ]
  },
  { 
    id: 'ac-ghost-01', 
    name: "Ayre's Whisper", 
    universe: 'ac',
    category: 'Ghost', 
    qty: 9, 
    unit: '400ml', 
    code: 'SOL-644',
    flavorText: "BASE: Sake ultra-premium (Dassai 23). MOD: Sirope de pera blanca y aire de rosas. NOTA: Tan ligero como el vacío espacial. Te emborracha antes de que termines de sentir el sabor.",
    metadata: { sector: 'INSTITUTE', stability: 'DEGRADING', radiation: '0.00 mSv', lastCheck: '2026.02.19' },
    atomicSpecs: [
      { label: 'SAK', val: '16.0', desc: 'Sake_Premium', critical: false, type: 'drop' },
      { label: 'AIR', val: 'MAX', desc: 'Aeration_Level', critical: false, type: 'atom' },
      { label: 'ETH', val: 'LOW', desc: 'Ethanol_Sense', critical: false, type: 'alert' }
    ]
  }
];