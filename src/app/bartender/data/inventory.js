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
    metadata: { sector: 'HANSA_HUB', stability: 'STABLE', radiation: '0.00 mSv', lastCheck: '2026.02.15' },
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
    metadata: { sector: 'TAU', stability: 'STABLE', radiation: '0.02 mSv', lastCheck: '2026.02.19' },
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
    metadata: { sector: 'GRID_086', stability: 'STABLE', radiation: '0.10 mSv', lastCheck: '2026.02.18' },
    atomicSpecs: [
      { label: 'VDK', val: 'Smirn', desc: 'Smirnoff_Base', critical: false, type: 'drop' },
      { label: 'MNT', val: '12%', desc: 'Peppermint_Ext', critical: false, type: 'atom' },
      { label: 'FRZ', val: 'ICE', desc: 'Menthol_Effect', critical: false, type: 'alert' }
    ]
  }
];