"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RotateCcw, Share2, Save, TrendingUp, Zap, Shield, Leaf, Award } from "lucide-react";
import { 
  calculateBatteryResults, 
  getOverallScore, 
  getScoreLabel,
  getSafetyLabel,
  getEnvImpactLabel,
  type Anode, 
  type Cathode, 
  type Electrolyte 
} from "../app/data/materials";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip
} from "recharts";

interface ResultsPageProps {
  anode: Anode;
  cathode: Cathode;
  electrolyte: Electrolyte;
  onTryAgain: () => void;
}

export function ResultsPage({ anode, cathode, electrolyte, onTryAgain }: ResultsPageProps) {
  const results = calculateBatteryResults(anode, cathode, electrolyte);
  const overallScore = getOverallScore(results);
  const scoreLabel = getScoreLabel(overallScore);
  
  const radarData = [
    { subject: "Energia", value: results.energyScore, fullMark: 100 },
    { subject: "Segurança", value: results.safetyScore, fullMark: 100 },
    { subject: "Sustentabilidade", value: 100 - results.envScore, fullMark: 100 },
  ];

  const comparisonData = [
    { name: "Sua Bateria", energia: results.energyDensity, voltagem: results.voltage * 50 },
    { name: "Bateria Comercial", energia: 150, voltagem: 180 },
  ];

  const handleShare = () => {
    const text = `Criei uma bateria no ElectroLab!\n\nPontuação: ${overallScore}/100 (${scoreLabel})\nVoltagem: ${results.voltage}V\nDensidade: ${results.energyDensity} Wh/kg\n\nMateriais:\n• Ânodo: ${anode.name}\n• Cátodo: ${cathode.name}\n• Eletrólito: ${electrolyte.name}`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Resultado copiado para a área de transferência!");
    }
  };

  const getSuggestions = () => {
    const suggestions = [];
    
    if (results.energyScore < 70) {
      suggestions.push("Considere usar Lítio ou Cobalto para maior eficiência energética");
    }
    if (results.safetyScore < 70) {
      suggestions.push("Grafeno no ânodo ou eletrólito sólido melhoram a segurança");
    }
    if (results.envScore > 60) {
      suggestions.push("Escolha Grafeno ou Ferro para reduzir o impacto ambiental");
    }
    
    if (suggestions.length === 0) {
      suggestions.push("Excelente combinação! Sua bateria está balanceada.");
    }
    
    return suggestions;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className="w-8 h-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold">Resultados da Simulação</h1>
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="inline-block"
          >
            <div className="relative">
              <svg className="w-48 h-48 mx-auto">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-muted"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="text-primary"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 80}`,
                    strokeDashoffset: `${2 * Math.PI * 80 * (1 - overallScore / 100)}`,
                    transform: "rotate(-90deg)",
                    transformOrigin: "center"
                  }}
                  initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - overallScore / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-foreground">{overallScore}</span>
                <span className="text-sm text-muted-foreground">de 100</span>
              </div>
            </div>
          </motion.div>
          
          <Badge className="mt-4 px-6 py-2 text-lg">
            {scoreLabel}
          </Badge>
        </motion.div>

        {/* Main metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Eficiência Energética</p>
            <p className="text-3xl font-bold">{results.energyScore}%</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Shield className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Segurança</p>
            <p className="text-xl font-bold">{getSafetyLabel(results.safetyScore)}</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Leaf className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Impacto Ambiental</p>
            <p className="text-xl font-bold">{getEnvImpactLabel(results.envScore)}</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Voltagem Estimada</p>
            <p className="text-3xl font-bold">{results.voltage}V</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="font-semibold mb-4">Análise de Desempenho</h3>
            <div className="w-full" style={{ height: "360px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  data={radarData}
                  margin={{ top: 40, right: 40, bottom: 30, left: 40 }}
                  cx="50%"
                  cy="52%"
                >
                  <PolarGrid 
                    stroke="#DDE6E3" 
                    strokeWidth={1.5}
                  />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ 
                      fill: "#0F1720",
                      fontSize: 13,
                      fontWeight: 600
                    }}
                    tickLine={false}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ 
                      fill: "#0F1720",
                      fontSize: 10
                    }}
                    stroke="#DDE6E3"
                    axisLine={false}
                  />
                  <Radar 
                    name="Sua Bateria" 
                    dataKey="value" 
                    stroke="#00B388"
                    strokeWidth={3}
                    fill="#00B388" 
                    fillOpacity={0.5}
                    dot={{ 
                      fill: "#0B7A5F", 
                      strokeWidth: 2,
                      r: 5 
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Comparison chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="font-semibold mb-4">Comparação com Bateria Comercial</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#DDE6E3"
                  vertical={false}
                />
                <XAxis 
                  dataKey="name" 
                  tick={{ 
                    fill: "#0F1720",
                    fontSize: 14,
                    fontWeight: 600
                  }}
                  axisLine={{ stroke: "#DDE6E3" }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ 
                    fill: "#0F1720",
                    fontSize: 12
                  }}
                  axisLine={{ stroke: "#DDE6E3" }}
                  tickLine={false}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: "#ffffff",
                    border: "1px solid #DDE6E3",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                  labelStyle={{
                    color: "#0F1720",
                    fontWeight: 600,
                    marginBottom: "4px"
                  }}
                  itemStyle={{
                    color: "#0F1720",
                    fontSize: "14px"
                  }}
                />
                <Bar 
                  dataKey="energia" 
                  fill="#0B7A5F" 
                  name="Densidade (Wh/kg)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar 
                  dataKey="voltagem" 
                  fill="#FFB020" 
                  name="Voltagem (V × 50)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0B7A5F]"></div>
                <span className="text-xs text-muted-foreground">Densidade</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFB020]"></div>
                <span className="text-xs text-muted-foreground">Voltagem</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Densidade de energia: {results.energyDensity} Wh/kg
            </p>
          </motion.div>
        </div>

        {/* Configuration summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }}
          className="bg-card border border-border rounded-lg p-6 mb-8"
        >
          <h3 className="font-semibold mb-4">Configuração da Bateria</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ânodo</p>
              <p className="font-semibold">{anode.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Energia: {anode.energy} | Segurança: {anode.safety}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cátodo</p>
              <p className="font-semibold">{cathode.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Energia: {cathode.energy} | Segurança: {cathode.safety}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Eletrólito</p>
              <p className="font-semibold">{electrolyte.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Condutividade e estabilidade otimizadas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3, ease: "easeOut" }}
          className="bg-accent/10 border border-accent/30 rounded-lg p-6 mb-8"
        >
          <h3 className="font-semibold mb-3">Sugestões para Melhorar</h3>
          <ul className="space-y-2">
            {getSuggestions().map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span className="text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button onClick={onTryAgain} size="lg" className="gap-2">
            <RotateCcw className="w-5 h-5" />
            Tentar outra combinação
          </Button>
          
          <Button onClick={handleShare} variant="outline" size="lg" className="gap-2">
            <Share2 className="w-5 h-5" />
            Compartilhar resultado
          </Button>
          
          <Button 
            onClick={() => alert("Funcionalidade de salvar será implementada!")} 
            variant="outline" 
            size="lg" 
            className="gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar protótipo
          </Button>
        </motion.div>
      </div>
    </div>
  );
}