const env = require('dotenv').config();
const axios = require('axios');

const { TELEGRAM_API_TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}`;
const URI = `/webhook/${TELEGRAM_API_TOKEN}`;
console.log(URI);
const WEBHOOK_URL = `${SERVER_URL}${URI}`;

const Default = (app) => {
  app.get('/', async (req, res) => {
    res.json({
      message: 'Welcome to Sensoneo SMS GateWay API',
    });
  });

  app.get('/initaliseTelegramWebhook', async (req, res) => {
    axios
      .get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
      .then((result) => {
        console.log(result.data);
        res.json(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.post(URI, async (req, res) => {
    let { message } = req.body;
    console.log(message);
    let { chat = false, text: receivedMessage } = message;

    let chatID;
    if (chat) {
      ({ id: chatID } = chat);
    }

    console.log(chat);
    console.log(receivedMessage);

    if (chatID) {
      let text = receivedMessage.toLowerCase();
      if (text.includes('chat id')) {
        axios
          .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatID,
            text: `Chat ID is ${chatID}`,
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatID,
            text: `How can reminder bot help?`,
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    res.json({
      success: true,
    });
  });
};

module.exports = {
  Default: Default,
};
