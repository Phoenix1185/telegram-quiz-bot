const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Quiz database
const quizDatabase = {
  space: [
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 2,
      explanation: "Jupiter is the largest planet with a mass greater than all other planets combined."
    },
    {
      question: "Who was the first person to walk on the moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
      correct: 1,
      explanation: "Neil Armstrong was the first human to step on the moon on July 20, 1969."
    },
    {
      question: "What galaxy is Earth located in?",
      options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
      correct: 1,
      explanation: "Earth is located in the Milky Way galaxy, which contains 200-400 billion stars."
    }
  ],
  history: [
    {
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correct: 2,
      explanation: "World War II ended in 1945 with the surrender of Japan in September."
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
      correct: 1,
      explanation: "George Washington served as the first U.S. President from 1789 to 1797."
    },
    {
      question: "Which ancient wonder of the world still stands today?",
      options: ["Colossus of Rhodes", "Hanging Gardens", "Great Pyramid of Giza", "Lighthouse of Alexandria"],
      correct: 2,
      explanation: "The Great Pyramid of Giza is the only ancient wonder still largely intact."
    }
  ],
  science: [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2,
      explanation: "Au comes from the Latin word 'aurum' meaning gold."
    },
    {
      question: "What is the speed of light?",
      options: ["299,792 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
      correct: 0,
      explanation: "The speed of light is approximately 299,792 kilometers per second in vacuum."
    },
    {
      question: "How many bones are in the adult human body?",
      options: ["106", "206", "306", "406"],
      correct: 1,
      explanation: "Adult humans have 206 bones, though babies are born with about 270 that fuse together."
    }
  ],
  geography: [
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correct: 2,
      explanation: "Canberra was purpose-built as Australia's capital in 1913 to resolve rivalry between Sydney and Melbourne."
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correct: 1,
      explanation: "The Nile River is approximately 6,650 km long, making it the longest in the world."
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      correct: 2,
      explanation: "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
    }
  ]
};

// User quiz sessions
const userSessions = new Map();

// Helper function to format quiz question
function formatQuizQuestion(quiz, questionIndex) {
  const question = quiz[questionIndex];
  if (!question) return null;
  
  let text = `🎯 *Question ${questionIndex + 1}/${quiz.length}*\n\n`;
  text += `*${question.question}*\n\n`;
  
  const keyboard = [];
  question.options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index);
    keyboard.push([{
      text: `${letter}. ${option}`,
      callback_data: `answer_${questionIndex}_${index}`
    }]);
  });
  
  return { text, keyboard };
}

// Main webhook handler
app.post('/webhook', async (req, res) => {
  const { message, callback_query } = req.body;
  const botToken = process.env.BOT_TOKEN;
  
  try {
    if (message) {
      await handleMessage(message, botToken);
    } else if (callback_query) {
      await handleCallbackQuery(callback_query, botToken);
    }
  } catch (error) {
    console.error('Error processing update:', error);
  }
  
  res.sendStatus(200);
});

// Handle text messages
async function handleMessage(message, botToken) {
  const chatId = message.chat.id;
  const text = message.text?.toLowerCase().trim();
  const userId = message.from.id;
  
  if (!text) return;
  
  // Clear any existing session when starting new command
  if (text.startsWith('/')) {
    userSessions.delete(userId);
  }
  
  let responseText = '';
  let replyMarkup = null;
  
  if (text === '/start') {
    responseText = `🎉 *Welcome to Quiz Bot!*\n\n` +
      `I can create fun quizzes on various topics. Here's what you can do:\n\n` +
      `📝 *Available Commands:*\n` +
      `• \`quiz space\` - Space exploration quiz\n` +
      `• \`quiz history\` - History quiz\n` +
      `• \`quiz science\` - Science quiz\n` +
      `• \`quiz geography\` - Geography quiz\n` +
      `• \`topics\` - See all topics\n` +
      `• \`help\` - Get help\n\n` +
      `🚀 Try: \`quiz space\`\n\n` +
      `Let's start learning!`;
    
    replyMarkup = {
      inline_keyboard: [
        [
          { text: "🚀 Space Quiz", callback_data: "start_quiz_space" },
          { text: "📚 History Quiz", callback_data: "start_quiz_history" }
        ],
        [
          { text: "🔬 Science Quiz", callback_data: "start_quiz_science" },
          { text: "🌍 Geography Quiz", callback_data: "start_quiz_geography" }
        ],
        [
          { text: "📋 All Topics", callback_data: "show_topics" },
          { text: "❓ Help", callback_data: "show_help" }
        ]
      ]
    };
  } else if (text.startsWith('quiz ')) {
    const topic = text.substring(5).trim();
    await startQuiz(chatId, userId, topic, botToken);
    return;
  } else if (text === 'topics') {
    responseText = `📋 *Available Quiz Topics:*\n\n` +
      `🚀 Space Exploration\n` +
      `📚 History\n` +
      `🔬 Science\n` +
      `🌍 Geography\n\n` +
      `Type: \`quiz [topic]\` to start!\n\n` +
      `Example: \`quiz space\``;
  } else if (text === 'help') {
    responseText = `🤖 *Quiz Bot Help*\n\n` +
      `*How to use me:*\n\n` +
      `📝 *Start a quiz:*\n` +
      `• \`quiz space\`\n` +
      `• \`quiz history\`\n` +
      `• \`quiz science\`\n` +
      `• \`quiz geography\`\n\n` +
      `🔍 *Other commands:*\n` +
      `• \`topics\` - See all topics\n` +
      `• \`help\` - Show this help\n` +
      `• \`/start\` - Main menu\n\n` +
      `💡 *Tip:* Click the buttons below for quick access!`;
    
    replyMarkup = {
      inline_keyboard: [
        [
          { text: "🚀 Space", callback_data: "start_quiz_space" },
          { text: "📚 History", callback_data: "start_quiz_history" }
        ],
        [
          { text: "🔬 Science", callback_data: "start_quiz_science" },
          { text: "🌍 Geography", callback_data: "start_quiz_geography" }
        ]
      ]
    };
  } else {
    responseText = `🤔 I didn't understand that.\n\n` +
      `Try these commands:\n` +
      `• \`quiz space\`\n` +
      `• \`topics\`\n` +
      `• \`help\`\n` +
      `• \`/start\``;
  }
  
  await sendMessage(botToken, chatId, responseText, replyMarkup);
}

