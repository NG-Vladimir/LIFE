const TelegramBot = require('node-telegram-bot-api');

// ⚠️ Только для локального теста, токен здесь захардкожен
const BOT_TOKEN = '8565867977:AAGqMKsqsfgJG7cBDlBJb1N69R10J20yju4';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Приветствие и кнопка для мини-апп
  bot.sendMessage(chatId, "Привет! Хочешь открыть наше мини-приложение?", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть Mini App",
            web_app: { url: "http://localhost:8080/index.html" } // ссылка на локальный mini app
          }
        ]
      ]
    }
  });
});

// При получении данных из мини-аппа
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);
  bot.sendMessage(chatId, `Принял данные!\nИмя: ${data.name}\nДата рождения: ${data.birthdate}`);
});