const motivations = require("../../motivation.json");
const logCigaretteReport = require("../utils/CigaretteLogger");

module.exports.run = async (client, message) => {
    const author = message.author;
    try {
        logCigaretteReport(author);
        const media = MessageMedia.fromFilePath(
            `./assets/warning${
                Math.floor(Math.random() * fs.readdirSync("./assets").length) + 1
            }.png`
        );
        client.sendBotMessage(
            client.chatId,
            `meow`,
            {media, sendMediaAsSticker: true}
        );
        client.sendBotMessage(
            client.chatId,
            `${
                motivations.messages[
                    Math.floor(Math.random() * motivations.messages.length)
                    ]
            }`
        );
    } catch (e) {
        client.sendBotMessage(
            client.chatId,
            "וואלה איזה סאטלה בנדר לא הצלחתי לדווח עלייך נסה שוב יזין"
        );
    }
};
