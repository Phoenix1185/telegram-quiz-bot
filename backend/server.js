const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());

// Quiz data
const quizData = {
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
    }
  ],
  history: [
    {
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correct: 2,
      explanation: "World War II ended in 1945 with the surrender of Japan in September."
    }
  ],
  science: [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2,
      explanation: "Au comes from the Latin word 'aurum' meaning gold."
    }
  ]
};

// Helper function to format quiz message
function formatQuizMessage(quiz, questionIndex = 0) {
  const question = quiz[questionIndex];
  if (!question) return "Quiz completed! 🎉";
  
  let message = `🎯 *${quiz.topic || 'Quiz'} - Question ${questionIndex + 1}*\n\n`;
  message += `*${question.question}*\n\n`;
  
  question.options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index);
    message += `${letter}. ${option}\n`;
  });
  
  message += `\n💡 *Explanation:* ${question.explanation}`;
  
  return message;
}

// Verify webhook (optional but recommended)
function verifyTelegramWebhook(req, res, next) {
  const secretToken = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secretToken) {
    const signature = req.headers['x-telegram-bot-api-secret-token'];
    if (!signature || signature !== secretToken) {
      return res.sendStatus(403);
    }
  }
  next();
}

// Webhook endpoint
app.post('/api/telegram', verifyTelegramWebhook, async (req, res) => {
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
  const text = message.text?.toLowerCase();
  
  if (!text) return;
  
  let responseText = '';
  let replyMarkup = null;
  
  // Command handlers
  if (text === '/start') {
    responseText = `🎉 *Welcome to AI Quiz Generator!*\n\n` +
      `I can create engaging quizzes on any topic. Here's what you can do:\n\n` +
      `📝 *Commands:*\n` +
      `• \`quiz [topic]\` - Generate a quiz\n` +
      `• \`topics\` - See available topics\n` +
      `• \`engines\` - See AI engines\n` +
      `• \`help\` - Get help\n\n` +
      `Try: \`quiz space exploration\`\n\n` +
      `🚀 Let's start learning!`;
    
    replyMarkup = {
      inline_keyboard: [
        [
          { text: "🚀 Try Space Quiz", callback_data: "quiz_space" },
          { text: "📚 Try History Quiz", callback_data: "quiz_history" }
        ],
        [
          { text: "🔬 Try Science Quiz", callback_data: "quiz_science" },
          { text: "🌍 Try Geography Quiz", callback_data: "quiz_geography" }
        ],
        [
          { text: "📋 All Topics", callback_data: "topics" },
          { text: "⚙️ AI Engines", callback_data: "engines" }
        ]
      ]
    };
  } else if (text.startsWith('quiz ')) {
    const topic = text.substring(5).trim();
    const quizzes = {
      'space': quizData.space,
      'space exploration': quizData.space,
      'history': quizData.history,
      'science': quizData.science,
      'geography': quizData.space // Using space as placeholder
    };
    
    const quiz = quizzes[topic] || quizData.space;
    responseText = formatQuizMessage({ ...quiz, topic });
  } else if (text === 'topics') {
    responseText = `📋 *Available Quiz Topics:*\n\n` +
      `🚀 Space Exploration\n` +
      `📚 History\n` +
      `🔬 Science\n` +
      `🌍 Geography\n` +
      `🎭 Movies & TV\n` +
      `🎵 Music\n` +
      `⚽ Sports\n` +
      `🍔 Food & Cooking\n\n` +
      `Type: \`quiz [topic]\` to start!`;
  } else if (text === 'engines') {
    responseText = `⚙️ *Available AI Engines:*\n\n` +
      `🧠 *GPT-4* - Most capable\n` +
      `⚡ *GPT-3.5* - Fast responses\n` +
      `🎨 *Claude* - Creative writing\n` +
      `🔍 *Gemini* - Multimodal\n\n` +
      `Engines are automatically selected based on your quiz type.`;
  } else if (text === 'help') {
    responseText = `🤖 *Need Help?*\n\n` +
      `I'm your AI Quiz Generator! Here's how to use me:\n\n` +
      `📝 *Start a quiz:*\n` +
      `• \`quiz space\`\n` +
      `• \`quiz history\`\n` +
      `• \`quiz science\`\n\n` +
      `🔍 *Explore:*\n` +
      `• \`topics\` - See all topics\n` +
      `• \`engines\` - See AI engines\n\n` +
      `💡 *Tip:* Be specific! Try \`quiz ancient rome\` instead of just \`quiz history\``;
  } else {
    responseText = `🤔 I didn't understand that. Try:\n\n` +
      `• \`quiz [topic]\` - Start a quiz\n` +
      `• \`topics\` - See topics\n` +
      `• \`help\` - Get help`;
  }
  
  await sendMessage(botToken, chatId, responseText, replyMarkup);
}

// Handle callback queries (inline buttons)
async function handleCallbackQuery(callbackQuery, botToken) {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  
  let responseText = '';
  
  switch (data) {
    case 'quiz_space':
      responseText = formatQuizMessage({ ...quizData.space, topic: 'Space Exploration' });
      break;
    case 'quiz_history':
      responseText = formatQuizMessage({ ...quizData.history, topic: 'History' });
      break;
    case 'quiz_science':
      responseText = formatQuizMessage({ ...quizData.science, topic: 'Science' });
      break;
    case 'quiz_geography':
      responseText = formatQuizMessage({ ...quizData.space, topic: 'Geography' });
      break;
    case 'topics':
      responseText = `📋 *Available Quiz Topics:*\n\n` +
        `🚀 Space Exploration\n` +
        `📚 History\n` +
        `🔬 Science\n` +
        `🌍 Geography\n\n` +
        `Type: \`quiz [topic]\` to start!`;
      break;
    case 'engines':
      responseText = `⚙️ *Available AI Engines:*\n\n` +
        `🧠 *GPT-4* - Most capable\n` +
        `⚡ *GPT-3.5* - Fast responses\n` +
        `🎨 *Claude* - Creative writing\n` +
        `🔍 *Gemini* - Multimodal`;
      break;
    default:
      responseText = 'Action completed!';
  }
  
  // Answer callback query
  await axios.post(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
    callback_query_id: callbackQuery.id
  });
  
  // Send response
  await sendMessage(botToken, chatId, responseText);
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Set webhook endpoint
app.post('/api/set-webhook', async (req, res) => {
  const { botToken, webhookUrl, secretToken } = req.body;
  
  try {
    const response = await axios.post(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      url: webhookUrl,
      secret_token: secretToken
    });
    
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Telegram Bot Server running on port ${PORT}`);
});