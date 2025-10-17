"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MaterialCard } from "./MaterialCard";
import { StatCard } from "./StatCard";
import { ElectronFlow } from "./ElectronFlow";
import { Button } from "./ui/button";
import { Battery, Droplet, Layers, Zap, Shield, Leaf, Play, BookOpen } from "lucide-react";
import { materialsData, calculateBatteryResults, type Anode, type Cathode, type Electrolyte } from "../app/data/materials";

interface BuildPageProps {
  onSimulate: (anode: Anode, cathode: Cathode, electrolyte: Electrolyte) => void;
  onLearn: () => void;
}

export function BuildPage({ onSimulate, onLearn }: BuildPageProps) {
  const [selectedAnode, setSelectedAnode] = useState<Anode | null>(null);
  const [selectedCathode, setSelectedCathode] = useState<Cathode | null>(null);
  const [selectedElectrolyte, setSelectedElectrolyte] = useState<Electrolyte | null>(null);

  const results = calculateBatteryResults(selectedAnode, selectedCathode, selectedElectrolyte);
  const isComplete = selectedAnode && selectedCathode && selectedElectrolyte;

  const handleSimulate = () => {
    if (isComplete) {
      onSimulate(selectedAnode, selectedCathode, selectedElectrolyte);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Battery className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Construa sua Bateria</h1>
          </div>
          <p className="text-muted-foreground">
            Selecione os materiais para cada componente e veja como eles afetam o desempenho
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Material selection */}
          <div className="space-y-6">
            {/* Anode selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Ânodo (Polo Negativo)</h3>
              </div>
              <div className="space-y-2">
                {materialsData.anodes.map((anode) => (
                  <MaterialCard
                    key={anode.id}
                    id={anode.id}
                    name={anode.name}
                    icon={<Layers className="w-6 h-6" />}
                    description={`Energia: ${anode.energy} | Segurança: ${anode.safety}`}
                    isSelected={selectedAnode?.id === anode.id}
                    onClick={() => setSelectedAnode(anode)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Cathode selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Battery className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold">Cátodo (Polo Positivo)</h3>
              </div>
              <div className="space-y-2">
                {materialsData.cathodes.map((cathode) => (
                  <MaterialCard
                    key={cathode.id}
                    name={cathode.name}
                    id={cathode.id}
                    icon={<Battery className="w-6 h-6" />}
                    description={`Energia: ${cathode.energy} | Segurança: ${cathode.safety}`}
                    isSelected={selectedCathode?.id === cathode.id}
                    onClick={() => setSelectedCathode(cathode)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Electrolyte selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Droplet className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Eletrólito</h3>
              </div>
              <div className="space-y-2">
                {materialsData.electrolytes.map((electrolyte) => (
                  <MaterialCard
                    key={electrolyte.id}
                    id={electrolyte.id}
                    name={electrolyte.name}
                    icon={<Droplet className="w-6 h-6" />}
                    description="Condutividade e estabilidade"
                    isSelected={selectedElectrolyte?.id === electrolyte.id}
                    onClick={() => setSelectedElectrolyte(electrolyte)}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Visualization and stats */}
          <div className="space-y-6">
            {/* Visual representation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
              className="bg-card border border-border rounded-lg p-6 h-64"
            >
              <h3 className="font-semibold mb-4">Visualização da Célula</h3>
              <ElectronFlow isAnimating={!!isComplete} />
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
              className="space-y-3"
            >
              <h3 className="font-semibold">Estatísticas em Tempo Real</h3>
              
              <StatCard
                icon={<Zap className="w-5 h-5" />}
                label="Eficiência Energética"
                value={results.energyScore}
                color="primary"
              />
              
              <StatCard
                icon={<Shield className="w-5 h-5" />}
                label="Segurança"
                value={results.safetyScore}
                color="secondary"
              />
              
              <StatCard
                icon={<Leaf className="w-5 h-5" />}
                label="Impacto Ambiental"
                value={results.envScore}
                color="accent"
              />
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-3"
            >
              <Button
                onClick={handleSimulate}
                disabled={!isComplete}
                className="flex-1 gap-2"
                size="lg"
              >
                <Play className="w-5 h-5" />
                Simular
              </Button>
              
              <Button
                onClick={onLearn}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Modo Educacional
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}