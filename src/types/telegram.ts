export interface TelegramMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'quiz' | 'result' | 'generating';
  quizData?: QuizQuestion;
  replyTo?: string;
  generatingInfo?: {
    topic: string;
    engine: 'gpt' | 'claude' | 'gemini';
    difficulty: 'easy' | 'medium' | 'hard';
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  aiEngine: 'gpt' | 'claude' | 'gemini';
  topic: string;
  generationTime: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  preferences: {
    favoriteTopics: string[];
    preferredDifficulty: 'easy' | 'medium' | 'hard';
    preferredEngine: 'gpt' | 'claude' | 'gemini' | 'any';
  };
}