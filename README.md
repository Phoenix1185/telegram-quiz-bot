# 🤖 Telegram Quiz Bot

A pure Telegram bot that creates engaging quizzes - no web interface needed!

## 🚀 Features

- **Interactive Quizzes**: Space, History, Science, Geography
- **Real-time Feedback**: Instant correct/incorrect answers with explanations
- **Score Tracking**: See your results at the end
- **Easy Commands**: Simple slash commands and inline buttons
- **No Web Interface**: Works entirely within Telegram

## 📋 Commands

- `/start` - Main menu with quick access buttons
- `quiz space` - Space exploration quiz
- `quiz history` - History quiz
- `quiz science` - Science quiz
- `quiz geography` - Geography quiz
- `topics` - See all available topics
- `help` - Get help and usage tips

## 🛠️ Tech Stack

- **Node.js** with Express
- **Telegram Bot API**
- **Axios** for HTTP requests
- **In-memory session storage**

## 📦 Deployment to Koyeb

### 1. Get Bot Token
1. Talk to [@BotFather](https://t.me/botfather) on Telegram
2. Create a new bot: `/newbot`
3. Copy your bot token

### 2. Deploy to Koyeb
1. Fork this repository from [phoenix1185/telegram-quiz-bot](https://github.com/phoenix1185/telegram-quiz-bot)
2. Go to [Koyeb](https://koyeb.com)
3. Create new app → GitHub
4. Select your forked repository
5. Set environment variable:
   - `BOT_TOKEN`: Your bot token from BotFather
6. Deploy

### 3. Set Webhook
After deployment, your bot will be automatically live at your Koyeb URL!

## 🔧 Local Development
