import { QuizQuestion } from '../types/telegram';

interface AIResponse {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Simulated AI engines with different generation styles
const aiEngines = {
  gpt: {
    name: 'GPT-4',
    style: 'analytical',
    generateQuestion: async (topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<AIResponse> => {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      const topics = {
        science: {
          easy: [
            {
              question: `What is the basic unit of life in ${topic}?`,
              generateOptions: () => {
                const base = ['Cell', 'Atom', 'Molecule', 'Organ'];
                return base.sort(() => Math.random() - 0.5);
              },
              correct: 0,
              explanation: `Cells are the fundamental building blocks of all living organisms in ${topic}.`
            },
            {
              question: `Which process do plants use to make food in ${topic}?`,
              generateOptions: () => {
                const base = ['Photosynthesis', 'Respiration', 'Digestion', 'Circulation'];
                return base.sort(() => Math.random() - 0.5);
              },
              correct: 0,
              explanation: `Photosynthesis is the process where plants convert sunlight into energy.`
            }
          ],
          medium: [
            {
              question: `How does the concept of ${topic} relate to energy conservation?`,
              generateOptions: () => {
                const base = [
                  'Energy cannot be created or destroyed',
                  'Energy always increases',
                  'Energy decreases over time',
                  'Energy is constant in closed systems'
                ];
                return base.sort(() => Math.random() - 0.5);
              },
              correct: 0,
              explanation: `The law of conservation of energy states that energy cannot be created or destroyed, only transformed.`
            }
          ],
          hard: [
            {
              question: `Explain the quantum mechanical implications of ${topic} at the subatomic level.`,
              generateOptions: () => {
                const base = [
                  'Wave-particle duality and uncertainty principle',
                  'Classical mechanics apply universally',
                  'Deterministic behavior at all scales',
                  'No quantum effects observed'
                ];
                return base.sort(() => Math.random() - 0.5);
              },
              correct: 0,
              explanation: `Quantum mechanics reveals that particles exhibit both wave and particle properties, with inherent uncertainty.`
            }
          ]
        },
        history: {
          easy: [
            {
              question: `When did the major events related to ${topic} occur?`,
              generateOptions: () => {
                const centuries = ['15th century', '18th century', '20th century', '21st century'];
                return centuries.sort(() => Math.random() - 0.5);
              },
              correct: 2,
              explanation: `Most major events related to ${topic} occurred in the 20th century.`
            }
          ],
          medium: [
            {
              question: `What were the primary causes of ${topic} in historical context?`,
              generateOptions: () => {
                const base = [
                  'Economic, social, and political factors',
                  'Only military conflicts',
                  'Natural disasters only',
                  'Technological advances alone'
                ];
                return base.sort(() => Math.random() - 0.5);
              },
              correct: 0,
              explanation: `Historical events like ${topic} typically result from complex interactions of multiple factors.`
            }
          ],
          hard: [
            {
              question: `How did ${topic} influence subsequent global developments?`,
              generateOptions: () => {
                const base = [
                  'Reshaped international relations and power structures',
                  'Had minimal long-term impact',
                  'Only affected local regions',
                  'Reversed previous trends completely'
                ];
                return base.sort(() => Math.random() - 0.5);
              },
              correct: 0,
              explanation: `${topic} fundamentally altered the course of international relations and global power dynamics.`
            }
          ]
        },
        technology: {
          easy: [
            {
              question: `What is the basic function of ${topic} in computing?`,
              generateOptions: () => {
                const base = ['Process data', 'Store files', 'Display images', 'Play sound'];
                return base.sort(() => Math.random() - 0.5);
              },
              correct: 0,
              explanation: `The primary function of ${topic} in computing is to process and manipulate data.`
            }
          ],
          medium: [
            {
              question: `How does ${topic} integrate with modern software architecture?`,
              generateOptions: () => {
                const base = [
                  'Through APIs and microservices',
                  'Only as standalone applications',
                  'Via direct hardware access',
                  'Without integration capabilities'
                ];
                return base.sort(() => Math.random() - 0.5);
              },
              correct: 0,
              explanation: `Modern ${topic} integrates through APIs and microservices architecture.`
            }
          ],
          hard: [
            {
              question: `What are the ethical implications of ${topic} in AI development?`,
              generateOptions: () => {
                const base = [
                  'Privacy, bias, and accountability concerns',
                  'No ethical considerations needed',
                  'Only technical limitations matter',
                  'Economic impact only'
                ];
                return base.sort(() => Math.random() - 0.5);
              },
              correct: 0,
              explanation: `${topic} raises important ethical questions about privacy, bias, and accountability in AI systems.`
            }
          ]
        }
      };

      // Select random category and generate question
      const categories = Object.keys(topics) as Array<keyof typeof topics>;
      const category = categories[Math.floor(Math.random() * categories.length)];
      const questionPool = topics[category][difficulty];
      const questionTemplate = questionPool[Math.floor(Math.random() * questionPool.length)];
      
      const options = questionTemplate.generateOptions();
      const correctIndex = options.indexOf(questionTemplate.generateOptions()[questionTemplate.correct]);
      
      return {
        question: questionTemplate.question,
        options,
        correct: correctIndex,
        explanation: questionTemplate.explanation,
        category,
        difficulty
      };
    }
  },
  claude: {
    name: 'Claude',
    style: 'thoughtful',
    generateQuestion: async (topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<AIResponse> => {
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));
      
      // Claude generates more analytical, thoughtful questions
      const questionTypes = {
        easy: [
          {
            question: `What fundamental principle underlies ${topic}?`,
            options: () => {
              const base = ['Basic scientific laws', 'Random chance', 'Human opinion', 'Cultural tradition'];
              return base.sort(() => Math.random() - 0.5);
            },
            correct: 0,
            explanation: `${topic} is based on fundamental scientific principles and laws.`
          }
        ],
        medium: [
          {
            question: `How does ${topic} compare to related concepts in its field?`,
            options: () => {
              const base = [
                'Shares similarities but has distinct characteristics',
                'Identical to all related concepts',
                'Completely unrelated',
                'Superior to all alternatives'
              ];
              return base.sort(() => Math.random() - 0.5);
            },
            correct: 0,
            explanation: `${topic} shares similarities with related concepts but maintains distinct characteristics.`
          }
        ],
        hard: [
          {
            question: `What philosophical questions does ${topic} raise about knowledge and reality?`,
            options: () => {
              const base = [
                'Questions about certainty, perception, and truth',
                'No philosophical implications',
                'Only practical applications matter',
                'Purely mathematical concerns'
              ];
              return base.sort(() => Math.random() - 0.5);
            },
            correct: 0,
            explanation: `${topic} raises fundamental questions about how we know what we know and the nature of reality.`
          }
        ]
      };
      
      const pool = questionTypes[difficulty];
      const template = pool[Math.floor(Math.random() * pool.length)];
      const options = template.options();
      const correctIndex = options.indexOf(template.options()[template.correct]);
      
      return {
        question: template.question,
        options,
        correct: correctIndex,
        explanation: template.explanation,
        category: 'philosophy',
        difficulty
      };
    }
  },
  gemini: {
    name: 'Gemini',
    style: 'creative',
    generateQuestion: async (topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<AIResponse> => {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 800));
      
      // Gemini generates more creative, scenario-based questions
      const scenarios = {
        easy: [
          {
            question: `Imagine you're explaining ${topic} to a 10-year-old. What analogy would work best?`,
            options: () => {
              const base = [
                'Simple everyday comparison',
                'Complex technical terms',
                'Historical references',
                'Mathematical formulas'
              ];
              return base.sort(() => Math.random() - 0.5);
            },
            correct: 0,
            explanation: `Simple everyday comparisons help children understand complex topics like ${topic}.`
          }
        ],
        medium: [
          {
            question: `If ${topic} were a type of technology, what would it be and why?`,
            options: () => {
              const base = [
                'A learning algorithm that adapts',
                'A fixed mechanical system',
                'An artistic tool',
                'A communication device'
              ];
              return base.sort(() => Math.random() - 0.5);
            },
            correct: 0,
            explanation: `${topic} functions like a learning algorithm, adapting and evolving based on inputs.`
          }
        ],
        hard: [
          {
            question: `How might ${topic} evolve in the next 50 years based on current trends?`,
            options: () => {
              const base = [
                'Integration with AI and quantum computing',
                'Remain unchanged',
                'Become obsolete',
                'Simplify to basic forms'
              ];
              return base.sort(() => Math.random() - 0.5);
            },
            correct: 0,
              explanation: `${topic} will likely integrate with emerging technologies like AI and quantum computing.`
          }
        ]
      };
      
      const pool = scenarios[difficulty];
      const template = pool[Math.floor(Math.random() * pool.length)];
      const options = template.options();
      const correctIndex = options.indexOf(template.options()[template.correct]);
      
      return {
        question: template.question,
        options,
        correct: correctIndex,
        explanation: template.explanation,
        category: 'futurology',
        difficulty
      };
    }
  }
};

