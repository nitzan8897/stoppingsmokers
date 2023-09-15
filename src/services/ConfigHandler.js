const consoleColorCodes = require('../../config/consts')

class ConfigHandler {
    constructor(client) {
        this.client = client
    }

    init() {
        this.client.chatId = process.env.SMOKING_GROUP
        console.info(
            consoleColorCodes.boldGreen,
            `{ ConfigHandler: Initialized Config Handler with chatId: ${this.client.chatId} }`
        )
        this.client.sendBotMessage = (chatId, message, options) => {
            const newMessage =
                '-----------------------------------\n' +
                message +
                '\n-----------------------------------'
            this.client.sendMessage(chatId, newMessage, options)
        }
    }
}

module.exports = ConfigHandler
