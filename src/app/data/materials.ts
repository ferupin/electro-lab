// Types
export interface Anode {
  id: string;
  name: string;
  energy: number;
  safety: number;
  environmental: number;
  voltage: number;
}

export interface Cathode {
  id: string;
  name: string;
  energy: number;
  safety: number;
  environmental: number;
  voltage: number;
}

export interface Electrolyte {
  id: string;
  name: string;
  conductivity: number;
  safety: number;
  environmental: number;
}

export interface BatteryResults {
  energyScore: number;
  safetyScore: number;
  envScore: number;
  voltage: number;
  energyDensity: number;
}

// Materials data
export const materialsData = {
  anodes: [
    {
      id: "lithium",
      name: "Lítio",
      energy: 95,
      safety: 60,
      environmental: 50,
      voltage: 0.3
    },
    {
      id: "graphite",
      name: "Grafite",
      energy: 70,
      safety: 85,
      environmental: 80,
      voltage: 0.2
    },
    {
      id: "graphene",
      name: "Grafeno",
      energy: 90,
      safety: 90,
      environmental: 90,
      voltage: 0.25
    },
    {
      id: "silicon",
      name: "Silício",
      energy: 85,
      safety: 70,
      environmental: 75,
      voltage: 0.22
    }
  ] as Anode[],
  
  cathodes: [
    {
      id: "cobalt",
      name: "Cobalto (LiCoO₂)",
      energy: 95,
      safety: 65,
      environmental: 40,
      voltage: 3.7
    },
    {
      id: "iron",
      name: "Ferro (LiFePO₄)",
      energy: 70,
      safety: 95,
      environmental: 85,
      voltage: 3.2
    },
    {
      id: "nickel",
      name: "Níquel (NMC)",
      energy: 85,
      safety: 75,
      environmental: 60,
      voltage: 3.6
    },
    {
      id: "manganese",
      name: "Manganês (LMO)",
      energy: 75,
      safety: 80,
      environmental: 70,
      voltage: 3.8
    }
  ] as Cathode[],
  
  electrolytes: [
    {
      id: "liquid",
      name: "Líquido (LiPF₆)",
      conductivity: 85,
      safety: 60,
      environmental: 65
    },
    {
      id: "solid",
      name: "Sólido (Cerâmica)",
      conductivity: 75,
      safety: 95,
      environmental: 90
    },
    {
      id: "gel",
      name: "Gel (Polímero)",
      conductivity: 80,
      safety: 80,
      environmental: 75
    }
  ] as Electrolyte[]
};

// Calculation functions
export function calculateBatteryResults(
  anode: Anode | null,
  cathode: Cathode | null,
  electrolyte: Electrolyte | null
): BatteryResults {
  if (!anode || !cathode || !electrolyte) {
    return {
      energyScore: 0,
      safetyScore: 0,
      envScore: 0,
      voltage: 0,
      energyDensity: 0
    };
  }

  // Energy score calculation
  const energyScore = Math.round(
    (anode.energy * 0.3 + cathode.energy * 0.5 + electrolyte.conductivity * 0.2)
  );

  // Safety score calculation
  const safetyScore = Math.round(
    (anode.safety * 0.3 + cathode.safety * 0.4 + electrolyte.safety * 0.3)
  );

  // Environmental impact score (lower is better, but we invert for display)
  const envScore = Math.round(
    100 - (anode.environmental * 0.35 + cathode.environmental * 0.35 + electrolyte.environmental * 0.3)
  );

  // Voltage calculation
  const voltage = Number((cathode.voltage + anode.voltage).toFixed(2));

  // Energy density calculation (Wh/kg)
  const energyDensity = Math.round(
    (energyScore * voltage * 2.5)
  );

  return {
    energyScore,
    safetyScore,
    envScore,
    voltage,
    energyDensity
  };
}

export function getOverallScore(results: BatteryResults): number {
  return Math.round(
    (results.energyScore * 0.4 + results.safetyScore * 0.35 + (100 - results.envScore) * 0.25)
  );
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Excelente";
  if (score >= 80) return "Muito Bom";
  if (score >= 70) return "Bom";
  if (score >= 60) return "Regular";
  return "Precisa Melhorar";
}

export function getSafetyLabel(score: number): string {
  if (score >= 90) return "Muito Seguro";
  if (score >= 75) return "Seguro";
  if (score >= 60) return "Moderado";
  return "Baixa Segurança";
}

export function getEnvImpactLabel(score: number): string {
  if (score <= 30) return "Baixo Impacto";
  if (score <= 50) return "Moderado";
  if (score <= 70) return "Alto Impacto";
  return "Muito Alto";
}