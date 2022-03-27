const stopMessage = require("../../smokers.json");
const motivations = require("../../motivation.json");
const logCigaretteReport = require("../utils/CigaretteLogger");

module.exports.run = async (client, message) => {
  const author = message.author;

  try {
    stopMessage[author] ? 
    (stopMessage[author] = stopMessage[author] + 1) : 
    (stopMessage[author] = 1);
    logCigaretteReport(author);
    fs.writeFile("../../smokers.json", JSON.stringify(stopMessage));
    client.sendMessage(client.chatId, `${motivations.messages[Math.floor(Math.random() * motivations.messages.length)]} קיבלת +1`);
  } catch (e) {
    console.log(e);
  }
};
