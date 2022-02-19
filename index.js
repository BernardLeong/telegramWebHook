const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const env = require('dotenv').config();
app.use(cors());
app.use(express.json());

const { Default } = require('./routing/routes');
Default(app);

const { TELEGRAM_API_TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}`;
const URI = `/webhook/${TELEGRAM_API_TOKEN}`;
const WEBHOOK_URL = `${SERVER_URL}${URI}`;

app.listen(8080, async () => {
  // await axios.get(`${process.env.SERVER_URL}/initaliseTelegramWebhook`);
  await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
});
