"use client";

import { motion } from "framer-motion";
import { Progress } from "./ui/progress";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  maxValue?: number;
  color?: "primary" | "secondary" | "accent" | "destructive";
  suffix?: string;
}

export function StatCard({ 
  icon, 
  label, 
  value, 
  maxValue = 100, 
  color = "primary",
  suffix = "%"
}: StatCardProps) {
  const percentage = (value / maxValue) * 100;
  
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    destructive: "text-destructive"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-card border border-border rounded-lg p-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={colorClasses[color]}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">
            {value}{suffix}
          </p>
        </div>
      </div>
      <Progress value={percentage} className="h-2" />
    </motion.div>
  );
}