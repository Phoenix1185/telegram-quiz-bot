// server.js
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/api/telegram', async (req, res) => {
  const { message } = req.body;
  
  if (message?.text?.startsWith('/start')) {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: message.chat.id,
      text: 'Welcome to AI Quiz Bot! 🎯'
    });
  }
  
  res.sendStatus(200);
});

app.listen(3000);