const motivations = require("../../motivation.json");
const logCigaretteReport = require("../utils/CigaretteLogger");

module.exports.run = async (client, message) => {
  const author = message.author;

  try {
    logCigaretteReport(author);
    client.sendMessage(client.chatId, `${motivations.messages[Math.floor(Math.random() * motivations.messages.length)]} קיבלת +1`);
  } catch (e) {
    client.sendMessage(client.chatId, 'וואלה איזה סאטלה בנדר לא הצלחתי לדווח עלייך נסה שוב יזין');
  }
};
