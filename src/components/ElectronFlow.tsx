"use client";

import { motion } from "framer-motion";

interface ElectronFlowProps {
  isAnimating: boolean;
}

export function ElectronFlow({ isAnimating }: ElectronFlowProps) {
  const electrons = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="relative w-full h-full">
      {/* Anode (left) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-32 bg-gradient-to-r from-secondary to-secondary/80 rounded-lg flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-xl">−</span>
      </div>

      {/* Cathode (right) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-32 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-xl">+</span>
      </div>

      {/* Electrolyte (middle) */}
      <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-24 bg-muted/30 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
        <span className="text-xs text-muted-foreground font-medium">Eletrólito</span>
      </div>

      {/* Electron flow */}
      {isAnimating && (
        <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-1 overflow-hidden">
          {electrons.map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-lg"
              initial={{ left: 0, opacity: 0 }}
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Connection wires */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <path
          d="M 80 50 Q 150 30, 220 50"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-muted-foreground/30"
        />
        <path
          d="M 80 150 Q 150 170, 220 150"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-muted-foreground/30"
        />
      </svg>
    </div>
  );
}