// Handle callback queries (button clicks)
async function handleCallbackQuery(callbackQuery, botToken) {
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const data = callbackQuery.data;
  
  if (data.startsWith('start_quiz_')) {
    const topic = data.substring(11);
    await startQuiz(chatId, userId, topic, botToken);
  } else if (data.startsWith('answer_')) {
    await handleQuizAnswer(callbackQuery, botToken);
  } else if (data === 'show_topics') {
    const responseText = `📋 *Available Quiz Topics:*\n\n` +
      `🚀 Space Exploration\n` +
      `📚 History\n` +
      `🔬 Science\n` +
      `🌍 Geography\n\n` +
      `Click a button below to start!`;
    
    const replyMarkup = {
      inline_keyboard: [
        [
          { text: "🚀 Space", callback_data: "start_quiz_space" },
          { text: "📚 History", callback_data: "start_quiz_history" }
        ],
        [
          { text: "🔬 Science", callback_data: "start_quiz_science" },
          { text: "🌍 Geography", callback_data: "start_quiz_geography" }
        ]
      ]
    };
    
    await editMessage(botToken, chatId, callbackQuery.message.message_id, responseText, replyMarkup);
  } else if (data === 'show_help') {
    const responseText = `🤖 *Quiz Bot Help*\n\n` +
      `*How to use me:*\n\n` +
      `📝 *Start a quiz:*\n` +
      `• \`quiz space\`\n` +
      `• \`quiz history\`\n` +
      `• \`quiz science\`\n` +
      `• \`quiz geography\`\n\n` +
      `🔍 *Other commands:*\n` +
      `• \`topics\` - See all topics\n` +
      `• \`help\` - Show this help\n` +
      `• \`/start\` - Main menu\n\n` +
      `💡 *Tip:* Click the buttons below for quick access!`;
    
    const replyMarkup = {
      inline_keyboard: [
        [
          { text: "🚀 Space", callback_data: "start_quiz_space" },
          { text: "📚 History", callback_data: "start_quiz_history" }
        ],
        [
          { text: "🔬 Science", callback_data: "start_quiz_science" },
          { text: "🌍 Geography", callback_data: "start_quiz_geography" }
        ]
      ]
    };
    
    await editMessage(botToken, chatId, callbackQuery.message.message_id, responseText, replyMarkup);
  }
  
  // Answer the callback query
  await axios.post(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
    callback_query_id: callbackQuery.id
  });
}

// Start a quiz
async function startQuiz(chatId, userId, topic, botToken) {
  const topicMap = {
    'space': 'space',
    'space exploration': 'space',
    'history': 'history',
    'science': 'science',
    'geography': 'geography'
  };
  
  const quizTopic = topicMap[topic.toLowerCase()] || 'space';
  const quiz = quizDatabase[quizTopic];
  
  if (!quiz) {
    await sendMessage(botToken, chatId, `❌ Quiz topic "${topic}" not found. Try: space, history, science, or geography`);
    return;
  }
  
  // Initialize user session
  userSessions.set(userId, {
    topic: quizTopic,
    questions: quiz,
    currentQuestion: 0,
    score: 0,
    answers: []
  });
  
  const session = userSessions.get(userId);
  const questionData = formatQuizQuestion(session.questions, session.currentQuestion);
  
  if (questionData) {
    await sendMessage(botToken, chatId, questionData.text, {
      inline_keyboard: questionData.keyboard
    });
  }
}

