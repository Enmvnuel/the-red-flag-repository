export interface DepartmentStats {
    id: string;
    name: string;
    totalInfidels: number;
    menInfidels: number;
    womenInfidels: number;
    cachudos: number;
    faithful: number;
    mostInfidelAgeRange: string;
    infidelityRate: number; // 0-100
    trend: 'up' | 'down' | 'stable';
}

export const MOCK_MAP_DATA: Record<string, DepartmentStats> = {
    "Amazonas": {
        id: "Amazonas",
        name: "Amazonas",
        totalInfidels: 1240,
        menInfidels: 780,
        womenInfidels: 460,
        cachudos: 320,
        faithful: 5000,
        mostInfidelAgeRange: "25-34",
        infidelityRate: 24,
        trend: 'up'
    },
    "Áncash": {
        id: "Áncash",
        name: "Áncash",
        totalInfidels: 3500,
        menInfidels: 2100,
        womenInfidels: 1400,
        cachudos: 890,
        faithful: 8000,
        mostInfidelAgeRange: "30-40",
        infidelityRate: 45,
        trend: 'down'
    },
    "Apurimac": {
        id: "Apurimac",
        name: "Apurimac",
        totalInfidels: 980,
        menInfidels: 600,
        womenInfidels: 380,
        cachudos: 210,
        faithful: 4200,
        mostInfidelAgeRange: "20-29",
        infidelityRate: 18,
        trend: 'stable'
    },
    "Arequipa": {
        id: "Arequipa",
        name: "Arequipa",
        totalInfidels: 5600,
        menInfidels: 3200,
        womenInfidels: 2400,
        cachudos: 1500,
        faithful: 12000,
        mostInfidelAgeRange: "25-35",
        infidelityRate: 68,
        trend: 'up'
    },
    "Ayacucho": {
        id: "Ayacucho",
        name: "Ayacucho",
        totalInfidels: 1450,
        menInfidels: 850,
        womenInfidels: 600,
        cachudos: 400,
        faithful: 5500,
        mostInfidelAgeRange: "30-45",
        infidelityRate: 28,
        trend: 'stable'
    },
    "Cajamarca": {
        id: "Cajamarca",
        name: "Cajamarca",
        totalInfidels: 2800,
        menInfidels: 1600,
        womenInfidels: 1200,
        cachudos: 750,
        faithful: 9000,
        mostInfidelAgeRange: "22-32",
        infidelityRate: 35,
        trend: 'up'
    },
    "Callao": {
        id: "Callao",
        name: "Callao",
        totalInfidels: 4200,
        menInfidels: 2500,
        womenInfidels: 1700,
        cachudos: 1200,
        faithful: 6000,
        mostInfidelAgeRange: "18-28",
        infidelityRate: 75,
        trend: 'up'
    },
    "Cusco": {
        id: "Cusco",
        name: "Cusco",
        totalInfidels: 3900,
        menInfidels: 2200,
        womenInfidels: 1700,
        cachudos: 980,
        faithful: 11000,
        mostInfidelAgeRange: "25-40",
        infidelityRate: 42,
        trend: 'down'
    },
    "Huancavelica": {
        id: "Huancavelica",
        name: "Huancavelica",
        totalInfidels: 650,
        menInfidels: 400,
        womenInfidels: 250,
        cachudos: 150,
        faithful: 3500,
        mostInfidelAgeRange: "35-50",
        infidelityRate: 15,
        trend: 'stable'
    },
    "Huánuco": {
        id: "Huánuco",
        name: "Huánuco",
        totalInfidels: 1800,
        menInfidels: 1100,
        womenInfidels: 700,
        cachudos: 450,
        faithful: 6200,
        mostInfidelAgeRange: "24-34",
        infidelityRate: 32,
        trend: 'up'
    },
    "Ica": {
        id: "Ica",
        name: "Ica",
        totalInfidels: 2900,
        menInfidels: 1700,
        womenInfidels: 1200,
        cachudos: 800,
        faithful: 7500,
        mostInfidelAgeRange: "20-35",
        infidelityRate: 55,
        trend: 'up'
    },
    "Junín": {
        id: "Junín",
        name: "Junín",
        totalInfidels: 3100,
        menInfidels: 1900,
        womenInfidels: 1200,
        cachudos: 850,
        faithful: 8200,
        mostInfidelAgeRange: "25-38",
        infidelityRate: 48,
        trend: 'down'
    },
    "La Libertad": {
        id: "La Libertad",
        name: "La Libertad",
        totalInfidels: 4500,
        menInfidels: 2700,
        womenInfidels: 1800,
        cachudos: 1100,
        faithful: 10500,
        mostInfidelAgeRange: "22-35",
        infidelityRate: 62,
        trend: 'up'
    },
    "Lambayeque": {
        id: "Lambayeque",
        name: "Lambayeque",
        totalInfidels: 3200,
        menInfidels: 1900,
        womenInfidels: 1300,
        cachudos: 900,
        faithful: 7800,
        mostInfidelAgeRange: "20-30",
        infidelityRate: 58,
        trend: 'stable'
    },
    "Lima": {
        id: "Lima",
        name: "Lima",
        totalInfidels: 15800,
        menInfidels: 9500,
        womenInfidels: 6300,
        cachudos: 4500,
        faithful: 25000,
        mostInfidelAgeRange: "25-45",
        infidelityRate: 85,
        trend: 'up'
    },
    "Loreto": {
        id: "Loreto",
        name: "Loreto",
        totalInfidels: 2600,
        menInfidels: 1500,
        womenInfidels: 1100,
        cachudos: 700,
        faithful: 8500,
        mostInfidelAgeRange: "20-35",
        infidelityRate: 38,
        trend: 'down'
    },
    "Madre De Dios": {
        id: "Madre De Dios",
        name: "Madre De Dios",
        totalInfidels: 850,
        menInfidels: 500,
        womenInfidels: 350,
        cachudos: 200,
        faithful: 3000,
        mostInfidelAgeRange: "25-35",
        infidelityRate: 22,
        trend: 'up'
    },
    "Moquegua": {
        id: "Moquegua",
        name: "Moquegua",
        totalInfidels: 1100,
        menInfidels: 650,
        womenInfidels: 450,
        cachudos: 300,
        faithful: 4500,
        mostInfidelAgeRange: "28-38",
        infidelityRate: 26,
        trend: 'stable'
    },
    "Pasco": {
        id: "Pasco",
        name: "Pasco",
        totalInfidels: 750,
        menInfidels: 450,
        womenInfidels: 300,
        cachudos: 180,
        faithful: 3200,
        mostInfidelAgeRange: "30-40",
        infidelityRate: 19,
        trend: 'down'
    },
    "Piura": {
        id: "Piura",
        name: "Piura",
        totalInfidels: 3800,
        menInfidels: 2300,
        womenInfidels: 1500,
        cachudos: 950,
        faithful: 9800,
        mostInfidelAgeRange: "22-36",
        infidelityRate: 52,
        trend: 'up'
    },
    "Puno": {
        id: "Puno",
        name: "Puno",
        totalInfidels: 2200,
        menInfidels: 1300,
        womenInfidels: 900,
        cachudos: 550,
        faithful: 10000,
        mostInfidelAgeRange: "25-40",
        infidelityRate: 30,
        trend: 'stable'
    },
    "San Martín": {
        id: "San Martín",
        name: "San Martín",
        totalInfidels: 1950,
        menInfidels: 1150,
        womenInfidels: 800,
        cachudos: 500,
        faithful: 6500,
        mostInfidelAgeRange: "20-35",
        infidelityRate: 36,
        trend: 'up'
    },
    "Tacna": {
        id: "Tacna",
        name: "Tacna",
        totalInfidels: 1600,
        menInfidels: 950,
        womenInfidels: 650,
        cachudos: 420,
        faithful: 5800,
        mostInfidelAgeRange: "25-35",
        infidelityRate: 40,
        trend: 'stable'
    },
    "Tumbes": {
        id: "Tumbes",
        name: "Tumbes",
        totalInfidels: 900,
        menInfidels: 550,
        womenInfidels: 350,
        cachudos: 250,
        faithful: 3800,
        mostInfidelAgeRange: "20-30",
        infidelityRate: 48,
        trend: 'up'
    },
    "Ucayali": {
        id: "Ucayali",
        name: "Ucayali",
        totalInfidels: 1350,
        menInfidels: 800,
        womenInfidels: 550,
        cachudos: 350,
        faithful: 4800,
        mostInfidelAgeRange: "22-34",
        infidelityRate: 33,
        trend: 'up'
    }
};

export const GLOBAL_STATS = {
    totalInfidels: Object.values(MOCK_MAP_DATA).reduce((acc, curr) => acc + curr.totalInfidels, 0),
    totalMen: Object.values(MOCK_MAP_DATA).reduce((acc, curr) => acc + curr.menInfidels, 0),
    totalWomen: Object.values(MOCK_MAP_DATA).reduce((acc, curr) => acc + curr.womenInfidels, 0),
    totalCachudos: Object.values(MOCK_MAP_DATA).reduce((acc, curr) => acc + curr.cachudos, 0),
    averageRate: Math.round(Object.values(MOCK_MAP_DATA).reduce((acc, curr) => acc + curr.infidelityRate, 0) / Object.keys(MOCK_MAP_DATA).length),
};
