// src/app/analyst/data/corporateData.js

export const CORPORATE_DATA = [
  {
    id: 'arasaka-001',
    name: 'ARASAKA',
    symbol: 'ARK',
    fullName: 'Arasaka Corporation',
    color: '#dc2626',
    sector: 'Security / Cyberwarfare',
    description: 'Global leader in corporate security and paramilitary services.',
    marketCap: 842.9,
    marketShare: 32.4, // Nueva métrica
    change: 2.4,
    peRatio: 18.5,
    dividend: 0.8,
    trend: 'up',
    status: 'allied', 
    systemStatus: 'stable',
    riskLevel: 'LOW', // Nivel de riesgo para el analista
    networkIntegrity: 98, // Para el HUD de Kiroshi
    meta: {
      headquarters: 'Tokyo, Japan',
      founded: 1915,
      employees: 135000,
      ceo: 'Saburo Arasaka (Deceased/Relic)'
    }
  },
  {
    id: 'militech-002',
    name: 'MILITECH',
    symbol: 'MLT',
    fullName: 'Militech International',
    color: '#2563eb',
    sector: 'Arms / Private Military',
    description: 'Leading arms manufacturer with heavy NUSA government ties.',
    marketCap: 678.3,
    marketShare: 28.1,
    change: -1.2,
    peRatio: 22.1,
    dividend: 0.4,
    trend: 'down',
    status: 'hostile',
    systemStatus: 'volatile',
    riskLevel: 'EXTREME',
    networkIntegrity: 64,
    meta: {
      headquarters: 'Washington D.C., NUSA',
      founded: 1996,
      employees: 98000,
      ceo: 'Donald Lundee'
    }
  },
  {
    id: 'nightcorp-006',
    name: 'NIGHT CORP',
    symbol: 'NTC',
    fullName: 'Night City Foundation',
    color: '#00eaff', // Cyan puro
    sector: 'Infrastructure / AI',
    description: 'Enigmatic entity controlling Night City\'s public utilities.',
    marketCap: 415.2,
    marketShare: 12.5,
    change: 0.1,
    peRatio: 45.8,
    dividend: 0.0,
    trend: 'stable',
    status: 'watched',
    systemStatus: 'stable',
    riskLevel: 'UNKNOWN',
    networkIntegrity: 100,
    meta: {
      headquarters: 'Night City, NUSA',
      founded: 1994,
      employees: 15000,
      ceo: 'Miriam Night'
    }
  },
  {
    id: 'netwatch-007',
    name: 'NETWATCH',
    symbol: 'NTW',
    fullName: 'Global Net Administration',
    color: '#ffffff', // Blanco clínico
    sector: 'Network Security / ICE',
    description: 'Guardians of the Blackwall and international net regulators.',
    marketCap: 210.5,
    marketShare: 5.2,
    change: 1.5,
    peRatio: 12.4,
    dividend: 0.0,
    trend: 'up',
    status: 'watched',
    systemStatus: 'stable',
    riskLevel: 'MEDIUM',
    networkIntegrity: 99,
    meta: {
      headquarters: 'London, UK',
      founded: 2021,
      employees: 8500,
      ceo: 'Unknown / Council'
    }
  },
  {
    id: 'kangtao-003',
    name: 'KANG TAO',
    symbol: 'KTO',
    fullName: 'Kang Tao Corporation',
    color: '#16a34a',
    sector: 'Smart Arms / Neural Tech',
    description: 'Rising star in smart weaponry and A-grade cyberware.',
    marketCap: 521.6,
    marketShare: 18.7,
    change: 5.7,
    peRatio: 35.2,
    dividend: 0.1,
    trend: 'up',
    status: 'watched',
    systemStatus: 'soaring',
    riskLevel: 'HIGH',
    networkIntegrity: 82,
    meta: {
      headquarters: 'Shanghai, China',
      founded: 2023,
      employees: 54000,
      ceo: 'Zhiming Kang'
    }
  },
  {
    id: 'biotechnica-004',
    name: 'BIOTECHNICA',
    symbol: 'BIO',
    fullName: 'Biotechnica AG',
    color: '#7e22ce',
    sector: 'Genetics / Bio-Fuel',
    description: 'Global leader in cloning and synthetic protein production.',
    marketCap: 398.2,
    marketShare: 10.4,
    change: 0.8,
    peRatio: 15.8,
    dividend: 1.2,
    trend: 'stable',
    status: 'allied',
    systemStatus: 'stable',
    riskLevel: 'LOW',
    networkIntegrity: 91,
    meta: {
      headquarters: 'Frankfurt, Germany',
      founded: 2001,
      employees: 42000,
      ceo: 'Nicolo Loggagia'
    }
  },
  {
    id: 'petrochem-005',
    name: 'PETROCHEM',
    symbol: 'PCH',
    fullName: 'Petrochem Energy',
    color: '#f97316',
    sector: 'Energy / CHOOH2',
    description: 'The world\'s largest producer of CHOOH2 synthetic fuel.',
    marketCap: 712.4,
    marketShare: 22.9,
    change: -3.1,
    peRatio: 9.3,
    dividend: 2.5,
    trend: 'down',
    status: 'collapsing',
    systemStatus: 'critical',
    riskLevel: 'MODERATE',
    networkIntegrity: 25,
    meta: {
      headquarters: 'Night City, NUSA',
      founded: 1987,
      employees: 120000,
      ceo: 'Ellen Choi'
    }
  }
];

export const CORPORATE_EVENTS = [
  {
    id: 'evt-101',
    corpId: 'arasaka-001',
    corp: 'ARASAKA',
    event: 'New security contract with NUSA',
    impact: 'STRATEGIC GAIN',
    impactValue: 2.4,
    type: 'positive',
    category: 'Cyberwarfare',
    time: '10min ago'
  },
  {
    id: 'evt-102',
    corpId: 'militech-002',
    corp: 'MILITECH',
    event: 'Counter-intel identifies mole in R&D',
    impact: 'SECURITY BREACH',
    impactValue: -1.2,
    type: 'negative',
    category: 'Espionage',
    time: '2h ago'
  },
  {
    id: 'evt-106',
    corpId: 'nightcorp-006',
    corp: 'NIGHT CORP',
    event: 'AI-driven grid optimization complete',
    impact: 'SYSTEM EFFICIENCY',
    impactValue: 0.1,
    type: 'positive',
    category: 'Infrastructure',
    time: '5min ago'
  },
  {
    id: 'evt-107',
    corpId: 'netwatch-007',
    corp: 'NETWATCH',
    event: 'L3 Blackwall breach attempt deflected',
    impact: 'ICE INTEGRITY HELD',
    impactValue: 0.5,
    type: 'positive',
    category: 'Net-Defense',
    time: '45min ago'
  }
];