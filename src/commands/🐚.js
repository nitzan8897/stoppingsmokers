const magicShellAnswers = require('../../config/magicShell.json')
const OPEN_SENTENCE = "*קונכיית הקסם אומרת:*\n"


module.exports.run = async (client) => {

    const answer = magicShellAnswers.answers[(Math.floor(Math.random() * magicShellAnswers.answers.length))]

    client.sendMessage(
        client.chatId,
        OPEN_SENTENCE + answer
    );

};

module.exports.config = {
    name: "🐚"
};
