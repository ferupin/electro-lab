"use client";

import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { BuildPage } from "@/components/BuildPage";
import { LearnPage } from "@/components/LearnPage";
import { SimulationPage } from "@/components/SimulationPage";
import { ResultsPage } from "@/components/ResultsPage";
import type { Anode, Cathode, Electrolyte } from "../app/data/materials";

type Page = "landing" | "build" | "learn" | "simulation" | "results";

interface SimulationData {
  anode: Anode;
  cathode: Cathode;
  electrolyte: Electrolyte;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);

  const handleStart = () => {
    setCurrentPage("build");
  };

  const handleLearn = () => {
    setCurrentPage("learn");
  };

  const handleBack = () => {
    setCurrentPage("landing");
  };

  const handleSimulate = (anode: Anode, cathode: Cathode, electrolyte: Electrolyte) => {
    setSimulationData({ anode, cathode, electrolyte });
    setCurrentPage("simulation");
  };

  const handleViewResults = () => {
    setCurrentPage("results");
  };

  const handleTryAgain = () => {
    setCurrentPage("build");
  };

  return (
    <main className="min-h-screen">
      {currentPage === "landing" && (
        <LandingPage onStart={handleStart} onLearn={handleLearn} />
      )}
      
      {currentPage === "build" && (
        <BuildPage onSimulate={handleSimulate} onLearn={handleLearn} />
      )}
      
      {currentPage === "learn" && (
        <LearnPage onBack={handleBack} />
      )}
      
      {currentPage === "simulation" && simulationData && (
        <SimulationPage
          anode={simulationData.anode}
          cathode={simulationData.cathode}
          electrolyte={simulationData.electrolyte}
          onViewResults={handleViewResults}
        />
      )}
      
      {currentPage === "results" && simulationData && (
        <ResultsPage
          anode={simulationData.anode}
          cathode={simulationData.cathode}
          electrolyte={simulationData.electrolyte}
          onTryAgain={handleTryAgain}
        />
      )}
    </main>
  );
}