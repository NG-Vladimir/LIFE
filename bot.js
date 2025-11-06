const TelegramBot = require('node-telegram-bot-api');
const express = require('express'); // для локального сервера mini app
const path = require('path');

const BOT_TOKEN = '8565867977:AAGqMKsqsfgJG7cBDlBJb1N69R10J20yju4';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const app = express();
const PORT = 8080;

// Раздаём mini app через локальный сервер
app.use(express.static(path.join(__dirname, '/')));

app.listen(PORT, () => {
  console.log(`Mini app доступен по адресу: http://localhost:${PORT}/index.html`);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Привет! Хочешь открыть наше мини-приложение?", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть Mini App",
            web_app: { url: `http://localhost:${PORT}/index.html` }
          }
        ]
      ]
    }
  });
});

bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);
  bot.sendMessage(chatId, `Принял данные!\nИмя: ${data.name}\nДата рождения: ${data.birthdate}`);
});