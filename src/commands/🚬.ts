import { MessageMedia } from 'whatsapp-web.js'
import fs from 'fs'
import motivations from '../../config/motivation.json'
import { logCigaretteReport } from '../services/CigaretteLogger'

export const run = async (
    client: any,
    message: any,
    date?: Date
): Promise<void> => {
    const author = message.author
    try {
        const logDate = date ? date : new Date()
        logCigaretteReport(author, logDate)
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
