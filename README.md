# Telegram Quiz Bot

A pure Telegram quiz bot with multiple topics and instant feedback.

## Features

- 🎮 Multiple quiz topics (Space, History, Science, Geography)
- ✅ Instant feedback with explanations
- 📊 Real-time scoring
- 🔄 Interactive buttons
- 📱 Clean, user-friendly interface

## Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Add your Telegram bot token to `.env`
5. Run: `npm start`

## Environment Variables

- `BOT_TOKEN`: Your Telegram bot token
- `TELEGRAM_WEBHOOK_SECRET`: Webhook secret (optional)
- `PORT`: Server port (default: 3000)

## Commands

- `/start` - Show main menu
- `quiz [topic]` - Start quiz for specific topic
- `topics` - Show available topics
- `help` - Show help message

## Deployment

This bot is designed to run on Koyeb, Heroku, or any Node.js hosting platform.