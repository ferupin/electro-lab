"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface MaterialCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function MaterialCard({
  id,
  name,
  icon,
  description,
  isSelected,
  onClick,
  disabled = false
}: MaterialCardProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`
        relative w-full p-4 rounded-lg border-2 transition-all text-left
        ${isSelected 
          ? "border-primary bg-primary/5" 
          : "border-border bg-card hover:border-primary/50"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-150
          ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}
        `}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-foreground">{name}</h4>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
              >
                <Check className="w-3 h-3" />
              </motion.div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </motion.button>
  );
}