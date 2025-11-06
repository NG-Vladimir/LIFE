const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); // безопасно берём токен из .env

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет! Используй мини-апп через кнопку в боте.");
});

bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);
  bot.sendMessage(chatId, `Принял данные!\nИмя: ${data.name}\nДата рождения: ${data.birthdate}`);
});