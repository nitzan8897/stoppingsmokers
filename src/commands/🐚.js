const magicShellAnswers = require('../../config/magicShell.json')
const { MessageMedia } = require('whatsapp-web.js')


const OPEN_SENTENCE = "*קונכיית הקסם אומרת:*\n"


module.exports.run = async (client) => {

    const magicShellGif = MessageMedia.fromFilePath(
        `./assets/magic-shell.gif`
    )


    const answer = magicShellAnswers.answers[(Math.floor(Math.random() * magicShellAnswers.answers.length))]

    client.sendBotMessage(
        client.chatId,
        OPEN_SENTENCE + answer,
        {
            media: magicShellGif,
            sendVideoAsGif: true
        }
    );

};

module.exports.config = {
    name: '🐚',
}
