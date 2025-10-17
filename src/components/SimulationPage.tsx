"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import type { Anode, Cathode, Electrolyte } from "../app/data/materials";

interface SimulationPageProps {
  anode: Anode;
  cathode: Cathode;
  electrolyte: Electrolyte;
  onViewResults: () => void;
}

export function SimulationPage({ anode, cathode, electrolyte, onViewResults }: SimulationPageProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. Ânodo libera elétrons",
      description: `O ${anode.name} no ânodo sofre oxidação, liberando elétrons que fluem pelo circuito externo.`
    },
    {
      title: "2. Elétrons fluem pelo circuito",
      description: "Os elétrons viajam através do circuito externo, fornecendo energia para dispositivos."
    },
    {
      title: "3. Íons atravessam o eletrólito",
      description: `O eletrólito ${electrolyte.name.toLowerCase()} permite a passagem de íons entre os polos.`
    },
    {
      title: "4. Cátodo recebe elétrons",
      description: `O ${cathode.name} no cátodo aceita os elétrons, completando o circuito através da redução.`
    }
  ];

  useEffect(() => {
    if (step < steps.length - 1) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, steps.length]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Simulação em Andamento</h1>
          <p className="text-muted-foreground">
            Observe como os elétrons fluem através da sua bateria
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main visualization */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-card border border-border rounded-lg p-8 aspect-video flex items-center justify-center relative overflow-hidden"
            >
              {/* Anode */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      className="absolute left-12 top-1/2 -translate-y-1/2 cursor-help"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="w-24 h-48 bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl flex flex-col items-center justify-center shadow-xl">
                        <span className="text-4xl text-white mb-2">−</span>
                        <span className="text-sm text-white/90 font-semibold">Ânodo</span>
                        <span className="text-xs text-white/70">{anode.name}</span>
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">Ânodo ({anode.name})</p>
                    <p className="text-sm">Libera elétrons por oxidação</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Cathode */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      className="absolute right-12 top-1/2 -translate-y-1/2 cursor-help"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="w-24 h-48 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex flex-col items-center justify-center shadow-xl">
                        <span className="text-4xl text-white mb-2">+</span>
                        <span className="text-sm text-white/90 font-semibold">Cátodo</span>
                        <span className="text-xs text-white/70">{cathode.name}</span>
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">Cátodo ({cathode.name})</p>
                    <p className="text-sm">Recebe elétrons por redução</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Electrolyte */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      className="absolute left-36 right-36 top-1/2 -translate-y-1/2 cursor-help"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="h-32 bg-muted/50 border-2 border-dashed border-muted-foreground/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <div className="text-center">
                          <span className="text-sm font-semibold text-muted-foreground">Eletrólito</span>
                          <br />
                          <span className="text-xs text-muted-foreground">{electrolyte.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">Eletrólito ({electrolyte.name})</p>
                    <p className="text-sm">Permite passagem de íons</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Electron flow animation */}
              <div className="absolute left-36 right-36 top-[35%]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-accent rounded-full shadow-lg"
                    initial={{ left: 0, opacity: 0 }}
                    animate={{
                      left: ["0%", "100%"],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.25,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>

              {/* Ion flow */}
              <div className="absolute left-36 right-36 top-[55%]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-primary/40 rounded-full"
                    initial={{ right: 0, opacity: 0 }}
                    animate={{
                      right: ["0%", "100%"],
                      opacity: [0, 0.6, 0.6, 0]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>

              {/* Circuit connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="currentColor" className="text-accent" />
                  </marker>
                </defs>
                <path
                  d="M 96 80 Q 200 40, 520 80"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-muted-foreground/30"
                  markerEnd="url(#arrowhead)"
                />
                <path
                  d="M 96 320 Q 200 360, 520 320"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-muted-foreground/30"
                />
              </svg>
            </motion.div>

            <div className="flex justify-center">
              <Button onClick={onViewResults} size="lg" className="gap-2">
                Ver Resultados
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Step-by-step explanation */}
          <div className="space-y-4">
            <h3 className="font-semibold">Processo Passo a Passo</h3>
            {steps.map((s, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: step >= index ? 1 : 0.3,
                  x: 0 
                }}
                transition={{ delay: index * 0.1, duration: 0.3, ease: "easeOut" }}
                className={`bg-card border rounded-lg p-4 transition-colors ${
                  step >= index ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    step >= index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {step >= index ? "✓" : index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{s.title}</h4>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-accent-foreground mb-1">Reação Redox</p>
                <p className="text-accent-foreground/80">
                  A bateria funciona através de reações de oxidação-redução, onde elétrons são transferidos entre os materiais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}