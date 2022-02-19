const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

const cors = require('cors');
const env = require('dotenv').config();
app.use(cors());
app.use(express.json());

const { TELEGRAM_API_TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}`;

app.get('/', async (req, res) => {
  res.json({
    message: 'Welcome to Telegram SMS GateWay API',
  });
});

app.post('/resetWebhook', async (req, res) => {
  let deleteWebhook = await axios.get(
    `${TELEGRAM_API}/deleteWebhook?drop_pending_updates=true`
  );
  let activateWebhook = await axios.get(
    `${TELEGRAM_API}/setWebhook?url=${SERVER_URL}/sendTelegramMessage&max_connections=100`
  );

  res.json({
    success: true,
  });
});

app.post('/sendTelegramMessage', async (req, res) => {
  console.log(req.body);
  let { message } = req.body;
  console.log(message);

  let { chat, text: receivedMessage } = message;
  let chatID = chat['id'];
  if (chatID) {
    let text = receivedMessage.toLowerCase();
    if (text.includes('chat id')) {
      axios
        .post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatID,
          text: `Chat ID is ${chatID}`,
        })
        .then((result) => {
          res.json({
            success: true,
          });
        })
        .catch((err) => {
          res.json({
            success: true,
          });
        });
    } else {
      axios
        .post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatID,
          text: `How can reminder bot help?`,
        })
        .then((result) => {
          res.json({
            success: true,
          });
        })
        .catch((err) => {
          res.json({
            success: true,
          });
        });
    }
  }
  res.json({
    success: true,
  });
});

app.listen(8080, async () => {
  // await axios.get(`${process.env.SERVER_URL}/initaliseTelegramWebhook`);
  let lol = await axios.get(
    `${TELEGRAM_API}/setWebhook?url=${SERVER_URL}/sendTelegramMessage&max_connections=100`
  );
  console.log(lol.data);
});
