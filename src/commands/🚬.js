const motivations = require('../../config/motivation.json')
const logCigaretteReport = require('../services/CigaretteLogger')
const { MessageMedia } = require('whatsapp-web.js')
const fs = require('fs')

module.exports.run = async (client, message) => {
    const author = message.author;
    try {
        logCigaretteReport(author)
        console.log('logged')
        const media = MessageMedia.fromFilePath(
            `./assets/warning${
                Math.floor(Math.random() * fs.readdirSync('./assets').length) +
                1
            }.png`
        )
        console.log('sticker got')
        client.sendBotMessage(client.chatId, `meow`, {
            media,
            sendMediaAsSticker: true,
        })
        console.log('sticker sent')
        client.sendBotMessage(
            client.chatId,
            `${
                motivations.messages[
                    Math.floor(Math.random() * motivations.messages.length)
                ]
            }`
        )
        console.log('message sent')
    } catch (e) {
        client.sendBotMessage(
            client.chatId,
            'וואלה איזה סאטלה בנדר לא הצלחתי לדווח עלייך נסה שוב יזין'
        )
    }
}
