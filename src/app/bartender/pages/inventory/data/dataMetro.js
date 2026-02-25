/* ============================================================
   METRO D6 - STRATEGIC DATABASE ARCHIVE (V.2033.6.0)
   ENCRYPTION: MIL-SPEC AES-256 / PROTOCOL: DARK_ONE
   ============================================================ */

export const D6_SYSTEM_CONFIG = {
  terminal_id: "D6-HB-2033-ULTRA",
  clearance_required: "LEVEL_5",
  master_key: "D6_RECIPES",
  last_sync: "2033-02-24T18:45:00Z",
  status: "CRITICAL_SYSTEM_DEGRADATION",
  warning: "RADIATION_LEAK_SECTOR_G",
  os_version: "VOS-DARK-33",
  radiation_level: "0.45 Sv/h",
  operator: "Artyom_Chyornyj"
};

export const METRO_DRINKS = {
  logistics: [
    { id: 'd1', name: "BOURBON_RESERVE", desc: "Hongo negro filtrado por mascara GP-5.", flavor: "Earthy / Chemical", toxicity: 18, alcohol: "45%", price: 5, tag: "STALKER_CHOICE", ingredients: ["Black Mushroom", "Charcoal"], metadata: { hint: "D6" } },
    { id: 'd3', name: "RED_LINE_FUEL", desc: "Mezcla de combate oficial. No apto para cardiacos.", flavor: "Metallic / Spicy", toxicity: 12, alcohol: "25%", price: 3, tag: "STIM", ingredients: ["Adrenaline", "Iron Oxides"] },
    { id: 'd10', name: "STATION_BREW", desc: "Te de musgo fermentado. Consumo civil Vdnkh.", flavor: "Bitter / Grass", toxicity: 5, alcohol: "2%", price: 1, tag: "COMMON", ingredients: ["Edible Moss"] },
    { id: 'd15', name: "RAT_LIQUOR", desc: "Destilado de emergencia. Tuneles secundarios.", flavor: "Rotten / Sharp", toxicity: 45, alcohol: "80%", price: 2, tag: "SCRAP", ingredients: ["Tail Infusion"] }
  ],
  commerce: [
    { id: 'd7', name: "HANZA_GOLD", desc: "Alcohol de grano puro. Oro liquido.", flavor: "Smooth / Wheat", toxicity: 5, alcohol: "40%", price: 35, tag: "PREMIUM", ingredients: ["Pre-war Rye"] },
    { id: 'd11', name: "MARKET_MOONSHINE", desc: "Destilado en los mercados de la linea circular.", flavor: "Burning / Fruit", toxicity: 30, alcohol: "65%", price: 8, tag: "TRADE", ingredients: ["Potato Skin", "Sugar"] },
    { id: 'd20', name: "PREWAR_VODKA", desc: "Caja fuerte sellada - Circa 2013.", flavor: "Crystal / Cold", toxicity: 0, alcohol: "40%", price: 150, tag: "ARTIFACT", ingredients: ["History"] }
  ],
  intel: [
    { id: 'd2', name: "KHAN_SPIRIT", desc: "Liquido vibrante. Visiones del plano astral.", flavor: "Aether / Ozone", toxicity: 55, alcohol: "70%", price: 12, tag: "MYSTIC", ingredients: ["Ghost Leaf"], metadata: { hint: "RECIPES" } },
    { id: 'd4', name: "ARTYOM_DREAM", desc: "Color azul cielo. Sabor a mundo antiguo.", flavor: "Sweet / Floral", toxicity: 2, alcohol: "12%", price: 25, tag: "ELITE", ingredients: ["Surface Berries"], metadata: { hint: "_" } }
  ],
  biomedical: [
    { id: 'd6', name: "RADIATION_TEA", desc: "Infusion de yodo y pino. Vital para superficie.", flavor: "Medicine / Ash", toxicity: 0, alcohol: "0%", price: 10, tag: "MEDIC", ingredients: ["Iodine", "Pine Needles"] },
    { id: 'd8', name: "D6_VELVET_EXP", desc: "Suero regeneracion celular Proyecto 704.", flavor: "Plasma / Copper", toxicity: 1, alcohol: "5%", price: 99, tag: "SECRET", ingredients: ["Bio-Agents"] },
    { id: 'd12', name: "MED_KIT_VODKA", desc: "Vodka grado medico. Uso desinfectante.", flavor: "Pure Alcohol", toxicity: 10, alcohol: "90%", price: 15, tag: "MEDIC", ingredients: ["Ethanol"] }
  ]
};