// Handle quiz answer
async function handleQuizAnswer(callbackQuery, botToken) {
  const userId = callbackQuery.from.id;
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  
  const session = userSessions.get(userId);
  if (!session) return;
  
  const [, questionIndex, answerIndex] = data.split('_').map(Number);
  const question = session.questions[questionIndex];
  
  if (!question) return;
  
  const isCorrect = answerIndex === question.correct;
  if (isCorrect) {
    session.score++;
  }
  
  session.answers.push({
    question: question.question,
    userAnswer: answerIndex,
    correct: question.correct,
    isCorrect
  });
  
  // Show result
  let resultText = isCorrect ? '✅ *Correct!*' : '❌ *Wrong!*';
  resultText += `\n\n💡 *Explanation:* ${question.explanation}`;
  
  // Update keyboard to show correct answer
  const updatedKeyboard = [];
  question.options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index);
    const isCorrectAnswer = index === question.correct;
    const isUserAnswer = index === answerIndex;
    
    let buttonText = `${letter}. ${option}`;
    if (isCorrectAnswer) {
      buttonText = `✅ ${buttonText}`;
    } else if (isUserAnswer && !isCorrect) {
      buttonText = `❌ ${buttonText}`;
    }
    
    updatedKeyboard.push([{
      text: buttonText,
      callback_data: "disabled"
    }]);
  });
  
  // Add next button or finish button
  if (session.currentQuestion < session.questions.length - 1) {
    updatedKeyboard.push([{
      text: "➡️ Next Question",
      callback_data: `next_${questionIndex + 1}`
    }]);
  } else {
    updatedKeyboard.push([{
      text: "🏁 Finish Quiz",
      callback_data: `finish_quiz`
    }]);
  }
  
  await editMessage(botToken, chatId, callbackQuery.message.message_id, resultText, {
    inline_keyboard: updatedKeyboard
  });
  
  // Handle next/finish
  if (data.includes('next_')) {
    session.currentQuestion++;
    const nextQuestion = formatQuizQuestion(session.questions, session.currentQuestion);
    if (nextQuestion) {
      await sendMessage(botToken, chatId, nextQuestion.text, {
        inline_keyboard: nextQuestion.keyboard
      });
    }
  } else if (data === 'finish_quiz') {
    await showQuizResults(chatId, userId, botToken);
  }
}

// Show quiz results
async function showQuizResults(chatId, userId, botToken) {
  const session = userSessions.get(userId);
  if (!session) return;
  
  const percentage = Math.round((session.score / session.questions.length) * 100);
  let emoji = '🎉';
  let message = '';
  
  if (percentage >= 80) {
    emoji = '🏆';
    message = 'Outstanding!';
  } else if (percentage >= 60) {
    emoji = '👏';
    message = 'Great job!';
  } else if (percentage >= 40) {
    emoji = '👍';
    message = 'Good effort!';
  } else {
    emoji = '📚';
    message = 'Keep learning!';
  }
  
  let resultText = `${emoji} *Quiz Complete!*\n\n`;
  resultText += `📊 *Your Results:*\n`;
  resultText += `Score: ${session.score}/${session.questions.length} (${percentage}%)\n`;
  resultText += `Topic: ${session.topic.charAt(0).toUpperCase() + session.topic.slice(1)}\n\n`;
  resultText += `${message}\n\n`;
  resultText += `Play again?`;
  
  const replyMarkup = {
    inline_keyboard: [
      [
        { text: "🚀 Space Quiz", callback_data: "start_quiz_space" },
        { text: "📚 History Quiz", callback_data: "start_quiz_history" }
      ],
      [
        { text: "🔬 Science Quiz", callback_data: "start_quiz_science" },
        { text: "🌍 Geography Quiz", callback_data: "start_quiz_geography" }
      ]
    ]
  };
  
  await sendMessage(botToken, chatId, resultText, replyMarkup);
  userSessions.delete(userId);
}

// Send message helper
async function sendMessage(botToken, chatId, text, replyMarkup = null) {
  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    reply_markup: replyMarkup
  });
}

// Edit message helper
async function editMessage(botToken, chatId, messageId, text, replyMarkup = null) {
  await axios.post(`https://api.telegram.org/bot${botToken}/editMessageText`, {
    chat_id: chatId,
    message_id: messageId,
    text: text,
    parse_mode: 'Markdown',
    reply_markup: replyMarkup
  });
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Set webhook (helper endpoint)
app.post('/set-webhook', async (req, res) => {
  const { botToken, webhookUrl } = req.body;
  
  try {
    const response = await axios.post(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      url: webhookUrl
    });
    
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Telegram Quiz Bot running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: /webhook`);
});