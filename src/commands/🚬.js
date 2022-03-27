const motivations = require("../../motivation.json");
const logCigaretteReport = require("../utils/CigaretteLogger");
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

module.exports.run = async (client, message) => {
  const author = message.author;

  try {
    logCigaretteReport(author);
    const media = MessageMedia.fromFilePath(`./assets/warning${Math.floor(Math.random() * fs.readdirSync('./assets').length) + 1}.png`);
    client.sendBotMessage(client.chatId, `${motivations.messages[Math.floor(Math.random() * motivations.messages.length)]}`, {media});
  } catch (e) {
    client.sendBotMessage(client.chatId, 'וואלה איזה סאטלה בנדר לא הצלחתי לדווח עלייך נסה שוב יזין');
  }
};
