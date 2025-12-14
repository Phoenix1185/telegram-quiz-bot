interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  engine: string;
  generationTime: number;
}

const quizDatabase = {
  science: [
    {
      question: "What is the speed of light in vacuum?",
      options: ["299,792,458 m/s", "300,000,000 m/s", "186,282 miles/s", "1 light-year per second"],
      correct: 0,
      explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second. This is a fundamental constant of nature."
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
      correct: 1,
      explanation: "Mitochondria are often called the powerhouse of the cell because they generate most of the cell's supply of ATP (energy)."
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2,
      explanation: "The chemical symbol for gold is Au, from the Latin word 'aurum' meaning gold."
    }
  ],
  history: [
    {
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correct: 1,
      explanation: "World War II ended in 1945 with the surrender of Japan in September, following the atomic bombings of Hiroshima and Nagasaki."
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
      correct: 1,
      explanation: "George Washington served as the first President of the United States from 1789 to 1797."
    },
    {
      question: "Which ancient wonder of the world still stands today?",
      options: ["Colossus of Rhodes", "Hanging Gardens of Babylon", "Great Pyramid of Giza", "Lighthouse of Alexandria"],
      correct: 2,
      explanation: "The Great Pyramid of Giza is the only ancient wonder of the world that still survives today."
    }
  ],
  technology: [
    {
      question: "Who founded Microsoft?",
      options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
      correct: 1,
      explanation: "Bill Gates founded Microsoft in 1975 along with Paul Allen."
    },
    {
      question: "What does 'HTTP' stand for?",
      options: ["HyperText Transfer Protocol", "High Tech Transfer Process", "Home Tool Transfer Protocol", "HyperText Technical Protocol"],
      correct: 0,
      explanation: "HTTP stands for HyperText Transfer Protocol, which is the foundation of data communication on the World Wide Web."
    },
    {
      question: "In what year was the iPhone first released?",
      options: ["2005", "2006", "2007", "2008"],
      correct: 2,
      explanation: "The first iPhone was released by Apple on June 29, 2007, revolutionizing the smartphone industry."
    }
  ],
  geography: [
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correct: 2,
      explanation: "Canberra is the capital of Australia, chosen as a compromise between Sydney and Melbourne in 1908."
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correct: 1,
      explanation: "The Nile River is generally considered the longest river in the world at approximately 6,650 kilometers."
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      correct: 2,
      explanation: "There are 7 continents: Africa, Antarctica, Asia, Europe, North America, South America, and Australia/Oceania."
    }
  ],
  general: [
    {
      question: "What is the largest planet in our solar system?",
      options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
      correct: 1,
      explanation: "Jupiter is the largest planet in our solar system, with a mass more than 300 times that of Earth."
    },
    {
      question: "How many bones are in the adult human body?",
      options: ["186", "206", "226", "246"],
      correct: 1,
      explanation: "The adult human body has 206 bones. Babies are born with about 270 bones, which fuse together as they grow."
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correct: 2,
      explanation: "2 is the smallest prime number. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself."
    }
  ]
};

const aiEngines = ['GPT-4', 'Claude', 'Gemini'];
const categories = Object.keys(quizDatabase);

export async function generateQuizQuestion(topic: string): Promise<QuizQuestion> {
  // Simulate AI processing time
  const startTime = Date.now();
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 400));
  
  // Select random AI engine
  const engine = aiEngines[Math.floor(Math.random() * aiEngines.length)];
  
  // Determine category based on topic
  let category = 'general';
  const lowerTopic = topic.toLowerCase();
  
  if (lowerTopic.includes('science') || lowerTopic.includes('physics') || lowerTopic.includes('chemistry') || lowerTopic.includes('biology')) {
    category = 'science';
  } else if (lowerTopic.includes('history') || lowerTopic.includes('war') || lowerTopic.includes('ancient')) {
    category = 'history';
  } else if (lowerTopic.includes('tech') || lowerTopic.includes('computer') || lowerTopic.includes('internet')) {
    category = 'technology';
  } else if (lowerTopic.includes('geo') || lowerTopic.includes('country') || lowerTopic.includes('capital')) {
    category = 'geography';
  }
  
  // Get questions for the category
  const categoryQuestions = quizDatabase[category as keyof typeof quizDatabase];
  
  // Select random question from category
  const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
  
  // Calculate generation time
  const generationTime = Date.now() - startTime;
  
  return {
    ...randomQuestion,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    engine,
    generationTime
  };
}