export const METRO_FOLDERS = [
  // --- LOGISTICS ---
  { id: 'f1', title: "Archive_Bourbon", type: "DOC", category: 'LOGISTICS', contentKey: 'logistics', isLocked: false, stickyNote: "[!] HINT: 'D6 es el inicio...'\n   /\\ \n  |  |", dateArchived: "2033-05-12", fileSize: "1.2MB", securityLevel: "UNRESTRICTED", sector: "STATION_MARKET" },
  { id: 'f21', title: "Stock_Inventory_V3", type: "DATA", category: 'LOGISTICS', contentKey: 'logistics', isLocked: false, stickyNote: "[-] Faltan 40 mascaras\nSector B\n_|_", dateArchived: "2033-06-05", fileSize: "890KB", securityLevel: "COMMON", sector: "STORAGE_B" },
  { id: 'f23', title: "Fuel_Ration_Q4", type: "DATA", category: 'LOGISTICS', contentKey: 'logistics', isLocked: false, stickyNote: "/!\\ FUGAS REPORTADAS\n   (X)\n   / \\", dateArchived: "2033-06-10", fileSize: "450KB", securityLevel: "HAZMAT", sector: "FUEL_DEPOT" },
  { id: 'f1_o', title: "Archive_Bourbon_M1", type: "DOC", category: 'LOGISTICS', contentKey: 'logistics', isLocked: false, stickyNote: "[!] MEMORY_FRAG: 01\n'D6_...' es el inicio\n   /--\\\n  | oo |", dateArchived: "2033-05-12", fileSize: "1.2MB", securityLevel: "UNRESTRICTED", sector: "STATION_MARKET" },
  { id: 'f21_a', title: "Stock_Inventory_V3_EXT", type: "DATA", category: 'LOGISTICS', contentKey: 'logistics', isLocked: false, stickyNote: "[-] Mascaras: 0\nFiltros: 2\n_|_", dateArchived: "2033-06-05", fileSize: "890KB", securityLevel: "COMMON", sector: "STORAGE_B" },
  { id: 'f60', title: "Great_Worm_Cult", type: "DOC", category: 'LOGISTICS', contentKey: 'logistics', isLocked: true, stickyNote: "[#] Cuidado abajo\n  ~~~~~~\n (  o  o )", dateArchived: "2033-06-15", fileSize: "4.2MB", securityLevel: "STALKER", sector: "TUNNEL_DEEP" },

  // --- COMMERCE ---
  { id: 'f2', title: "Hanza_Manifest", type: "DATA", category: 'COMMERCE', contentKey: 'commerce', isLocked: false, stickyNote: "[#] HINT: 'Guion (_) en lo azul'\n  [ ]", dateArchived: "2033-06-20", fileSize: "8.4MB", securityLevel: "TRADE", sector: "HANZA_CIRCLE" },
  { id: 'f22', title: "Black_Market_List", type: "DOC", category: 'COMMERCE', contentKey: 'commerce', isLocked: true, stickyNote: "[$] No prestar a Miller\n  <O>", dateArchived: "2033-06-22", fileSize: "1.5MB", securityLevel: "RESTRICTED", sector: "KUZNETSKY_MOST" },
  { id: 'f27', title: "Polis_Luxury_Imports", type: "DOC", category: 'COMMERCE', contentKey: 'commerce', isLocked: true, stickyNote: "{?} Caviar pedido\n  _u_", dateArchived: "2033-06-28", fileSize: "5.1MB", securityLevel: "ELITE", sector: "POLIS_CORE" },
  { id: 'f2_y', title: "Hanza_Manifest_M2", type: "DATA", category: 'COMMERCE', contentKey: 'commerce', isLocked: false, stickyNote: "[#] MEMORY_FRAG: 02\n'...RECIP...' central\n  [ $ ]", dateArchived: "2033-06-20", fileSize: "8.4MB", securityLevel: "TRADE", sector: "HANZA_CIRCLE" },
  { id: 'f22_b', title: "Black_Market_List_B", type: "DOC", category: 'COMMERCE', contentKey: 'commerce', isLocked: true, stickyNote: "[$] Miller debe 500\n  <O>", dateArchived: "2033-06-22", fileSize: "1.5MB", securityLevel: "RESTRICTED", sector: "KUZNETSKY_MOST" },
  { id: 'f61', title: "Nazi_Trade_Embargo", type: "DATA", category: 'COMMERCE', contentKey: 'commerce', isLocked: true, stickyNote: " /--\\\n| SS |\n \\--/", dateArchived: "2033-07-02", fileSize: "12.1MB", securityLevel: "HAZMAT", sector: "FOURTH_REICH" },

  // --- INTEL ---
  { id: 'f4', title: "Stalker_Botany_Log", type: "MAP", category: 'INTEL', contentKey: 'intel', isLocked: false, stickyNote: "[*] PISTA: 'Final: RECIPES'\n  _@_", dateArchived: "2033-01-15", fileSize: "15.7MB", securityLevel: "STALKER", sector: "SURFACE_WILD" },
  { id: 'f17', title: "Dark_One_Sightings", type: "MAP", category: 'INTEL', contentKey: 'intel', isLocked: true, stickyNote: "( ( O ) )\nTunel 4\nAVISTAMIENTO", dateArchived: "2033-02-10", fileSize: "42.0MB", securityLevel: "TOP_SECRET", sector: "UNKNOWN_SECTOR" },
  { id: 'f19', title: "Library_Floor_Plans", type: "MAP", category: 'INTEL', contentKey: 'intel', isLocked: true, stickyNote: "[&] Bibliotecarios\n   /vvv\\\n  (|X X|)", dateArchived: "2033-02-15", fileSize: "12.4MB", securityLevel: "RESTRICTED", sector: "LENIN_LIBRARY" },
  { id: 'f4_y', title: "Stalker_Botany_Log_M3", type: "MAP", category: 'INTEL', contentKey: 'intel', isLocked: false, stickyNote: "[*] MEMORY_FRAG: 03\n'...ES' es el fin\n  _@_", dateArchived: "2033-01-15", fileSize: "15.7MB", securityLevel: "STALKER", sector: "SURFACE_WILD" },
  { id: 'f17_c', title: "Dark_One_Sightings_EXT", type: "MAP", category: 'INTEL', contentKey: 'intel', isLocked: true, stickyNote: "( ( O ) )\nEllos miran\nS_E_N_S_O_R", dateArchived: "2033-02-10", fileSize: "42.0MB", securityLevel: "TOP_SECRET", sector: "UNKNOWN_SECTOR" },
  { id: 'f63', title: "Invis_Watchers_Log", type: "DATA", category: 'INTEL', contentKey: 'intel', isLocked: true, stickyNote: "[?] QUIEN MIRA?\n  =====\n  --0--", dateArchived: "2033-03-22", fileSize: "?? GB", securityLevel: "COSMIC", sector: "GOVERNMENT_BUNKER" },

  // --- BIOMEDICAL ---
  { id: 'f31', title: "Project_Golgotha", type: "DATA", category: 'BIOMEDICAL', contentKey: 'biomedical', isLocked: true, stickyNote: " <☣> ALFA PROTOCOL\n  - - - \n  NO TOCAR", dateArchived: "2013-09-30", fileSize: "2.1GB", securityLevel: "CLASSIFIED", sector: "D6_LAB_B" },
  { id: 'f32', title: "Mutant_Autopsy_V12", type: "DOC", category: 'BIOMEDICAL', contentKey: 'biomedical', isLocked: true, stickyNote: "(+) Vigilante\n  --+--\n   | |", dateArchived: "2033-08-05", fileSize: "85MB", securityLevel: "OFFICIAL", sector: "D6_MEDICAL" },
  { id: 'f31_z', title: "Project_Golgotha_S6", type: "DATA", category: 'BIOMEDICAL', contentKey: 'biomedical', isLocked: true, stickyNote: "<☣> BIO-HAZARD\n  - - - \n  SECTOR_6", dateArchived: "2013-09-30", fileSize: "2.1GB", securityLevel: "CLASSIFIED", sector: "D6_LAB_B" },
  { id: 'f64', title: "Red_Line_Eugenics", type: "DOC", category: 'BIOMEDICAL', contentKey: 'biomedical', isLocked: true, stickyNote: "[!] EXP_704\n  |---| \n  | X |", dateArchived: "2033-09-10", fileSize: "450MB", securityLevel: "OVERSEER", sector: "RED_LINE_BUNKER" },

  // --- ENGINEERING ---
  { id: 'f40', title: "Reactor_Schematics_B1", type: "DATA", category: 'ENGINEERING', contentKey: 'logistics', isLocked: true, stickyNote: "[~] Agua baja\n [~~~]\n  |_|", dateArchived: "2013-05-10", fileSize: "154MB", securityLevel: "CHIEF_ENG", sector: "D6_REACTOR" },
  { id: 'f42', title: "Blast_Door_Hydraulics", type: "DATA", category: 'ENGINEERING', contentKey: 'logistics', isLocked: true, stickyNote: "[K] COD: 1-9-8-4\n  |===|", dateArchived: "2013-05-15", fileSize: "45MB", securityLevel: "TECHNICAL", sector: "D6_GATES" },

  // --- MILITARY ---
  { id: 'f5', title: "D6_Exp_Project", type: "DATA", category: 'MILITARY', contentKey: 'biomedical', isLocked: true, stickyNote: "[!] REQUERIDO:\n COD D6_ _ _\n  /_\\", dateArchived: "2013-07-06", fileSize: "998MB", securityLevel: "OVERSEER", sector: "D6_COMMAND" },
  { id: 'f13', title: "Order_Siege_Strategy", type: "DOC", category: 'MILITARY', contentKey: 'intel', isLocked: true, stickyNote: "/X\\ ESPARTA\nV. o M.\n  ---", dateArchived: "2033-10-01", fileSize: "2.1MB", securityLevel: "GENERAL", sector: "POLIS_MILITARY" },
  { id: 'f5_n', title: "D6_Exp_Project_B", type: "DATA", category: 'MILITARY', contentKey: 'biomedical', isLocked: true, stickyNote: "[!] CLAVE D6_ + \nRECIP + ES\n  /_\\", dateArchived: "2013-07-06", fileSize: "998MB", securityLevel: "OVERSEER", sector: "D6_COMMAND" },
  { id: 'f13_h', title: "Order_Siege_Strategy_EXT", type: "DOC", category: 'MILITARY', contentKey: 'intel', isLocked: true, stickyNote: "/X\\ SPARTA\n  --+--\n   | |", dateArchived: "2033-10-01", fileSize: "2.1MB", securityLevel: "GENERAL", sector: "POLIS_MILITARY" },
  { id: 'f55', title: "REDACTED_PROTOCOL", type: "DATA", category: 'MILITARY', contentKey: 'biomedical', isLocked: true, stickyNote: "(?) REDACTED\n  [XXX]\n  [XXX]", dateArchived: "2013-06-10", fileSize: "000MB", securityLevel: "COSMIC", sector: "TOP_SECRET_D6" }
];