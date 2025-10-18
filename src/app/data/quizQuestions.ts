// src/data/quizQuestions.ts

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export const quizQuestionsBank: QuizQuestion[] = [
  {
    id: "q1",
    question: "Qual componente da bateria libera elétrons durante a descarga?",
    options: ["Cátodo", "Ânodo", "Eletrólito", "Circuito externo"],
    correct: 1,
    explanation: "O ânodo é o polo negativo que sofre oxidação, liberando elétrons."
  },
  {
    id: "q2",
    question: "O que o eletrólito permite que passe entre os polos?",
    options: ["Elétrons", "Prótons", "Íons", "Nêutrons"],
    correct: 2,
    explanation: "O eletrólito permite a passagem de íons, mas não de elétrons."
  },
  {
    id: "q3",
    question: "Qual material é considerado mais sustentável para baterias?",
    options: ["Cobalto", "Grafeno", "Níquel", "Chumbo"],
    correct: 1,
    explanation: "O grafeno é sustentável, tem alta eficiência e baixo impacto ambiental."
  },
  {
    id: "q4",
    question: "Durante a descarga da bateria, o que ocorre no cátodo?",
    options: ["Oxidação", "Redução", "Neutralização", "Ionização"],
    correct: 1,
    explanation: "No cátodo ocorre redução, onde os elétrons são recebidos."
  },
  {
    id: "q5",
    question: "Qual é a função principal do circuito externo em uma bateria?",
    options: [
      "Armazenar energia",
      "Permitir o fluxo de elétrons",
      "Conduzir íons",
      "Isolar os polos"
    ],
    correct: 1,
    explanation: "O circuito externo permite que os elétrons fluam do ânodo para o cátodo."
  },
  {
    id: "q6",
    question: "Qual reação química acontece no ânodo durante a descarga?",
    options: ["Redução", "Oxidação", "Combustão", "Hidrólise"],
    correct: 1,
    explanation: "No ânodo ocorre oxidação, processo de perda de elétrons."
  },
  {
    id: "q7",
    question: "O que significa a sigla LiFePO₄?",
    options: [
      "Lítio Ferro Fosfato",
      "Lítio Ferro Oxidado",
      "Lítio Fósforo Óxido",
      "Lítio Ferroso Oxigenado"
    ],
    correct: 0,
    explanation: "LiFePO₄ é Lítio Ferro Fosfato, um material de cátodo muito seguro."
  },
  {
    id: "q8",
    question: "Qual eletrólito oferece maior segurança?",
    options: ["Líquido orgânico", "Gel polimérico", "Eletrólito sólido", "Solução aquosa"],
    correct: 2,
    explanation: "Eletrólitos sólidos são mais seguros, evitando vazamentos e incêndios."
  },
  {
    id: "q9",
    question: "O que aumenta a densidade energética de uma bateria?",
    options: [
      "Eletrólito mais espesso",
      "Materiais com alta capacidade de armazenamento",
      "Temperatura elevada",
      "Circuito externo maior"
    ],
    correct: 1,
    explanation: "Materiais com alta capacidade de armazenamento aumentam a densidade energética."
  },
  {
    id: "q10",
    question: "Por que o cobalto tem alto impacto ambiental?",
    options: [
      "É radioativo",
      "Mineração complexa e condições trabalhistas precárias",
      "Não é reciclável",
      "Reage com água"
    ],
    correct: 1,
    explanation: "A mineração de cobalto envolve impactos ambientais e sociais significativos."
  },
  {
    id: "q11",
    question: "Qual material de ânodo tem a maior capacidade teórica?",
    options: ["Grafite", "Lítio metálico", "Silício", "Grafeno"],
    correct: 1,
    explanation: "O lítio metálico tem a maior capacidade teórica, mas desafios de segurança."
  },
  {
    id: "q12",
    question: "O que diferencia uma bateria de íon-lítio de uma bateria de lítio?",
    options: [
      "O eletrólito usado",
      "Íon-lítio usa sais de lítio, bateria de lítio usa lítio metálico",
      "O tamanho",
      "A voltagem"
    ],
    correct: 1,
    explanation: "Baterias de íon-lítio usam compostos de lítio, não lítio metálico puro."
  },
  {
    id: "q13",
    question: "Qual fator NÃO afeta a vida útil de uma bateria?",
    options: [
      "Temperatura de operação",
      "Profundidade de descarga",
      "Cor do dispositivo",
      "Número de ciclos"
    ],
    correct: 2,
    explanation: "A cor do dispositivo não tem relação com a química da bateria."
  },
  {
    id: "q14",
    question: "O que são reações redox?",
    options: [
      "Reações que reduzem tamanho",
      "Reações de redução e oxidação simultâneas",
      "Reações que oxidam metais",
      "Reações em água"
    ],
    correct: 1,
    explanation: "Redox são reações onde ocorrem redução (ganho de elétrons) e oxidação (perda de elétrons)."
  },
  {
    id: "q15",
    question: "Por que baterias de grafeno são promissoras?",
    options: [
      "São mais baratas",
      "Alta condutividade, leveza e sustentabilidade",
      "Duram para sempre",
      "Não precisam de eletrólito"
    ],
    correct: 1,
    explanation: "Grafeno oferece alta condutividade, é leve, forte e sustentável."
  }
];

/**
 * Função para embaralhar array (Fisher-Yates shuffle)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Retorna um número específico de perguntas aleatórias
 */
export function getRandomQuestions(count: number = 3): QuizQuestion[] {
  const shuffled = shuffleArray(quizQuestionsBank);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}