const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '8565867977:AAGqMKsqsfgJG7cBDlBJb1N69R10J20yju4';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// URL мини-апп
const MINI_APP_URL = "https://ng-vladimir.github.io/LIFE/index.html";

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Привет! Хочешь открыть наше мини-приложение?", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть Mini App",
            web_app: { url: MINI_APP_URL }
          }
        ]
      ]
    }
  });
});

// При получении данных из мини-аппа
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  try {
    const data = JSON.parse(msg.web_app_data.data);
    bot.sendMessage(chatId, `Принял данные!\nИмя: ${data.name}\nДата рождения: ${data.birthdate}`);
  } catch (err) {
    bot.sendMessage(chatId, `Ошибка при получении данных: ${err}`);
  }
});