const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());

// Webhook secret validation middleware
const validateWebhook = (req, res, next) => {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('⚠️  No webhook secret configured - skipping validation');
    return next();
  }

  const telegramSecretToken = req.headers['x-telegram-bot-api-secret-token'];
  
  if (!telegramSecretToken) {
    console.error('❌ Missing Telegram secret token header');
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (telegramSecretToken !== secret) {
    console.error('❌ Invalid webhook secret');
    return res.status(403).json({ error: 'Unauthorized' });
  }

  next();
};

// Apply webhook validation to the webhook endpoint
app.post('/webhook', validateWebhook, async (req, res) => {
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

// ... rest of the code remains the same ...

// Updated webhook setting endpoint
app.post('/set-webhook', async (req, res) => {
  const { botToken, webhookUrl } = req.body;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  
  try {
    const webhookConfig = {
      url: webhookUrl
    };
    
    // Add secret token if configured
    if (secret) {
      webhookConfig.secret_token = secret;
      console.log('🔐 Setting webhook with secret token validation');
    } else {
      console.log('⚠️  Setting webhook without secret token (not recommended for production)');
    }
    
    const response = await axios.post(`https://api.telegram.org/bot${botToken}/setWebhook`, webhookConfig);
    
    res.json({ 
      success: true, 
      data: response.data,
      hasSecret: !!secret
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    hasWebhookSecret: !!process.env.TELEGRAM_WEBHOOK_SECRET
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Telegram Quiz Bot running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: /webhook`);
  console.log(`🔐 Webhook secret configured: ${!!process.env.TELEGRAM_WEBHOOK_SECRET}`);
});