export async function generateAIQuizQuestion(
  topic: string = 'general knowledge',
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  preferredEngine: 'gpt' | 'claude' | 'gemini' | 'any' = 'any'
): Promise<QuizQuestion> {
  const startTime = Date.now();
  
  // Select AI engine
  const engines = ['gpt', 'claude', 'gemini'] as const;
  const selectedEngine = preferredEngine === 'any' 
    ? engines[Math.floor(Math.random() * engines.length)]
    : preferredEngine;
  
  const engine = aiEngines[selectedEngine];
  
  // Generate question using selected AI
  const aiResponse = await engine.generateQuestion(topic, difficulty);
  
  const generationTime = Date.now() - startTime;
  
  return {
    id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    question: aiResponse.question,
    options: aiResponse.options,
    correct: aiResponse.correct,
    explanation: aiResponse.explanation,
    category: aiResponse.category,
    difficulty: aiResponse.difficulty,
    aiEngine: selectedEngine,
    topic,
    generationTime
  };
}

export function getAIEngineInfo(engine: 'gpt' | 'claude' | 'gemini') {
  const info = {
    gpt: { 
      name: 'GPT-4', 
      color: 'bg-green-500', 
      description: 'Analytical reasoning',
      style: aiEngines.gpt.style
    },
    claude: { 
      name: 'Claude', 
      color: 'bg-orange-500', 
      description: 'Thoughtful analysis',
      style: aiEngines.claude.style
    },
    gemini: { 
      name: 'Gemini', 
      color: 'bg-blue-500', 
      description: 'Creative scenarios',
      style: aiEngines.gemini.style
    }
  };
  return info[engine];
}

export function getAvailableTopics(): string[] {
  return [
    'science', 'history', 'technology', 'mathematics', 'literature',
    'geography', 'art', 'music', 'philosophy', 'psychology',
    'economics', 'politics', 'biology', 'chemistry', 'physics',
    'computer science', 'artificial intelligence', 'space exploration',
    'climate change', 'renewable energy', 'genetics', 'neuroscience'
  ];
}