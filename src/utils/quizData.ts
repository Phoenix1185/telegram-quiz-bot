export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: 2,
    explanation: "Canberra was purpose-built as Australia's capital in 1913 to resolve rivalry between Sydney and Melbourne."
  },
  {
    id: 2,
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
    explanation: "Mars appears red due to iron oxide (rust) on its surface, giving it the nickname 'Red Planet'."
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2,
    explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519. It's now in the Louvre Museum in Paris."
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: 3,
    explanation: "The Pacific Ocean covers about 63 million square miles, making it larger than all land masses combined."
  },
  {
    id: 5,
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correct: 2,
    explanation: "World War II ended in 1945 with the surrender of Japan in September following the atomic bombings."
  },
  {
    id: 6,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correct: 2,
    explanation: "The number 2 is the smallest prime number. A prime number has exactly two distinct positive divisors: 1 and itself."
  },
  {
    id: 7,
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Aluminum", "Argon"],
    correct: 1,
    explanation: "Au comes from the Latin word 'aurum' meaning gold. Gold has been valued throughout human history."
  },
  {
    id: 8,
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    explanation: "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
  },
  {
    id: 9,
    question: "What is the speed of light in vacuum?",
    options: ["299,792 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
    correct: 0,
    explanation: "Light travels at exactly 299,792,458 meters per second in vacuum, a fundamental constant of physics."
  },
  {
    id: 10,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1,
    explanation: "William Shakespeare wrote Romeo and Juliet around 1597. It's one of his most famous tragedies."
  },
  {
    id: 11,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correct: 1,
    explanation: "The Blue Whale is the largest mammal ever known, reaching lengths up to 100 feet and weighing up to 200 tons."
  },
  {
    id: 12,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "Brazil"],
    correct: 2,
    explanation: "Kangaroos are native to Australia and are found nowhere else in the wild. They're Australia's national symbol."
  },
  {
    id: 13,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correct: 2,
    explanation: "Diamond is the hardest natural substance, scoring 10 on the Mohs scale of mineral hardness."
  },
  {
    id: 14,
    question: "How many bones are in the adult human body?",
    options: ["106", "206", "306", "406"],
    correct: 1,
    explanation: "Adult humans have 206 bones. Babies are born with about 270 bones, which fuse together during growth."
  },
  {
    id: 15,
    question: "What is the main gas that makes up Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct: 2,
    explanation: "Nitrogen makes up about 78% of Earth's atmosphere, with oxygen at about 21% and other gases making up the remaining 1%."
  }
];