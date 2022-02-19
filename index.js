const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json());

const { Default } = require('./routing/routes');
Default(app);

app.listen(8080, async () => {
  await axios.get(`${process.env.SERVER_URL}/initaliseTelegramWebhook`);
});
