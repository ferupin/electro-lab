"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Layers, Battery, Droplet, Zap, CheckCircle2, XCircle } from "lucide-react";

interface LearnPageProps {
  onBack: () => void;
}

export function LearnPage({ onBack }: LearnPageProps) {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const educationalContent = [
    {
      icon: <Layers className="w-8 h-8" />,
      title: "O que é um Ânodo?",
      description: "O ânodo é o polo negativo da bateria. Durante a descarga, ele libera elétrons através de uma reação de oxidação. É o local onde a corrente elétrica sai da bateria para o circuito externo.",
      color: "secondary"
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "O que é um Cátodo?",
      description: "O cátodo é o polo positivo da bateria. Durante a descarga, ele recebe os elétrons através de uma reação de redução. É o destino final dos elétrons no circuito interno da bateria.",
      color: "primary"
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "O que é um Eletrólito?",
      description: "O eletrólito é uma substância que permite a passagem de íons entre o ânodo e o cátodo, mas não de elétrons. Ele completa o circuito interno da bateria e pode ser líquido, sólido ou em gel.",
      color: "accent"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Como funcionam as Reações Redox?",
      description: "As reações de redução-oxidação (redox) são o coração de uma bateria. No ânodo ocorre oxidação (perda de elétrons) e no cátodo ocorre redução (ganho de elétrons). Esse fluxo de elétrons gera corrente elétrica.",
      color: "primary"
    }
  ];

  const quizQuestions = [
    {
      question: "Qual componente da bateria libera elétrons durante a descarga?",
      options: ["Cátodo", "Ânodo", "Eletrólito", "Circuito externo"],
      correct: 1
    },
    {
      question: "O que o eletrólito permite que passe entre os polos?",
      options: ["Elétrons", "Prótons", "Íons", "Nêutrons"],
      correct: 2
    },
    {
      question: "Qual material é considerado mais sustentável para baterias?",
      options: ["Cobalto", "Grafeno", "Níquel", "Chumbo"],
      correct: 1
    }
  ];

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (!showResults) {
      setQuizAnswers({ ...quizAnswers, [questionIndex]: optionIndex });
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const colorClasses = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    accent: "text-accent bg-accent/10"
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-8"
        >
          <Button onClick={onBack} variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Modo Educacional</h1>
          <p className="text-muted-foreground">
            Aprenda os conceitos fundamentais das baterias
          </p>
        </motion.div>

        {/* Educational cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {educationalContent.map((content, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3, ease: "easeOut" }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${
                  colorClasses[content.color as keyof typeof colorClasses]
                }`}>
                  {content.icon}
                </div>
                <h3 className="font-semibold mb-2">{content.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quiz section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
          className="bg-card border border-border rounded-lg p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Perguntas Rápidas</h2>
            {showResults && (
              <Badge className="px-4 py-2">
                Pontuação: {calculateScore()}/{quizQuestions.length}
              </Badge>
            )}
          </div>

          <div className="space-y-8">
            {quizQuestions.map((quiz, qIndex) => (
              <div key={qIndex} className="space-y-3">
                <p className="font-semibold">
                  {qIndex + 1}. {quiz.question}
                </p>
                <div className="space-y-2">
                  {quiz.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = quiz.correct === oIndex;
                    const showCorrect = showResults && isCorrect;
                    const showIncorrect = showResults && isSelected && !isCorrect;

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                        disabled={showResults}
                        className={`
                          w-full text-left p-4 rounded-lg border-2 transition-all
                          ${isSelected && !showResults ? "border-primary bg-primary/5" : "border-border"}
                          ${showCorrect ? "border-green-500 bg-green-50 dark:bg-green-950" : ""}
                          ${showIncorrect ? "border-red-500 bg-red-50 dark:bg-red-950" : ""}
                          ${!showResults ? "hover:border-primary/50 cursor-pointer" : "cursor-default"}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                          {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!showResults && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                size="lg"
              >
                Enviar Respostas
              </Button>
            </div>
          )}

          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-8 p-6 bg-primary/10 border border-primary/30 rounded-lg text-center"
            >
              <h3 className="font-semibold mb-2">
                {calculateScore() === quizQuestions.length
                  ? "🎉 Perfeito! Você acertou todas!"
                  : calculateScore() >= quizQuestions.length / 2
                  ? "👍 Bom trabalho! Continue aprendendo."
                  : "📚 Continue estudando para melhorar."}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Você acertou {calculateScore()} de {quizQuestions.length} questões
              </p>
              <Button onClick={() => {
                setQuizAnswers({});
                setShowResults(false);
              }}>
                Tentar Novamente
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }}
          className="mt-8 bg-accent/10 border border-accent/30 rounded-lg p-6"
        >
          <h3 className="font-semibold mb-2">💡 Dica Sustentável</h3>
          <p className="text-sm text-muted-foreground">
            As baterias do futuro precisam balancear três fatores: alta eficiência energética,
            segurança para os usuários e baixo impacto ambiental. Materiais como grafeno e
            eletrólitos sólidos estão revolucionando a tecnologia de baterias para alcançar
            esse equilíbrio perfeito.
          </p>
        </motion.div>
      </div>
    </div>
  );
}