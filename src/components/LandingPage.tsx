"use client";

import { motion } from "framer-motion";
import { Battery, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

interface LandingPageProps {
  onStart: () => void;
  onLearn: () => void;
}

export function LandingPage({ onStart, onLearn }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Battery className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Educação Científica</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
            ElectroLab
          </h1>
          
          <h2 className="text-2xl lg:text-3xl text-foreground/80">
            Crie sua bateria sustentável
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Simulações interativas que ensinam como funcionam as baterias — sem laboratório.
            Explore diferentes materiais e descubra como cada escolha afeta o desempenho,
            segurança e impacto ambiental.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              onClick={onStart}
              size="lg"
              className="gap-2"
            >
              <Battery className="w-5 h-5" />
              Criar bateria
            </Button>
            
            <Button 
              onClick={onLearn}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Aprender
            </Button>
          </div>
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-square max-w-lg mx-auto">
            {/* Battery illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 30px rgba(11, 122, 95, 0.3)",
                    "0 0 50px rgba(0, 179, 136, 0.4)",
                    "0 0 30px rgba(11, 122, 95, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-64 h-80 bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl relative overflow-hidden"
              >
                {/* Battery top */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-12 bg-gradient-to-b from-primary to-secondary rounded-t-lg" />
                
                {/* Battery charge indicator */}
                <div className="absolute inset-4 bg-white/10 rounded-2xl overflow-hidden">
                  <motion.div
                    initial={{ height: "30%" }}
                    animate={{ height: ["30%", "90%", "30%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 w-full bg-accent/80"
                  />
                </div>
                
                {/* Electron particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent rounded-full"
                    initial={{ 
                      x: Math.random() * 256,
                      y: Math.random() * 320,
                      opacity: 0
                    }}
                    animate={{
                      y: [null, -50],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 bg-card border border-border rounded-lg p-3 shadow-lg"
            >
              <div className="text-sm font-semibold text-primary">Eficiência</div>
              <div className="text-2xl font-bold">95%</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
              className="absolute bottom-12 left-0 bg-card border border-border rounded-lg p-3 shadow-lg"
            >
              <div className="text-sm font-semibold text-secondary">Sustentável</div>
              <div className="text-2xl font-bold">♻️</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}